# 👥 Case Study 6: Interconnected HR & Enterprise Human Capital Analytics Suite

- **System**: Global Industrial Manufacturing Plant
- **Domain**: Human Resources, Organizational Development, Safety & Workforce Governance
- **Folder UID**: `_joRgLRvz` (HR Suite) | **Total Dashboards**: 6 Fully Interlinked Dashboards (61 Live Panels)
  - `C&B` (Compensation & Benefits) (UID: `OURBmYRDk`)
  - `OD Analysis` (Organizational Development & Demographics) (UID: `rC7qsS9Hk`)
  - `Employee Relations KPIs` (UID: `I8xvnYgvz`)
  - `Training KPIs` (UID: `RuQAZLgvk`)
  - `Legal KPIs` (UID: `TiERG7zvz`)
  - `Security KPIs` (UID: `M-GrMLRvz`)
- **Key Tables**: `HR_KPI`, `OD_Hire`, `Last_Working_Day`
- **Variables**: `Department`, `Job_Family`, `Month`, `Year`

---

## 📌 Situation (The Industrial Problem)
Managing a manufacturing workforce of thousands of employees across 3 rotating shifts, engineering teams, and administrative departments involves dozens of compliance, safety, and organizational dynamics.
* HR leadership previously operated in severe data silos: compensation data was locked in payroll systems, training hours in Excel spreadsheets, legal disputes in legal files, and safety incidents in gate logs.
* Calculating simple strategic metrics—such as overtime expenditure per job family, talent turnover rates, or training hours per department—required weeks of manual consolidation.
* Executives lacked an integrated cockpit to explore human capital health holistically.

---

## 🎯 Task (The Analytical Mandate)
Architect a **fully interconnected enterprise analytics suite** in Grafana that:
1. Connects all 6 functional HR pillars (Compensation, OD Demographics, Employee Relations, Training, Legal, and Security).
2. Features **seamless cross-dashboard navigation**: users can navigate between all 6 modules with one click while preserving context.
3. Delivers deep workforce insights: overtime % by job family, age/tenure distributions, recruitment velocity, and safety compliance.

---

## 🧠 Action: The Analytics Logic in Plain English (NLP)
We built an enterprise-grade semantic layer and unified data model for the entire human resources domain:

1. **Unified Enterprise Metric Warehouse (`HR_KPI`)**:
   * *Business Logic*: Consolidates diverse workforce metrics into a normalized schema tagged by KPI Type (`'Headcount'`, `'Overtime %'`, `'Turnover'`), Area, Job Family, Department, Month, and Year.
   * *Plain English Pipeline*: Translates complex payroll and roster records into standardized, comparable indices. Allows instant querying of Headcount (`UM = 'Numb'`) and Overtime (`UM = 'Percent'`) across White Collar and Blue Collar staff without complex joins.
2. **Organizational Demographics & Talent Pipeline Modeling**:
   * *Business Logic*: Combines active employee rosters with historical hire records (`OD_Hire`) and departure dates (`Last_Working_Day`).
   * *Plain English Pipeline*: Automatically models employee age pyramids, tenure distributions, and retention curves. Flags impending retirement waves in critical technical trade roles (e.g., senior electricians, mold mechanics) years in advance.
3. **Overtime & Fatigue Risk Governance**:
   * *Business Logic*: Evaluates overtime percentages across job families (`Job_Family != 'Total'`).
   * *Plain English Pipeline*: Pinpoints specific operational groups where overtime exceeds healthy thresholds, allowing leadership to balance shift crew workloads and mitigate workplace fatigue risks.
4. **Interconnected Navigation Architecture**:
   * *Business Logic*: In a multi-dashboard suite, users must never get trapped in a dead end.
   * *Plain English Pipeline*: Engineered persistent navigation bars across all 6 dashboards using custom HTML/CSS header components. Users seamlessly jump from Compensation & Benefits straight to Training or Security KPIs with zero context loss.

---

## 📈 Result & Business Impact
* **Unified Human Capital Cockpit**: HR directors and executive leadership transitioned from static monthly slide decks to a live, interactive data portal.
* **Controlled Overtime Expenditure**: Granular visibility into overtime by job family enabled targeted recruitment to relieve overworked shift teams, significantly reducing unnecessary overtime costs.
* **Proactive Succession Planning**: Identified aging workforce demographics in technical maintenance departments, enabling timely apprentice training and knowledge transfer programs.

---

## 📊 Visualization Architecture (Grafana Layout)
* **Unified Navigation Header**: Top navigation pill bar present on all 6 dashboards for instant 1-click switching.
* **Executive Summary Stat Cards**: High-visibility KPI cards for Total Headcount, Plant-Wide Overtime %, Turnover Rate, and Training Completion.
* **Demographic & Distribution Charts**: Interactive bar charts and age pyramid distributions sliced by Department and Job Family.
* **Compliance & Security Matrix**: Tabular monitors for legal timelines, employee relations grievances, and plant physical security incidents.
