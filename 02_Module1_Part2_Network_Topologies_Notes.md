# 02. Network Topologies: Architectures, Selection & Design
**Module 1 — Part 2 Study Notes**  
*Source: `Module1_part_2_UPDATED.pdf` (Slides 1–32)*

---

## 1. Concept of Network Topology

### Definition: Physical vs. Logical
* **Network Topology**: The geometric and physical arrangement of nodes (computers, switches) and connecting communication links.
* **Physical Topology**: The physical layout of cables, wires, and hardware devices.
* **Logical Topology**: The actual path and behavior of data signals flowing between nodes.
  * *Classic Example*: An Ethernet network using a central Hub is physically a **Star** (cables radiate from a central box) but logically a **Bus** (signals are electrically broadcast across all ports).

![Topologies Overview](diagrams/part2_topologies_chart.png)

### 6 Factors for Selecting a Topology (Slide 5)
1. **Desired Performance**: Throughput and avoidance of bandwidth bottlenecks.
2. **Desired Reliability & Fault Tolerance**: Ability to maintain operation during cable breaks or node failures.
3. **Size (Number of Nodes)**: Scale of deployment (5 nodes vs. 5,000 nodes).
4. **Expandability / Scalability**: Ease of adding new workstations without rewiring existing setups.
5. **Installation Cost**: CapEx for cables, connectors, conduit piping, and labor.
6. **Cable Length**: Physical distance between nodes and cable attenuation limits.

---

## 2. Detailed Breakdown of the 6 Topologies

---

### A. Bus Topology

![Bus Topology](diagrams/part2_bus_topology.png)

* **Architecture**: Devices connect in a linear multidrop line to a single shared central coaxial/copper cable called the **backbone** via **drop lines** and **T-connectors**.
* **Terminators**: Both physical ends MUST be capped with a **50-ohm terminator**.
  * *Function*: Absorbs electrical signal energy to **prevent signal reflection (echo)** that corrupts ongoing transmissions.
* **Signaling**: Half-duplex using **CSMA/CD** (Carrier Sense Multiple Access with Collision Detection).
* **Pros**: Lowest cable requirement; low installation cost; simple setup.
* **Cons**:
  * **Single Point of Failure**: If the backbone breaks or a terminator is loose, the **entire network collapses**.
  * Difficult troubleshooting; heavy packet collisions as nodes increase; low security (shared broadcast medium).
* **Industry Application**: **CAN Bus (Controller Area Network)** in automobiles connecting engine, brake, and dashboard ECUs; industrial factory automation (Modbus/Profibus).

---

### B. Star Topology

![Star Topology](diagrams/part2_star_topology.png)

* **Architecture**: Every node has an independent, dedicated point-to-point cable connection to a **central switch** (or hub). Nodes communicate only through the central device.
* **Pros**:
  * **Fault Tolerance / Node Isolation**: If one computer or cable fails, **only that computer goes offline**; the rest continue uninterrupted.
  * **Easy Scalability**: Plug new computers into unused switch ports without disrupting the network.
  * **Dedicated Performance**: Switches provide dedicated full-duplex bandwidth per port (e.g., $1\text{ Gbps}$), eliminating collisions.
  * **Simple Troubleshooting**: Switch port LEDs instantly indicate disconnected or faulty lines.
* **Cons**:
  * **Central Bottleneck / Single Point of Failure**: If the central switch fails, all communication halts.
  * Higher cabling cost than Bus topology.
* **Industry Application**: Modern office and university LANs; home Wi-Fi networks (radiating from a wireless router).

---

### C. Ring Topology

![Ring Topology](diagrams/part2_ring_diagram.png)

* **Architecture**: Nodes are connected in a **closed, unbroken physical loop**. Each node connects directly to its two immediate neighbors.
* **Signaling**: Unidirectional transmission using the **Token Passing Protocol** (IEEE 802.5):
  1. A small frame called a **Token** circulates continuously around the ring.
  2. A node transmits only when it captures the free token.
  3. The node attaches its data, sets token to busy, and sends it down the loop.
  4. The destination copies data; the sender receives the returned frame, strips data, and releases a free token.
* **Pros**: **Zero packet collisions** (only token holder transmits); deterministic and equal-access latency.
* **Cons**: A single cable cut or failed computer breaks the entire loop (**single point of failure**). High latency as packets traverse intermediate nodes.
* **Dual Ring Solution**: High-reliability networks use a **Dual Ring** (e.g., FDDI / SONET). If a cable is severed, the primary and secondary counter-rotating rings automatically loop back at the break to heal the network within 50 ms.
* **Industry Application**: Telecom backbone fiber rings (SONET/SDH in BSNL, Airtel, Jio).

---

### D. Mesh Topology

![Mesh Topology](diagrams/part2_mesh_diagram.png)

* **Architecture**: In a **Full Mesh**, every computer has a dedicated, point-to-point physical link directly to every other computer. In a **Partial Mesh**, only critical servers have full links.
* **Mathematical Derivation of Links & Ports**:
  * For $n$ nodes:
    $$\mathbf{\text{Total Physical Duplex Links } L = \frac{n(n - 1)}{2}}$$
    $$\mathbf{\text{I/O Ports Required per Node } P = n - 1}$$
    $$\mathbf{\text{Total Network Ports } = n(n - 1)}$$
* **Pros**:
  * **Maximum Reliability**: Zero single points of failure; multiple redundant pathways.
  * **Dedicated Bandwidth**: Zero traffic contention; high privacy and security (private dedicated lines).
  * Easy fault isolation.
* **Cons**: Exorbitant cabling cost ($O(n^2)$ explosion); massive number of I/O ports required per device; impractical installation for large LANs.
* **Industry Application**: The **Internet Backbone / Tier-1 ISPs**; cloud data center core routers (Google, AWS); military defense command networks.

---

### E. Tree Topology

![Tree Topology](diagrams/part2_tree_diagram.png)

* **Architecture**: A **hierarchical arrangement** combining Star and Bus topologies:
  * **Root Node (Core Level)**: High-speed central backbone switch/router.
  * **Intermediate Nodes (Distribution Level)**: Floor or departmental switches.
  * **Leaf Nodes (Access Level)**: User workstations and PCs.
* **Pros**: Highly scalable; structured departmental management; point-to-point wiring for easy segment troubleshooting.
* **Cons**: If the central Root switch fails, branches become disconnected.
* **Industry Application**: University campus networks; corporate multi-story headquarters; Indian Railway Reservation System (IRCTC).

---

### F. Hybrid Topology

![Hybrid Topology](diagrams/part2_hybrid_diagram.png)

* **Architecture**: A combination of two or more completely different topologies (e.g., Star-Ring, Star-Bus).
* **Pros**: Highly flexible; engineered to exploit individual strengths while mitigating weaknesses; virtually unlimited scalability.
* **Cons**: Complex architectural design and high hardware cost.
* **Industry Application**: Hyperscale cloud data centers (Spine-and-Leaf Mesh + Star); modern international airports.

---

## 3. Mathematical Formula & Solved Numericals

### Solved Example 1: Basic University Numerical
* **Problem**: A company has $n = 6$ computers in a **Full Mesh** topology. Calculate:
  1. The total number of physical communication links.
  2. The number of I/O ports per computer.
* **Solution**:
  1. $L = \frac{n(n - 1)}{2} = \frac{6 \times 5}{2} = \mathbf{15\text{ links}}$.
  2. $P = n - 1 = 6 - 1 = \mathbf{5\text{ ports per computer}}$.

### Solved Example 2: Exam-Level Comparative Design Problem
* **Problem**: Compare cable requirements for $n = 10$ computers in (a) Full Mesh, (b) Star, and (c) Ring topology.
* **Solution**:
  * (a) Full Mesh: $L = \frac{10 \times 9}{2} = \mathbf{45\text{ cables}}$, with $9$ ports per computer.
  * (b) Star: $L = n = \mathbf{10\text{ cables}}$ (each computer connects to the central switch), with $1$ port per computer.
  * (c) Ring: $L = n = \mathbf{10\text{ cables}}$ (connecting 10 computers in a closed circle), with $2$ ports per computer (incoming and outgoing).
* **Takeaway**: Star topology saves 35 cables compared to Mesh (over $77\%$ cable reduction), making it far more economical.

---

## 4. Official Course Case Study: School Computer Lab Design

![School Lab Case Study](diagrams/part2_school_lab_case_study.png)

### The Scenario (Slide 21)
A school is establishing a computer laboratory with **40 computers**. Requirements:
1. Easy installation and maintenance.
2. Fault tolerance (one failure must not affect the remaining 39).
3. Easy expansion (scalability).
4. Good performance and simple troubleshooting.

### The Verified Solution (Slides 24–29)
* **Recommended Topology**: **STAR TOPOLOGY**
* **Recommended Central Device**: **INTELLIGENT NETWORK SWITCH**

#### Why Star Topology? (4 Justifications for Exam):
1. **Fault Isolation**: If one PC, cable, or NIC fails, only that single PC disconnects; the other 39 operate normally.
2. **Scalability**: Connecting 10 more PCs requires simply plugging patch cables into unused switch ports without modifying existing wiring.
3. **Dedicated Performance**: Switch provides dedicated $1\text{ Gbps}$ full-duplex bandwidth per port, eliminating packet collisions.
4. **Simple Troubleshooting**: Switch port LEDs instantly indicate link status; faulty cables can be replaced in minutes.

#### Why a Switch and NOT a Hub?
| Parameter | Passive / Active Hub | Intelligent Network Switch |
| :--- | :--- | :--- |
| **Forwarding Method** | **Broadcasts** data to all ports | **Unicasts** only to destination port via MAC table |
| **Collision Domain** | **1 shared domain** across all ports | **Dedicated collision domain per port** |
| **Bandwidth** | Shared (e.g., $100\text{ Mbps} \div 40$ nodes) | **Dedicated full bandwidth** per port (e.g., $1\text{ Gbps}$) |
| **Security** | Low (traffic sniffer can capture packets) | High (frames sent only to authorized port) |

#### 4-Step Working of a Switch:
1. Frame arrives from Computer A.
2. Switch learns Computer A's MAC address and maps it to Port 1 in its internal **MAC Address Table (CAM Table)**.
3. Switch inspects the Destination MAC address (Computer B).
4. Switch looks up its table and forwards the frame **only to Computer B's port**.

---

## 5. Master Topology Comparison Table (Slide 30)

![Topology Comparison Table](diagrams/part2_topology_comparison_table.png)

| Parameter | Bus | Star | Ring | Mesh (Full) | Tree | Hybrid |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Structure** | Single backbone cable | Central switch/hub | Closed circular loop | Point-to-point mesh | Hierarchical stars | Combination of 2+ |
| **Cable Length** | **Very Low** | Moderate | Moderate | **Very High** | High | Design dependent |
| **Installation Cost**| **Low** | Moderate | Moderate | **Very High** | High | High |
| **Scalability** | Poor | **Excellent** | Moderate | Poor (large scale) | **Excellent** | **Excellent** |
| **Performance** | Drops with more nodes | **High (dedicated)** | Predictable (token) | **Very High** | High | **Very High** |
| **Fault Tolerance** | **Very Low** | Good | Moderate (Dual=High)| **Maximum** | Good | **Excellent** |
| **Single Failure Point**| **Backbone / Terminator**| **Central Switch** | Cable break | **None** | Root Switch | Design dependent |
| **Troubleshooting** | Difficult | **Very Easy** | Moderate | Difficult | **Easy** | Moderate |
| **Expansion** | Difficult | **Easy** | Moderate | **Very Difficult** | **Easy** | **Easy** |
| **Real-World Use** | Automotive CAN Bus | Office / Lab LAN | Telecom SONET Ring | Internet Core / ISP | University Campus | Cloud Data Centers |

---

## 6. Real-World Industry Applications Matrix (Slides 31–32)

| Sector | Topology | Real-Time Example | Core Reason for Selection |
| :--- | :---: | :--- | :--- |
| **Automotive** | **Bus** | CAN Bus connecting vehicle ECUs | Low wiring weight, low cost, short distances. |
| **Home Network** | **Star** | Wi-Fi router to laptops & phones | Centralized management, easy plug-and-play. |
| **College Campus**| **Tree + Star**| Core $\rightarrow$ Department $\rightarrow$ Lab PC | Hierarchical isolation, departmental scalability. |
| **Bank Branch** | **Star** | Teller machines to central switch | Dedicated $1\text{ Gbps}$ speed, individual fault isolation. |
| **Telecom Trunks** | **Ring** | SONET/SDH optical fiber rings | Automatic 50 ms self-healing failover via dual ring. |
| **Internet Core** | **Mesh** | Tier-1 ISP router backbones | Multiple redundant paths ensure 24×7 availability. |
| **Data Centers** | **Hybrid** | Google / AWS server farms | Massive bisection bandwidth, zero downtime. |

---

## 7. Memory Tricks & Rapid Review

* **6 Topologies**: **B - S - R - M - T - H** $\implies$ **B**us, **S**tar, **R**ing, **M**esh, **T**ree, **H**ybrid.
* **Mesh Formula**: $L = \frac{n(n-1)}{2}$ *(Remember: "Handshake Formula" — $n$ people shaking hands once)*.
* **Single Points of Failure**:
  * Bus $\implies$ Backbone cable / Terminator
  * Star $\implies$ Central Switch
  * Tree $\implies$ Root Switch
  * Mesh $\implies$ **None**

---

## 8. Application & Exam Questions

### Application Scenario: Redundant Core Network
* **Question**: An automated air-traffic radar system requires zero network downtime. If any two cables are cut, radar data must continue flowing without delay. Which topology should be chosen?
* **Answer**: **Full Mesh Topology**. Dedicated point-to-point links provide multiple alternate routes with zero shared-link contention and zero single points of failure.

### 2-Mark Questions
1. 🔥🔥🔥 **Write the formula for links in a Full Mesh network of $n$ nodes.**  
   *$L = \frac{n(n - 1)}{2}$. Each node requires $n - 1$ I/O ports.*
2. 🔥🔥 **What is the function of terminators in Bus topology?**  
   *50-ohm resistors placed at both ends to absorb electrical signals and prevent signal reflection.*
3. 🔥🔥 **State one advantage and one disadvantage of Star topology.**  
   *Advantage: Failure of one cable does not affect others. Disadvantage: Central switch is a single point of failure.*

### 4/5-Mark Questions
1. 🔥🔥🔥 **Compare Hub and Switch as central devices in Star topology.**  
   *(Include MAC forwarding, collision domains, dedicated bandwidth, and security).*
2. 🔥🔥🔥 **A network has 8 computers. Calculate links for Mesh, Star, and Ring.**  
   *Mesh: $L = \frac{8 \times 7}{2} = \mathbf{28}$; Star: $L = \mathbf{8}$; Ring: $L = \mathbf{8}$.*

### 8/10-Mark Questions
1. 🔥🔥🔥 **A school is setting up a 40-computer lab. (a) Which topology do you recommend and why (4 reasons)? (b) Which device should be placed at the center and why? (c) Explain the working of this device.**  
   *(Answer structure: Star topology $\rightarrow$ 4 justifications $\rightarrow$ Network switch over Hub $\rightarrow$ 4-step MAC table learning).*

---

## 9. Must Know Before Moving On
1. 🔥🔥🔥 *Mesh links formula*: $L = \frac{n(n-1)}{2}$.
2. 🔥🔥🔥 *Mesh ports per computer*: $P = n - 1$.
3. 🔥🔥🔥 *Why Star is chosen for 40-PC lab*: Fault isolation, scalability, dedicated bandwidth, easy LED troubleshooting.
4. 🔥🔥🔥 *Switch vs Hub*: Switch unicasts based on MAC with dedicated bandwidth; Hub broadcasts blindly with shared bandwidth.
5. 🔥🔥🔥 *Bus terminators*: 50Ω resistors absorbing electrical energy to prevent reflection.
6. 🔥🔥 *Token Passing*: Only the node holding the token can transmit; eliminates collisions.

---

## 10. Active Recall Test & Answer Key

### Questions
1. How many links and ports per node are needed for 12 nodes in full mesh?
2. What electrical problem occurs if Bus terminators are missing?
3. Why is an Ethernet hub physically a star but logically a bus?
4. What happens to remaining PCs if one cable breaks in a Star topology?
5. How does a switch learn MAC addresses?

### Answer Key
1. Links $L = \frac{12 \times 11}{2} = \mathbf{66\text{ links}}$; Ports $P = 12 - 1 = \mathbf{11\text{ ports}}$.
2. Signal reflection (bounce) causing packet collisions and data corruption.
3. Physically cables radiate from a box (star); logically all ports are electrically bonded into one shared wire (bus).
4. Nothing; all other PCs continue communicating normally.
5. By inspecting the **Source MAC address** of incoming frames and mapping it to the receiving port in its CAM table.