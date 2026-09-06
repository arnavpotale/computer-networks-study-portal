# 05. Network Components: Hardware, Transmission Media, Protocols & Tools
**Module 1 — Part 5 Study Notes**  
*Source: `Components of a Computer Network.pdf` (Pages 1–17)*

---

## 1. Network Nodes & Hardware Architecture

A computer network consists of **Nodes** (devices that produce, route, or consume data) and **Links** (communication pathways).

![Nodes and Links Overview](diagrams/part5_nodes_and_links.png)

---

### A. Network Interface Card (NIC) (Pages 1–3)
The physical hardware card providing network connectivity and a unique physical address.

#### The 6 Functions of a NIC:
1. **Data Buffering**: Onboard RAM bridges the speed mismatch between the fast motherboard bus and network line speed.
2. **Frame Construction & Stripping**: Encapsulates packets into frames (adds MAC addresses and FCS trailer) on transmission; strips them on reception.
3. **Media Access Control (MAC)**: Executes link access algorithms (CSMA/CD on Ethernet, CSMA/CA on Wi-Fi).
4. **Parallel-to-Serial Conversion (SerDes)**: Converts parallel internal CPU words (32/64-bit) into a serial bit stream for the wire.
5. **Data Encoding & Decoding**: Translates binary 1s and 0s into electrical voltage transitions (e.g., Manchester Encoding).
6. **Data Transmission & Reception**: Physical transceivers inject voltages or light pulses onto the media.

* **MAC Address**: 48-bit (6-byte) physical address burned into ROM (e.g., `00:1A:2B:3C:4D:5E`). First 24 bits = **OUI** (Vendor ID); last 24 bits = Device Serial Number.

---

### B. Connecting Devices Deep-Dive (Pages 3–8)

![Hub](diagrams/part5_hub_lab.jpeg)
![Bridge](diagrams/part5_bridge_lab.png)

* **Repeater (Layer 1)**: Regenerates attenuated, weakened digital signals back to original amplitude and shape; extends cable distance.
* **Hub (Layer 1)**: Multiport repeater; broadcasts incoming frames to **all other ports**. All connected stations share **1 single collision domain** and **1 broadcast domain**.
* **Bridge (Layer 2)**: 2-port/multi-port device that divides a congested LAN into smaller segments. Filters/forwards frames based on MAC addresses. **Divides 1 collision domain into 2 separate collision domains**, but maintains **1 single broadcast domain**.
* **Switch (Layer 2)**: High-speed multiport bridge. Provides **micro-segmentation**: **each port is its own dedicated collision domain**. Forwarding modes:
  * *Store-and-Forward*: Verifies CRC checksum before forwarding (reliable).
  * *Cut-Through*: Forwards as soon as the 6-byte destination MAC is read (lowest latency).
  * *Fragment-Free*: Checks first 64 bytes (collision window) before forwarding.
* **Router (Layer 3)**: Interconnects different logical subnets/networks via IP addresses. Executes dynamic routing (**OSPF, RIP, BGP**) and **NAT**. **Breaks both collision domains AND broadcast domains**.
* **Gateway (Layers 4–7)**: Protocol translator between completely incompatible network architectures (e.g., translates IP to IBM SNA).
* **Workstation vs. Server**: Workstations are high-performance single-user client computers; Servers provide 24×7 multi-user shared services (Web, DB, DNS) with redundant power and RAID storage.

![Switch](diagrams/part5_switch_lab.jpeg)
![Router](diagrams/part5_router_lab.jpeg)
![Gateway](diagrams/part5_gateway_lab.png)

---

### C. Master 10-Parameter Hardware Comparison Table (Pages 9–10)

![Device Comparison Table](diagrams/part5_device_comparison_table.png)

| Feature / Device | Switch | Router | Gateway | Bridge | Hub | Repeater |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Operating Layer** | **Data Link (L2)** | **Network (L3)** | **Application/Transport (L4–L7)** | **Data Link (L2)** | **Physical (L1)** | **Physical (L1)** |
| **Addressing Used** | **MAC Address** | **IP Address** | Protocol / Port / IP | **MAC Address** | **None** | **None** |
| **Collision Domains** | **1 per port** | **1 per interface**| **1 per interface** | **1 per segment** | **1 shared domain**| **1 shared domain** |
| **Broadcast Domains**| **1 shared domain** | **Breaks broadcast domains** | **Breaks broadcast domains** | **1 shared domain**| **1 shared domain**| **1 shared domain** |
| **Forwarding Logic** | Selective Unicast via CAM | Routing Table lookup | Protocol Translation | MAC filter/forward | Blind broadcast | Blind regenerate |
| **Data Unit Handled**| **Frames** | **Packets** | Messages / Segments | **Frames** | **Raw Bits** | **Raw Bits** |
| **Bandwidth** | **Dedicated per port** | Dedicated per interface | Dedicated per interface | Shared per segment | **Shared across all** | Shared |
| **Speed** | $1-100\text{ Gbps}$ | $1-10\text{ Gbps}$ | Moderate | $10-100\text{ Mbps}$ | $10-100\text{ Mbps}$ | Line rate |
| **Intelligence** | High | Very High | Highest | Moderate | **None** | **None** |
| **Standard Example** | Cisco Catalyst 9200 | Cisco ISR 4331 | VoIP / Email Gateway | Cisco 500 Bridge | Netgear Hub (Legacy)| Media Converter |

---

## 2. Transmission Media

---

### A. Guided Media: Twisted Pair Cable (Pages 10–12)

![Twisted Pair Cable](diagrams/part5_twisted_pair_cable.jpeg)

* **Why Wires are Twisted**: Twisting causes external electromagnetic interference (EMI) and crosstalk to affect both wires identically. A differential receiver subtracts the two signals: $(S + N) - (-S + N) = 2S$, canceling the noise!
* **UTP vs. STP**:
  * **UTP (Unshielded Twisted Pair)**: Inexpensive, flexible, 4 twisted pairs in PVC jacket. Maximum distance: strictly **100 meters (328 feet)**.
  * **STP (Shielded Twisted Pair)**: Foil and braided metallic shielding around pairs with a ground drain wire. Ground drains ambient noise. Used in heavy industrial EMI environments.
* **Cable Categories**:
  * **Cat5e**: Up to $100\text{ MHz}$; supports $1\text{ Gbps}$ up to $100\text{ meters}$.
  * **Cat6**: Up to $250\text{ MHz}$; internal pair separator spline; supports $10\text{ Gbps}$ up to $55\text{ m}$ ($1\text{ Gbps}$ up to $100\text{ m}$).
  * **Cat6a**: Up to $500\text{ MHz}$; supports full $10\text{ Gbps}$ up to $100\text{ meters}$.

---

### B. Crimping Standards: T568A vs. T568B & Straight vs. Crossover
Connector: **RJ-45 (8P8C)**.

| Pin # | T568A | T568B (Standard) |
| :---: | :--- | :--- |
| **1** | White-Green | **White-Orange** |
| **2** | Green | **Orange** |
| **3** | White-Orange | **White-Green** |
| **4** | Blue | **Blue** |
| **5** | White-Blue | **White-Blue** |
| **6** | Orange | **Green** |
| **7** | White-Brown | **White-Brown** |
| **8** | Brown | **Brown** |

*(Rule: Blue on 4 & 5, Brown on 7 & 8 are identical in both! Only Orange and Green swap positions).*

* **Straight-Through Cable** (Same at both ends: T568B $\longleftrightarrow$ T568B):
  * Connects **DIFFERENT / HETEROGENEOUS devices**: PC $\longleftrightarrow$ Switch, Switch $\longleftrightarrow$ Router.
* **Crossover Cable** (T568A at one end $\longleftrightarrow$ T568B at other end):
  * Connects **SIMILAR / LIKE devices**: PC $\longleftrightarrow$ PC, Switch $\longleftrightarrow$ Switch, Router $\longleftrightarrow$ PC.

---

### C. Coaxial Cable (Pages 12–13)

![Coaxial Cable](diagrams/part5_coaxial_cable.jpeg)

* **Construction (4 layers)**: Center copper conductor $\rightarrow$ Dielectric plastic insulator $\rightarrow$ Braided metallic shield $\rightarrow$ Outer PVC jacket.
* **Impedances**:
  * **50-Ohm Coaxial**: Baseband digital transmission (10Base2 Thinnet RG-58, 10Base5 Thicknet RG-8).
  * **75-Ohm Coaxial**: Broadband analog RF transmission (Cable TV, satellite dishes, RG-6, RG-59).
* **Connectors**: BNC (Bayonet Neill–Concelman), F-type connectors.

---

### D. Fiber Optic Cable (Pages 13–14)

![Fiber Optic Cable](diagrams/part5_fiber_optic_cable.jpeg)

* **Physics of Total Internal Reflection (TIR)**: Light travels through a glass **Core** surrounded by a glass **Cladding**. Condition for TIR:
  $$\mathbf{n_{\text{core}} > n_{\text{cladding}}}$$
* **Comparison Matrix**:
  | Feature | Single-Mode Fiber (SMF) | Multi-Mode Fiber (MMF) | Plastic Optical Fiber (POF) |
  | :--- | :--- | :--- | :--- |
  | **Core Diameter** | Very narrow (**$8-10\text{ }\mu\text{m}$**) | Wide (**$50-100\text{ }\mu\text{m}$**) | Large ($\approx 1\text{ mm}$) |
  | **Light Source** | **Laser Diode** | **LED / VCSEL** | Red LED |
  | **Propagation** | Single direct ray (zero modal dispersion) | Multiple bouncing rays | Multiple bouncing rays |
  | **Distance** | **Long haul ($> 100\text{ km}$)** | **Short haul ($< 2\text{ km}$)** | Very short ($< 100\text{ m}$) |
  | **Cost & Splicing** | Expensive, difficult splicing | Inexpensive transceivers, easy | Extremely cheap, flexible |
  | **Applications** | Telecom trunks, Undersea cables | Campus LANs, Data Centers | Automotive infotainment |

---

### E. Unguided (Wireless) Media (Pages 13–14)
* **Radio Waves ($3\text{ kHz}-1\text{ GHz}$)**: Omnidirectional, penetrates walls (Wi-Fi, FM radio, cellular).
* **Microwaves ($1\text{ GHz}-300\text{ GHz}$)**: Line-of-sight unidirectional; dish antennas; cannot penetrate obstacles (terrestrial towers, satellites).
* **Infrared ($300\text{ GHz}-400\text{ THz}$)**: Short-range line-of-sight; **cannot penetrate walls** (high security, remote controls).
* **Free Space Optics (FSO)**: Laser beam through open air line-of-sight (vulnerable to fog/rain).

---

## 3. Communication Protocols Reference (Pages 14–16)

* **ARP (Address Resolution Protocol)**: Resolves known 32-bit IP address to 48-bit physical MAC address.
* **DHCP (Dynamic Host Configuration Protocol)**: Automatically configures host IP, subnet mask, default gateway, and DNS via the 4-step **DORA** process: **D**iscover $\rightarrow$ **O**ffer $\rightarrow$ **R**equest $\rightarrow$ **A**cknowledge.
* **DNS (Domain Name System)**: Distributed database resolving domain names (`google.com`) to IP addresses over UDP Port 53.
* **Routing Protocols**:
  * **OSPF**: Link-state, Dijkstra shortest path, within enterprise AS.
  * **RIP**: Distance-vector, hop count metric (max 15 hops; 16 = unreachable).
  * **BGP**: Path-vector, inter-AS routing powering the global Internet.
* **Application Protocols**: HTTP (Port 80), HTTPS (Port 443, SSL/TLS), FTP (Port 20/21), SMTP (Port 25), SSH (Port 22).

---

## 4. Network Defense & Diagnostic Simulators (Pages 16–17)

### Firewall vs. IDS vs. IPS
* **Firewall**: Perimeter barrier filtering packets based on IP/port rules and stateful inspection.
* **IDS (Intrusion Detection System)**: Deployed **out-of-band** (passive SPAN port); listens to traffic copy, detects anomaly signatures, and **alerts administrators** without dropping packets.
* **IPS (Intrusion Prevention System)**: Deployed **inline**; inspects live traffic and **actively drops malicious packets** and blocks offending IPs in real time.

### Network Simulators:
* **Cisco Packet Tracer**: Drag-and-drop educational simulator for CCNA lab practice.
* **GNS3**: Network software emulator running actual Cisco/Juniper IOS operating systems.
* **NS2 / NS3**: Discrete-event academic network simulators for C++/Python protocol research.
* **Wireshark**: Open-source packet sniffer and protocol analyzer for live network packet inspection.

---

## 5. Numerical Problems: Transmission vs. Propagation Delay

### Formulas:
$$\text{Transmission Delay } \mathbf{T_{\text{trans}} = \frac{L}{R}} \quad \left[\frac{\text{Packet Length (bits)}}{\text{Bandwidth (bps)}}\right]$$
$$\text{Propagation Delay } \mathbf{T_{\text{prop}} = \frac{d}{v}} \quad \left[\frac{\text{Distance (m)}}{\text{Speed in Medium } (\approx 2 \times 10^8\text{ m/s})}\right]$$

### Solved Example:
* **Problem**: A host sends a 1500-byte packet over a $100\text{ Mbps}$ link of length $1\text{ km}$ ($v = 2 \times 10^8\text{ m/s}$). Calculate $T_{\text{trans}}$ and $T_{\text{prop}}$.
* **Solution**:
  * $L = 1500 \times 8 = 12,000\text{ bits}$; $R = 100 \times 10^6\text{ bps}$.
  * $T_{\text{trans}} = \frac{12,000}{10^8} = \mathbf{120\text{ }\mu\text{s}}$ ($0.12\text{ ms}$).
  * $T_{\text{prop}} = \frac{1000\text{ m}}{2 \times 10^8\text{ m/s}} = \mathbf{5\text{ }\mu\text{s}}$ ($0.005\text{ ms}$).
  * Total time $= 120\text{ }\mu\text{s} + 5\text{ }\mu\text{s} = \mathbf{125\text{ }\mu\text{s}}$.

---

## 6. Exam Questions Bank (Ranked by Priority)

### 2-Mark Questions
1. 🔥🔥🔥 **What is the maximum certified length of a standard UTP Ethernet segment?**  
   *Strictly 100 meters (328 feet).*
2. 🔥🔥🔥 **State the cable rule: when do you use Straight-Through vs. Crossover cables?**  
   *Straight-Through for different devices (PC to Switch); Crossover for like devices (PC to PC, Switch to Switch).*
3. 🔥🔥 **State the condition for Total Internal Reflection in optical fibers.**  
   *$n_{\text{core}} > n_{\text{cladding}}$ and angle of incidence exceeds critical angle.*
4. 🔥 **Differentiate between an IDS and an IPS.**  
   *IDS passively monitors out-of-band and alerts; IPS sits inline and actively drops attack packets.*

### 4/5-Mark Questions
1. 🔥🔥🔥 **Compare Single-Mode Fiber (SMF) and Multi-Mode Fiber (MMF) across 5 parameters.**  
   *(Core diameter: 9μm vs 50μm; Light source: Laser vs LED; Distance: >100km vs <2km; Dispersion: zero vs high; Cost: expensive vs cheaper).*
2. 🔥🔥🔥 **Explain the 6 internal functions of a Network Interface Card (NIC).**  
   *(Buffering, Framing, Media Access, SerDes conversion, Encoding, Transmission).*
3. 🔥🔥 **Explain the working of DHCP and the DORA process.**  
   *(Discover, Offer, Request, Acknowledge to dynamically configure client IP parameters).*

### 8/10-Mark Questions
1. 🔥🔥🔥 **Provide a comprehensive comparative analysis of Repeaters, Hubs, Bridges, Switches, Routers, and Gateways across Layer, Addressing, Collision Domains, Broadcast Domains, and Forwarding Logic.**  
   *(Reproduce the 10-parameter master comparison table from Section 1.C).*
2. 🔥🔥🔥 **(a) Explain the construction and working of Twisted Pair, Coaxial, and Fiber Optic cables. (b) Detail the T568A and T568B pinout standards and Straight vs Crossover applications.**  
   *(Detail twisting cancellation, UTP vs STP, coax layers, fiber TIR, full 8-pin color table, and cable rules).*

---

## 7. Short Notes & Must Know Before Moving On
* **UTP limit**: 100 meters; twisting cancels crosstalk/EMI.
* **T568B color order**: White-Orange, Orange, White-Green, Blue, White-Blue, Green, White-Brown, Brown.
* **Cable rule**: Like devices = Crossover; Different devices = Straight-Through.
* **SMF vs MMF**: SMF has 9μm core, Laser, >100km (no modal dispersion); MMF has 50μm core, LED, <2km.
* **Switch vs Bridge**: Bridge divides collision domain into 2; Switch provides 1 collision domain per port.
* **Router**: Breaks both broadcast and collision domains; routes by IP.
* **DHCP**: DORA process (Discover, Offer, Request, Acknowledge).
* **Delays**: $T_{\text{trans}} = \frac{L}{R}$ (bits/bandwidth); $T_{\text{prop}} = \frac{d}{v}$ (meters/speed).

---

## 8. Active Recall Test & Answer Key

### Questions
1. What happens if a Cat6 UTP cable exceeds 100 meters?
2. Which color pairs swap between T568A and T568B?
3. What cable connects two PCs directly without a switch?
4. What is the condition for Total Internal Reflection in fiber optics?
5. Does an IDS or an IPS drop malicious packets?

### Answer Key
1. Severe signal attenuation and packet corruption rendering the link unusable.
2. The Orange pair (Pins 1 & 2) and Green pair (Pins 3 & 6).
3. A **Crossover Cable**.
4. $n_{\text{core}} > n_{\text{cladding}}$.
5. An **IPS (Intrusion Prevention System)**.