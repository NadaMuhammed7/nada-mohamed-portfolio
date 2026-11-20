# ⚙️ Case Study 3: Curing Moulds Digital Twin & Press Mapping Command Center

- **System**: Global Industrial Manufacturing Plant
- **Domain**: Vulcanization, Tooling Digital Twin & Press Scheduling
- **Dashboard UID**: `rch0wYQDz` | **Grafana Panels**: 89 Live Panels | **Variables**: Press Fleet Selectors
- **Key Tables**: `SCH_MACHINE_TOOL`, `MD_MATERIALS`, `GetIPCODEProductionYDA`, `INFO_TIER`

---

## 📌 Situation (The Industrial Problem)
The vulcanization (curing) department operates dozens of dual-cavity hydraulic presses (Press A0, A1, A2, ... B1, B2, etc.), with each press housing two independent curing cavities: a **Left Cavity** and a **Right Cavity**.
* Each cavity holds an expensive, high-precision engraved steel mold corresponding to a specific tire size, tread pattern, and brand tier.
* Because molds are frequently swapped during recipe changeovers, process engineers previously relied on manual floor boards to track which mold was currently mounted inside each cavity.
* When scheduling emergency production batches, planning engineers had to walk the plant floor to verify which presses were running matching sizes, causing scheduling friction and risking tooling mismatches.

---

## 🎯 Task (The Analytical Mandate)
Create a comprehensive **Digital Twin of the Curing Fleet (89 Press Stations)** in Grafana that:
1. Maps every press station and visually separates Left Cavity vs. Right Cavity attributes in a single unified view.
2. Displays the mounted mold code, active tire size (IP code), recipe tier, and machine tooling status in real time.
3. Automatically harmonizes disparate cavity records into side-by-side comparative matrices.

---

## 🧠 Action: The Analytics Logic in Plain English (NLP)
Transforming 89 mechanical presses into an interactive digital twin required advanced data modeling and pivoting logic:

1. **Dual-Cavity Matrix Pivoting**:
   * *Business Logic*: In the database, left and right cavities are logged as separate asynchronous machine records. Showing them to engineers as raw rows required mental cross-referencing.
   * *Plain English Pipeline*: We developed a unified mapping engine that performs a synchronized full outer join on press IDs (`COALESCE(p_left.press, p_right.press)`). It pivots cavity records dynamically into a clean comparison layout:
     * Column 1: Press Station Attribute (Mold Code, Tire Size, Pattern, Tier)
     * Column 2: Left Cavity Live Value
     * Column 3: Right Cavity Live Value
2. **Tooling & Material Master Synthesis**:
   * *Business Logic*: Connects machine schedule tooling logs (`SCH_MACHINE_TOOL`) with the central material dictionary (`MD_MATERIALS`) and recipe tier classification (`INFO_TIER`).
   * *Plain English Pipeline*: Decodes obscure hardware PLC codes into human-readable industrial specifications (e.g., converting mold tooling ID `M-4029` into `295/80R22.5 PRO WAY STEER - Tier 1 Premium`).
3. **Sort Index Standardization**:
   * *Business Logic*: Enforces consistent visual ordering across all 89 press panels so that critical attributes (Press Name $
ightarrow$ Mold $
ightarrow$ Tire Size $
ightarrow$ Production Batch) always render in identical order.
   * *Plain English Pipeline*: Assigns a strict hierarchical sort key (`'01'`, `'02'`, `'03'`) ensuring every table across the 89-panel dashboard provides an identical user experience.

---

## 📈 Result & Business Impact
* **Plant-Wide Digital Twin**: Process engineers and plant directors gained full visual control over all 89 vulcanization presses in real time.
* **80% Faster Mold Verification**: Planning engineers verify fleet-wide tooling configurations instantly from their desks, eliminating floor walkabouts.
* **Zero Tooling Mismatches**: Ensures curing recipes match the physical molds mounted, eliminating catastrophic mis-curing defects.

---

## 📊 Visualization Architecture (Grafana Layout)
* **Fleet Grid Layout**: High-density grid of synchronized table panels organized sequentially by press line (Line A, Line B, Line C).
* **Side-by-Side Cavity Matrix**: Each panel features a clean two-column layout showing Left Cavity vs. Right Cavity parameters with conditional color highlights for dual-cavity size differences.
* **Live Refresh Cycle**: Configured with automatic 2-minute background polling (`refresh=2m`), ensuring floor updates appear live on wall-mounted shopfloor displays.
