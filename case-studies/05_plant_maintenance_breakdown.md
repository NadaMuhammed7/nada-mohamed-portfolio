# 🛠️ Case Study 5: Plant Maintenance Breakdown & Operational Loss Deployment

- **System**: Global Industrial Manufacturing Plant
- **Domain**: Reliability Engineering, Asset Maintenance & Downtime Elimination
- **Dashboard UID**: `OWITvzXNz` | **Grafana Panels**: 83 Live Panels | **Variables**: `Type`, `Year`
- **Key Tables**: `Maintenance_KPIs`, `CreateDate`, `LAST_DAY`

---

## 📌 Situation (The Industrial Problem)
A 24/7 tire plant contains hundreds of heavy industrial assets: Banbury mixers, calenders, extruders, building drums, and curing presses. Every minute of unplanned machine downtime translates directly into lost production volume and delayed customer shipments.
* Plant maintenance managers previously tracked downtime in disconnected spreadsheets and paper maintenance work orders.
* Reliability engineers lacked visibility into the true distribution of **Mean Time Between Failures (MTBF)** and **Mean Time To Repair (MTTR)** across different factory departments.
* Preventive maintenance routines were based on static time intervals rather than empirical breakdown frequency, leading to both over-maintenance and unexpected critical failures.

---

## 🎯 Task (The Analytical Mandate)
Develop a plant-wide Maintenance Breakdown Command Center in Grafana that:
1. Aggregates all machine stoppages across electrical, mechanical, hydraulic, and software categories.
2. Tracks core reliability KPIs (Total Breakdown Duration, Failure Frequency, MTBF, MTTR, and Availability %).
3. Provides a structured **Loss Deployment Breakdown** enabling reliability leaders to target the "vital few" root causes causing 80% of plant downtime (Pareto principle).

---

## 🧠 Action: The Analytics Logic in Plain English (NLP)
We developed a standardized maintenance analytics pipeline to turn raw maintenance logs into actionable reliability engineering insights:

1. **Automated Loss Deployment Categorization**:
   * *Business Logic*: Unifies maintenance logs (`Maintenance_KPIs`) categorized by breakdown classification (`Type`) and calendar period.
   * *Plain English Pipeline*: Automatically parses stoppage durations and maps them into standardized World Class Manufacturing (WCM) loss buckets: Breakdown Losses, Minor Stoppages, Changeover Losses, and Speed Losses.
2. **Calendar Period Normalization & Trend Tracking**:
   * *Business Logic*: Dynamically slices downtime metrics by month and year using SQL calendar math (`LAST_DAY(CreateDate)`).
   * *Plain English Pipeline*: Calculates cumulative year-to-date (YTD) downtime and compares current monthly performance against rolling historical baselines, identifying whether recent engineering interventions actually decreased failure frequency.
3. **Departmental Breakdown Hierarchy**:
   * *Business Logic*: Segregates maintenance events across operational areas: Mixing, Semi-Finishing, Building, Curing, and Finishing.
   * *Plain English Pipeline*: Enables maintenance department heads to focus resources where downtime is most acute, preventing secondary line starvation.

---

## 📈 Result & Business Impact
* **Targeted Reliability Interventions**: Provided data-backed prioritization for engineering projects, focusing technician focus on top downtime culprits.
* **Reduced Mean Time To Repair (MTTR)**: Immediate visibility into recurring failure modes allowed technicians to pre-stage spare parts and diagnostic guides.
* **Executive Maintenance Alignment**: Unified plant leadership and engineering around objective availability metrics during weekly and monthly performance reviews.

---

## 📊 Visualization Architecture (Grafana Layout)
* **Top Reliability KPIs**: Summary stat cards displaying Total Breakdown Hours, Machine Availability %, and Active Failure Count for the selected year.
* **Pareto Loss Deployment Analysis**: Visual breakdown of total downtime by asset type, machine group, and failure mechanism.
* **Monthly Downtime Heatmap & Trend**: Timeseries and bar charts illustrating month-over-month breakdown trends, tracking progress toward annual reliability improvement targets.
