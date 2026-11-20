# 🚐 Case Study 12: Plant Fleet & Shift Transportation Reservation App

- **Domain**: Plant Logistics, Employee Transportation & Smart Fleet Operations
- **Deployment Status**: **PRODUCTION DEPLOYED & LIVE**
- **Front-End Platform**: Microsoft Power Apps (Mobile Canvas App, One-Tap Booking Interface)
- **Data Architecture**: Microsoft SharePoint Lists (Seat Allocations, Route Schedules, Fleet Roster)
- **Workflow & Automation**: Microsoft Power Automate (Instant Confirmations & Manager Approvals)
- **Logistics Integration**: Dynamic Route Filtering, Seat Capacity Validation, Driver Manifest Exports

---

## 📌 Situation: Problem Statement & Logistical Inefficiencies

Operating a large 24/7 industrial manufacturing complex requires reliable, synchronized transportation for shift engineers, production operators, and emergency maintenance crews traveling across multiple plant gates and municipal routes:

1. **Manual Clipboard & WhatsApp Booking Chaos:**
   - Employees reserved bus and shuttle seats via handwritten clipboards in plant hallways or ad-hoc messaging groups, resulting in frequent miscommunications and missing passenger lists.
2. **Vehicle Overcrowding & Double-Booking:**
   - Dispatchers had no real-time mechanism to track vehicle seat availability, leading to situations where shuttles were either critically overcrowded or running half-empty.
3. **Runaway Ad-Hoc Emergency Taxi Costs:**
   - When off-shift maintenance engineers were summoned for urgent machine breakdowns, arranging emergency transportation took prolonged phone calls, often resulting in unvetted and unbudgeted private taxi expenses.
4. **Zero Route Utilization Telemetry:**
   - Plant administration lacked empirical data on route occupancy, peak departure times, and destination demand to optimize bus lease contracts and vehicle sizing.

---

## 🎯 Task: Engineering Objectives

Design and deploy a streamlined, mobile-first Canvas Power App and automated backend to:
1. Provide a **3-tap reservation experience** allowing employees to book scheduled shift buses or emergency shuttles in under 10 seconds.
2. Establish a **real-time seat quota validation algorithm** in SharePoint to prevent vehicle overbooking.
3. Automate **instant booking confirmations** via push notifications and emails using Power Automate.
4. Implement an **expedited emergency travel workflow** routing unscheduled trip requests to direct managers for 1-click mobile approval.
5. Provide a **supervisory administration portal** enabling fleet dispatchers to monitor route capacity and export digital passenger manifests for bus drivers.

---

## 🧠 Action: System Architecture & Mobile Reservation Workflow

```
               [ Mobile Canvas App Interface ]
                               |
              User Authentication & Profile Lookup
                               |
         +---------------------+---------------------+
         |                                           |
  [ Scheduled Shift Booking ]                 [ Emergency Transit ]
  - Departure Quick Tabs (6:30 PM, 8:00 PM)   - Custom Departure Time
  - Direction & Route Dropdown                - Pickup / Drop-off Destination
  - Seat Quota Check (Available Seats > 0)    - Direct Manager Selection
  - "Book for Another Colleague" Proxy Toggle - Urgent Business Justification
         |                                           |
         +---------------------+---------------------+
                               |
                    Commit to SharePoint List
                               |
                  Power Automate Cloud Flows
                               |
         +---------------------+---------------------+
         |                                           |
  [ Standard Confirmation ]               [ Emergency Approval Flow ]
  - Instant Push & Email Confirmation     - Actionable Email to Direct Manager
  - Add to Driver Digital Manifest        - "Approve" / "Reject" Buttons
                                          - Instant Status Update to Traveler
```

### 1. Mobile-First UX & Fluid Ergonomics
* **One-Tap Shift Quick-Tabs**: Prominent top navigation buttons segment recurring plant shift departures (e.g., 6:30 PM shift departure, 8:00 PM evening shift, Emergency on-call dispatch, and Dispatch Admin), allowing users to access relevant schedules immediately.
* **Cascading Direction & Route Selectors**: Dynamically updates destination drop-off points, pickup locations, and estimated journey times based on selected route directions.
* **Colleague Proxy Booking Engine**: Features an intuitive "Book for another one" toggle, enabling shift supervisors to reserve seats on behalf of arriving technicians or visiting specialists.

### 2. SharePoint List Data Infrastructure
* **Fleet Route Master**: Indexes bus IDs, assigned driver contacts, vehicle seat capacities, departure timetable matrices, and active route stops.
* **Reservations Transaction Ledger**: Stores Ticket ID, Passenger UPN, Booking Type (Shift vs Emergency), Direction, Route ID, Departure Timestamp, Direct Manager, and Booking Status (Confirmed, Cancelled, Completed).
* **Driver Manifest View**: Dynamically filtered view generating real-time passenger checklists for fleet dispatchers and driver tablets before departure.

### 3. Real-Time Capacity Validation Logic
* **Dynamic Seat Allocation Formula**: Before confirming a reservation, Power Fx queries the current passenger count against the vehicle capacity:
  ```powerfx
  If(
      CountRows(Filter(TransportationBookings, RouteID = SelectedRoute.ID && DepartureDate = Today())) < SelectedRoute.MaxCapacity,
      // Commit reservation and display success banner
      Patch(TransportationBookings, Defaults(TransportationBookings), { ... }),
      // Alert user that route is fully booked and suggest alternate departure
      Notify("Selected shuttle is at maximum capacity. Please select an alternate time.", NotificationType.Warning)
  )
  ```

### 4. Power Automate Cloud Flows & Emergency Approvals
* **Instant Booking Confirmations**: Automated flow triggers upon reservation submission, delivering an HTML confirmation card containing trip details, driver contact info, and boarding instructions.
* **1-Click Manager Approval Workflow**: Emergency off-shift transport requests trigger an actionable email to the traveler’s direct manager with instant "Approve" and "Reject" buttons. Upon approval, dispatch is immediately notified to release the dedicated vehicle.

---

## 📈 Results & Business Impact

| Metric / Operational KPI | Legacy Manual Process | Deployed Power App Solution | Improvement |
| :--- | :--- | :--- | :--- |
| **Shift Reservation Adoption** | Paper clipboards & informal messaging | 100% digital self-service adoption | **100% centralized tracking** |
| **Emergency Travel Approval Latency** | 30–60 minutes phone/paper routing | Under 2 minutes via automated email | **>95% faster response** |
| **Fleet Seat Utilization** | Uneven (some buses empty, others full) | Dynamic capacity balancing | **35% increase in fleet efficiency** |
| **Vehicle Overbooking Incidents** | Frequent double-bookings & stranded staff | Real-time seat quota validation | **Zero overbooking incidents** |
| **Ad-Hoc Taxi Expenditure** | Unmonitored private cab callouts | Controlled dispatch with manager approval | **28% reduction in emergency travel costs** |

---

## 🛠️ Technology Stack

- **Application Platform**: Microsoft Power Apps (Mobile Canvas App, Optimized for iOS & Android)
- **Logic & Validation**: Power Fx (Dynamic capacity formulas, cascading lookups, proxy booking toggles)
- **Data Backend**: Microsoft SharePoint Lists (Relational seat ledger, driver rosters, route timetables)
- **Automation Engine**: Microsoft Power Automate (Actionable manager approvals, confirmation emails)
- **Integration Services**: Office 365 Users Connector, Mobile Push Notifications, Driver Manifest Views
