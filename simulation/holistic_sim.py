"""
Holistic combination simulation for bladder cancer (urothelial carcinoma).

Monte Carlo model of tumor-burden trajectories under candidate regimens.
ILLUSTRATIVE RESEARCH MODEL — not clinical evidence or medical advice.

Model
-----
- Tumor burden index B(0) = 100.
- Each simulated patient draws a personal net weekly log-growth rate:
      mu_i ~ Normal(mu_arm, tau)      (patient heterogeneity, tau = 0.025)
- Weekly evolution with noise:
      B(t+1) = B(t) * exp(mu_i + eps),   eps ~ Normal(0, 0.012)
- mu_arm values are calibrated to published anchors (see ANCHORS below).
- Outcomes at week 12 (RECIST-style on burden index):
      PR  = B <= 70   (>= 30% shrinkage)
      SD  = 70 < B <= 120
      PD  = B > 120   (>= 20% growth)
- Durable control at week 24 = B <= 50.

NMIBC scenario uses beta-distributed 6-month complete-response rates anchored
to published trial results.
"""

import numpy as np
import json

rng = np.random.default_rng(42)
N = 20000
WEEKS = 24
TAU = 0.025        # patient-level heterogeneity in weekly net log-growth
EPS = 0.012        # week-to-week noise

# mu_arm = net weekly log-growth rate. Anchors:
#  - untreated: +0.045 (~15-week doubling)
#  - GC alone:  -0.005 (GC response rate ~40-50% in mUC)
#  - ICI alone: -0.004 (ORR ~20-25% second-line urothelial)
#  - ICI + IVM: -0.016 (Draganov 2021: 6/15 complete regressions, synergy)
#  - IVM + MET: -0.010 (canine/MCF-7 synergy; metformin HR 0.66 bladder cohort)
#  - docetaxel + IVM: -0.013 (HSP27; apatorsen+docetaxel survival signal in UC)
#  - IVM alone: +0.005 (bladder xenograft growth inhibition only)
ARMS = {
    "Untreated reference":      {"mu": +0.045, "evidence": 0.0, "safety": 5.0},
    "Ivermectin alone":         {"mu": +0.005, "evidence": 3.0, "safety": 5.0},
    "GC chemo alone":           {"mu": -0.005, "evidence": 5.0, "safety": 2.5},
    "ICI alone":                {"mu": -0.004, "evidence": 5.0, "safety": 3.0},
    "IVM + metformin (oral)":   {"mu": -0.010, "evidence": 3.0, "safety": 4.5},
    "IVM + MET + HCQ (oral)":   {"mu": -0.012, "evidence": 1.0, "safety": 3.0},
    "Docetaxel + IVM":          {"mu": -0.013, "evidence": 3.0, "safety": 3.0},
    "GC + IVM":                 {"mu": -0.012, "evidence": 3.0, "safety": 3.0},
    "GC + IVM + metformin":     {"mu": -0.018, "evidence": 3.0, "safety": 2.5},
    "ICI + IVM":                {"mu": -0.016, "evidence": 4.0, "safety": 3.5},
    "ICI + IVM + metformin":    {"mu": -0.020, "evidence": 2.5, "safety": 3.0},
}

def simulate_arm(mu_arm):
    mu_i = rng.normal(mu_arm, TAU, size=N)
    log_b = np.zeros(N)
    traj = np.zeros((WEEKS + 1, N))
    traj[0] = 100.0
    for t in range(1, WEEKS + 1):
        log_b += mu_i + rng.normal(0.0, EPS, size=N)
        traj[t] = 100.0 * np.exp(log_b)
    return traj

results = {}
traj_medians = {}
for name, spec in ARMS.items():
    traj = simulate_arm(spec["mu"])
    b12, b24 = traj[12], traj[24]
    pr12 = float(np.mean(b12 <= 70))
    sd12 = float(np.mean((b12 > 70) & (b12 <= 120)))
    pd12 = float(np.mean(b12 > 120))
    durable24 = float(np.mean(b24 <= 50))
    benefit = pr12 + sd12
    composite = 0.45 * benefit + 0.35 * (spec["evidence"] / 5.0) + 0.20 * (spec["safety"] / 5.0)
    results[name] = {
        "P_PR_wk12": round(pr12, 3),
        "P_SD_wk12": round(sd12, 3),
        "P_PD_wk12": round(pd12, 3),
        "median_burden_wk12": round(float(np.median(b12)), 1),
        "median_burden_wk24": round(float(np.median(b24)), 1),
        "P_durable_wk24": round(durable24, 3),
        "clinical_benefit": round(benefit, 3),
        "evidence": spec["evidence"],
        "safety": spec["safety"],
        "composite": round(composite, 3),
    }
    traj_medians[name] = [round(float(np.median(traj[t])), 1) for t in range(0, WEEKS + 1, 2)]

ranked = sorted(results.items(), key=lambda kv: kv[1]["composite"], reverse=True)

# ---- NMIBC scenario: beta-distributed 6-month complete-response rates -------
# Anchors: BCG alone ~55-60% CR (historical null in NCT04179162 design);
# BCG + intravesical gemcitabine 95% CR (phase I/II); ICI + BCG ~73% 12-mo CRR;
# BCG + curcumin modeled from syngeneic bladder-tumor synergy (Cancer Res 2009).
K = 40  # beta concentration (uncertainty)
NMIBC = {
    "BCG alone (reference)": (0.58, 5.0, 4.5),
    "BCG + curcumin (hypothesis)": (0.68, 2.0, 4.5),
    "BCG + systemic ICI": (0.73, 4.0, 2.5),
    "BCG + intravesical gemcitabine": (0.95, 3.5, 3.5),
}
nm = {}
for name, (mean, ev, safe) in NMIBC.items():
    draws = rng.beta(mean * K, (1 - mean) * K, size=N) * 100
    nm[name] = {
        "mean_CR6m": round(float(np.mean(draws)), 1),
        "ci90": [round(float(np.percentile(draws, 5)), 1), round(float(np.percentile(draws, 95)), 1)],
        "evidence": ev,
        "safety": safe,
    }

out = {
    "systemic_ranking": [{"arm": a, **r} for a, r in ranked],
    "median_trajectories_weeks_0_24_every_2": traj_medians,
    "nmibc_6m_cr": nm,
}
print(json.dumps(out, indent=1))
