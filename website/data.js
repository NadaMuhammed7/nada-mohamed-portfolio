// Nada Mohamed — Business Intelligence, Data Engineering, AI & Machine Learning, Power Apps
// Master Multi-Domain Portfolio Registry

const BI_HUB_PROJECTS = [
  {
    id: "daily-mix-monitoring",
    title: "Daily Mix Monitoring",
    category: "production-planning",
    categoryName: "Production Planning",
    badge: "Production Scheduling",
    previewImages: ["assets/previews/daily_mix_top.png", "assets/previews/daily_mix_table.png"],
    previewLabels: ["Overview (KPI Strip & Alerts)", "Detail View (Performance Table)"],
    summary: "Compounding and mixing serve as the master heartbeat of the plant. If mixing output falls behind or schedules the wrong IP recipe, downstream tire building machines starve and halt. This real-time production command center tracks compound mixing volume, machine schedule adherence (Curing & Delivery Compliance Indices), and shift yield across three 8-hour crews.",
    outcome: "Eliminated downstream machine starvation risks by giving plant managers live, mid-shift visibility into priority recipe deficits. Shift handover meetings were compressed from 35 minutes of paperwork to 5 minutes of focused, data-driven decisions.",
    query_logic: [
      {
        fn: "CASE WHEN ... THEN ... END (Shift Bucketing)",
        why: "The factory runs three crews that straddle midnight. A simple calendar-day filter would break at shift boundaries, so CASE WHEN checks the hour of each timestamp and maps it into Shift 1, 2, or 3 before any aggregation happens."
      },
      {
        fn: "LEFT JOIN on recipe code (Plan vs. Actual Gap)",
        why: "Machine schedules live in one table, actual output lives in another. A LEFT JOIN on the shared tire-recipe identifier keeps every planned row visible — even when no actual output exists yet — so a zero achievement shows as 0%, not as a missing row."
      },
      {
        fn: "SUM + NULLIF (Net Yield Calculation)",
        why: "Dividing cumulative scrap by cumulative output risks a divide-by-zero during machine warm-up. NULLIF converts a zero denominator to NULL, which propagates gracefully instead of throwing an error."
      },
      {
        fn: "Template variable IN clause with 'All' bypass",
        why: "Multi-select dashboard filters generate a dynamic IN list. When the user picks 'All', evaluating thousands of possible values would be slow. Checking whether the literal string 'All' is in the selected list first short-circuits the query instantly."
      }
    ],
    tags: ["Production Planning", "Shift Reconciliation", "Starvation Prevention", "Schedule Adherence", "Dynamic Filtering"]
  },
  {
    id: "belts-stock-management",
    title: "Belts Stock Management",
    category: "traceability",
    categoryName: "Material Flow & Traceability",
    badge: "Inventory & Shelf-Life",
    previewImages: ["assets/previews/belts_cutters.png", "assets/previews/belts_machines.png"],
    previewLabels: ["Semi-Finishing Cutters & Slicing Line", "Tire Building Machines (VMI, CTBE, COPL)"],
    summary: "Semi-finished steel belt bobbins are coated with uncured green rubber subject to a strict 7-day chemical shelf-life. If bobbins sit unconsumed in buffer racks, the compound loses tackiness and must be scrapped at high material cost. This inventory visibility system monitors rack buffers across cutting stations and tire building machines, auditing barcode scans and tracking live expiration timestamps.",
    outcome: "Eliminated material expiration scrap completely by enforcing strict FIFO (First-In, First-Out) consumption. Operators now verify buffer availability and chemical shelf-life before starting machine changeovers, preventing stockouts and quality rejections.",
    query_logic: [
      {
        fn: "DATEADD / timestamp arithmetic (Expiry Projection)",
        why: "Rather than storing a separate expiry date column, the query adds exactly 7 days to the spooling timestamp at query time. This means the window recalculates live; no background job or manual update is required."
      },
      {
        fn: "CASE WHEN ... END (Urgency Classification)",
        why: "Three urgency bands — Safe, Near-Expiry (<24 h), and Expired — are derived in a single CASE block inside the SELECT. Splitting them into separate queries would require three round-trips; one CASE delivers all bands in one pass."
      },
      {
        fn: "CASE WHEN bobbin_barcode IS NOT NULL ... ELSE 'Missing' (Barcode Scan Audit)",
        why: "Not every stored card has been physically scanned. The CASE on the barcode column flags unscanned items as 'Missing' inline, so warehouse supervisors see a complete audit list rather than a silently smaller result set."
      },
      {
        fn: "JOIN on card identifier (WMS & Physical Scan Reconciliation)",
        why: "Two systems — the Warehouse Management System and the line scanner — write to separate tables. Joining them on the unique card ID produces a reconciled view; rows that exist in only one system expose discrepancies immediately."
      }
    ],
    tags: ["WMS Integration", "Chemical Shelf-Life", "Barcode Auditing", "FIFO Enforcement", "Material Flow"]
  },
  {
    id: "curing-moulds-mapping",
    title: "Curing Moulds Mapping",
    category: "digital-twin",
    categoryName: "Process Engineering & Digital Twin",
    badge: "Fleet Digital Twin",
    previewImages: ["assets/previews/curing_line_a.png", "assets/previews/curing_line_cd.png"],
    previewLabels: ["Presses Line A (Dual Cavity Matrix)", "Presses Line C & D Mapping"],
    summary: "The vulcanization department operates 89 dual-cavity hydraulic presses (Presses A0–A9, B0–B9, C, D). Each press houses two independent steel molds (Left & Right Cavities) engraved for specific tire dimensions and tread patterns. Molds are constantly reconfigured during recipe changeovers. This fleet digital twin maps mold mountings across all 89 press stations simultaneously.",
    outcome: "Eliminated manual floor inspections and tooling walk-throughs across the curing hall. Planning and process engineers instantly identify presses with matching molds for emergency changeovers, reducing changeover idle time by over 40 minutes per batch.",
    query_logic: [
      {
        fn: "CASE WHEN machine LIKE '%_L' / '%_R' (Dual-Cavity Pivoting)",
        why: "A single physical press writes two independent database rows (one for the Left cavity, one for the Right). Conditional aggregation pivots these two rows into a single side-by-side row per press, matching the physical layout on the factory floor."
      },
      {
        fn: "LEFT JOIN on mold master table (Enrichment)",
        why: "The live station table records only the mounted mold serial number. Joining to the mold catalog enriches each cavity with tire dimensions, pattern family, and production tier without storing redundant columns in the active station table."
      },
      {
        fn: "REGEXP_REPLACE / SUBSTRING (Cavity Identifier Normalization)",
        why: "Different machine generations record press identifiers inconsistently ('A01_L' vs 'A1-LEFT'). String normalization cleans both variants into a uniform 'A1 - Left' format, preventing broken joins across older and newer press lines."
      },
      {
        fn: "COALESCE on active production run (Fallback Handling)",
        why: "When a cavity is under maintenance or between jobs, the production run ID is NULL. COALESCE replaces NULL with 'IDLE / SETUP', ensuring the UI card renders with an informative status badge rather than blank space."
      }
    ],
    tags: ["Digital Twin", "Dual-Cavity Mapping", "Press Scheduling", "Tooling Traceability", "Process Engineering"]
  },
  {
    id: "uniformity-analytics",
    title: "Uniformity Dashboard",
    category: "quality",
    categoryName: "Quality Analytics & Defect Triage",
    badge: "Harmonics & Root-Cause",
    previewImages: ["assets/previews/uniformity_harmonics.png", "assets/previews/uniformity_machines.png"],
    previewLabels: ["Class E Details & OE% Compliance", "Machine Classification Summary"],
    summary: "Uniformity is the ultimate measure of ride quality, durability, and safety in commercial radial tires. Every cured tire is spun on high-speed Uniformity Testing Machines (TU) to measure dynamic force variations: Radial Force Variation (RFV), Lateral Force Variation (LFV), and Conicity. This command center monitors testing throughput, OE manufacturer compliance, and traces harmonic defects back to the building machines.",
    outcome: "Pinpointed specific tire building machines and assembly drums causing elevated RFV harmonics before defect thresholds breached OE customer specifications, averting high-value lot rejections and scrap.",
    query_logic: [
      {
        fn: "INNER JOIN on tire barcode (Harmonics to Builder Attribution)",
        why: "Testing machines measure physical forces; building machines record mechanical assembly parameters. Joining on the unique tire barcode bridges test results back to the exact Tire Building Machine, drum tooling, and operator who built that green tire."
      },
      {
        fn: "AVG + STDDEV window functions (Outlier Detection)",
        why: "Average force alone masks spikes. Computing the rolling mean and standard deviation over the last 100 tires per machine identifies when a drum starts drifting mechanically before it produces out-of-spec Class E defects."
      },
      {
        fn: "CASE WHEN (conicity > threshold) THEN 'Conicity' ... (Defect Classification)",
        why: "Tires that fail uniformity can exceed limits in RFV, LFV, or conicity independently or simultaneously. A multi-condition CASE categorizes each failure by its primary harmonic driver, directing technicians to the right mechanical fix."
      },
      {
        fn: "Multi-select machine array filter (Comparative Machine Benchmarking)",
        why: "Quality engineers need to compare suspected building machines side-by-side. The dashboard injects a parameterized array of machine IDs into the WHERE clause, rendering comparative compliance curves across selected machines simultaneously."
      }
    ],
    tags: ["Quality Engineering", "Dynamic Harmonics", "Root-Cause Analysis", "Machine Benchmarking", "Defect Triage"]
  },
  {
    id: "maintenance-breakdown",
    title: "Maintenance Breakdown",
    category: "maintenance",
    categoryName: "Asset Reliability & Downtime Analytics",
    badge: "MTBF & MTTR | WCM",
    previewImages: ["assets/previews/maintenance_top.png", "assets/previews/maintenance_bottom.png"],
    previewLabels: ["Factory Check Panel (8 Departments)", "Monthly Breakdown Trends"],
    summary: "Across a 24/7 tire plant with Banbury mixers, calenders, extruders, building machines, and curing presses, unplanned machine stoppages immediately degrade production output. This command center aggregates downtime across all 8 factory departments, categorizing stops by World Class Manufacturing (WCM) loss taxonomy to compute MTBF, MTTR, and line availability %.",
    outcome: "Provided engineering leadership with an objective 80/20 Pareto loss deployment model. Maintenance teams transitioned from reactive emergency repairs to targeted preventive interventions on chronic failure modes, recovering over 120 hours of machine availability annually.",
    query_logic: [
      {
        fn: "SUM(duration_minutes) / NULLIF(COUNT(stoppage_id), 0) (MTTR)",
        why: "Mean Time To Repair is total downtime divided by the number of breakdown events. Wrapping the event count in NULLIF prevents division-by-zero during shifts with zero breakdowns, returning NULL instead of crashing the dashboard panel."
      },
      {
        fn: "(Total Operating Hours - Downtime) / Failure Count (MTBF Calculation)",
        why: "Mean Time Between Failures reflects true machine reliability. The query computes net uptime across the selected calendar window and divides by breakdown frequency to show reliability degradation trends month-over-month."
      },
      {
        fn: "CASE WHEN breakdown_type IN (...) (WCM Loss Taxonomy)",
        why: "Raw logs contain dozens of maintenance codes. A CASE expression maps them into standardized WCM loss pillars — Breakdown, Minor Stoppage, Speed Loss, or Setup/Adjustment — enabling structured loss deployment."
      },
      {
        fn: "Window function SUM() OVER (PARTITION BY dept ORDER BY duration DESC) (Pareto)",
        why: "To identify the 'vital few' failure causes, an analytical window function computes running cumulative downtime percentages per department, highlighting the top 20% of root causes responsible for 80% of lost hours."
      }
    ],
    tags: ["Reliability Engineering", "MTBF & MTTR", "WCM Loss Deployment", "Availability Analytics", "Preventive Maintenance"]
  },
  {
    id: "hr-connected-suite",
    title: "Connected HR Analytics Suite",
    category: "enterprise",
    categoryName: "Workforce & Human Capital Governance",
    badge: "6-Dashboard Suite",
    previewImages: ["assets/previews/hr_executive.png", "assets/previews/hr_headcount_ot.png"],
    previewLabels: ["HR Executive & Demographics", "Headcount & Overtime Analytics"],
    summary: "Plant throughput depends directly on technical labor availability, shift coverage, and labor cost containment. Unmonitored overtime and turnover in specialized technical trades threaten delivery schedules. This suite provides unified governance across six HR domains (Compensation & Benefits, OD, Employee Relations, Training, Legal, Security) covering 1,380+ employees.",
    outcome: "Replaced static monthly slide decks with live workforce intelligence. Department heads actively contain overtime expenditures through drill-down visibility, while demographic and seniority tracking enabled early succession planning for critical technical trades years before retirement.",
    query_logic: [
      {
        fn: "Normalized KPI table with KPI-type column (Unified Metric Store)",
        why: "Rather than six separate tables for headcount, overtime, turnover, training hours, grievances, and security incidents, all metrics live in one table tagged by KPI type. Any dashboard queries the same table with a simple WHERE KPI = '...' filter — one schema, six perspectives."
      },
      {
        fn: "DISTINCT + multi-column GROUP BY (Job-Family Drill-Down)",
        why: "Overtime percentage must be displayed simultaneously at total-plant level and per job family. Querying DISTINCT combinations of Job_Family and the KPI value, then filtering out the 'Total' sentinel row in the dashboard variable, avoids double-counting while keeping both aggregation levels available."
      },
      {
        fn: "JOIN hire history to departure dates (Tenure & Attrition Calculation)",
        why: "Employee age and tenure are not stored columns — they are derived by subtracting the hire date from today's date. Joining the hire record to the optional departure date means current employees get a live tenure, and departed employees get a fixed final tenure, using a single query."
      },
      {
        fn: "IN ($Month, $Year) variable injection (Period Slicing)",
        why: "Filtering by month and year through template variables converts a single query into a flexible time-slice engine. Because Month and Year are stored as separate integer columns (not a combined date), filtering them independently avoids costly date-parsing on large roster tables."
      }
    ],
    tags: ["Workforce Analytics", "Normalized Metric Schema", "Tenure Calculation", "Cross-Dashboard Navigation", "Human Capital Governance"]
  }
];

const AI_ML_PROJECTS = [
  {
    id: "polyshield-pe-ai-detection",
    title: "PolyShield: Real-Time Edge AI Defect Detection & Closed-Loop Automation",
    category: "computer-vision",
    categoryName: "Computer Vision & Edge AI",
    badge: "DEPLOYED & LIVE",
    previewImages: [
      "assets/previews/polyshield_live_ui.jpg",
      "assets/previews/polyshield_flow.jpg"
    ],
    previewLabels: [
      "Live 3-Model Cascade Dashboard",
      "Technical Flow & Material Stream"
    ],
    videoUrl: "assets/videos/polyshield_demo.mp4",
    videoPoster: "assets/previews/polyshield_live_ui.jpg",
    videoNoticeTitle: "Live Edge AI Industrial Demonstration",
    videoNoticeDesc: "Inline high-speed camera feed showing real-time Polyethylene (PE) bounding box detection, automated conveyor pause, and alert stacklight triggers.",
    summary: "During industrial tire component preparation, uncured rubber sheets are interleaved with protective polymer separator liners. If residual liner fragments adhere to moving rubber strips and enter high-temperature curing presses, the polymer fails to form chemical cross-links with the rubber matrix, creating an internal delamination plane that can cause severe structural tread peel or in-service failure. PolyShield is an edge-deployed, 3-stage cascaded deep learning vision and PLC automation system providing continuous inline inspection at >30–60+ FPS with sub-35ms inference latency.",
    outcome: "Successfully deployed 24/7 autonomous inline computer vision on production conveyor lines, achieving >99.2% defect recall and 99.26% mAP50 while maintaining a <0.1% false-positive rate. Established closed-loop PLC automation that immediately halts the conveyor line upon confirmed defect detection, eliminating cured tire delamination scrap and replacing error-prone manual visual inspection with reliable edge intelligence.",
    ai_pipeline: [
      {
        component: "Threaded RTSP Stream Ingestion (cv2.CAP_PROP_BUFFERSIZE = 1)",
        detail: "Decoupled daemon worker continuously runs OpenCV frame capture with low-latency FFmpeg parameters, keeping the buffer size at 1 to eliminate frame drift and latency buildup on continuous 15–45 m/min rubber festoon conveyors."
      },
      {
        component: "Stage 1: Material Segmentation (seg_model.pt @ CONF=0.35)",
        detail: "Segments the exact rubber polygon and paints all external background machinery (metal rollers, chains, floor) to solid black (RGB 0,0,0), eliminating false alarms from factory ambient lighting glare and shiny mechanical reflections."
      },
      {
        component: "Safety Interlock: Human-in-ROI Operator Detection",
        detail: "Real-time human presence model detects when line operators reach into the festoon area to adjust roll tension or splices. When detected, the pipeline automatically flags 'Operator in View - Frame Skipped', safely avoiding false defect alarms."
      },
      {
        component: "Stage 2: Classifier Fast Early-Exit (cls_model.pt @ CONF=0.80)",
        detail: "Evaluates the segmented rubber crop at 100% Top-1 accuracy in ~2.2 ms. If the crop is predicted clean with >= 80% confidence, the frame bypasses Stage 3 detection entirely, maximizing system throughput and maintaining high FPS."
      },
      {
        component: "Stage 3: Strict YOLO11n Defect Detection (det_model.pt @ CONF=0.45)",
        detail: "Retrained on hard negative glare frames (achieving 98.60% precision and 99.26% mAP50), executing bounding box localization on suspect frames to detect clear, semi-transparent, and colored PE fragments down to millimeter scale."
      },
      {
        component: "Multi-Frame Temporal Consensus & Hysteresis Lockout",
        detail: "Requires 3 consecutive confirmed defect frames (attack_threshold = 3) to trigger alarms, filtering out transient optical noise. Includes a 120-frame (~4s) hysteresis lockout to prevent duplicate counts on the same passing fragment, plus a ghost inversion filter."
      },
      {
        component: "Closed-Loop PLC Hardware Interlock (python-snap7)",
        detail: "Non-blocking background thread with 0.00ms main loop overhead. Continuously reads machine running status, triggers automated line-pause and stacklight warning relays upon defect confirmation, and logs real-time conveyor meter counts."
      }
    ],
    tags: ["Edge AI", "Computer Vision", "YOLO11", "Deep Learning", "PLC Automation", "Industrial IoT", "Zero-Defect Quality"]
  },
  {
    id: "tread-recycle-ai-counter",
    title: "TreadCycle: Real-Time Recycled Tread Counting & Extrusion Telemetry",
    category: "computer-vision",
    categoryName: "Computer Vision & Edge AI",
    badge: "DEPLOYED & LIVE",
    previewImages: [
      "assets/previews/tread_recycle_live.jpg",
      "assets/previews/tread_recycle_preview.svg"
    ],
    previewLabels: [
      "Live Inline Inference & Chute Tracking",
      "Virtual Tripwire System Flow"
    ],
    videoUrl: "assets/videos/recycle_count.mp4",
    videoPoster: "assets/previews/tread_recycle_live.jpg",
    videoNoticeTitle: "Live Inline Optical Tallying Demonstration",
    videoNoticeDesc: "Real-time production feed showing folded recycle tread detection, unique ID tracking, and virtual crossing tripwire tallying.",
    summary: "During continuous rubber extrusion, off-spec tread ends, profile changeover strips, and startup sections are folded by line operators and routed into recycling bins for re-milling. Previously, operators manually tallied recycled tread pieces on paper clipboards while simultaneously handling line controls and extruder feeding, leading to estimated inventory counts, delayed reporting, and unmonitored compound loss. TreadCycle is an inline edge computer vision system that autonomously detects, tracks, and tallies folded recycled tread pieces live during active production using YOLO object detection, a virtual optical crossing threshold (tripwire), and machine PLC synchronization.",
    outcome: "Achieved ≥98% counting accuracy on high-speed extrusion lines, completely automating 100% of manual counting labor and reallocating operators to core machine tuning. Provided real-time recycle generation metrics synchronized with extruder process parameters (line speed, compound recipe, temperature), enabling data-driven root-cause reduction of scrap spikes.",
    ai_pipeline: [
      {
        component: "Live Conveyor Video Feed Ingestion",
        detail: "Captures continuous high-speed video frames focused on the operator recycle folding station and discharge conveyor without disrupting line operations."
      },
      {
        component: "YOLO Folded-Tread Object Detection",
        detail: "Custom-trained YOLO object detection model trained on operator handling behavior to distinguish folded recycled tread pieces from regular flat uncured rubber strips and passing machinery."
      },
      {
        component: "Virtual Optical Tripwire & Crossing Vector Logic",
        detail: "Establishes a dynamic spatial threshold line in the frame. When the centroid of a detected folded piece crosses the directional boundary vector, an increment event (count += 1) is registered with directional tracking."
      },
      {
        component: "Temporal Tracking & Hysteresis Deduplication",
        detail: "Maintains object track IDs across sequential frames to ensure each physical folded piece is tallied exactly once as it moves past the camera FOV, preventing double-counts during conveyor speed variations."
      },
      {
        component: "Two-Way Industrial PLC Synchronization",
        detail: "Connects directly to the extrusion line PLC to capture concurrent process telemetry (line speed, melt temperature, head pressure, active recipe ID) at the exact timestamp of each recycle event."
      },
      {
        component: "Real-Time Telemetry & Root-Cause Mapping",
        detail: "Streams live tally counts and parameter correlations to operational dashboards, replacing post-shift paper logs with instant visibility into scrap generation trends."
      }
    ],
    tags: ["Computer Vision", "YOLO", "Virtual Tripwire", "Edge AI", "PLC Telemetry", "Material Accounting", "Scrap Reduction", "Extrusion Line"]
  },
  {
    id: "maintenance-llm-rag-copilot",
    title: "Maintenance Copilot: Industrial GenAI Troubleshooting Agent & Technical RAG",
    category: "genai-nlp",
    categoryName: "Generative AI & LLM Agents",
    badge: "DEPLOYED & LIVE",
    previewImages: [
      "assets/previews/llm_maintenance_live.jpg",
      "assets/previews/llm_maintenance_preview.svg"
    ],
    previewLabels: [
      "Live Chatbot Interface & Diagnostic Response",
      "GenAI & RAG Vector Architecture"
    ],
    videoUrl: "assets/videos/maintenance_llm_agent.mp4",
    videoPoster: "assets/previews/llm_maintenance_live.jpg",
    videoNoticeTitle: "Interactive Troubleshooting Assistant Demo",
    videoNoticeDesc: "Live session showing natural language diagnostic queries, error code correlation, and cited PDF schematic retrieval via RAG.",
    summary: "During industrial machine breakdowns, line operators and junior technicians previously lost 20 to 45 minutes searching through thousands of pages of physical binders, complex OEM electrical schematics, and static PDF technical manuals to identify specific PLC alarm codes and corrective actions. Maintenance Copilot is a conversational Generative AI assistant powered by the Gemini API, LangChain, and Retrieval-Augmented Generation (RAG). Operators query the assistant in natural language about active error codes or machine symptoms, and the system instantly retrieves correlated technical documentation, electrical schematics, and verified step-by-step remediation procedures.",
    outcome: "Reduced machine diagnostic lookup time from 25–40 minutes down to under 15 seconds, significantly decreasing Mean Time To Repair (MTTR) across critical production assets. Democratized specialized equipment troubleshooting across all three operating shifts, eliminating dependence on senior specialist availability while ensuring 100% grounded answers with exact manual page citations.",
    ai_pipeline: [
      {
        component: "Multi-Source Document Ingestion & Chunking",
        detail: "Ingests complex OEM equipment manuals, P&ID schematics, PLC alarm dictionaries, and past work-order histories using LangChain semantic chunking with overlapping boundaries to preserve technical context."
      },
      {
        component: "Dense Vector Embeddings & Semantic Indexing",
        detail: "Transforms technical chunks into high-dimensional vector embeddings, indexed in a vector store for fast cosine-similarity search across technical jargon, error code identifiers, and mechanical symptoms."
      },
      {
        component: "Retrieval-Augmented Generation (RAG) Engine",
        detail: "When an operator inputs an error code (e.g., 'Hydraulic Valve Pressure Error F-204'), the engine executes top-k hybrid similarity search to retrieve the exact corresponding OEM manual sections and schematic diagrams."
      },
      {
        component: "Context Synthesis via Gemini API & Prompt Guardrails",
        detail: "Feeds retrieved manual excerpts into Gemini with strict grounding system instructions: answers must be purely factual, step-by-step, prioritized by safety lockout/tagout rules, and cite verified manual page references."
      },
      {
        component: "Conversational LangChain Agent & Multi-Turn Diagnostics",
        detail: "Maintains conversational session state so operators can troubleshoot interactively (e.g., 'Checked valve YV-12, voltage is 24V but coil is not actuating'), guiding technicians dynamically through secondary diagnostic trees."
      }
    ],
    tags: ["Generative AI", "LLM Agent", "RAG", "Gemini API", "LangChain", "Vector Embeddings", "Industrial Maintenance", "Downtime Reduction"]
  }
];

const DATA_ENGINEERING_PROJECTS = [
  {
    id: "dremio-semantic-lakehouse",
    title: "Enterprise Semantic Lakehouse & Dremio Architecture",
    category: "lakehouse",
    categoryName: "Lakehouse & Semantic Layer",
    badge: "Semantic Data Lake",
    previewImages: [],
    previewLabels: [],
    summary: "Disparate plant systems (SAP ERP, Rockwell MES, Quality Lab LIMS, and SCADA historians) stored data in isolated database silos with inconsistent schemas and timestamps. This enterprise data architecture established a centralized semantic layer using Dremio and SQL virtualization, connecting raw plant databases into governed virtual datasets without costly, fragile data duplication.",
    outcome: "Reduced analytical query runtimes by over 70% using Dremio Apache Arrow Reflections. Delivered a unified semantic layer that powers all plant Grafana dashboards and executive reporting from a single source of truth.",
    query_logic: [
      {
        fn: "Virtual Datasets (VDS) vs Physical Datasets (PDS)",
        why: "Separates underlying storage mechanics from business logic. Analytical consumers query clean, business-friendly Virtual Datasets while physical tables can be migrated or partitioned without breaking reports."
      },
      {
        fn: "Apache Arrow Data Reflections & Acceleration",
        why: "Creates pre-computed columnar aggregations and partitions in memory, accelerating complex multi-table joins from 45 seconds down to sub-second responses."
      },
      {
        fn: "Cross-Database Federated Joins",
        why: "Seamlessly joins live Oracle manufacturing execution tables with SQL Server ERP inventory tables directly within the semantic engine without ETL staging."
      }
    ],
    tags: ["Data Architecture", "Dremio", "Apache Arrow", "Semantic Layer", "Data Virtualization", "Data Modeling"]
  },
  {
    id: "iot-telemetry-streaming-pipeline",
    title: "Real-Time OPC-UA Telemetry Streaming Ingestion",
    category: "streaming",
    categoryName: "Streaming & IoT Ingestion",
    badge: "Streaming Ingestion",
    previewImages: [],
    previewLabels: [],
    summary: "Hundreds of programmable logic controllers (PLCs) across extruders, calenders, and curing presses generate continuous high-frequency operational signals. This telemetry ingestion pipeline captures machine parameters via industrial OPC-UA servers, performs windowed deduplication, timestamp synchronization, and loads clean time-series data into analytical storage.",
    outcome: "Engineered zero-loss streaming ingestion processing over 1.2 million sensor events per hour with sub-second transmission to edge monitoring dashboards.",
    query_logic: [
      {
        fn: "OPC-UA Tag Polling & Event-Driven Publish/Subscribe",
        why: "Subscribes to PLC tags on-change with high-frequency heartbeats, minimizing network bandwidth while capturing instantaneous machine state changes."
      },
      {
        fn: "Tumbling Window Deduplication & Timestamp Alignment",
        why: "Machine PLCs occasionally send redundant packets or slight clock drift. Sliding window aggregations normalize all incoming telemetry onto unified 1-second UTC intervals."
      },
      {
        fn: "Deadband Compression & Noise Filtering",
        why: "Filters out sensor jitter within a 0.5% tolerance band, reducing storage footprint by 65% while retaining complete fidelity for anomaly spikes."
      }
    ],
    tags: ["OPC-UA", "IoT Telemetry", "Streaming Pipelines", "Time-Series", "Industrial Automation", "Data Engineering"]
  },
  {
    id: "automated-scrap-yield-pipeline",
    title: "Automated Shopfloor Yield & Scrap Reconciliation Pipeline",
    category: "batch-etl",
    categoryName: "Batch ETL & Data Pipelines",
    badge: "Automated ETL",
    previewImages: [],
    previewLabels: [],
    summary: "Plant yield calculations previously required manual spreadsheet downloads from MES and scrap tallies from quality logs, leading to reconciliations that lagged production by 24 hours. This automated batch ETL pipeline extracts, transforms, and loads production counts, scrap declarations, and rework tickets at the close of every 8-hour shift.",
    outcome: "Eliminated 100% of manual reporting spreadsheets, giving plant management automated, certified yield figures within 15 minutes of shift handover.",
    query_logic: [
      {
        fn: "Idempotent Incremental Upsert Logic (MERGE / ON CONFLICT)",
        why: "Ensures pipeline runs can be re-executed safely without duplicating production counts or inflating scrap totals during network hiccups."
      },
      {
        fn: "Automated Data Quality Validation & Anomaly Checks",
        why: "Validates incoming batch totals against theoretical machine cycle limits. Any batch reporting >105% theoretical output is automatically quarantined for audit."
      },
      {
        fn: "Automated Shift Crew Calendar Allocation",
        why: "Translates raw timestamps into factory rotating shift schedules, handling daylight savings and leap day adjustments automatically."
      }
    ],
    tags: ["ETL Pipelines", "Data Quality", "Automated Reconciliation", "SQL Pipelines", "Yield Analytics", "Batch Processing"]
  }
];

const POWER_APPS_PROJECTS = [
  {
    id: "overtime-work-log-manager",
    title: "Engineering Work Logs & Overtime Management App",
    category: "workforce-hr",
    categoryName: "Workforce & HR Operations",
    badge: "DEPLOYED & LIVE",
    previewImages: [
      "assets/previews/overtime_app_mobile.png",
      "assets/previews/overtime_analysis_dashboard.jpg",
      "assets/previews/overtime_submission_form.jpg"
    ],
    previewLabels: [
      "Mobile Portal & Quick Actions",
      "Interactive Work Logs Analysis",
      "Work Log Requisition Form"
    ],
    videoUrl: "assets/videos/overtime_management_app.mp4",
    videoPoster: "assets/previews/overtime_app_mobile.png",
    videoNoticeTitle: "Interactive Canvas App Workflow Demonstration",
    videoNoticeDesc: "Live mobile and desktop walkthrough showing work log submission, Teams/Outlook integration links, and multi-dimensional analysis with CSV export.",
    summary: "In fast-paced engineering and plant operations, engineers and project leads frequently undertake emergency off-shift interventions, machine calibration trials, and collaborative initiatives with external engineering partners. Historically, project hours, overtime requests, and partner engagements were logged across ad-hoc spreadsheets and physical sign-in sheets. This fragmented process created significant administrative delays at monthly payroll cutoffs, misallocated project costs, and provided zero real-time visibility for leadership into active engineering bandwidth.",
    outcome: "Eliminated paper timesheets and manual spreadsheets across engineering teams, establishing 100% digital submission compliance with instant supervisor verification. Reduced monthly payroll and project hour reconciliation turnaround from 5 business days to under 2 hours, while delivering real-time department analytics across individual workloads, project allocations, and billable partner hours with automated CSV financial exports.",
    query_logic_title: "&#128736;&#65039; Architecture & Technical Implementation",
    query_logic_desc: "Key Canvas App design patterns, SharePoint relational schema, Power Automate flows, and in-memory aggregation mechanics:",
    query_logic: [
      {
        fn: "Relational SharePoint Lists Schema & Role-Based Views",
        why: "Architected normalized SharePoint lists separating Employee Directory, Active Projects Master, and Transactional Work Logs. Role-based security dynamically filters UI views: engineers submit logs and track personal hours, while team leads access aggregate department KPIs and project breakdowns."
      },
      {
        fn: "Power Automate Automated Notifications & Approvals",
        why: "Configured automated cloud flows triggered upon work log submission to send structured HTML email summaries to project leads and direct managers, with conditional alerting when project hours approach statutory or budget limits."
      },
      {
        fn: "Client-Side In-Memory Collections & Multi-Pivot Analytics",
        why: "Utilized ClearCollect and AddColumns in Power Fx to calculate real-time aggregations (Total Hours, Log Entries, Active Members) on device, enabling instant toggling between 'By Person' and 'By Project' views without server round-trips."
      },
      {
        fn: "Direct Deep-Linking & Automated CSV Export",
        why: "Integrated native protocol deep-links to launch correlated Microsoft Teams chats and Outlook email threads directly from log items, plus one-click CSV generation for direct upload into enterprise ERP and payroll systems."
      }
    ],
    tags: ["Power Apps", "Power Platform", "Canvas App", "SharePoint Lists", "Power Automate", "Workforce Management", "Mobile UX", "Process Digitalization"]
  },
  {
    id: "external-repair-tracking-app",
    title: "External Equipment Repair & Digital Gate Pass Management App",
    category: "maintenance-repair",
    categoryName: "Maintenance & Asset Logistics",
    badge: "DEPLOYED & LIVE",
    previewImages: [
      "assets/previews/external_repair_portal.png",
      "assets/previews/external_repair_form.jpg",
      "assets/previews/external_repair_preview.jpg"
    ],
    previewLabels: [
      "Department Navigation Hub",
      "Repair Requisition Form",
      "Asset Dispatch Ledger"
    ],
    videoUrl: "assets/videos/external_repair_app.mp4",
    videoPoster: "assets/previews/external_repair_portal.png",
    videoNoticeTitle: "External Repair App Interface Demonstration",
    videoNoticeDesc: "Walkthrough of repair item registration, vendor assignment, requisition permit generation, and bilingual interface.",
    summary: "Heavy industrial equipment, high-precision motors, electronic drives, and specialized tooling frequently require dispatch to specialized off-site vendor workshops for precision machining, motor rewinding, or calibration. Previously managed through carbon-copy paper permits and informal phone calls, items were vulnerable to loss, delayed vendor turnaround, untracked warranty claims, and significant gatehouse security bottlenecks upon plant exit and return.",
    outcome: "Digitized 100% of external equipment repair dispatches, eliminating paper gate passes and achieving zero lost repair items across all shifts. Reduced gate turnaround processing time by 85% with pre-authorized digital permits and established full audit traceability with automated vendor SLA turnaround reminders.",
    query_logic_title: "&#128736;&#65039; Architecture & Technical Implementation",
    query_logic_desc: "Key multi-department workflows, SharePoint schema, security controls, and automated gate pass generation:",
    query_logic: [
      {
        fn: "Multi-Department Modular Hub & Bilingual UI",
        why: "Architected responsive role-specific workspaces for Engineering (requisition & technical specs), Warehouse (packaging & shipping), and Security (gate sign-off), featuring a dynamic English / Arabic language toggle for shopfloor accessibility."
      },
      {
        fn: "SharePoint Enterprise Asset & Permit Ledger",
        why: "Engineered a relational SharePoint data structure indexing unique Permit Numbers, Equipment Serial Numbers, Purchase Orders (PO), Purchase Requisitions (PR), and vendor workshop masters with attachment support for vendor quotes and condition photos."
      },
      {
        fn: "Power Automate Approval & Security Dispatch Flows",
        why: "Multi-stage approval workflow routes requisitions from Head Engineer to Procurement for purchase authorization, then auto-generates a formatted digital gate pass with printable dispatch credentials delivered directly to the plant security checkpoint."
      },
      {
        fn: "Overdue SLA Alerts & Closed-Loop Gate Re-Entry Reconciliation",
        why: "Scheduled recurrence flows monitor expected repair return dates and broadcast automated reminder notices to vendor managers, while gate security logs verify physical item return to automatically close the requisition."
      }
    ],
    tags: ["Power Apps", "Canvas App", "SharePoint Lists", "Power Automate", "Asset Management", "Gate Pass", "Security & Logistics", "Bilingual UI"]
  },
  {
    id: "transportation-fleet-reservation-app",
    title: "Plant Fleet & Shift Transportation Reservation App",
    category: "logistics-fleet",
    categoryName: "Logistics & Plant Services",
    badge: "DEPLOYED & LIVE",
    previewImages: [
      "assets/previews/transportation_reservation_preview.jpg",
      "assets/previews/transportation_app_preview.jpg"
    ],
    previewLabels: [
      "Shuttle & Emergency Booking Screen",
      "Booking Confirmation & Summary"
    ],
    videoUrl: "assets/videos/transportation_reservation_app.mp4",
    videoPoster: "assets/previews/transportation_reservation_preview.jpg",
    videoNoticeTitle: "Mobile Fleet Reservation Demonstration",
    videoNoticeDesc: "Live mobile screen capture showing shift shuttle selection, destination routing, proxy booking for colleagues, and instant confirmation.",
    summary: "Operating a 24/7 industrial facility requires safe, dependable transportation logistics for shift engineers, production operators, and on-call maintenance teams across multiple rotating shift cycles. Previously, staff booked shuttles through clipboard sign-ups or ad-hoc phone calls to dispatchers. This lack of coordination caused vehicle overcrowding, missed connections, excessive unbudgeted emergency taxi expenditures, and zero operational insight into route demand.",
    outcome: "Achieved 100% digital reservation adoption across plant shifts, eliminating vehicle double-booking and optimizing shuttle capacity utilization by 35%. Reduced emergency transport approval time from 45 minutes to under 2 minutes through automated manager workflows and provided logistics managers with data-driven route occupancy analytics.",
    query_logic_title: "&#128736;&#65039; Architecture & Technical Implementation",
    query_logic_desc: "Key mobile components, SharePoint list design, capacity validation algorithms, and Power Automate flows:",
    query_logic: [
      {
        fn: "Mobile-First Responsive UI with One-Tap Shift Selection",
        why: "Built a lightweight mobile interface with dedicated quick-tabs for recurring shift departure schedules (e.g., 6:30 PM, 8:00 PM), on-call emergency transit, and an administrative dispatch view, allowing staff to book in under 10 seconds."
      },
      {
        fn: "Dynamic Route Stations & Proxy Booking Engine",
        why: "Cascading dropdowns filter pickup points, drop-off destinations, and assigned shift timetables based on user profile, while allowing supervisors to reserve on behalf of team members via 'Book for another one' delegate functionality."
      },
      {
        fn: "Real-Time Capacity Check & SharePoint List Backend",
        why: "Validates available vehicle seat quotas against real-time passenger manifests in SharePoint before committing bookings, preventing vehicle overbooking and logging passenger manifests for driver tablets."
      },
      {
        fn: "Power Automate Instant Notifications & Emergency Approvals",
        why: "Cloud flows instantly deliver branded reservation confirmation notifications to users and dispatchers; emergency off-shift travel requests automatically route to direct managers via actionable emails for 1-click authorization."
      }
    ],
    tags: ["Power Apps", "Canvas App", "SharePoint Lists", "Power Automate", "Fleet Management", "Transportation Logistics", "Mobile Apps", "Process Optimization"]
  }
];

const PORTFOLIO_DOMAINS = {
  "bi-analytics": {
    id: "bi-analytics",
    name: "BI & Analytics",
    chip: "Decision Intelligence",
    title: "Operational Analytics &<br><span class=\"gradient-text\">Decision Intelligence</span>",
    sub: "Production intelligence, predictive asset health, and executive operations systems.",
    kpis: [
      { n: "11+", l: "Live Dashboards" },
      { n: "200+", l: "SQL Queries" },
      { n: "6", l: "Core Domains" },
      { n: "24/7", l: "Real-Time Telemetry" }
    ],
    categories: [
      { id: "all", name: "All" },
      { id: "production-planning", name: "Production" },
      { id: "traceability", name: "Traceability" },
      { id: "digital-twin", name: "Digital Twin" },
      { id: "quality", name: "Quality" },
      { id: "maintenance", name: "Maintenance" },
      { id: "enterprise", name: "Workforce" }
    ],
    projects: BI_HUB_PROJECTS
  },
  "ai-ml": {
    id: "ai-ml",
    name: "AI & Machine Learning",
    chip: "Applied AI & Edge Vision",
    title: "Edge Computer Vision &<br><span class=\"gradient-text\">Applied Machine Learning</span>",
    sub: "Real-time deep learning vision, automated inline tracking, and GenAI troubleshooting agents.",
    kpis: [
      { n: "3", l: "Deployed Systems" },
      { n: "<15s", l: "GenAI Diagnostics" },
      { n: "≥98%", l: "Counting Accuracy" },
      { n: ">99.2%", l: "Defect Recall" }
    ],
    categories: [
      { id: "all", name: "All" },
      { id: "computer-vision", name: "Computer Vision & Edge AI" },
      { id: "genai-nlp", name: "Generative AI & LLM Agents" }
    ],
    projects: AI_ML_PROJECTS
  },
  "data-engineering": {
    id: "data-engineering",
    name: "Data Engineering",
    chip: "Data Infrastructure",
    title: "Data Pipelines &<br><span class=\"gradient-text\">Lakehouse Architecture</span>",
    sub: "Resilient ETL/ELT data pipelines, streaming ingestion, and high-performance semantic layers.",
    kpis: [
      { n: "70%", l: "Query Acceleration" },
      { n: "1.2M+", l: "Events / Hour" },
      { n: "100%", l: "Automated ETL" },
      { n: "Zero", l: "Data Loss" }
    ],
    categories: [
      { id: "all", name: "All" },
      { id: "lakehouse", name: "Lakehouse & Semantic Layer" },
      { id: "streaming", name: "Streaming & IoT" },
      { id: "batch-etl", name: "Batch ETL & Pipelines" }
    ],
    projects: DATA_ENGINEERING_PROJECTS
  },
  "power-apps": {
    id: "power-apps",
    name: "Power Apps",
    chip: "Low-Code Digitalization",
    title: "Enterprise Power Apps &<br><span class=\"gradient-text\">Process Automation</span>",
    sub: "Mobile-first Canvas apps, relational SharePoint architectures, and automated multi-tier approval flows.",
    kpis: [
      { n: "3", l: "Deployed Apps" },
      { n: "100%", l: "Paperless Workflows" },
      { n: "<2 min", l: "Automated Approvals" },
      { n: "Zero", l: "Lost Assets / Errors" }
    ],
    categories: [
      { id: "all", name: "All" },
      { id: "workforce-hr", name: "Workforce & Operations" },
      { id: "maintenance-repair", name: "Maintenance & Logistics" },
      { id: "logistics-fleet", name: "Fleet & Services" }
    ],
    projects: POWER_APPS_PROJECTS
  }
};

if (typeof window !== 'undefined') {
  window.BI_HUB_PROJECTS = BI_HUB_PROJECTS;
  window.PORTFOLIO_DOMAINS = PORTFOLIO_DOMAINS;
}
