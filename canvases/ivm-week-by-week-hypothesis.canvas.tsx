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
  LineChart,
  Stack,
  Stat,
  Table,
  Text,
} from "cursor/canvas";

/**
 * Hypothetical tumor-burden trajectories (index, baseline = 100) over 12
 * weeks. ILLUSTRATIVE model curves built from preclinical effect sizes —
 * NOT observed patient data.
 */
const WEEKS = ["0", "2", "4", "6", "8", "10", "12"];

const BURDEN_IVM = [100, 101, 103, 105, 107, 110, 113];
const BURDEN_IVM_MET = [100, 99, 97, 94, 91, 89, 87];
const BURDEN_IVM_HCQ = [100, 100, 100, 99, 98, 98, 97];
const BURDEN_ALL = [100, 98, 95, 90, 85, 81, 77];

function HypotheticalCurves() {
  return (
    <Stack gap={8}>
      <H2>Hypothetical tumor-burden trajectory (illustrative model)</H2>
      <Text tone="secondary" size="small">
        Tumor burden index, baseline = 100. A hypothesis scaled from
        preclinical effect sizes — not observed data and not a forecast for any
        individual. Ivermectin alone shown as a muted reference.
      </Text>
      <LineChart
        categories={WEEKS}
        series={[
          { name: "Ivermectin alone (reference)", data: BURDEN_IVM, tone: "neutral" },
          { name: "Ivermectin + HCQ", data: BURDEN_IVM_HCQ, tone: "info" },
          { name: "Ivermectin + metformin", data: BURDEN_IVM_MET, tone: "success" },
          { name: "All combined (IVM + MET + HCQ)", data: BURDEN_ALL, tone: "warning" },
        ]}
        height={280}
        fill
        showValues={false}
      />
      <Text tone="tertiary" size="small">
        Hypothetical model, Oct 2026 · derived from preclinical effect sizes
        (Oncology Reports 2026 and canine breast xenografts 2025 for
        metformin; Popović 2026 hamster fibrosarcoma for HCQ) · the
        triple-stack curve assumes the pair mechanisms stack with diminishing
        returns — the least evidenced line in the chart.
      </Text>
    </Stack>
  );
}

function WeekByWeekTable() {
  return (
    <Stack gap={8}>
      <H2>Week-by-week hypothesis</H2>
      <Table
        headers={[
          "Window",
          "Ivermectin + metformin",
          "Ivermectin + HCQ",
          "All combined (IVM + MET + HCQ)",
          "What is measurable",
        ]}
        rows={[
          [
            "Weeks 1–2",
            "PI3K/AKT/mTOR suppression begins, ROS accumulates; glucose/insulin drop immediately",
            "Ivermectin induces autophagic flux while HCQ blocks degradation — 'autophagy trap' loads up",
            "All three pressures at once: ROS + mTOR suppression + maximal autophagic stress. Baseline ECG required (HCQ)",
            "Nothing on imaging. Tolerability labs, fasting glucose/insulin, ECG",
          ],
          [
            "Weeks 3–4",
            "Metabolic + oxidative damage; proliferation slowing — in bladder cohorts, metformin users after cystectomy + GC had 37% lower progression risk (HR 0.66)",
            "Undegraded autophagic material accumulates; cytostatic pressure builds",
            "Hypothesis: deepest pressure of any oral arm — earliest plausible ctDNA dip",
            "ctDNA / tumor-marker trend; glucose improves regardless — not a tumor response signal",
          ],
          [
            "Weeks 5–8",
            "Strongest divergence window — slowed growth or minor shrinkage hypothesized",
            "Growth stabilization at best; hamster model showed suppression, not regressions",
            "Hypothesis: continued decline in burden index; also when stacking side effects (GI, fatigue) most likely",
            "ctDNA trend informative; imaging still borderline (RECIST needs ≥30% shrinkage)",
          ],
          [
            "Weeks 9–12",
            "Best case: minor/partial responses in ~15–25% (hypothesis), stable disease common",
            "Best case: stable disease (~45% hypothesis); partial responses uncommon",
            "Best case: highest hypothesized response share (~25%), but the gain over IVM + MET is the least certain part of the model",
            "First RECIST CT/MRI — the first honest go/no-go checkpoint",
          ],
          [
            "Weeks 13–24",
            "Monitor B12, renal function, GI tolerance",
            "Monitor QT (ECG) and retinal (ophthalmology) risk",
            "Monitor everything: renal (MET), QT (HCQ), neuro/GI (IVM), B12 — cumulative burden is the trade-off",
            "Serial imaging q8–12 weeks per standard oncology practice",
          ],
        ]}
        rowTone={["success", "info", "warning", "neutral", "neutral"]}
        striped
        stickyHeader
      />
    </Stack>
  );
}

function StackCard() {
  return (
    <Card>
      <CardHeader>All-oral stack: ivermectin + metformin + HCQ</CardHeader>
      <CardBody>
        <Stack gap={8}>
          <Text size="small">
            <Text weight="semibold" as="span">Synergy logic: </Text>
            ivermectin (PAK1/P-gp/Wnt inhibition, autophagy flux ↑), metformin
            (AMPK ↑, PI3K/AKT/mTOR ↓, ROS ↑, flux ↑), and HCQ (lysosomal
            degradation blocked). Two drugs push the tumor's autophagy into
            overdrive while the third jams the exit — the deepest version of
            the "autophagy trap" — plus a separate ROS/metabolic kill pathway.
          </Text>
          <Text size="small">
            <Text weight="semibold" as="span">Hypothesized gain: </Text>
            modestly better than ivermectin + metformin alone, mainly from
            adding cytostatic control. Diminishing returns are expected: HCQ
            added little in the one human head-to-head it ever appeared in
            (COVID, Nigeria).
          </Text>
          <Text size="small">
            <Text weight="semibold" as="span">Evidence level: </Text>
            none. The triple has never been studied in any model — this arm is
            extrapolated purely from pair data. It is the least evidenced line
            in the chart despite being modeled as the strongest.
          </Text>
          <Text size="small">
            <Text weight="semibold" as="span">Safety cost: </Text>
            three-way risk stacking — CYP3A4/P-gp interactions and neurotoxicity
            (ivermectin), QT prolongation and retinal toxicity (HCQ), lactic
            acidosis, B12 depletion and GI effects (metformin). Drug–drug
            interaction review is mandatory before even considering this.
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

function AssumptionsCard() {
  return (
    <Card>
      <CardHeader>Assumptions behind this hypothesis</CardHeader>
      <CardBody>
        <Stack gap={8}>
          <Text size="small">
            <Text weight="semibold" as="span">Dosing basis: </Text>
            ivermectin 30–60 mg oral, 3 days/week (NCT05318469 schedule);
            metformin 500 mg twice daily to 1500 mg/day (common oncology-
            repurposing range); HCQ 200–400 mg daily (autophagy-trial range).
          </Text>
          <Text size="small">
            <Text weight="semibold" as="span">Mechanistic contrast: </Text>
            metformin adds ROS generation and dual PI3K/AKT/mTOR suppression
            on top of ivermectin's PAK1/P-gp/Wnt effects — additive killing.
            HCQ instead traps ivermectin-induced autophagy upstream —
            cytostatic. The triple arm models both together with diminishing
            returns rather than simple addition.
          </Text>
          <Text size="small">
            <Text weight="semibold" as="span">Timeline scaling: </Text>
            in vitro metformin synergy appeared within 24–72h; canine
            xenografts showed inhibition over weeks. Human divergence is
            assumed at weeks 3–5 — this scaling is the softest part of the
            model.
          </Text>
          <Text size="small">
            <Text weight="semibold" as="span">Evidence weights: </Text>
            the metformin arm leans on two 2025–26 lab studies plus bladder
            human data (243-patient MIBC cohort, HR 0.66; meta-analysis RFS
            HR 0.56); the HCQ arm on one 2026 hamster study (6 animals per
            arm) with no bladder data at all; the triple arm on no direct
            data. None has human efficacy data for ivermectin in bladder
            cancer — this is a thought experiment, not a clinical expectation.
          </Text>
          <Text size="small">
            <Text weight="semibold" as="span">Not modeled: </Text>
            standard bladder regimens running alongside (gemcitabine/cisplatin,
            BCG, checkpoint inhibitors), intravesical delivery of ivermectin
            (a bladder-specific route worth modeling separately),
            patient-specific biology, drug interactions, and
            toxicity-driven discontinuation.
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default function WeekByWeekHypothesis() {
  return (
    <Stack gap={20}>
      <Stack gap={8}>
        <H1>
          Bladder cancer — week-by-week hypothesis: ivermectin + metformin vs
          + HCQ vs all combined
        </H1>
        <Text tone="secondary">
          A structured hypothesis of what improvement could look like over 12
          weeks in bladder (urothelial) cancer on the oral pairings with
          ivermectin and the full three-drug stack, with ivermectin alone as a
          reference. Anchored to bladder-specific data where it exists
          (ivermectin urothelial-cell and xenograft studies 2022/2024;
          metformin outcomes in 243 MIBC patients after cystectomy +
          gemcitabine/cisplatin). Illustrative — not medical advice or a
          prediction of results for any person.
        </Text>
      </Stack>

      <Callout tone="warning" title="This is a hypothesis, not evidence">
        No human data shows ivermectin — alone or combined — shrinking tumors,
        and the three-drug stack has never been tested in any model. The
        trajectories below are thought experiments built from preclinical
        effect sizes so expectations can be tracked week by week. Reality for
        any individual can differ completely in either direction.
      </Callout>

      <Grid columns={4} gap={16}>
        <Stat value="3–5 wks" label="Hypothesized arm divergence" />
        <Stat value="9–12 wks" label="First honest scan checkpoint" />
        <Stat value="~25%" label="Best-case response hypothesis (all combined)" tone="success" />
        <Stat value="Week 2" label="Earliest biomarker signal (ctDNA)" />
      </Grid>

      <HypotheticalCurves />

      <WeekByWeekTable />

      <Divider />

      <StackCard />

      <Divider />

      <Stack gap={8}>
        <H2>Expected result profile at week 12 (hypothesis)</H2>
        <BarChart
          categories={["IVM + metformin", "IVM + HCQ", "All three combined"]}
          series={[
            {
              name: "Partial response or better (%)",
              data: [20, 10, 25],
              tone: "success",
            },
            { name: "Stable disease (%)", data: [45, 45, 45], tone: "info" },
            { name: "Progression (%)", data: [35, 45, 30], tone: "danger" },
          ]}
          stacked
          normalized
          height={240}
        />
        <Text tone="tertiary" size="small">
          Hypothetical outcome split at first RECIST assessment (week 9–12) ·
          anchored loosely to NCT05318469's "promising" bar (~3 responders in
          25 patients) · illustrative, not observed data.
        </Text>
      </Stack>

      <AssumptionsCard />

      <Callout tone="info" title="How to use this">
        Treat week 2–4 ctDNA trends and week 12 imaging as go/no-go signals:
        a falling marker followed by stable or shrinking scans supports
        continuing; clear progression at week 12 argues for stopping and
        returning to standard options. The more drugs in the stack, the more
        the safety monitoring matters: renal function and B12 (metformin —
        especially relevant with cisplatin, which is itself nephrotoxic), ECG
        and ophthalmology (HCQ), neuro/GI effects and CYP3A4/P-gp interaction
        review (ivermectin). All of this should run through the treating
        oncologist. For bladder cancer specifically, the best-evidenced
        combination is ivermectin + checkpoint blockade (a real bladder
        standard of care), and intravesical delivery is a research route worth
        discussing with the urology team.
      </Callout>
    </Stack>
  );
}
