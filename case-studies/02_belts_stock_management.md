# 📦 Case Study 2: Belts Stock Management & Real-Time FIFO Traceability

- **System**: Global Industrial Manufacturing Plant
- **Domain**: Semi-Finishing Inventory, WMS Warehouse Tracking & Expiry Prevention
- **Dashboard UID**: `-ZGnalXHz` | **Grafana Panels**: 30 Live Panels | **Variables**: Dynamic Material & Unit Slicers
- **Key Tables**: `WMS_TRACEABILITY`, `tbl_KB_Kusak_Bobin`, `DC_CONTAINMENT_UNITS`, `MD_MATERIALS`

---

## 📌 Situation (The Industrial Problem)
Steel and textile belts are the critical structural reinforcement layers inside radial truck tires. After calendering and spooling onto storage bobbins, rubberized belts have a strict chemical shelf life: if stored longer than **7 calendar days** before tire building, the unvulcanized rubber oxidizes and loses adhesive tack, forcing the entire bobbin to be scrapped at heavy financial cost.
* Operators previously tracked bobbin storage racks on whiteboards and paper tags.
* Expired bobbins were occasionally discovered only when mounted onto building machines, causing sudden line stoppages.
* Warehouse coordinators had no visibility into how many bobbins of each belt width were available in buffer stock versus currently staged at building machines.

---

## 🎯 Task (The Analytical Mandate)
Develop a real-time inventory and shelf-life tracking system in Grafana that:
1. Tracks every individual belt bobbin by its unique barcode and storage card.
2. Computes the **exact expiration countdown (7-day window)** for each spool.
3. Highlights missing barcodes, stock aging alerts, and available containment units across semi-finishing storage areas.

---

## 🧠 Action: The Analytics Logic in Plain English (NLP)
Instead of manual stock audits, we built an event-driven inventory tracking pipeline:

1. **Dynamic Expiration Date Computation**:
   * *Business Logic*: For every spooled belt card (`concat(t.TRC_SO_CODE, t.TRC_CU_EXT_PROGR)`), the system reads the extrusion completion timestamp (`TRC_START_TIME`) and projects an exact shelf-life deadline:
     $$	ext{Expiration Date} = 	ext{Start Time} + 7 	ext{ Days}$$
   * *Plain English Pipeline*: The pipeline constantly evaluates current factory time against the calculated expiration date. If a bobbin is within 24 hours of expiry, its status shifts from "Active" to "Critical Urgency"; if past 7 days, it is flagged as "Expired / Quarantined".
2. **Barcode Reconciliation & Missing Tag Detection**:
   * *Business Logic*: Cross-checks warehouse tracking units (`WMS_TRACEABILITY`) against physical bobbin scan logs (`tbl_KB_Kusak_Bobin`).
   * *Plain English Pipeline*: Evaluates whether a recorded card has an associated physical bobbin barcode (`CASE WHEN KB.BOBIN_BARCODE IS NOT NULL THEN KB.BOBIN_BARCODE ELSE 'Missing' END`). This immediately pinpoints lost spools, unscanned tags, or inventory discrepancies before materials move to the building floor.
3. **Containment Unit Capacity & Material Categorization**:
   * *Business Logic*: Joins material master definitions (`MD_MATERIALS`) to classify bobbins by belt width, steel cord code, and container rack identifier (`DC_CONTAINMENT_UNITS`).
   * *Plain English Pipeline*: Groups inventory by machine compatibility so building machine operators can verify buffer stock availability before initiating batch size changeovers.

---

## 📈 Result & Business Impact
* **Zero Shelf-Life Scrap**: Prevented belt oxidation scrap by establishing an uncompromised First-In, First-Out (FIFO) consumption workflow.
* **100% Traceability Compliance**: Every tire built can be traced back to the exact belt bobbin barcode, production timestamp, and storage containment rack.
* **Eliminated Line Changeover Delays**: Machine operators verify material buffer levels on Grafana before starting a shift, eliminating waiting time for stock delivery.

---

## 📊 Visualization Architecture (Grafana Layout)
* **Buffer Health KPI Gauges**: Real-time counts of Ready-for-Use Bobbins, Near-Expiry Bobbins (< 24h), and Quarantined Units across semi-finishing zones.
* **FIFO Priority Inventory Table**: Color-formatted tabular view sorted by earliest expiration date, displaying Card ID, Bobbin Barcode, Material Description, Storage Rack, and Remaining Shelf Life.
* **Missing Tag Exception Monitor**: Dedicated alert panel listing unverified or missing bobbin barcodes for immediate warehouse supervisor investigation.
