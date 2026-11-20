# 🔧 Case Study 11: External Equipment Repair & Digital Gate Pass Management App

- **Domain**: Plant Maintenance, Industrial Asset Logistics & Security Digitalization
- **Deployment Status**: **PRODUCTION DEPLOYED & LIVE**
- **Front-End Platform**: Microsoft Power Apps (Bilingual Canvas App — English & Arabic)
- **Data Architecture**: Microsoft SharePoint Lists (Asset Requisitions, Vendor Directory, Gate Ledger)
- **Workflow & Automation**: Microsoft Power Automate (Multi-Stage Engineering & Security Approval Pipeline)
- **Security & Compliance**: Digital Exit Permit Generation, Barcode / Permit ID Verification

---

## 📌 Situation: Problem Statement & Industrial Bottleneck

In continuous manufacturing operations, heavy industrial equipment—such as precision motors, electrical inverter drives, mechanical gearboxes, and specialized mold tooling—periodically requires dispatch to specialized off-site vendor workshops for precision rewinding, machining, or ISO calibration:

1. **Triplicate Carbon-Copy Paper Permits:**
   - External dispatches relied on physical multi-copy paper gate passes signed manually across Engineering, Procurement, and Plant Security.
2. **Untracked Vendor Custody & Lost Assets:**
   - Once equipment exited the plant gates, maintenance supervisors lacked centralized visibility into off-site repair status, vendor turnaround progress, and estimated return dates, leading to lost spare parts.
3. **Severe Gatehouse Bottlenecks:**
   - Security gate personnel had to manually cross-reference paper signatures and serial numbers against illegible handwritten forms, delaying logistics trucks and creating security compliance vulnerabilities.
4. **Delayed Invoicing & Warranty Friction:**
   - Reconciling vendor repair invoices against physical item return dates was difficult without an immutable timestamped dispatch and receipt audit trail.

---

## 🎯 Task: Engineering Objectives

Design and deploy a unified, bilingual Canvas Power App and automated workflow system to:
1. Digitize **100% of external equipment repair requisitions** across Engineering, Warehouse, and Security departments.
2. Replace paper exit permits with an **automated digital gate pass system** generating unique, traceable Permit Numbers.
3. Establish a **multi-stage Power Automate approval workflow** routing requests from Head Engineer to Procurement and Plant Security.
4. Implement **bilingual user interface support (English / Arabic)** to ensure seamless adoption by field technicians and gatehouse personnel.
5. Provide **closed-loop return verification** and automated vendor turnaround SLA reminders to eliminate overdue equipment loss.

---

## 🧠 Action: System Architecture & Workflow Implementation

```
               [ Bilingual Portal Interface (EN / AR) ]
               +--------------------------------------+
               | All Services | Security | Warehouse  |
               +--------------------------------------+
                                   |
                  User Department & Permission Check
                                   |
    [ Engineering Requisition ]    |    [ Security & Gate Validation ]
    - Equipment Serial Number      |    - Real-Time Permit Lookup
    - Vendor / Company Selection   |    - Physical Inspection Check
    - Purchase Order / PR Number   |    - Timestamped Exit / Re-Entry Log
    - Quantity & Detailed Scope    |
                                   |
                   SharePoint Requisition Master
                                   |
                    Power Automate Cloud Flow
                                   |
               +-------------------+-------------------+
               |                                       |
    [ Multi-Stage Approvals ]              [ Digital Gate Pass Creation ]
    1. Head Engineer Validation            - Auto-generates unique Permit ID
    2. Procurement Purchase Authorization  - Formats official printable permit
    3. Security Gatehouse Notification     - Delivers PDF credentials to gate terminal
                                   |
                     [ Automated SLA Reminders ]
                     - Daily check on overdue return dates
                     - Vendor turnaround alert emails
```

### 1. Bilingual Responsive Front-End Architecture
* **Dynamic Language Localization**: Implemented global language toggle (English / Arabic) utilizing localized string resource dictionaries in Power Fx, ensuring interface labels, validation prompts, and navigation controls render intuitively for all plant personnel.
* **Modular Departmental Hubs**: Built clear workspace segmentation separating All Active Services, Plant Security Gatehouse, Warehouse Logistics, and Engineering Administration.
* **Form Validation Guardrails**: Enforces required technical parameters (Equipment Serial Number, Scope Description, Designated Vendor, Purchase Requisition Number) prior to submission.

### 2. Relational SharePoint List Architecture
* **Repair Requisitions List**: Stores Unique Permit No, Company/Vendor ID, Serial Number, Quantity, Assigned Date, Target Return Date, Requisition State (Draft, Approved, Dispatched, In-Repair, Returned, Closed).
* **Vendor Master Directory**: Indexes authorized machine shops, certified rewinding contractors, contact personnel, and contractual turnaround SLAs.
* **Security Gate Log**: Immutable timestamped log capturing security officer ID, outbound departure timestamp, vehicle license details, inbound return timestamp, and condition notes.

### 3. Power Automate Multi-Tier Cloud Flows
* **Sequential Approval Pipeline**: Automatically routes requisitions from the submitting maintenance engineer to the Head Engineer for technical sign-off, followed by Procurement for PO validation.
* **Digital Gate Pass Dispatch**: Once fully approved, the system generates a formatted digital permit record and delivers real-time notifications to the gatehouse security terminal.
* **SLA Monitoring & Overdue Alerts**: Recurrence flows query active repair tickets daily; if equipment exceeds its scheduled return SLA, automated reminder notifications are dispatched to the vendor manager and equipment owner.

### 4. Closed-Loop Gate Re-Entry Reconciliation
* **Barcode & Permit Verification**: Security officers at the gatehouse inspect the physical equipment, verify the serial number against the digital permit record, and record the inbound arrival timestamp with a single tap, closing the repair ticket automatically.

---

## 📈 Results & Business Impact

| Metric / Operational KPI | Legacy Paper Process | Deployed Power App Solution | Improvement |
| :--- | :--- | :--- | :--- |
| **External Repair Traceability** | Triplicate carbon-copy paper slips | 100% centralized digital ledger | **Zero lost equipment / tooling** |
| **Gatehouse Processing Time** | 15–25 min manual verification | Under 2 minutes digital check | **85% faster gate clearance** |
| **Approval Routing Latency** | 24–48 hours physical signatures | Under 30 minutes digital pipeline | **90% reduction in lead time** |
| **Vendor SLA Turnaround Compliance** | Unmonitored off-site dwell times | Automated overdue alert flows | **32% improvement in vendor turnaround** |
| **User Adoption & Accessibility** | English-only complex forms | Bilingual (English / Arabic) UI | **100% adoption across all shifts** |

---

## 🛠️ Technology Stack

- **Application Platform**: Microsoft Power Apps (Canvas App, Modular Component Architecture)
- **Logic & Localization**: Power Fx (Dynamic language dictionaries, in-memory lookups)
- **Data Backend**: Microsoft SharePoint Lists (Relational schema, versioned audit logging)
- **Workflow Engine**: Microsoft Power Automate (Multi-approver branching, SLA recurrence schedules)
- **Document & Alerting Services**: Office 365 Outlook, PDF Generation Connectors, Security Gatehouse Push
