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

const EFFICACY_CATEGORIES = [
  "IVM alone",
  "ICI alone",
  "GC alone",
  "IVM + MET",
  "GC + IVM",
  "Docetaxel + IVM",
  "ICI + IVM",
  "GC + IVM + MET",
  "ICI + IVM + MET",
];

const PR_WK12 = [8.3, 15.8, 16.5, 21.5, 23.8, 25.5, 28.9, 31.0, 35.2];
const DURABLE_WK24 = [8.8, 16.4, 17.2, 22.4, 24.8, 26.4, 29.9, 32.3, 36.4];

const TRAJ_WEEKS = ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24"];

const TRAJ_IVM = [100, 101.0, 101.9, 102.9, 103.9, 104.9, 106.0, 106.8, 108.0, 109.1, 110.0, 111.2, 112.2];
const TRAJ_MET = [100, 98.0, 96.1, 94.1, 92.2, 90.3, 88.5, 86.6, 84.8, 83.1, 81.5, 79.8, 78.2];
const TRAJ_HCQ = [100, 97.5, 95.2, 92.9, 90.6, 88.4, 86.2, 84.1, 82.1, 80.2, 78.2, 76.3, 74.5];
const TRAJ_ICIIVM = [100, 96.9, 93.9, 90.9, 88.1, 85.3, 82.6, 80.0, 77.6, 75.1, 72.8, 70.6, 68.4];
const TRAJ_GCIVMMET = [100, 96.6, 93.2, 90.0, 86.9, 83.9, 81.0, 78.1, 75.4, 72.8, 70.2, 67.7, 65.4];
const TRAJ_ALL = [100, 96.1, 92.3, 88.6, 85.2, 81.8, 78.7, 75.7, 72.6, 69.8, 67.0, 64.4, 61.9];

function EfficacyChart() {
  return (
    <Stack gap={8}>
      <H2>Simulated efficacy at a glance</H2>
      <Text tone="secondary" size="small">
        Percent of 20,000 simulated patients per arm — partial response or
        better at week 12 (burden ≤ 70) vs durable control at week 24 (burden
        ≤ 50).
      </Text>
      <BarChart
        categories={EFFICACY_CATEGORIES}
        series={[
          { name: "PR or better at week 12 (%)", data: PR_WK12, tone: "info" },
          { name: "Durable control at week 24 (%)", data: DURABLE_WK24, tone: "success" },
        ]}
        height={280}
        valueSuffix="%"
      />
      <Text tone="tertiary" size="small">
        Source: holistic_sim.py Monte Carlo, Oct 2026 · illustrative model —
        mu values calibrated to published anchors, not observed trial arms.
      </Text>
    </Stack>
  );
}

function TrajectoryChart() {
  return (
    <Stack gap={8}>
      <H2>Simulated median tumor-burden trajectories</H2>
      <Text tone="secondary" size="small">
        Median burden index (baseline = 100), weeks 0–24. Untreated reference
        omitted for scale (it reaches 294 by week 24).
      </Text>
      <LineChart
        categories={TRAJ_WEEKS}
        series={[
          { name: "Ivermectin alone", data: TRAJ_IVM, tone: "neutral" },
          { name: "IVM + metformin", data: TRAJ_MET, tone: "info" },
          { name: "IVM + MET + HCQ", data: TRAJ_HCQ, tone: "warning" },
          { name: "ICI + IVM", data: TRAJ_ICIIVM, tone: "success" },
          { name: "GC + IVM + MET", data: TRAJ_GCIVMMET, tone: "success" },
          { name: "ICI + IVM + MET", data: TRAJ_ALL, tone: "success" },
        ]}
        height={280}
        showValues={false}
      />
      <Text tone="tertiary" size="small">
        Simulated medians from 20,000 patients per arm · every 2 weeks ·
        model output, not observed patient data.
      </Text>
    </Stack>
  );
}

function MethodCard() {
  return (
    <Card>
      <CardHeader>How the simulation works</CardHeader>
      <CardBody>
        <Stack gap={8}>
          <Text size="small">
            <Text weight="semibold" as="span">Model: </Text>
            each virtual patient draws a personal net weekly tumor log-growth
            rate (mean = arm efficacy, patient heterogeneity SD 0.025), then
            evolves weekly with noise (SD 0.012). Outcomes at week 12 follow
            RECIST-style thresholds on burden index: PR ≤ 70, SD ≤ 120, PD
            above. 20,000 patients per arm, 24-week horizon.
          </Text>
          <Text size="small">
            <Text weight="semibold" as="span">Anchors: </Text>
            arm efficacies were calibrated to published results — GC and ICI
            single-agent response rates in urothelial carcinoma, the 6/15
            complete regressions for ivermectin + anti-PD-1 (npj Breast Cancer
            2021), metformin's HR 0.66 in the 243-patient bladder cohort, the
            HSP27/docetaxel survival signal, and ivermectin's bladder xenograft
            activity. The untreated arm doubles ~every 15 weeks.
          </Text>
          <Text size="small">
            <Text weight="semibold" as="span">Composite score: </Text>
            0.45 × clinical benefit (PR+SD at wk12) + 0.35 × evidence/5 + 0.20
            × safety/5. This deliberately penalizes arms that only win on
            modeled efficacy while having thin evidence — the composite
            answers "what should actually be pursued", the efficacy chart
            answers "what would win if the model is right".
          </Text>
          <Text size="small">
            <Text weight="semibold" as="span">Limits: </Text>
            the mu anchors drive everything; no PK/toxicity dropout is modeled
            beyond the safety score; NMIBC scenario uses beta-distributed
            response rates around published trial results. Code is published
            in the repo (simulation/holistic_sim.py) — every number can be
            re-run and challenged.
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default function HolisticSimulation() {
  return (
    <Stack gap={20}>
      <Stack gap={8}>
        <H1>
          Holistic combination simulation — bladder cancer: which regimen
          performs best?
        </H1>
        <Text tone="secondary">
          A Monte Carlo simulation of 15 candidate regimens (11 systemic, 4
          non-muscle-invasive) across 20,000 virtual patients each, ranking
          ivermectin combinations by modeled efficacy, evidence strength, and
          safety together. Oct 2026 · illustrative research model — not
          medical advice.
        </Text>
      </Stack>

      <Callout tone="warning" title="Simulation, not evidence">
        These are model outputs built on published anchors, not observed trial
        results for the combinations themselves. No ivermectin combination has
        demonstrated tumor regression in humans. Use this to prioritize what
        deserves trials and discussion — not to set expectations for any
        individual.
      </Callout>

      <Grid columns={4} gap={16}>
        <Stat value="20,000" label="Simulated patients per arm" />
        <Stat value="15" label="Regimens modeled" />
        <Stat value="24 wks" label="Simulation horizon" />
        <Stat value="36%" label="Top modeled PR rate (ICI + IVM + metformin)" tone="success" />
      </Grid>

      <MethodCard />

      <EfficacyChart />

      <TrajectoryChart />

      <Stack gap={8}>
        <H2>Full systemic results (ranked by composite)</H2>
        <Table
          headers={[
            "Arm",
            "PR wk12",
            "SD wk12",
            "PD wk12",
            "Median wk12",
            "Median wk24",
            "Durable wk24",
            "Evidence",
            "Safety",
            "Composite",
          ]}
          rows={[
            ["ICI alone (standard)", "15.8%", "62.1%", "22.1%", "95.5", "91.1", "16.4%", "5.0", "3.0", "0.820"],
            ["ICI + ivermectin", "28.9%", "59.7%", "11.3%", "82.6", "68.4", "29.9%", "4.0", "3.5", "0.819"],
            ["GC chemo alone (standard)", "16.5%", "62.5%", "21.0%", "94.4", "89.0", "17.2%", "5.0", "2.5", "0.805"],
            ["IVM + metformin (oral)", "21.5%", "62.9%", "15.7%", "88.5", "78.2", "22.4%", "3.0", "4.5", "0.770"],
            ["Docetaxel + IVM (HSP27)", "25.5%", "61.2%", "13.3%", "85.6", "73.5", "26.4%", "3.0", "3.0", "0.720"],
            ["GC + ivermectin", "23.8%", "62.2%", "14.0%", "86.7", "75.3", "24.8%", "3.0", "3.0", "0.717"],
            ["GC + IVM + metformin", "31.0%", "59.3%", "9.7%", "81.0", "65.4", "32.3%", "3.0", "2.5", "0.716"],
            ["ICI + IVM + metformin", "35.2%", "57.0%", "7.9%", "78.7", "61.9", "36.4%", "2.5", "3.0", "0.709"],
            ["Ivermectin alone", "8.3%", "57.6%", "34.1%", "106.0", "112.2", "8.8%", "3.0", "5.0", "0.707"],
            ["IVM + MET + HCQ (oral)", "24.3%", "61.7%", "14.1%", "86.2", "74.5", "25.3%", "1.0", "3.0", "0.577"],
            ["Untreated reference", "0.2%", "11.6%", "88.2%", "171.5", "293.7", "0.2%", "—", "5.0", "0.253"],
          ]}
          rowTone={["info", "success", "info", "success", "neutral", "neutral", "success", "success", "warning", "warning", "neutral"]}
          columnAlign={["left", "right", "right", "right", "right", "right", "right", "right", "right", "right"]}
          striped
          stickyHeader
        />
      </Stack>

      <Stack gap={8}>
        <H2>NMIBC scenario — 6-month complete-response rate</H2>
        <Table
          headers={["Strategy", "Simulated 6-mo CR", "90% interval", "Evidence", "Safety", "Note"]}
          rows={[
            ["BCG alone (reference)", "58.0%", "45.0–70.5", "5.0", "4.5", "Historical standard for high-risk NMIBC"],
            ["BCG + curcumin (hypothesis)", "67.9%", "55.4–79.4", "2.0", "4.5", "Syngeneic bladder-tumor synergy (Cancer Res 2009): NF-κB↓, TRAIL↑"],
            ["BCG + systemic ICI", "73.1%", "61.3–83.8", "4.0", "2.5", "Real RCT data (HR 0.77 recurrence) but grade ≥3 AEs 25% vs 6%"],
            ["BCG + intravesical gemcitabine", "95.0%", "88.5–99.1", "3.5", "3.5", "Actual phase I/II result (NCT04179162): 95% CR at 6 months"],
          ]}
          rowTone={["neutral", "info", "warning", "success"]}
          striped
        />
        <Text tone="tertiary" size="small">
          Beta-distributed around published rates · illustrative, not observed
          data for untested combinations · intravesical ivermectin remains
          untested in any model (a research opportunity, not a recommendation).
        </Text>
      </Stack>

      <Divider />

      <Stack gap={8}>
        <H2>Best-effort verdict — what the simulation recommends</H2>
        <Card>
          <CardHeader>Ranked recommendations</CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Text size="small">
                <Text weight="semibold" as="span">
                  1. Best-supported combination: ivermectin + checkpoint
                  inhibitor.
                </Text>{" "}
                It ties standard-of-care ICI alone at the top of the composite
                (0.819 vs 0.820) while nearly doubling modeled durable control
                (29.9% vs 16.4%) and cutting progression risk in half (11.3% vs
                22.1%). In bladder cancer this attaches to pembrolizumab/
                atezolizumab — a real regimen. This is the combination most
                deserving of a clinical trial.
              </Text>
              <Text size="small">
                <Text weight="semibold" as="span">
                  2. Maximum modeled efficacy: ICI + ivermectin + metformin.
                </Text>{" "}
                Top of every efficacy measure (35.2% PR, 36.4% durable, 7.9%
                progression) but the composite drops it to 8th purely on
                evidence thinness. If a trial exists, this triple is the
                highest-upside design.
              </Text>
              <Text size="small">
                <Text weight="semibold" as="span">
                  3. Best oral pairing: ivermectin + metformin.
                </Text>{" "}
                Top composite among oral repurposed options (0.770), best
                safety score of any active arm (4.5), and the only pairing
                with bladder-specific human outcome data. The sensible
                "self-contained" choice if standard therapy is running.
              </Text>
              <Text size="small">
                <Text weight="semibold" as="span">
                  4. NMIBC: BCG + intravesical gemcitabine is the standout.
                </Text>{" "}
                95% simulated 6-month CR because it is an actual trial result
                (NCT04179162). BCG + curcumin is the best-researched oral
                adjunct hypothesis for this setting (bladder-specific synergy,
                excellent safety).
              </Text>
              <Text size="small">
                <Text weight="semibold" as="span">
                  5. Deprioritized: the HCQ triple and ivermectin alone.
                </Text>{" "}
                The triple's extra modeled benefit over ivermectin + metformin
                is small while its evidence score is the lowest of all (1.0);
                ivermectin alone never outperforms any pairing and is
                modeled to progress in 34% of patients.
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Stack>

      <Callout tone="info" title="How to challenge these numbers">
        The full simulation is open-source in this repo (simulation/
        holistic_sim.py). Change the mu anchors, the heterogeneity, or the
        composite weights and re-run — the honest conclusion survives most
        perturbations: ivermectin's value is as a combination partner, the
        checkpoint-inhibitor pairing has the strongest foundation, and
        metformin is the best-supported oral companion. All use belongs under
        a urologic oncology team, ideally within a clinical trial.
      </Callout>
    </Stack>
  );
}
