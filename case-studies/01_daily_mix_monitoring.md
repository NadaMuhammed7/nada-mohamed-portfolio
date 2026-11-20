# 🏭 Case Study 1: Daily Mix Monitoring & Plant Operational Command Center

- **System**: Global Industrial Manufacturing Plant
- **Domain**: Rubber Mixing, Extrusion & Building Scheduling
- **Dashboard UID**: `V7Q3D6Yvk` | **Grafana Panels**: 9 Live Panels | **Variables**: `year`, `month`, `day`, `shift`, `shortcode`
- **Key Tables**: `ProductionData`, `GetIPCODEProductionYDA`, `FIN_DEFECTS_DECLARED`, `INFO_TIER`, `SCH_MACHINE_PLAN`, `DC_DYNAMIC_CURING_PROCESSED`

---

## 📌 Situation (The Industrial Problem)
In tire manufacturing, compound mixing and semi-finishing are the heartbeat of the factory. If compound batches deviate in weight, volume, or delivery timing, downstream tire building machines starve, while excess batches exceed their maximum chemical shelf life. Previously:
* Shift supervisors had no centralized way to cross-reference planned machine schedules with actual production counts in real time.
* Production reports were compiled post-shift from manual paperwork, meaning yield losses and short code bottlenecks were discovered hours after scrap had already occurred.
* Executives lacked an at-a-glance view of daily operational health partitioned by shift and tire recipe (IP code).

---

## 🎯 Task (The Analytical Mandate)
Design an automated, real-time command center in Grafana that:
1. Automatically computes **Month-to-Date (MTD) and Single-Day Shift Performance** across all three plant operating crews.
2. Identifies **Priority Bottleneck IP Codes** where actual output deviates from production plans.
3. Provides drill-down capabilities from high-level plant KPIs down to individual tire sizes, shifts, and scrap declarations within seconds.

---

## 🧠 Action: The Analytics Logic in Plain English (NLP)
Instead of relying on isolated spreadsheet calculations or complex SQL subqueries, we designed an automated analytical data pipeline in Dremio and Grafana:

1. **Dynamic Shift Harmonization**:
   * *Business Logic*: Factory shifts operate on continuous 8-hour rotations across calendar day boundaries (Shift 1: 00:00–08:00, Shift 2: 08:00–16:00, Shift 3: 16:00–24:00).
   * *Plain English Pipeline*: The analytics engine checks the exact timestamp of each completed compound batch, converts server UTC timestamps into Cairo factory local time, and attributes each unit to its active shift crew and calendar month.
2. **Planned vs. Actual Production Reconciliation**:
   * *Business Logic*: Joins machine master planning schedules (`SCH_MACHINE_PLAN`) with real-time PLC completion logs (`ProductionData`) by tire recipe identifier (`IPCODE`).
   * *Plain English Pipeline*: For every tire specification, the system calculates the cumulative plan target, sums actual units built, and evaluates the achievement ratio. If a short code falls behind schedule during Shift 1, the pipeline automatically flags it as a priority alert for Shift 2 supervisors.
3. **Multi-Source Quality & Scrap Attribution**:
   * *Business Logic*: Links building output with final defect declarations (`FIN_DEFECTS_DECLARED`) to calculate real-time net yield.
   * *Plain English Pipeline*: Replaces manual scrap tallies by querying the defect registry per batch barcode, dynamically subtracting scrapped green tires from gross output to display true First-Time-Right (FTR) yield.
4. **Interactive Plant-Wide Slicing**:
   * *Business Logic*: Flexible filtering without query lag.
   * *Plain English Pipeline*: When a user selects `'All'` shifts or `'All'` shortcodes, the analytics engine activates universal bypass logic (`'All' IN ($shift)`), evaluating across the entire fleet instantaneously rather than building heavy combinatorial queries.

---

## 📈 Result & Business Impact
* **Instant Shift Handover**: Shift supervisors reduced morning handover meetings from 35 minutes of paper reconciliation to 5 minutes of focused action using the live dashboard.
* **Proactive Bottleneck Resolution**: Identifying lagging IP codes mid-shift allowed plant managers to reassign compound batches and prevent downstream machine starvation.
* **100% Data Trust**: Eliminated discrepancies between MES floor counts and SAP reporting, creating a single source of truth across Operations, Quality, and Planning.

---

## 📊 Visualization Architecture (Grafana Layout)
* **Top Executive Banner**: Dynamic status cards displaying Month-to-Date achievement %, current shift completion volume, and active scrap rates with color-coded alert thresholds (Green > 95%, Amber 85-95%, Red < 85%).
* **Operational Action Matrix**: A priority table highlighting top underperforming IP codes, showing Planned Units, Actual Units, Delta, and Scrap Count.
* **Shift Trend Analysis**: Stacked bar charts showing shift-by-shift output distributions, comparing morning, afternoon, and night crew consistency over the selected calendar month.
