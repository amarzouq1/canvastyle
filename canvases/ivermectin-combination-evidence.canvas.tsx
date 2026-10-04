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
  Stack,
  Stat,
  Table,
  Text,
} from "cursor/canvas";

const MATURITY_CATEGORIES = [
  "Anti-PD-1 antibodies",
  "Metformin",
  "Docetaxel (HSP27)",
  "Gem/cis chemo",
  "HCQ",
  "Sulforaphane",
];

const MATURITY_SCORES = [5, 4, 3, 3, 2, 1];

function MaturityChart() {
  return (
    <Stack gap={8}>
      <H2>Evidence maturity by partner (bladder cancer)</H2>
      <Text tone="secondary" size="small">
        Composite score 0–5 (analyst-assigned): weight for bladder-specific
        data, tumor regression in animals, human outcome data, and independent
        replication.
      </Text>
      <BarChart
        categories={MATURITY_CATEGORIES}
        series={[{ name: "Evidence maturity (0–5)", data: MATURITY_SCORES }]}
        horizontal
        height={240}
        valueSuffix="/5"
        showValues
        yMax={5}
      />
      <Text tone="tertiary" size="small">
        Source: published studies 2015–2026 (PMC9515697, PMID 38375808, JCI
        2022, BMC Cancer 2026, Oncology Letters 2015, ClinicalTrials.gov) ·
        single-series composite, not a meta-analysis.
      </Text>
    </Stack>
  );
}

function BestBetCard() {
  return (
    <Card>
      <CardHeader>
        Best supported pairing: ivermectin + checkpoint blockade (standard of
        care in advanced bladder cancer)
      </CardHeader>
      <CardBody>
        <Stack gap={8}>
          <Text>
            <Text weight="semibold">Why this maps onto bladder cancer
            unusually well:</Text>{" "}
            pembrolizumab and atezolizumab are established therapies for
            advanced urothelial carcinoma — so the ivermectin combination with
            the strongest evidence anywhere (complete regressions in 6/15 mice,
            cures in metastatic models, p = 0.008 synergy, npj Breast Cancer
            2021) attaches directly to a real bladder-cancer regimen. The
            mechanism is immunogenic cell death + T-cell infiltration, with
            ivermectin converting "cold" tumors "hot".
          </Text>
          <Text>
            The Cedars-Sinai phase I/II (NCT05318469) is in breast cancer, but
            ivermectin + checkpoint blockade in bladder cancer is now the most
            rational clinical trial to run — and ivermectin's human safety at
            oncology doses (30–60 mg oral) is already being established there.
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

function BladderUniqueCard() {
  return (
    <Card>
      <CardHeader>Two opportunities unique to bladder cancer</CardHeader>
      <CardBody>
        <Stack gap={8}>
          <Text size="small">
            <Text weight="semibold" as="span">1. The HSP27–docetaxel link: </Text>
            ivermectin is an orally available HSP27 inhibitor (JCI 2022) and
            sensitized urothelial cancer cells to docetaxel. HSP27 blockade
            (apatorsen) + docetaxel showed a survival benefit in a randomized
            phase II trial of 200 patients with advanced urothelial carcinoma —
            a validated target-to-drug path in this exact disease. Ivermectin +
            docetaxel is a bladder-specific pairing with clinical-trial-grade
            rationale.
          </Text>
          <Text size="small">
            <Text weight="semibold" as="span">2. Intravesical delivery: </Text>
            for non-muscle-invasive bladder cancer, drugs are instilled
            directly into the bladder (the BCG model). Concentrating ivermectin
            at the tumor with minimal systemic exposure — and minimal CYP3A4
            interaction risk — is a delivery route no other cancer type offers.
            The urothelial-carcinoma researchers flagged this themselves.
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
        <H1>
          Ivermectin combination partners for bladder cancer — evidence
          ranking
        </H1>
        <Text tone="secondary">
          Which partner drug gets the best results with ivermectin in bladder
          (urothelial) cancer? Ranked from published data as of Oct 2026.
          Context: no ivermectin combination has demonstrated cancer regression
          in a completed human trial — but bladder cancer has more direct
          preclinical ivermectin data than most tumor types.
        </Text>
      </Stack>

      <Callout tone="info" title="Bottom line">
        Best-evidenced pairing:{" "}
        <Text weight="semibold" as="span">
          ivermectin + checkpoint inhibitor
        </Text>{" "}
        — the strongest ivermectin combo anywhere, attached to a bladder
        standard of care. Best oral pair:{" "}
        <Text weight="semibold" as="span">
          ivermectin + metformin
        </Text>
        , now with bladder-specific human outcome data on the metformin side
        (HR 0.66 for progression after cystectomy + gemcitabine/cisplatin).
        Bladder-specific dark horse:{" "}
        <Text weight="semibold" as="span">
          ivermectin + docetaxel
        </Text>{" "}
        via HSP27. Ivermectin alone remains the weakest option.
      </Callout>

      <Grid columns={3} gap={16}>
        <Stat value="2" label="Direct ivermectin bladder studies (cells + xenografts)" />
        <Stat value="1" label="Partner with human bladder outcome data (metformin)" tone="success" />
        <Stat value="0" label="Completed human ivermectin-efficacy RCTs" tone="warning" />
      </Grid>

      <BestBetCard />

      <MaturityChart />

      <Stack gap={8}>
        <H2>Head-to-head results (bladder cancer)</H2>
        <Table
          headers={["Partner", "Strongest result", "Bladder-specific evidence", "Human data", "Take"]}
          rows={[
            [
              "Anti-PD-1 (pembrolizumab, atezolizumab)",
              "Complete regressions 6/15 mice in breast model; cures in metastatic disease; immunity to rechallenge",
              "Checkpoint inhibitors are standard of care in advanced urothelial carcinoma — the combination theory transfers directly",
              "IVM + ICI phase I/II in TNBC (NCT05318469); ICI itself standard in bladder",
              "Best evidence — maps onto a real bladder regimen",
            ],
            [
              "Metformin",
              "HR 0.66 for progression and fewer grade ≥3 toxicities in 243 MIBC patients after cystectomy + GC; meta-analysis: RFS HR 0.56",
              "Metformin + cisplatin synergistic in T24/BIU-87 bladder cells and xenografts (AMPK/mTOR)",
              "243-patient outcome cohort (BMC Cancer 2026); ongoing trial NCT06215976 with GC chemo",
              "Best oral pair — rare human data for a repurposed drug in this disease",
            ],
            [
              "Docetaxel (via HSP27)",
              "Ivermectin, an oral HSP27 inhibitor, sensitized urothelial cells to docetaxel and delayed taxane-resistant tumors in mice",
              "HSP27 blockade + docetaxel improved survival in a randomized phase II trial of 200 advanced urothelial carcinoma patients",
              "Randomized bladder trial behind the target (apatorsen + docetaxel); IVM substitute untested",
              "Bladder-specific dark horse",
            ],
            [
              "Gemcitabine / cisplatin (standard chemo)",
              "Ivermectin reverses multidrug resistance in vivo; synergy with gemcitabine in pancreatic models",
              "GC is the standard bladder chemo backbone; metformin improves GC outcomes in bladder cohorts",
              "GC itself standard; IVM + GC untested",
              "Rational backbone to add onto",
            ],
            [
              "Chloroquine / hydroxychloroquine",
              "Synergistic suppression of hamster fibrosarcoma at human-equivalent doses (2026)",
              "None — no bladder-cancer data at all",
              "COVID RCT only (tolerable, no benefit)",
              "Mid-tier, weakest in bladder specifically",
            ],
            [
              "Sulforaphane",
              "Antagonistic: restored P-gp and blunted ivermectin's chemosensitization",
              "None in bladder",
              "None",
              "Avoid this pairing",
            ],
          ]}
          rowTone={["success", "success", "info", "info", "warning", "danger"]}
          columnAlign={["left", "left", "left", "left", "left"]}
          striped
          stickyHeader
        />
      </Stack>

      <BladderUniqueCard />

      <Divider />

      <Stack gap={8}>
        <H2>Why ivermectin alone is not the answer in bladder cancer either</H2>
        <Text>
          Ivermectin has genuine single-agent bladder activity — G1 arrest and
          JNK-mediated caspase apoptosis in T24/RT4 urothelial cells (2022),
          and growth inhibition in bladder xenografts via ROS/DNA damage/ATM-p53
          (2024). But every model that tested combinations found them
          superior: metformin improves on chemo alone, HSP27 blockade improves
          on docetaxel alone, and ivermectin's own resistance-reversal logic
          only matters alongside another drug. Monotherapy remains the weakest
          tier.
        </Text>
      </Stack>

      <Callout tone="warning" title="Safety — do not self-medicate">
        Ivermectin is a CYP3A4/P-gp substrate (severe neurotoxicity reported
        with regorafenib); HCQ carries QT-prolongation risk (worse with
        azithromycin), CYP2D6/3A4 interactions, and retinal toxicity;
        metformin carries GI, B12-depletion and (rare) lactic-acidosis risk —
        note cisplatin itself damages kidneys, which raises metformin risk and
        is exactly why NCT06215976 monitors renal function closely. Oncology
        doses in trials (30–60 mg ivermectin) far exceed antiparasitic dosing.
        Any use belongs under an oncologist, ideally within a clinical trial.
      </Callout>

      <Stack gap={6}>
        <H2>Key sources</H2>
        <Text size="small" tone="secondary">
          [Ivermectin induces cell cycle arrest and apoptosis in urothelial
          carcinoma
          cells](https://pmc.ncbi.nlm.nih.gov/articles/PMC9515697/) (2022) ·
          [Ivermectin inhibits bladder cancer cell growth, oxidative stress and
          DNA damage](https://pubmed.ncbi.nlm.nih.gov/38375808/) (2024) ·
          [Ivermectin inhibits HSP27 and potentiates oncogene
          targeting](https://doi.org/10.1172/jci130819) (JCI, 2022) · [Metformin
          prognosis after cystectomy + GC in bladder
          cancer](https://link.springer.com/article/10.1186/s12885-026-15806-9)
          (BMC Cancer, 2026) · [Metformin + cisplatin in bladder cancer
          cells](https://www.spandidos-publications.com/10.3892/ol.2015.3267?text=fulltext)
          (Oncology Letters, 2015) · [Metformin meta-analysis in bladder
          cancer](https://pubmed.ncbi.nlm.nih.gov/35462910/) (2022) ·
          [NCT06215976](https://clinicaltrials.gov/study/NCT06215976) (metformin
          + GC trial) · Draganov et al., [Ivermectin synergizes with checkpoint
          blockade](https://www.nature.com/articles/s41523-021-00229-5) (npj
          Breast Cancer, 2021).
        </Text>
      </Stack>
    </Stack>
  );
}
