import {
  BarChart,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  Row,
  Spacer,
  Stack,
  Stat,
  Table,
  Text,
} from "cursor/canvas";

const MATURITY_CATEGORIES = [
  "Anti-PD-1 antibodies",
  "Chemo (doxo/VCR/gem)",
  "Metformin",
  "Chloroquine / HCQ",
  "rMETase",
  "Mebendazole",
  "Sulforaphane",
];

const MATURITY_SCORES = [5, 4, 3, 3, 2, 2, 1];

function MaturityChart() {
  return (
    <Stack gap={8}>
      <H2>Evidence maturity by partner</H2>
      <Text tone="secondary" size="small">
        Composite score 0–5 (analyst-assigned): weight for tumor regression in
        animals, quality of models, human data, and independent replication.
      </Text>
      <BarChart
        categories={MATURITY_CATEGORIES}
        series={[{ name: "Evidence maturity (0–5)", data: MATURITY_SCORES }]}
        horizontal
        height={260}
        valueSuffix="/5"
        showValues
        yMax={5}
      />
      <Text tone="tertiary" size="small">
        Source: published studies 2019–2026 (npj Breast Cancer, J Exp Clin
        Cancer Res, Pharmaceuticals, Frontiers Oncol, Oncology Reports,
        ClinicalTrials.gov) · single-series composite, not a meta-analysis.
      </Text>
    </Stack>
  );
}

function BestBetCard() {
  return (
    <Card>
      <CardHeader>Best supported pairing: ivermectin + checkpoint blockade</CardHeader>
      <CardBody>
        <Stack gap={8}>
          <Text>
            <Text weight="semibold">Strongest result in the entire dataset:</Text>{" "}
            in the 4T1 breast cancer model, ivermectin + anti-PD-1 produced
            complete tumor regression in 6/15 mice (vs 1/20 for ivermectin alone,
            1/10 for anti-PD-1 alone, 0/25 untreated), with statistical
            synergy (p = 0.008), cures in the metastatic setting (p &lt; 0.001),
            and protective immunity against tumor rechallenge. Ivermectin
            converts immunologically "cold" tumors "hot" (immunogenic cell
            death, T-cell infiltration, Treg suppression).
          </Text>
          <Text>
            This is the only ivermectin combination now in human cancer
            trials: a Cedars-Sinai phase I/II of ivermectin (30–60 mg oral) +
            balstilimab/pembrolizumab in metastatic triple-negative breast
            cancer (NCT05318469), with the broader ICONIC trial
            (NCT07487805) planned. No efficacy results reported yet.
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default function IvermectinCombinationEvidence() {
  return (
    <Stack gap={20}>
      <Stack gap={8}>
        <H1>Ivermectin combination partners for cancer — evidence ranking</H1>
        <Text tone="secondary">
          Which partner drug gets the best results with ivermectin? Ranked from
          published combination data as of Oct 2026. Context: no combination
          has demonstrated cancer regression in a completed human trial.
        </Text>
      </Stack>

      <Callout tone="info" title="Bottom line">
        The best-evidenced partner is not hydroxychloroquine — it is{" "}
        <Text weight="semibold" as="span">
          immune checkpoint inhibitors (anti-PD-1)
        </Text>
        , the only pairing with complete regressions in animals and an active
        human trial. Ivermectin + metformin and ivermectin + standard chemo are
        the strongest purely preclinical alternatives. Ivermectin + HCQ is
        mechanistically sound but mid-tier; ivermectin + sulforaphane should be
        avoided.
      </Callout>

      <Grid columns={3} gap={16}>
        <Stat value="7" label="Partners compared" />
        <Stat value="1" label="Combinations in human cancer trials" tone="success" />
        <Stat value="0" label="Completed human efficacy RCTs" tone="warning" />
      </Grid>

      <BestBetCard />

      <MaturityChart />

      <Stack gap={8}>
        <H2>Head-to-head results</H2>
        <Table
          headers={["Partner", "Strongest published result", "Model / evidence", "Human data", "Take"]}
          rows={[
            [
              "Anti-PD-1 (pembrolizumab, balstilimab)",
              "Complete regressions 6/15 mice; cures in metastatic model; immunity to rechallenge",
              "Mouse 4T1 breast (npj Breast Cancer 2021); replicated mechanism",
              "Phase I/II mTNBC recruiting (NCT05318469)",
              "Best evidence — in trials now",
            ],
            [
              "Chemotherapy (doxorubicin, vincristine, gemcitabine, paclitaxel)",
              "Reversed multidrug resistance in vivo; tumor regression in xenografts; 63% tumor reduction with docetaxel/cyclophosphamide/tamoxifen",
              "Cells + mouse xenografts (2019–2024); many independent labs",
              "None as a tested combo",
              "Strong, rational add-on to standard chemo",
            ],
            [
              "Metformin",
              "Synergy via PI3K/AKT/mTOR inhibition + ROS/autophagy; significant tumor inhibition in breast xenografts",
              "Cells + canine/human xenografts (2025–26)",
              "None as a combo",
              "Promising, cheap, both drugs well-tolerated",
            ],
            [
              "Chloroquine / hydroxychloroquine",
              "Synergistic, dose-dependent suppression of hamster fibrosarcoma at human-equivalent doses; blocked by deoxycholic acid (NF-κB)",
              "Hamster tumors + human cell lines (2026, single lab); HCQ+IVM nanoparticles in CRC",
              "COVID RCT only (tolerable, no benefit)",
              "Mechanistically sound 'autophagy trap' — mid-tier",
            ],
            [
              "Recombinant methioninase (rMETase)",
              "Beat 5-FU, cisplatin, gemcitabine, paclitaxel combos in colon cells (CI 6.7); only doxorubicin slightly better",
              "In vitro only (2026)",
              "None",
              "Interesting, very early",
            ],
            [
              "Mebendazole",
              "Observational cohort: 84% 'clinical benefit', ~48% self-reported regression/NED",
              "Observational, self-reported (Zenodo preprint); mebendazole alone failed phase 2a in GI cancer",
              "Phase 2a single-agent: no benefit, rapid progression",
              "Weakest real signal — heavy bias likely",
            ],
            [
              "Sulforaphane",
              "Antagonistic: restored P-gp expression and blunted ivermectin's chemosensitization",
              "Cells (J Exp Clin Cancer Res 2019)",
              "None",
              "Avoid this pairing",
            ],
          ]}
          rowTone={["success", "info", "info", "warning", "neutral", "warning", "danger"]}
          columnAlign={["left", "left", "left", "left", "left"]}
          striped
          stickyHeader
        />
      </Stack>

      <Divider />

      <Stack gap={8}>
        <H2>Why HCQ is not the winner</H2>
        <Text>
          Ivermectin + hydroxychloroquine has a genuinely coherent mechanism —
          ivermectin induces autophagic flux while HCQ blocks autophagosome
          degradation, trapping cancer cells in a cytostatic state — and one
          2026 hamster study showed synergy without toxicity. But it has never
          been tested in humans for cancer, the key study comes from a single
          small lab (6 hamsters per arm), and in the one human head-to-head
          (COVID, Nigeria) adding HCQ to ivermectin gave zero extra benefit and
          caused withdrawals for reactions. It is a reasonable second-tier
          research candidate, not a proven therapy.
        </Text>
      </Stack>

      <Callout tone="warning" title="Safety — do not self-medicate">
        Ivermectin is a CYP3A4/P-gp substrate (severe neurotoxicity reported
        with regorafenib); HCQ carries QT-prolongation risk (worse with
        azithromycin), CYP2D6/3A4 interactions, and retinopathy with prolonged
        use. Oncology doses in trials (30–60 mg ivermectin) far exceed
        antiparasitic dosing. Any use belongs under an oncologist, ideally
        within a clinical trial.
      </Callout>

      <Stack gap={6}>
        <H2>Key sources</H2>
        <Text size="small" tone="secondary">
          Draganov et al., [Ivermectin converts cold tumors hot and synergizes
          with checkpoint blockade](https://www.nature.com/articles/s41523-021-00229-5)
          (npj Breast Cancer, 2021) · Jiang et al., [Ivermectin reverses drug
          resistance via EGFR/ERK/Akt/NF-κB](https://link.springer.com/article/10.1186/s13046-019-1251-7)
          (J Exp Clin Cancer Res, 2019) · Popović et al., [Chloroquine +
          ivermectin synergy in hamster
          fibrosarcoma](https://www.mdpi.com/1424-8247/19/3/407)
          (Pharmaceuticals, 2026) · [Ivermectin + gemcitabine in pancreatic
          cancer](https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2022.934746/full)
          (2022) · [Ivermectin + metformin in canine breast
          cancer](https://www.mdpi.com/1467-3045/47/6/403) (Curr Issues Mol
          Biol, 2025) · [IVM vs chemo drugs + rMETase in colon
          cancer](https://www.frontiersin.org/journals/oncology/articles/10.3389/fonc.2026.1807785/full)
          (Front Oncol, 2026) · [NCT05318469](https://clinicaltrials.gov/study/NCT05318469)
          and [NCT07487805](https://clinicaltrials.gov/ct2/show/NCT07487805) ·
          [HCQ + carboplatin/gemcitabine phase
          I](https://www.frontiersin.org/journals/oncology/articles/10.3389/fonc.2022.811411/full).
        </Text>
      </Stack>
    </Stack>
  );
}
