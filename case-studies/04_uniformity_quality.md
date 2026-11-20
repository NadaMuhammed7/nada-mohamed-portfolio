# 🎯 Case Study 4: Tire Uniformity Analytics & Machine Correlation

- **System**: Global Industrial Manufacturing Plant
- **Domain**: Final Finishing, Dynamic Uniformity Testing & Defect Prevention
- **Dashboard UID**: `-CRfBZENk` | **Grafana Panels**: 16 Live Panels | **Variables**: `MCH` (Machine Multi-Select)
- **Key Tables**: `MM_RESULTS`, `TRC_BASIC_TABLE`, `MD_PROCESS_PARAMETERS_ACYCLE_VALUE`, `MD_WORKERS`, `MD_BOM`

---

## 📌 Situation (The Industrial Problem)
In premium radial commercial vehicle tires, **Uniformity** is the ultimate measure of ride quality, durability, and safety. After curing, 100% of tires pass through high-speed Uniformity Testing Machines (TU) that spin the tire under simulated road load to measure structural harmonics:
* **RFV (Radial Force Variation)**: Vertical force fluctuations causing vehicle vibration.
* **LFV (Lateral Force Variation)**: Side-to-side force fluctuations causing vehicle pulling/steering drift.
* **Conicity & Ply Steer**: Asymmetry in belt construction causing unilateral vehicle drift.
Previously, when a batch showed high RFV/LFV standard deviations, quality engineers struggled to identify the root cause because the uniformity test results were isolated from the upstream building machines, tooling drums, and operators that assembled the green tires.

---

## 🎯 Task (The Analytical Mandate)
Build a unified Uniformity Analytics Command Center in Grafana that:
1. Tracks total tested volume, pass/fail rates, and statistical force harmonics across all tire specifications.
2. Automatically correlates uniformity test results back to upstream **Tire Building Machines (TBM)**, recipes, cycle parameters, and operator rosters.
3. Highlights machine-specific variations to enable predictive maintenance and tooling calibration before scrap thresholds are breached.

---

## 🧠 Action: The Analytics Logic in Plain English (NLP)
To bridge the gap between quality testing and factory floor physics, we engineered an end-to-end analytical pipeline:

1. **Full-Lifecycle Barcode Traceability Join**:
   * *Business Logic*: Joins testing machine measurement results (`EG_CA_TRU_FIN_MUL38.MM_RESULTS`) with the plant's master traceability registry (`TRC_BASIC_TABLE`) using the tire's unique engraved barcode.
   * *Plain English Pipeline*: For every tire tested, the pipeline traces its manufacturing lineage back through the curing press, carcass building drum, and specific operator shift that constructed it.
2. **Statistical Harmonics Aggregation**:
   * *Business Logic*: Rather than displaying millions of raw force curves, the engine computes statistical distributions (Mean, Maximum, and Standard Deviation) for LFV, RFV, and Conicity.
   * *Plain English Pipeline*: Automatically classifies tires into Quality Tiers (Tier 1 OE Premium, Tier 2 Replacement, Rework/Grind, and Scrap) based on dynamic tolerance thresholds defined in the material master (`MD_BOM`).
3. **Machine-Level Anomaly Attribution**:
   * *Business Logic*: Groups uniformity metrics by upstream building machine ID (`BUILD_MCH`).
   * *Plain English Pipeline*: If Machine 12 suddenly begins producing tires with RFV standard deviations 25% higher than the fleet average, the dashboard flags the machine immediately. Maintenance engineers can diagnose mechanical drum runout or bladder wear before hundreds of tires are affected.
4. **Interactive Machine Filtering**:
   * *Business Logic*: Flexible drill-down across 40+ tire building machines via template variables (`$MCH`).
   * *Plain English Pipeline*: Enables quality engineers to isolate individual building machines or benchmark an entire production line against plant-wide quality targets.

---

## 📈 Result & Business Impact
* **Rapid Root-Cause Analysis**: Reduced quality investigation time from 2 days of manual data matching to 30 seconds of live correlation.
* **Targeted Drum Calibration**: Maintenance teams preemptively calibrate building drums based on live uniformity trend drift, drastically reducing scrap rates.
* **OEM Specification Compliance**: Guaranteed compliance with strict Original Equipment Manufacturer (OEM) commercial vehicle ride standards.

---

## 📊 Visualization Architecture (Grafana Layout)
* **Quality Headline KPIs**: Stat cards displaying Total Tested Tires, Fleet Pass Rate %, and Average RFV/LFV Harmonics.
* **Machine Benchmarking Chart**: Comparative bar charts ranking all building machines by uniformity pass yield and standard deviation.
* **Traceability Drill-Down Table**: Tabular view linking test timestamps, tire barcodes, measured force values, building machine numbers, and operator names.
