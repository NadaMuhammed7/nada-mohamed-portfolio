# 🔄 Case Study 8: TreadCycle — Real-Time Recycled Tread Counting & Extrusion Telemetry

- **Domain**: Advanced Manufacturing, Rubber Extrusion, Inline Edge AI & Material Accounting
- **Deployment Status**: **PRODUCTION DEPLOYED & LIVE**
- **Architecture**: Custom YOLO Object Detection + Virtual Optical Tripwire (Crossing Threshold) + Multi-Object Tracking
- **Industrial Automation**: Two-Way Machine PLC Integration (Process Parameter Synchronization)
- **Deployment Line**: Semi-Finishing Continuous Extrusion Line

---

## 📌 Situation: Problem Statement & Industrial Bottleneck

During continuous industrial rubber extrusion, off-spec tread ends, profile changeover strips, and startup sections are folded by line operators and routed into recycling bins for re-milling into base compounds:

1. **Manual Labor Drain & Fatigue:**
   - Operators were forced to manually tally recycled tread pieces on paper clipboards while simultaneously managing feed roll tension, extruder temperature profiles, and line speeds.
2. **Inaccurate Material Accounting & Delayed Reporting:**
   - Shift counts were based on rough operator estimates compiled post-shift, leading to inventory discrepancies and delayed visibility into compound waste spikes.
3. **Absence of Root-Cause Traceability:**
   - Because manual tallies were disconnected from live extruder sensors, process engineers had no mechanism to correlate recycle generation spikes against specific compound batches, die swell variations, or extruder temperature fluctuations.

---

## 🎯 Task: Engineering Objectives

Design and deploy an autonomous, real-time edge computer vision system to:
1. Provide **automated inline tallying of recycled tread pieces** under normal production speeds.
2. Achieve **$\ge$98% counting accuracy** without requiring manual operator intervention.
3. Reallocate **100% of manual counting labor** on the extrusion line to core operational and machine tuning tasks.
4. Establish **two-way PLC synchronization** to capture concurrent process parameters (extruder RPM, melt temperature, pressure, compound recipe) at the exact timestamp of each recycle event.
5. Provide a scalable, modular computer vision template ready to replicate across additional extrusion lines.

---

## 🧠 Action: Virtual Tripwire & Edge Computer Vision Architecture

```
                 [ Live Extrusion Conveyor Camera Feed ]
                                    |
                    Frame Ingestion & Pre-processing
                                    |
                 YOLO Folded-Tread Object Detection
                (Trained on operator folding behavior)
                                    |
              Centroid Calculation & Multi-Object Tracking
                                    |
               Virtual Optical Tripwire Crossing Test
             (Has piece crossed the directional threshold?)
                     /                             \
               Yes (Crossed)                   No (In Transit)
                    /                                \
        Increment Counter (count += 1)          Continue Tracking
        (Hysteresis Lockout Deduplication)
                    |
        Two-Way Machine PLC Event Sync
     (Capture RPM, Temp, Batch ID, Recipe)
                    |
        Live Dashboard & Telemetry Stream
```

### 1. Optical Ingestion & Operator Behavior Modeling
* **Targeted Camera Framing**: High-speed vision sensor focused on the operator recycle folding station and discharge conveyor, capturing continuous moving rubber under plant lighting conditions.
* **YOLO Folded-Tread Detection**: Custom-trained deep learning model trained on operator handling behavior to accurately distinguish folded recycled tread pieces from regular continuous flat rubber sheets.

### 2. Virtual Optical Tripwire (Crossing Vector Logic)
* **Dynamic Crossing Threshold**: Defines a virtual threshold line in the camera field of view.
* **Directional Centroid Tracking**: When the centroid of a detected folded piece crosses the spatial boundary line in the downstream direction, an increment event (`count += 1`) is triggered.
* **Hysteresis Deduplication**: Multi-object tracking maintains track IDs across sequential frames, ensuring that belt speed variations or momentary pauses do not cause duplicate tallies.

### 3. Industrial PLC Process Parameter Synchronization
* **Live Event Handshake**: Connected directly to the extrusion line PLC to capture instantaneous process parameters:
  - Extruder line speed and motor RPM.
  - Head melt temperature and die pressure.
  - Active compound batch ID and profile recipe.
* **Synchronized Telemetry**: Every recycle event is timestamped and logged with its corresponding extruder operating state, bridging computer vision tallies with physical process engineering.

---

## 📈 Quantified Results & Operational Impact

* **$\ge$98% Counting Accuracy**: High-precision automated counting under full production speeds, exceeding project targets.
* **100% Manual Labor Reallocation**: Completely eliminated manual clipboard logging, freeing operator capacity for machine adjustments, die tuning, and quality verification.
* **Root-Cause Scrap Reduction**: Enabled operations to correlate recycle spikes against raw material batches and temperature fluctuations, establishing baseline generation metrics to directly reduce overall scrap generation.
* **Instant Process Visibility**: Real-time live dashboards provide instant inventory accuracy and scrap generation trends without waiting for post-shift reports.
* **Scalable Industrial Template**: Validated computer vision and virtual tripwire architecture ready for rapid rollout across other extrusion and calender lines.
