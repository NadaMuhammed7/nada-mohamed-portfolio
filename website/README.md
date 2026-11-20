# Nada Mohamed — Engineering & Analytics Portfolio Hub

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Nada_Mohamed-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/nada-mohamed17/)
[![Email](https://img.shields.io/badge/Email-nadaamuhamed17%40gmail.com-EA4335?style=flat&logo=gmail)](mailto:nadaamuhamed17@gmail.com)
[![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-22c55e?style=flat&logo=github)](https://nadamuhammed7.github.io/nada-mohamed-portfolio/)

> **Enterprise Decision Intelligence • Industrial Edge Computer Vision • Data Engineering Pipelines • Low-Code Automation**

An interactive, responsive portfolio hub showcasing end-to-end engineering systems built across manufacturing, supply chain, asset reliability, and plant operations.

---

## 🌟 Portfolio Domains & Featured Systems

### 1. 📊 BI & Analytics (Decision Systems)
Interactive operational dashboards translating complex shopfloor telemetry into actionable decisions:
* **Daily Mix Monitoring**: Real-time Banbury mixer throughput, recipe variance tracking, and month-to-date execution.
* **Belts Stock Management**: Dynamic WIP inventory aging across high-speed cutters and tire building machines.
* **Curing Moulds Mapping**: Digital twin matrix monitoring 89 dual-cavity vulcanization presses in real time.
* **Tire Uniformity & Harmonics**: Defect triage (RFV/LFV harmonics) and automated OE automaker compliance classification.
* **Plant Maintenance & Reliability**: Stoppage Pareto analysis, Mean Time to Acknowledge (MTTA), and MTTR tracking.
* **Connected HR Suite**: Shift workforce demographics, overtime distribution, and direct labor allocation.

### 2. 🧠 AI & Machine Learning (Edge Vision & GenAI)
Production-deployed deep learning and generative AI systems operating on live industrial lines:
* **PolyShield (Real-Time Edge AI Defect Detection)**: 3-stage cascaded neural network (YOLO-seg + early-exit classifier + YOLO11n) inspecting continuous rubber strips with sub-35ms inference latency, human-in-ROI safety bypass, and closed-loop Siemens S7 PLC conveyor interlock (>99.2% defect recall).
* **TreadCycle (Optical Tripwire AI Counter)**: Autonomous inline folded-tread detection and tallying using YOLO and virtual crossing vector logic (≥98% counting accuracy) integrated with extruder PLC parameters.
* **Maintenance Copilot (Generative AI & Technical RAG)**: Diagnostic assistant powered by the Gemini API, LangChain, and dense vector embeddings over OEM manuals, reducing equipment fault lookup from 30 minutes to <15 seconds.

### 3. ⚙️ Data Engineering (Pipelines & Semantic Layer)
Scalable architectures powering certified enterprise data access:
* **Dremio Semantic Layer & Lakehouse Acceleration**: Virtualized multi-source data fabric achieving up to 70% query latency reduction across ERP, MES, and SCADA historians.
* **Real-Time Sensor & Telemetry Streaming**: Low-latency ingestion architecture processing over 1.2M sensor events per hour with zero data loss.
* **Automated Shift Batch ETL & Data Quality**: Automated reconciliation pipelines unifying shift production tallies and inventory ledgers.

### 4. 📱 Power Apps & Process Automation
Enterprise low-code solutions digitizing paper workflows and shopfloor logistics:
* **Engineering Work Logs & Overtime Management**: Mobile Canvas app with SharePoint Lists backend, in-memory Power Fx analytics, Teams/Outlook deep linking, and automated supervisor email approvals.
* **External Equipment Repair & Digital Gate Pass**: Bilingual (English & Arabic) requisition hub routing approvals across Engineering, Procurement, and Gatehouse Security with digital permit generation.
* **Plant Fleet & Shift Transportation Reservation**: Mobile seat booking system featuring real-time vehicle quota checks, colleague proxy booking, and automated emergency manager authorization flows.

---

## 📁 Repository Structure

```text
├── index.html                  ← Main web application (GitHub Pages entry point)
├── style.css                   ← Light-mode design system & responsive styling
├── app.js                      ← Dynamic routing, modal renderer, and filter engine
├── data.js                     ← Master portfolio project dataset & metadata
├── favicon.svg                 ← Custom branded vector favicon
│
├── assets/                     ← Production web media & static files
│   ├── previews/               ← High-resolution UI screenshots & video posters
│   └── videos/                 ← Real industrial system demonstration MP4s
│
├── case-studies/               ← 12 detailed technical case study markdown files
│   ├── 01_daily_mix_monitoring.md
│   ├── ...
│   ├── 07_polyshield_pe_ai_detection.md
│   ├── 08_tread_recycle_ai_counter.md
│   ├── 09_maintenance_llm_rag_copilot.md
│   ├── 10_overtime_management_powerapp.md
│   ├── 11_external_repair_tracking_powerapp.md
│   └── 12_transportation_reservation_powerapp.md
│
├── dashboards/                 ← Exported Grafana dashboard JSON configurations
├── extracted_queries/          ← Structured SQL query logic files
└── .gitignore                  ← Ignores OS, IDE, and private raw scratch files
```

---

## ⚡ 1-Minute GitHub Pages Deployment

To host this portfolio live on your own GitHub account:

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com) and navigate to your repository [nada-mohamed-portfolio](https://github.com/NadaMuhammed7/nada-mohamed-portfolio).
2. Set visibility to **Public**.

### Step 2: Push Your Code
Open PowerShell in this project directory and run:

```bash
git add .
git commit -m "Update Nada Mohamed Engineering & Analytics Portfolio"
git push origin main
```

### Step 3: Turn on GitHub Pages
1. On GitHub, navigate to **Settings** -> **Pages** (under Code and automation).
2. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/(root)`
3. Click **Save**.

Your portfolio is live at:
```
https://nadamuhammed7.github.io/nada-mohamed-portfolio/
```

---

## 📬 Contact & Inquiries

- **Nada Mohamed**
- **Email**: [nadaamuhamed17@gmail.com](mailto:nadaamuhamed17@gmail.com)
- **LinkedIn**: [linkedin.com/in/nada-mohamed17](https://www.linkedin.com/in/nada-mohamed17/)
