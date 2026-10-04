import {
  Stack,
  H1,
  H2,
  H3,
  Text,
  Callout,
  Table,
  Row,
  Stat,
  Card,
  CardHeader,
  CardBody,
  BarChart,
  Divider,
} from "cursor/canvas";

export default function IvermectinMdrFactCheck() {
  return (
    <Stack gap={20}>
      <Stack gap={8}>
        <H1>Fact check: does ivermectin reverse multidrug resistance in cancer models?</H1>
        <Text tone="secondary">
          Claim under review: <Text italic>"Ivermectin has been shown to reverse multidrug
          resistance in laboratory and animal cancer models."</Text> Evidence surveyed:
          8 primary studies, 1997&ndash;2025, plus all registered human trials as of Oct 2026.
        </Text>
      </Stack>

      <Callout tone="success" title="Verdict — accurate as stated, and carefully scoped">
        Peer-reviewed studies do show ivermectin restoring chemotherapy sensitivity in
        resistant cancer cell lines and in mouse xenografts, including by suppressing the
        P-glycoprotein drug pump. The claim says "laboratory and animal models" — that
        boundary is exactly where the evidence stops. Nothing here shows ivermectin
        reversing drug resistance in human patients, or treating cancer on its own.
      </Callout>

      <Row gap={24}>
        <Stat value="5" label="Rodent experiments showing reversal or chemosensitization" tone="success" />
        <Stat value="0" label="Human trials showing chemo-resistance reversal" tone="danger" />
        <Stat value="~2.5 mo" label="Median PFS in the only reported ivermectin cancer cohort" tone="warning" />
      </Row>

      <Divider />

      <Stack gap={8}>
        <H2>What the evidence actually shows</H2>
        <Text>
          Two distinct effects get bundled under "reverses multidrug resistance."
          First, ivermectin interacts with ABC drug-efflux transporters: it binds
          P-glycoprotein directly (Kd ~10.6 nM in the 1997 study), inhibits its ATPase
          activity, and at higher concentrations also inhibits ABCG2/BCRP and MRP1.
          Second — and this is the 2019 mechanism — at low, non-cytotoxic doses ivermectin
          binds the extracellular domain of EGFR, quiets the ERK/Akt/NF-&kappa;B cascade,
          and reduces <Text italic>ABCB1</Text> transcription, so cells display less P-gp
          on the surface and retain more chemotherapy inside.
        </Text>
        <Text>
          Importantly, MDR reversal means <Text italic>chemosensitization</Text> — the
          partner drug works better. It is not evidence that ivermectin shrinks tumors by
          itself, and "reverses resistance in a dish or a mouse" is a different claim from
          "reverses resistance in a patient's refractory tumor."
        </Text>
      </Stack>

      <Stack gap={8}>
        <H2>Key preclinical studies</H2>
        <Table
          headers={["Study", "Cancer model", "Key finding", "Level"]}
          rows={[
            [
              "Pouliot et al. 1997 · Biochem Pharmacol",
              "Highly drug-resistant human tumor cell line",
              "Ivermectin reversed P-gp-mediated MDR; 4x more potent than cyclosporin A, 9x than verapamil; binds P-gp directly",
              "In vitro",
            ],
            [
              "Wang et al. 2019 · J Exp Clin Cancer Res",
              "Resistant HCT-8 colorectal, MCF-7 breast, K562 CML; nude-mouse and NOD/SCID xenografts",
              "Non-cytotoxic doses restored vincristine/adriamycin sensitivity in vitro and in vivo (2 mg/kg/day, 27 days); EGFR to NF-&kappa;B to P-gp downregulation",
              "In vitro + in vivo",
            ],
            [
              "Anticancer Research 2024 · 44(12)",
              "A549 lung cancer made paclitaxel-resistant over 16 weeks",
              "Concurrent ivermectin abolished P-gp upregulation and kept paclitaxel sensitivity (IC50 0.013 vs 0.331 &micro;M)",
              "In vitro",
            ],
            [
              "Dom&iacute;nguez-G&oacute;mez et al. 2020 · Invest New Drugs",
              "28 cancer cell lines at 5 &micro;M; mouse xenografts",
              "Synergy with docetaxel, cyclophosphamide, tamoxifen; preferentially hit cancer stem-like cells; reduced tumor size and weight in mice",
              "In vitro + in vivo",
            ],
            [
              "Hu et al. 2022 · Hum Exp Toxicol",
              "Osteosarcoma HOS-143B xenografts (SCID mice)",
              "Ivermectin 0.5 mg/kg + doxorubicin arrested growth (tumor ~1/3 of control at week 8); either drug alone failed; ROS/mitochondrial mechanism",
              "In vivo",
            ],
            [
              "KPNB1 study · ovarian cancer",
              "SKOV3 xenografts (NSG mice)",
              "Ivermectin 1 mg/kg + paclitaxel 15 mg/kg, 5 days/week for 40 days, nearly suppressed tumor growth vs paclitaxel alone",
              "In vivo",
            ],
            [
              "Pharmaceuticals 2025 · 18(1):14",
              "OVCAR8 and paclitaxel-resistant OVCAR8, 3D cultures",
              "Paclitaxel + ivermectin consistently additive across all four synergy reference models",
              "In vitro",
            ],
            [
              "Ivermectin as BCRP/ABCG2 inhibitor · 2023",
              "Transporter-overexpressing cell assays",
              "Pan-ABC inhibitor: ABCG2 IC50 ~23 &micro;M; full P-gp and MRP1 block at 100 &micro;M",
              "In vitro",
            ],
          ]}
          columnAlign={["left", "left", "left", "center"]}
          striped
        />
        <Text size="small" tone="tertiary">
          Doses shown are mouse doses (mg/kg). The 2019 xenograft used intraperitoneal
          ivermectin at 2 mg/kg/day — roughly 5&ndash;10x the exposure of a standard oral
          antiparasitic dose.
        </Text>
      </Stack>

      <Stack gap={8}>
        <H2>The concentration gap</H2>
        <BarChart
          horizontal
          height={230}
          categories={[
            "Plasma, standard dosing (0.2 mg/kg)",
            "Plasma, phase-I 2 mg/kg",
            "In-vitro antiproliferative threshold",
            "ABCG2/BCRP inhibition (IC50)",
            "Full P-gp/MRP1 block (in vitro)",
          ]}
          series={[
            {
              name: "Ivermectin concentration",
              data: [1.65, 5, 5, 23.4, 100],
              tone: "info",
            },
          ]}
          valueSuffix=" &micro;M"
          showValues
          referenceLines={[
            { value: 5, label: "5 &micro;M — low end of anticancer in-vitro range", tone: "warning" },
          ]}
        />
        <Text size="small" tone="tertiary">
          Concentrations in &micro;M. Mean plasma levels from oral pharmacokinetics
          (~93% protein-bound); tumor-tissue exposure in humans has never been measured.
          Sources: Ju&aacute;rez et al. 2018 review; Dom&iacute;nguez-G&oacute;mez et al.
          2020; ivermectin&ndash;BCRP study 2023. Bar chart values are single reported
          figures, not pooled estimates.
        </Text>
        <Text>
          The caveat that favors the claim: transporter-based chemosensitization works at
          lower, non-cytotoxic concentrations than tumor-cell killing does, so the gap
          bites less for MDR reversal than for antiproliferative effects. It still bites —
          the mouse studies used doses above approved human dosing.
        </Text>
      </Stack>

      <Stack gap={8}>
        <H2>Where the claim stops</H2>
        <Callout tone="warning" title="What has not been shown">
          <Text>
            No human trial has demonstrated that ivermectin reverses chemotherapy
            resistance in patients. The published human data is one small ongoing
            immunotherapy combination (below), which is not a resistance-reversal study at
            all.
          </Text>
          <Text>
            The evidence base is thin and partly single-lab: each mechanism tends to rest
            on one research group's cell lines, xenografts are immunodeficient mice with
            n=6 per group, and no independent multi-site replication of the 2019 in vivo
            result exists.
          </Text>
          <Text>
            "Reverses multidrug resistance" also slides easily into "cures cancer" in
            public retellings — see the corpus example below. The studies say neither.
          </Text>
        </Callout>
      </Stack>

      <Stack gap={8}>
        <H2>Human evidence so far</H2>
        <Table
          headers={["Study", "Design", "Where it stands"]}
          rows={[
            [
              "NCT05318469 · metastatic triple-negative breast cancer",
              "Phase I/II: ivermectin 30–60 mg oral + balstilimab or pembrolizumab",
              "9 patients enrolled: 1 partial response, 1 stable disease, 6 progressed; median PFS 2.5 months; still accruing",
            ],
            [
              "NCT07487805 · ICONIC",
              "Phase I: ivermectin 200–400 µg/kg weekly alongside standard checkpoint-inhibitor therapy",
              "Recruiting; safety and immune-pharmacodynamic endpoints only — explicitly motivated by off-label use outpacing evidence",
            ],
            [
              "Off-label use survey · Loja, Ecuador 2023",
              "Cross-sectional patient survey",
              "19% reported using ivermectin as a cancer-treatment adjunct — an exposure statistic, not an outcome",
            ],
            [
              "Case report · regorafenib + ivermectin",
              "Single metastatic osteosarcoma patient",
              "Severe neurotoxicity, attributed to a CYP3A4 pharmacokinetic interaction",
            ],
          ]}
          columnAlign={["left", "left", "left"]}
          striped
        />
      </Stack>

      <Stack gap={8}>
        <H2>The class problem: MDR-reversal drugs keep failing</H2>
        <Text>
          Ivermectin is not the first promising P-gp modulator. Three generations of
          dedicated reversal agents — verapamil, cyclosporine/PSC-833, tariquidar — showed
          textbook reversal in cell lines and mice, then failed in randomized oncology
          trials on pharmacokinetic interference with chemotherapy and toxicity. The 2019
          paper's own introduction concedes this history. Ivermectin's advantages are real
          (decades of human safety data, oral dosing, low cost) but it shares the class
          liabilities: it is itself a P-gp and CYP3A4 substrate, so combination dosing can
          alter both its own and the chemotherapy's exposure — the regorafenib case is a
          live example.
        </Text>
      </Stack>

      <Card>
        <CardHeader>How this claim travels — from your corpus</CardHeader>
        <CardBody>
          <Text italic>
            "Ivermectin can also inhibit tumor stem cells and reverse multidrug resistance
            and exerts the optimal effect when used in combination with other chemotherapy
            drugs."
          </Text>
          <Text size="small" tone="tertiary">
            Bluesky, 2026-02-12 (corpus ID bluesky_3menhcqfjzc25) — near-verbatim quotation
            of a pro-ivermectin review. The sentence is scientifically closer to accurate
            than most benefit claims in the corpus (it names preclinical scope and a
            combination context), which is exactly what makes it persuasive when detached
            from the caveats above.
          </Text>
        </CardBody>
      </Card>

      <Divider />

      <Stack gap={6}>
        <H3>Sources</H3>
        <Text size="small" tone="secondary">
          Primary: [Wang et al. 2019, J Exp Clin Cancer Res](https://link.springer.com/article/10.1186/s13046-019-1251-7) ·
          [Pouliot et al. 1997, Biochem Pharmacol](https://pubmed.ncbi.nlm.nih.gov/8960059/) ·
          [Anticancer Research 2024;44(12):5271](https://ar.iiarjournals.org/content/44/12/5271) ·
          [Dom&iacute;nguez-G&oacute;mez et al. 2020](https://pubmed.ncbi.nlm.nih.gov/32474842/) ·
          [Hu et al. 2022, osteosarcoma](https://journals.sagepub.com/doi/full/10.1177/09603271221143693) ·
          [Pharmaceuticals 2025;18(1):14](https://www.mdpi.com/1424-8247/18/1/14) ·
          [Ivermectin as BCRP/ABCG2 inhibitor, 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10776880/)
        </Text>
        <Text size="small" tone="secondary">
          Context: [Ju&aacute;rez et al. 2018 review (pharmacokinetics)](https://pmc.ncbi.nlm.nih.gov/articles/PMC5835698/) ·
          [NCT05318469 results](https://clinicaltrials.gov/study/NCT05318469?tab=results) ·
          [ICONIC NCT07487805](https://clinicaltrials.gov/ct2/show/NCT07487805)
        </Text>
      </Stack>
    </Stack>
  );
}
