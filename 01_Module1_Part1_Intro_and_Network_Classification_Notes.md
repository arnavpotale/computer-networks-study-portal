# 01. Introduction to Computer Networks & Network Classification
**Module 1 — Part 1 Study Notes**  
*Source: `Module1_part_1.pdf` (Slides 1–24)*

---

## 1. What is a Computer Network?

### Concept & Core Definition
A **computer network** connects two or more computers together to exchange information and share resources. An isolated computer is called a **standalone computer**.

> **Exam Definition (Tanenbaum)**:  
> *"A computer network is an interconnected collection of autonomous computers."*

* **Interconnected**: Capable of exchanging information via a transmission medium using common protocols.
* **Autonomous**: Independent operation. Neither computer can forcibly start, stop, or control the other (unlike a master-slave mainframe system).
* **Heterogeneous Networks**: Networks built from diverse hardware/OS vendors. International **standards** (IEEE, ISO, IETF) ensure interoperability.

![Network Hardware Components](diagrams/part1_network_hardware.jpeg)

### Fundamental Components of a Network
* **Hardware**:
  * **End Nodes (Hosts)**: PCs, laptops, servers, smartphones, IoT sensors.
  * **NIC (Network Interface Card)**: Hardware providing physical MAC address and cable interface.
  * **Transmission Media**: Guided (copper, fiber) or Unguided (radio, microwave).
  * **Connecting Devices**: Hubs, switches, routers, repeaters, gateways, firewalls.
* **Software**:
  * **Protocols**: Rules governing syntax, semantics, and timing of data (TCP/IP, HTTP).
  * **NOS (Network Operating System)**: Manages network resources and security (Windows Server, Linux).

---

## 2. Network Evaluation Criteria & Business Drivers

### The 3 Core Criteria (Mnemonic: PRS — "Please Run Securely")
1. **Performance**: Evaluated by **transit time** (time for a message to travel) and **response time** (elapsed time between inquiry and response). Depends on user count, transmission speed, and software efficiency.
2. **Reliability**: Measured by **failure frequency**, **link recovery time** after failure, and robustness during disasters.
3. **Security**: Protecting data against unauthorized access, malware, and maintaining data integrity.

### Why Networks are Used
* **Resource Sharing**: Sharing expensive laser printers, disk arrays, and high-performance GPUs.
* **Information Sharing**: Instant database access, web services, email, and digital banking.
* **High Reliability via Redundancy**: Clustered and replicated servers prevent single-point downtime.
* **Cost-Performance Advantage**: A cluster of networked PCs offers equal or superior compute power to a mainframe at a fraction of the cost.

---

## 3. Advantages & Disadvantages of Networking

| Advantages | Disadvantages |
| :--- | :--- |
| **Shared Internet**: One connection shared among dozens of nodes via a router. | **Availability Risk**: Central server or switch failure halts work for all users. |
| **Centralized Administration**: Updates and policies pushed from a central server. | **Performance Degradation**: High traffic causes packet congestion and latency. |
| **Centralized Storage & Backup**: Unified automated enterprise backups. | **Management Complexity**: Requires trained network administrators and diagnostic tools. |
| **Peripheral Sharing**: Printers and scanners accessible across all LAN workstations. | **Security Threats**: Spreading malware, unauthorized intrusion, and data breaches. |

---

## 4. Classification of Networks by Geographical Scope

![Network Classification](diagrams/part1_pan_lan_wan_overview.png)

### A. PAN (Personal Area Network)
* **Coverage**: Within an individual's workspace ($\le 10\text{ meters}$).
* **Media**: Short-range wireless (**Bluetooth**, Zigbee, Wi-Fi Direct).
* **Examples**: Smartwatch synced to smartphone; wireless headphones; in-car hands-free system.
* **Traits**: Low power consumption, low cost, plug-and-play.

### B. LAN (Local Area Network)
* **Coverage**: Single room, building, or campus ($< 2\text{ kilometers}$).
* **Media**: UTP copper cables (Ethernet Cat5e/Cat6) with RJ-45; Wi-Fi (IEEE 802.11).
* **Examples**: University computer lab, office floor, home network.
* **Traits**: Privately owned, very high speed ($100\text{ Mbps}-10\text{ Gbps}$), lowest Bit Error Rate (BER).

### C. MAN (Metropolitan Area Network)
* **Coverage**: An entire city or town ($5\text{ to }50\text{ kilometers}$).
* **Media**: Optical fiber rings, coaxial trunk cables, digital microwave.
* **Examples**: Citywide Cable TV broadband network; municipal traffic surveillance grid.
* **Traits**: Connects multiple enterprise LANs across urban zones; high bandwidth.

![Metropolitan Area Network](diagrams/part1_man_city.jpeg)

### D. WAN (Wide Area Network)
* **Coverage**: Country, continent, or the globe ($> 50\text{ kilometers}$).
* **Media**: Undersea submarine fiber optic cables, telecom microwave relays, satellite links.
* **Examples**: **The Internet**; national telecom cellular backhaul; SWIFT banking network.
* **Traits**: Leased/public telecom infrastructure, high propagation delay, higher error rates.

---

## 5. Master Comparison Table: PAN vs. LAN vs. MAN vs. WAN

| Parameter | PAN | LAN | MAN | WAN |
| :--- | :--- | :--- | :--- | :--- |
| **Geographical Area** | $\le 10\text{ meters}$ | Room / Building ($< 2\text{ km}$) | Town or City ($5-50\text{ km}$) | Country / Globe ($> 50\text{ km}$) |
| **Primary Media** | Bluetooth, Zigbee | UTP Ethernet, Wi-Fi | Optical fiber, Coaxial | Undersea fiber, Satellite |
| **Data Transfer Rate**| Low ($1-3\text{ Mbps}$) | Very High ($1-10\text{ Gbps}$) | High ($100\text{ Mbps}-1\text{ Gbps}$) | Moderate / Variable |
| **Bit Error Rate** | Very Low | **Lowest** (cleanest lines) | Moderate | **Highest** (noise over distance) |
| **Delay** | Negligible | Very Low ($\approx \text{ms}$) | Moderate | High ($\approx \text{hundreds of ms}$) |
| **Ownership** | Private (user) | Private (enterprise) | Public / Consortium | Shared Telecom Carriers |
| **Standard Example** | Smartwatch $\leftrightarrow$ Phone | College computer lab | City Cable TV broadband | **The Global Internet** |

---

## 6. Slide Interactive Quiz Solved (Slides 23–24)

| Device / Network Example | Correct Category | Reason |
| :--- | :---: | :--- |
| **Smartwatch**, **Wireless Headphones**, **In-car system** | **PAN** | Centered on individual; range $\le 10\text{ m}$; uses Bluetooth. |
| **Home network**, **School network**, **Office network** | **LAN** | Confined within a single building/campus; private Ethernet/Wi-Fi. |
| **Mobile network**, **Bank network (National)**, **The Internet** | **WAN** | Spans nationwide/globally via telecom carrier backbones. |
| *Cable TV city distribution* | *MAN* | Spans an entire municipality/city. |

---

## 7. Memory Tricks & Fast Recall

* **Order of Scale**: **P - L - M - W**  
  $\implies$ **P**ersonal ($\le 10\text{m}$) $\rightarrow$ **L**ocal ($<2\text{km}$) $\rightarrow$ **M**etropolitan ($5-50\text{km}$) $\rightarrow$ **W**ide ($>50\text{km}$).
* **Criteria Triad**: **P - R - S** $\implies$ **P**erformance, **R**eliability, **S**ecurity.
* **Autonomous vs. Interconnected**:  
  *Autonomous* = Independent processor/OS; *Interconnected* = Shared communication medium.

---

## 8. Application-Based & Scenario Questions

### Scenario 1: Hospital Multi-Building Connectivity
* **Question**: A hospital has 4 buildings spread over a 400-meter campus. What network type is this, what cabling should be used, and why?
* **Answer**: **LAN (Campus LAN)**.
* **Reasoning**: Span is under 1 km under private ownership. Lay **multi-mode fiber optic cable** between buildings (immune to outdoor electrical interference) and Cat6 UTP inside each building for high bandwidth ($\ge 1\text{ Gbps}$) and low latency.

### Scenario 2: Smartwatch to Cloud Medical Vital Sync
* **Question**: A wearable heart monitor sends vitals to a patient's smartphone, which uploads them to a hospital server in another country. Identify the two network types.
* **Answer**:
  1. Sensor $\rightarrow$ Smartphone: **PAN** (Bluetooth Low Energy).
  2. Smartphone $\rightarrow$ Hospital Server: **WAN** (Cellular 4G/5G mobile backhaul and undersea internet cables).

---

## 9. Exam Questions Bank (Ranked by Priority)

### 2-Mark Questions
1. 🔥🔥🔥 **Define a computer network according to Tanenbaum.**  
   *An interconnected collection of autonomous computers capable of exchanging data and sharing resources over a common transmission medium.*
2. 🔥🔥🔥 **Differentiate between a LAN and a WAN across two points.**  
   *(1) LAN covers a small private area ($<2\text{ km}$); WAN spans countries/continents under telecom carriers. (2) LAN has higher data rates ($1-10\text{ Gbps}$) and lower error rates than WAN.*
3. 🔥🔥 **State two examples of a PAN.**  
   *Smartwatch synced to a phone; Bluetooth wireless headphones.*

### 4/5-Mark Questions
1. 🔥🔥🔥 **Compare LAN, MAN, and WAN across 5 parameters.**  
   *(Reproduce the 5-parameter matrix from Section 5: Area, Media, Data Rate, Error Rate, Ownership).*
2. 🔥🔥 **Explain the advantages and disadvantages of computer networks.**  
   *(Detail 3 advantages: resource sharing, centralized storage, shared internet; detail 3 disadvantages: single point failure, security vulnerabilities, management complexity).*

### 8/10-Mark Questions
1. 🔥🔥🔥 **(a) Define a computer network and explain "Autonomous" vs. "Interconnected". (b) Classify computer networks based on geographical scale (PAN, LAN, MAN, WAN) with architectures, media, and applications.**  
   *(Answer structure: Tanenbaum definition $\rightarrow$ Autonomous/Interconnected breakdown $\rightarrow$ Detailed sections on PAN, LAN, MAN, WAN $\rightarrow$ Comparison table).*

---

## 10. Short Notes / Last-Minute Revision
* **Autonomous**: Independent CPU/OS; no master-slave forcible control.
* **Interconnected**: Devices exchange bits over media via protocols.
* **PAN**: Range $\le 10\text{m}$, Bluetooth, low power, smartwatches.
* **LAN**: Range $<2\text{km}$, Ethernet/Wi-Fi, private, lowest BER, $1-10\text{ Gbps}$.
* **MAN**: Range $5-50\text{km}$, citywide fiber/coaxial, connects multiple LANs (Cable TV).
* **WAN**: Spans countries/globe, undersea cables, telecom backbones, the Internet.

---

## 11. Must Know Before Moving On
1. 🔥🔥🔥 *Tanenbaum Definition*: "Interconnected collection of autonomous computers."
2. 🔥🔥🔥 *PAN range*: $\le 10\text{ meters}$, Bluetooth.
3. 🔥🔥🔥 *LAN range & ownership*: $<2\text{ km}$, private ownership, lowest bit error rate.
4. 🔥🔥🔥 *MAN span*: Citywide ($5-50\text{ km}$), connects multiple LANs.
5. 🔥🔥🔥 *WAN span*: Global, undersea submarine cables, Internet.
6. 🔥🔥 *Criteria Triad*: Performance, Reliability, Security.

---

## 12. Active Recall Test & Answer Key

### Questions
1. What makes two computers autonomous?
2. Why is a dumb terminal connected to a mainframe not a computer network?
3. State the typical range and primary protocol of a PAN.
4. Which network classification has the lowest bit error rate?
5. Give one municipal example of a MAN.
6. What are the two primary components of any computer network?

### Answer Key
1. Neither computer can forcibly start, stop, or control the execution of the other.
2. The dumb terminal lacks an autonomous CPU/OS and is merely a remote display slave.
3. Range $\le 10\text{ meters}$; protocol is Bluetooth.
4. **LAN** (due to short, controlled cabling).
5. Citywide Cable TV broadband distribution network or municipal traffic monitoring grid.
6. Hardware (NIC, media, switches/routers) and Software (protocols, Network Operating System).