# Study Protocol — Ivermectin + Metformin in Bladder Cancer (In Vitro)

**Version 1.0 · Oct 2026 · Preclinical research protocol — for use in qualified laboratory settings only**

---

## 1. Rationale

Ivermectin has direct bladder-cancer activity: G1 arrest and JNK-mediated caspase apoptosis in T24/RT4 urothelial carcinoma cells (2022), and growth inhibition of bladder cancer cells in vitro and in xenografts via ROS/DNA-damage/ATM-p53 (2024). Metformin synergizes with cisplatin in T24/BIU-87 bladder cells and xenografts via AMPK/mTOR (2015), and metformin users in a 243-patient MIBC cohort after cystectomy + gemcitabine/cisplatin showed a 37% lower risk of progression (HR 0.66) with fewer grade ≥3 toxicities (2026). No study has yet tested the ivermectin + metformin pair in bladder cancer.

**Hypothesis:** ivermectin + metformin produce supra-additive cytotoxicity in urothelial carcinoma cells through combined ROS generation and dual suppression of PI3K/AKT/mTOR signaling, with a therapeutic window over non-malignant urothelial cells.

## 2. Objectives

**Primary**
1. Determine single-agent IC50 values for ivermectin and metformin in urothelial carcinoma cell lines.
2. Quantify combination interaction (Bliss independence and Chou-Talalay combination index) across a full concentration matrix.

**Secondary**
3. Characterize mechanism: apoptosis, cell cycle, ROS (with NAC rescue), autophagy flux, DNA damage (ATM/p53, γH2AX), pathway phosphorylation (PI3K/AKT/mTOR).
4. Assess selectivity versus a non-tumorigenic urothelial line.
5. Evaluate durable effects: clonogenic survival, migration/invasion.

## 3. Materials

| Item | Specification |
|---|---|
| Cell lines | T24 (grade III, muscle-invasive), RT4 (grade I, papillary), 5637 and/or J82 (add if budget allows), SV-HUC-1 (non-tumorigenic urothelial control) |
| Ivermectin | Sigma I8898 or equiv.; stock 10 mM in DMSO, single-use aliquots, protect from light; final DMSO ≤ 0.1% |
| Metformin hydrochloride | Sigma PHR1492 or equiv.; stock 1 M in water, filter-sterilized |
| Positive controls | Cisplatin (1–20 µM), gemcitabine (1 nM–1 µM) |
| Viability | CCK-8 or CellTiter-Glo |
| Flow cytometry | Annexin V-FITC/PI; PI cell cycle; DCFH-DA (ROS) |
| Western blot | p-PI3K, PI3K, p-AKT, AKT, p-mTOR, mTOR, LC3B, p62, γH2AX, p-ATM, p53, p21, cleaved caspase-3/PARP, β-actin |
| Other | Colony-formation kit/reagents, transwell chambers (8 µm), NAC (ROS rescue), TEM access (optional) |

## 4. Experimental design

### Phase 0 — Single-agent dose–response (weeks 1–3)
- 9-point half-log dilutions: **ivermectin 0.125–8 µM**; **metformin 0.5–10 mM** (see caveat §8).
- Endpoints at 24 h, 48 h, 72 h (CCK-8) in all cell lines.
- Fit 4-parameter logistic curves; report IC50/IC70 with 95% CI (GraphPad Prism or Python `pybaselines`/`scipy`).
- **Gate:** proceed only if both agents show dose-dependent activity in ≥2 carcinoma lines.

### Phase 1 — Combination matrix (weeks 3–6)
- **Full 6 × 6 matrix** centered on IC20–IC80 of each agent (ivermectin 0.25–6 µM × metformin 0.5–8 mM), 48 h and 72 h.
- 3 independent experiments × 6 technical replicates per condition; randomized plate layout with edge wells filled by PBS.
- **Analysis:** Bliss independence (ZIP-score optional) as primary; Chou-Talalay CI at ED50/ED75/ED90 as secondary. Synergy declared if CI < 0.9 (moderate) or < 0.5 (strong) in ≥2 lines with non-overlapping 95% CI vs additivity, and Bliss excess ≥ 10%.

### Phase 2 — Mechanism (weeks 6–10)
Treatments: vehicle, each single agent at IC30-equivalent, combination (both at IC30-equivalent), combination + NAC (5 mM, 1 h pre-treatment).
1. **ROS:** DCFH-DA flow cytometry at 6 h and 24 h ± NAC rescue.
2. **Apoptosis:** Annexin V/PI at 48 h; western blot cleaved caspase-3/PARP.
3. **Cell cycle:** PI flow cytometry at 24 h.
4. **Pathway:** western blot at 24 h — p-AKT/AKT, p-mTOR/mTOR, p-S6, LC3-II/I, p62 (autophagy flux ± bafilomycin A1 100 nM control), γH2AX, p-ATM, p53/p21.
5. **Optional:** TEM autophagosome counts (≥20 cells/condition).

### Phase 3 — Durable phenotypes (weeks 9–12)
1. **Clonogenic assay:** 10–14 days, treatment pulse 48 h then drug-free outgrowth; survival fraction vs plating efficiency.
2. **Migration/invasion:** scratch assay (24 h, mitomycin C 1 µg/mL to block proliferation) and transwell ± Matrigel (24 h).
3. **3D spheroids (optional):** T24 spheroids, 5-day treatment, ATP readout — better predictor of in vivo behavior.

## 5. Statistics & reproducibility

- Sample size: n = 3 independent biological repeats minimum per experiment. With α = 0.05 (two-sided), n = 3 gives ~80% power to detect a 25% difference in viability (SD assumed 12%); n = 4 if SD > 15%.
- Tests: two-way ANOVA (drug A × drug B interaction term) with Tukey correction; unpaired t-tests for pairwise mechanistic endpoints; significance p < 0.05.
- Pre-register the primary endpoint and synergy threshold on OSF before Phase 1 data collection.
- Blinding: image-based readouts (scratch, colonies) analyzed with coded filenames; automated colony counting where possible.
- Raw data: plate-level exports retained; analysis scripts version-controlled in the companion GitHub repo (github.com/amarzouq1/canvastyle).

## 6. Timeline & milestones

| Weeks | Work | Milestone / go-no-go |
|---|---|---|
| 1–3 | Phase 0 dose–response | IC50s established |
| 3–6 | Phase 1 combination matrix | **Go if CI < 0.9 in ≥2 lines** |
| 6–10 | Phase 2 mechanism | ROS rescue + pathway data |
| 9–12 | Phase 3 durable phenotypes | Clonogenic/migration results |
| 12–14 | Analysis + report | Full study report + manuscript draft |

## 7. Execution without an in-house lab

1. **Academic collaboration** — urology/uro-oncology departments often run small in vitro studies via shared cores; co-authorship is the usual currency. Start with researchers who published the bladder ivermectin (2022/2024) or metformin-cisplatin (2015) work.
2. **Contract research organizations** — any CRO offering oncology in vitro services can run this as a written package (Pharmaron, Eurofins, WuXi AppTec, and equivalents). Phases 0–1 typically run 4–6 weeks. Request quotes against this document's Phase 0–2 spec; expect budget ranges in the low five figures (USD) depending on matrices and western-blot panels.
3. **Sourcing** — compounds are readily purchasable (ivermectin research grade; metformin USP); cell lines from ATCC/CLS.
4. **Minimal viable study** — if budget is tight: Phase 0 + Phase 1 in T24 and SV-HUC-1 only. That alone answers "is this pair synergistic and selective?"

## 8. Key caveats (read before interpreting results)

- **Metformin concentration problem:** in vitro metformin synergy requires millimolar concentrations, whereas therapeutic plasma levels are ~10–20 µM. Any positive result must be interpreted with tumor-accumulation arguments (metformin is concentrated in tissues via OCT transporters) or treated as mechanism-only evidence. This is the single biggest translation gap in the field.
- **Ivermectin protein binding:** in vivo free ivermectin levels are far below total plasma levels; keep serum percentage consistent (recommend 10% FBS) and report it.
- **DMSO:** keep ≤ 0.1% everywhere; include vehicle controls.
- **Myco/identity:** authenticate lines (STR) and test for mycoplasma before starting.
- **Not medical advice:** this protocol is for laboratory research only. Nothing here supports self-administration of any drug.

## 9. Deliverables

1. Raw data package (plate exports, flow .fcs files, uncropped blots).
2. Analysis notebook (Python) reproducing all figures and synergy calculations.
3. Study report in publication format; target journal: *Bladder Cancer* or *Investigational New Drugs*.
4. Go/no-go memo for a follow-up xenograft study (with IACUC protocol skeleton) if Phase 1–2 succeed.

---

*Prepared from the Oct 2026 evidence review and Monte Carlo simulation in this repository. Study design follows published standards for combination-index analysis (Chou-Talalay) and synergism reporting.*
