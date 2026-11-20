# ⏱️ Case Study 10: Engineering Work Logs & Overtime Management App

- **Domain**: Low-Code Enterprise Systems, Workforce Governance & Project Analytics
- **Deployment Status**: **PRODUCTION DEPLOYED & LIVE**
- **Front-End Platform**: Microsoft Power Apps (Canvas App, Responsive Mobile & Desktop Layouts)
- **Data Architecture**: Microsoft SharePoint Lists (Relational Schema & In-Memory Collections)
- **Workflow & Automation**: Microsoft Power Automate (Multi-Tier Approvals & Notification Flows)
- **Integration**: Microsoft Teams & Microsoft 365 Outlook Deep Linking, Dynamic CSV Export

---

## 📌 Situation: Problem Statement & Operational Challenge

In fast-paced industrial manufacturing and plant engineering environments, engineering teams and project managers balance regular shift duties with emergency off-shift callouts, machine commissioning, line tolerance studies, and collaborations with external vendor specialists:

1. **Fragmented Tracking via Manual Spreadsheets & Paper:**
   - Work logs, emergency overtime hours, and partner project allocations were tracked across isolated Excel sheets, handwritten logbooks, and email threads.
2. **Administrative Payroll Bottlenecks:**
   - Approaching monthly payroll cutoff dates, department leads faced an intensive manual auditing process to verify claimed hours, cross-check shift rotas, and ensure compliance with statutory overtime limits.
3. **Budget Leakage & Misallocated Project Costs:**
   - Without a centralized project code ledger, engineering hours and external contractor expenses could not be accurately attributed to specific capital improvement projects or machine lines.
4. **Zero Real-Time Bandwidth Visibility:**
   - Department heads lacked immediate visibility into team workload distribution, causing uneven shift allocations and unmonitored overtime surges.

---

## 🎯 Task: Engineering Objectives

Design and deploy an enterprise-grade mobile and desktop Canvas Power App to:
1. Provide a **responsive mobile-first interface** for engineers and supervisors to log project hours, emergency call-outs, and external partner collaborations in under 30 seconds.
2. Establish a **normalized SharePoint Lists database** indexing users, departments, active projects, external partners, and transactional work logs.
3. Automate **manager notifications and threshold alerts** via Power Automate cloud flows upon log submission.
4. Deliver **interactive client-side analytics** with real-time aggregations by person, department, and project, featuring instant CSV financial exports.
5. Provide **direct collaboration deep-links** connecting logged records directly to Microsoft Teams chats and Outlook email correspondence.

---

## 🧠 Action: System Architecture & Implementation

```
               [ Mobile & Desktop Canvas App Interface ]
                                   |
                  User Authentication & Role Detection
                                   |
          +------------------------+------------------------+
          |                                                 |
  [ Submit Work Log Form ]                         [ Interactive Analytics ]
  - Project Dropdown                               - KPI Cards (Hours, Logs, Projects)
  - External Partner Lookup                        - Dynamic Date & Department Filters
  - Log Date & Hours Worked                        - Pivot: "By Person" / "By Project"
  - Link Teams/Outlook Reference                   - Instant CSV Export Generator
          |                                                 |
  SharePoint List (Work Logs)                     Client-Side In-Memory Collection
          |                                       (ClearCollect & AddColumns in Power Fx)
  Power Automate Flow Trigger
          |
  +-------+-------------------------+
  |                                 |
[ Email Notification to Lead ]    [ Budget / Overtime Threshold Check ]
- Formatted HTML Summary Card     - Conditional Alert if Project Caps Exceeded
- Direct Review Link
```

### 1. Front-End UX & Responsive Canvas Design
* **Role-Tailored Workspaces**: Detects user identity via `User().Email` and dynamically routes technicians to intuitive submission forms, while surfacing administrative dashboards and export controls for department supervisors.
* **Streamlined Mobile Quick Actions**: Provides 2-tap entry points ("Create Work Log" and "View Analysis & KPIs") optimized for single-hand mobile use on the factory floor.
* **Cascading Project & Partner Selectors**: Dynamic dropdown filters populate project details, partner email addresses, and active cost codes in real time, preventing entry errors.

### 2. SharePoint Lists Relational Schema
* **Projects Master**: Stores Project ID, Name, Department, Budgeted Hours Cap, and Active Status.
* **Partners Directory**: Indexes external vendor organizations, technical contacts, and designated correspondence emails.
* **Work Logs Transaction Ledger**: Stores Unique Log ID, User UPN, Project Foreign Key, Hours (decimal), Log Date, Narrative Notes, Linked Teams Meeting URL, and Approval State.

### 3. Power Automate Cloud Flows & Notifications
* **Instant Submission Notifications**: Dispatches branded HTML email notifications to project leads containing employee name, logged hours, project tag, and work summary.
* **Weekly Department Digests**: Automated scheduled recurrence flows aggregate weekly engineering hours across all active lines, providing managers with proactive utilization summaries before payroll cutoff.
* **Compliance & Threshold Guardrails**: Automatically flags entries exceeding standard daily shift maximums for elevated management review.

### 4. High-Performance Client-Side Analytics
* **Zero-Latency In-Memory Aggregations**: Power Fx formula pipelines compute dynamic summaries (`Sum(FilteredLogs, HoursWorked)`, `CountRows(ActiveProjects)`) directly within client memory using local collections.
* **Multi-Dimensional Pivot Toggles**: Allows instantaneous switching between individual contributor views ("By Person") and operational workstreams ("By Project") without repetitive backend round-trips.
* **One-Click CSV Export**: Compiles selected date ranges into standard CSV format for direct import into enterprise ERP and payroll financial systems.

---

## 📈 Results & Business Impact

| Metric / Operational KPI | Legacy Manual Process | Deployed Power App Solution | Improvement |
| :--- | :--- | :--- | :--- |
| **Monthly Payroll Reconciliation** | 5 business days of manual auditing | Under 2 hours automated review | **>95% faster cycle** |
| **Submission Compliance & Tracking** | Incomplete paper sheets & lost emails | 100% centralized digital ledger | **100% digital auditability** |
| **Manager Approval Turnaround** | 48–72 hours via physical routing | Real-time email notification & verify | **<15 minutes turnaround** |
| **Project Cost Allocation Accuracy** | Estimated post-month allocations | Real-time hours linked to project codes | **Zero budget misallocations** |
| **Platform Scalability** | Rigid desktop-only Excel templates | Cross-platform iOS, Android & Browser | **100% workforce mobile access** |

---

## 🛠️ Technology Stack

- **Application Platform**: Microsoft Power Apps (Canvas App, Fluid Responsive Containers)
- **Logic Language**: Power Fx (Declarative in-memory formulas, collections, and delegations)
- **Data Backend**: Microsoft SharePoint Lists (Relational Schema, Role-Based Access Control)
- **Automation Engine**: Microsoft Power Automate (Trigger on creation, conditional approval branches)
- **Collaboration Connectors**: Microsoft Teams API, Office 365 Outlook, Office 365 Users Connector
