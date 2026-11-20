# 👁️ Case Study 7: PolyShield — Industrial Edge AI Defect Detection & Closed-Loop PLC Automation

- **Domain**: Advanced Manufacturing, Industrial Edge AI & Computer Vision
- **Deployment Status**: **PRODUCTION DEPLOYED & LIVE**
- **Architecture**: 3-Stage Cascaded Neural Network (YOLO Segmentation + Fast Classifier Early-Exit + YOLO11n Detector)
- **Edge Integration**: Two-Way Industrial PLC Closed-Loop Hardware Interlock (ISO-on-TCP via python-snap7)
- **Optical & Telemetry Pipeline**: Low-Latency Multi-Threaded RTSP Stream Ingestion with Real-Time Web Telemetry

---

## 📌 Situation: Problem Statement & Engineering Challenge

In high-performance radial tire manufacturing, uncured semi-finished rubber sheets are interleaved with protective polymer separator films during preparation and continuous calender festoon transport:

1. **The Material Chemistry Barrier:**
   - Synthetic and natural rubber compounds vulcanize under high temperature (~150°C–180°C) via sulfur covalent cross-linking inside hydraulic curing presses.
   - Foreign polymer separator films (e.g., Polyethylene) do not form covalent chemical bonds with rubber compounds.
2. **The Structural Integrity Risk:**
   - Trapped separator fragments create an internal zero-adhesion void (delamination plane).
   - Under heavy commercial vehicle loads and dynamic highway deflection, shear stresses can cause localized tread separation or casing failure, resulting in severe safety risks and high-cost scrap.
3. **Limitations of Manual Visual Inspection:**
   - Continuous 24/7 visual surveillance of high-speed black rubber conveyors (15–45 m/min) is prone to rapid operator eye fatigue.
   - Factory ambient lighting, roller reflections, and belt textures create optical camouflage, making thin, clear, or colored films exceptionally difficult to spot reliably by human eye alone.

---

## 🎯 Task: Engineering Objectives

Design and deploy an autonomous, real-time edge vision and automation system to:
1. Provide **24/7 continuous inline inspection** on high-speed rubber conveyors.
2. Achieve **>99.2% defect recall** and **99.26% mAP50** on clear, semi-transparent, and colored foreign material fragments.
3. Deliver **sub-35ms real-time edge inference latency** to keep pace with continuous production speeds.
4. Establish a **closed-loop PLC hardware interlock** that automatically halts the line and activates warning relays within centimeters of defect occurrence.
5. Minimize false alarms (<0.1%) caused by plant lighting glare or manual operator splice adjustments.

---

## 🧠 Action: 3-Stage Cascaded Deep Learning Architecture

```
                      [ Live RTSP Stream (Conveyor Feed) ]
                                      |
                      Decoupled Threaded Frame Ingestion
                         (cv2.CAP_PROP_BUFFERSIZE = 1)
                                      |
                       Stage 1: Material Segmentation
                              (seg_model.pt)
                                      |
                          Extract 640x640 Rubber ROI
                                      |
                      Safety Check: Human-in-ROI Detected?
                                 /          \
                       Yes (Person)        No (Proceed)
                             /                \
          [ Skip & Log Operator in View ]    Stage 2: Classifier Early-Exit
                                                   (cls_model.pt)
                                                   /             \
                                       >= 80% Clean             < 80% Clean
                                           /                        \
                            [ Fast Exit: ~2.2ms ]          Stage 3: YOLO11n Detection
                                                                (det_model.pt)
                                                                     |
                                                          Multi-Frame Consensus Filter
                                                         (3 consecutive frames confirmed)
                                                                     |
                                                          +----------+----------+
                                                          |                     |
                                                    (PE Confirmed)           (Clean)
                                                          |                     |
                                                  PLC Line Stop Relays     Normal Stream
                                                  (Automated Machine Halt)
                                                          |
                                                  Hysteresis Lockout
                                                    (120 frames)
```

### 1. Robust Video Ingestion & Background Glare Isolation
* **Buffer-Lock Threaded Reader**: Decoupled daemon worker holding the OpenCV buffer size at 1 (`cv2.CAP_PROP_BUFFERSIZE = 1`), eliminating frame lag buildup on continuous conveyors.
* **Stage 1 (Rubber Segmentation, `seg_model.pt` @ CONF=0.35)**: Dynamically extracts the moving rubber polygon and paints all external machinery, rollers, and floor surfaces to solid black (`RGB 0,0,0`), eliminating background false triggers.

### 2. Multi-Stage Cascaded Neural Decision Pipeline
* **Human-in-ROI Operator Detection**: Real-time person detection recognizes operator hands/arms during splice adjustments, automatically logging `Operator in View - Frame Skipped` to prevent false stops during manual interventions.
* **Stage 2 (Classifier Fast Early-Exit, `cls_model.pt` @ CONF=0.80)**: 100% Top-1 classifier screening clean crops in ~2.2 ms, saving over 90% of GPU detector overhead.
* **Stage 3 (Strict YOLO11n Detection, `det_model.pt` @ CONF=0.45)**: Retrained on hard negative glare frames, achieving **98.60% precision** and **99.26% mAP50**.

### 3. Temporal Consensus & Hysteresis Filtering
* **Multi-Frame Consensus**: Requires 3 consecutive confirmed defect frames (`attack_threshold=3`) before triggering physical alerts, filtering out transient optical noise.
* **Defect Lockout Hysteresis**: Implements a 120-frame (~4s) lockout to prevent duplicate counts on the same passing fragment, along with a ghost inversion filter.

### 4. Closed-Loop PLC Hardware Interlock
* **Zero Main Loop Delay**: Communicates over ISO-on-TCP via a non-blocking daemon thread (0.00ms main loop overhead).
* **Automated Safety Interlock**: Reads machine running status to automatically pause AI inference during line changeovers, writes emergency line-pause and stacklight alarm signals upon confirmed defect detection, and logs real-time conveyor meter counts.

---

## 📈 Quantified Results & Engineering Impact

* **High-Accuracy Defect Recall**: **>99.2% defect recall** and **99.26% mAP50** on live production lines.
* **Real-Time Edge Throughput**: **<35ms inference latency** (>30–60+ FPS), keeping pace with continuous conveyor speeds.
* **Zero-Defect Quality Assurance**: 100% automated inline inspection eliminating foreign material escape into curing presses, safeguarding cured tire structural integrity.
* **Low False-Positive Rate**: **<0.1% false stops** achieved via material segmentation masking, human-in-ROI detection bypass, and 3-frame temporal consensus.
* **Industrial Traceability**: Fully automated digital audit trail with timestamped bounding-box snapshots and conveyor meter coordinates.
