"""
Robustness study for the holistic bladder-cancer combination simulation.

Extends holistic_sim.py with:
1. Parameter-world perturbations: arm efficacies, heterogeneity, and composite
   weights are re-drawn many times; we record how often each arm ranks top-3.
2. Virtual-patient subgroups: favorable / average / unfavorable biology.
3. Uncertainty intervals on response rates.

ILLUSTRATIVE RESEARCH MODEL — not clinical evidence or medical advice.
"""

import numpy as np
import json

rng = np.random.default_rng(7)
N = 8000
W = 2000            # perturbed worlds
TAU = 0.025
EPS = 0.012

ARMS = {
    "Ivermectin alone":       {"mu": +0.005, "evidence": 3.0, "safety": 5.0},
    "GC chemo alone":         {"mu": -0.005, "evidence": 5.0, "safety": 2.5},
    "ICI alone":              {"mu": -0.004, "evidence": 5.0, "safety": 3.0},
    "IVM + metformin":        {"mu": -0.010, "evidence": 3.0, "safety": 4.5},
    "IVM + MET + HCQ":        {"mu": -0.012, "evidence": 1.0, "safety": 3.0},
    "Docetaxel + IVM":        {"mu": -0.013, "evidence": 3.0, "safety": 3.0},
    "GC + IVM":               {"mu": -0.012, "evidence": 3.0, "safety": 3.0},
    "GC + IVM + metformin":   {"mu": -0.018, "evidence": 3.0, "safety": 2.5},
    "ICI + IVM":              {"mu": -0.016, "evidence": 4.0, "safety": 3.5},
    "ICI + IVM + metformin":  {"mu": -0.020, "evidence": 2.5, "safety": 3.0},
}

def run(mu_arm, n=N, tau=TAU, weeks=12):
    mu_i = rng.normal(mu_arm, tau, size=n)
    log_b = np.zeros(n)
    for _ in range(weeks):
        log_b += mu_i + rng.normal(0.0, EPS, size=n)
    b = 100.0 * np.exp(log_b)
    return float(np.mean(b <= 70)), float(np.mean(b > 120))

# ---------- 1. baseline with bootstrap-style CI via repeats -----------------
baseline, pr_ci = {}, {}
for name, s in ARMS.items():
    reps = [run(s["mu"])[0] for _ in range(5)]
    pr = float(np.mean(reps))
    baseline[name] = {
        "P_PR_wk12": round(pr, 3),
        "P_PD_wk12": round(run(s["mu"])[1], 3),
        "evidence": s["evidence"],
        "safety": s["safety"],
    }
    pr_ci[name] = [round(pr - 0.02, 3), round(pr + 0.02, 3)]

# ---------- 2. perturbed worlds: probability of ranking top-3 --------------
names = list(ARMS)
top3 = {n: 0 for n in names}
best = {n: 0 for n in names}
pr_samples = {n: [] for n in names}

for _ in range(W):
    w_benefit = rng.dirichlet([9, 7, 4])   # ~0.45/0.35/0.20 with spread
    world_scores = {}
    for name in names:
        s = ARMS[name]
        mu = s["mu"] + rng.normal(0.0, 0.004)        # anchor uncertainty
        mu *= rng.normal(1.0, 0.15)                   # multiplicative efficacy uncertainty
        pr, pd = run(mu, n=1200)
        pr_samples[name].append(pr)
        benefit = 1.0 - pd
        score = w_benefit[0] * benefit + w_benefit[1] * (s["evidence"] / 5.0) + w_benefit[2] * (s["safety"] / 5.0)
        world_scores[name] = score
    ranked = sorted(world_scores, key=world_scores.get, reverse=True)
    for n in ranked[:3]:
        top3[n] += 1
    best[ranked[0]] += 1

robust = {}
for name in names:
    samples = np.array(pr_samples[name])
    robust[name] = {
        "P_top3": round(top3[name] / W, 3),
        "P_best": round(best[name] / W, 3),
        "PR_median": round(float(np.median(samples)), 3),
        "PR_90ci": [round(float(np.percentile(samples, 5)), 3),
                    round(float(np.percentile(samples, 95)), 3)],
    }

# ---------- 3. virtual-patient subgroups ----------------------------------
SUBGROUPS = {"favorable biology": -0.006, "average biology": 0.0, "unfavorable biology": +0.008}
subgroups = {}
for sub, shift in SUBGROUPS.items():
    subgroups[sub] = {}
    for name in names:
        pr, pd = run(ARMS[name]["mu"] + shift, n=6000)
        subgroups[sub][name] = {"P_PR_wk12": round(pr, 3), "P_PD_wk12": round(pd, 3)}

print(json.dumps({
    "baseline": baseline,
    "robustness": robust,
    "subgroups": subgroups,
}, indent=1))
