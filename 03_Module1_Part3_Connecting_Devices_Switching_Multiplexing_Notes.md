# 03. Connecting Devices, Switching Techniques & Multiplexing
**Module 1 — Part 3 Study Notes**  
*Source: `MODULE1_PART_3.pdf` (Slides 1–92)*

---

## 1. Connecting Devices

Connecting devices link computers and network segments together to establish communication pathways.

---

### A. Passive Hub vs. Active Hub
* **Passive Hub (Layer 1)**: A simple physical connector that mechanically splits incoming wires without amplification or regeneration. Cannot extend network distance.
* **Active Hub (Layer 1 / Multiport Repeater)**: A powered device that receives a signal on one port, regenerates it to full voltage, and **broadcasts it to EVERY OTHER PORT**.
  * **Collision Domain**: **1 shared collision domain across all ports**.
  * **Broadcast Domain**: **1 shared broadcast domain**.
  * **Bandwidth**: Shared among all active ports.

![Passive Hub](diagrams/part3_passive_hub_diagram.png)

---

### B. Network Switch (Layer 2)
* An intelligent device that forwards data frames based on physical **MAC (Media Access Control) addresses**.
* **Micro-Segmentation**: **Each switch port is its own separate collision domain**. Collisions are completely eliminated in full-duplex mode. All ports share 1 broadcast domain.
* **Access Switch vs. Core Switch**:
  * *Access Switch*: Placed on office floors; directly connects user PCs, printers, and Wi-Fi APs.
  * *Core Switch*: High-speed backbone switch in the server room linking all access switches.

![Switch](diagrams/part3_switch_device.jpeg)

#### 4-Step Working of a Switch:
1. Frame arrives from Computer A on Port 1.
2. Switch records Computer A's Source MAC in its **MAC Address Table (CAM Table)**.
3. Switch inspects Destination MAC (Computer B).
4. Switch looks up its table and forwards the frame **ONLY to the specific port connected to Computer B** (Unicast).

---

### C. Router (Layer 3)
* Connects two or more **logically different subnets/networks** (e.g., LAN to Internet).
* Inspects **Logical (IP) Addresses** and uses routing protocols (**OSPF, RIP, BGP**) to select optimal paths.
* **Breaks up BOTH Collision Domains AND Broadcast Domains** (does not forward broadcasts).
* Performs **Network Address Translation (NAT)** to map private LAN IPs to a public IP.

![Router](diagrams/part3_router_device.jpeg)

---

### D. Firewall, Gateway, NIC & Repeater

| Device | Layer | Primary Function |
| :--- | :---: | :--- |
| **Firewall** | L3–L7 | Monitors and filters traffic based on predefined security rules (ACLs, stateful inspection). |
| **Gateway** | L4–L7 | Protocol converter enabling communication between heterogeneous networks (e.g., IP to SNA). |
| **NIC** | L1 & L2 | Converts parallel CPU data to serial line signals; burns 48-bit MAC address in ROM; frames data. |
| **Repeater** | L1 | Regenerates and amplifies attenuated digital signals to extend cable distance. |

![Firewall](diagrams/part3_firewall_device.jpeg)
![Gateway](diagrams/part3_gateway_device.jpeg)

---

### E. Case Study: State Bank of India (SBI) Smart Branch Design

![SBI Enterprise Network Architecture](diagrams/part3_enterprise_network_arch.png)

#### Equipment Hierarchy (Slides 20–35):
1. **Edge Router (e.g., Cisco ISR)**: Connects branch network to Head Office via MPLS/VPN and ISP.
2. **Next-Generation Firewall (Palo Alto / Fortinet)**: Filters traffic and defends against cyber threats.
3. **Core Switch (Server Room)**: High-speed central backbone connecting all floor switches and servers.
4. **Access Switches (One per floor)**: Connects teller PCs, cash counters, and CCTV cameras.
5. **Media Converters**: Converts optical fiber risers to copper twisted-pair cables between floors.

#### Why Modern Banks Strictly Prohibit Hubs:
* **Security Threat**: Hubs broadcast financial account numbers and passwords to all PCs on the floor.
* **Performance Choke**: Frequent packet collisions slow down transaction processing at cash counters.

#### Secure 6-Tier VLAN Design (Slide 36):
| VLAN ID | Subnet / Purpose | Devices Assigned | Security Justification |
| :--- | :--- | :--- | :--- |
| **VLAN 10** | Employees | Staff laptops, loan officer PCs | General banking software access |
| **VLAN 20** | Cash Counters | Teller terminals, receipt printers | High-priority transaction isolation |
| **VLAN 30** | ATM Machines | On-site Cash Dispenser Kiosks | Isolated encrypted tunnel to Head Office |
| **VLAN 40** | CCTV Surveillance| HD IP Cameras, NVR storage | High bandwidth; isolated from data network |
| **VLAN 50** | Guest Wi-Fi | Customer mobile phones | Public Internet only; blocked from bank data |
| **VLAN 60** | Branch Servers | Local database, domain controller | Multi-factor authentication; restricted access |

---

### F. What is Inside a Home Wi-Fi Router? (Slides 17–18)
A standard home wireless router integrates **4 distinct physical devices**:
1. **Wireless Access Point (AP)**: Radio transceiver for Wi-Fi devices.
2. **4-Port Switch**: Connects wired smart TVs and PCs.
3. **Router**: Routes traffic between the private home LAN ($192.168.1.x$) and the public ISP.
4. **Hardware Firewall + NAT**: Translates internal private IPs and blocks unsolicited incoming scans.

![Home Wireless Router](diagrams/part3_home_network_device.jpeg)

---

## 2. Basic Communication System Model (Slides 40–43)

![Communication System Model](diagrams/part3_comm_model.png)

* **Source**: Generates the message data.
* **Transmitter**: Encodes/modulates data into physical signals.
* **Channel (Medium)**: Physical path carrying the signal (subject to **Noise & Attenuation**).
* **Receiver**: Demodulates and decodes signals back into bits.
* **Destination**: Consumes the received message.

---

## 3. Switching Techniques

![Switching Taxonomy](diagrams/part3_switching_taxonomy.png)

---

### A. Circuit Switching (Slide 46)
* A **dedicated, unbroken physical transmission path** is reserved end-to-end before transmission starts.
* **3 Distinct Phases**:
  1. **Circuit Setup**: Signals reserve channels across all intermediate switches.
  2. **Data Transfer**: Continuous stream of bits travels along the reserved path.
  3. **Circuit Teardown**: Path is released for other users.
* **Pros**: Guaranteed constant bandwidth; zero jitter; no out-of-order packets.
* **Cons**: Extremely wasteful for bursty data (channel stays locked during silence); call setup delay.
* **Example**: Traditional Landline PSTN.

![Circuit Switching](diagrams/part3_circuit_switching.png)

---

### B. Message Switching (Slide 47)
* The entire message is treated as a single complete block and transferred **hop-by-hop**.
* **Store-and-Forward**: Each intermediate switch stores the entire message on disk, verifies integrity, and forwards it when the outgoing line becomes free.
* **Cons**: Requires huge intermediate buffer storage; immense propagation delay; unusable for real-time traffic.
* **Example**: Historical telegraph networks.

![Message Switching](diagrams/part3_message_switching.png)

---

### C. Packet Switching (Slides 48–49)
* Messages are segmented into small discrete units called **Packets** (Header + Payload).
* Packets are routed **independently** across intermediate routers and reassembled at the destination.
* **Two Modes**:
  * *Datagram (Connectionless)*: Packets take different routes; may arrive out-of-order (Internet/IP).
  * *Virtual Circuit (Connection-Oriented)*: A pre-planned logical route is established; packets arrive in order (X.25, ATM).

![Packet Switching Model](diagrams/part3_packet_switching_model.jpeg)

---

### D. Why the Internet Uses Packet Switching (Slides 50–55)
1. **Statistical Multiplexing**: Computer traffic is bursty; thousands of users dynamically share the same physical trunk link efficiently.
2. **Fault Tolerance & Dynamic Rerouting**: If a router or fiber line fails, subsequent packets are automatically rerouted around the failure.
3. **No Setup Delay**: Packets transmit immediately without reserving dedicated channels.

---

### E. Master Comparison: Circuit vs. Message vs. Packet Switching

| Parameter | Circuit Switching | Message Switching | Packet Switching |
| :--- | :--- | :--- | :--- |
| **Physical Path** | Dedicated path reserved end-to-end | Hop-by-hop store-and-forward | Independent dynamic routing |
| **Phases** | 3 (Setup, Transfer, Teardown) | 1 (Store-and-Forward) | 1 (Segment, Route, Reassemble) |
| **Data Unit** | Continuous bit stream | Entire complete message block | Small discrete **Packets** |
| **Intermediate Storage**| **None** | **Immense** (stores full message) | **Minimal** (RAM buffer per packet) |
| **Bandwidth Efficiency**| **Poor** (wasted during idle pauses) | Moderate | **Highest** (Statistical Multiplexing) |
| **Delivery Order** | Strict sequential order | In-order (single block) | May arrive **out-of-order** |
| **Node Failure Impact** | Aborts the call immediately | Halts message indefinitely | **Dynamic rerouting bypasses failed node** |
| **Standard Example** | Landline PSTN | Historical Telegraph | **The Global Internet (IP)** |

---

## 4. Multiplexing Techniques

Multiplexing combines multiple independent signals over a single high-capacity physical link.

![Multiplexing Categories](diagrams/part3_multiplexing_taxonomy.png)

---

### A. Frequency Division Multiplexing (FDM)
* **Analog technique**: Divides the total frequency bandwidth into multiple non-overlapping **frequency sub-bands**.
* Each user transmits **simultaneously** on a distinct carrier frequency.
* **Guard Bands**: Unused frequency strips placed between channels to prevent overlapping and crosstalk.
* **Applications**: AM/FM radio, Cable TV, ADSL broadband.

![FDM Principle](diagrams/part3_fdm_principle.png)

---

### B. Time Division Multiplexing (TDM)
* **Digital technique**: Users share the **entire bandwidth of the link**, but transmit in alternating, non-overlapping **time slots**.

![TDM Slots](diagrams/part3_tdm_slots_diagram.png)

#### TDM Variations:
1. **Synchronous TDM**: The multiplexer assigns fixed, round-robin time slots to each input channel, *even if the channel is idle*. Wastes bandwidth under bursty traffic (used in telephone T1 lines).
2. **Asynchronous / Statistical TDM**: Slots are dynamically allocated **ONLY to active channels**. Eliminates empty slots; requires an **address tag** per slot to identify the destination channel (highest efficiency).
3. **Interleaving TDM**: Slices data into alternating bytes/bits across frames. When a sudden **burst noise** strike occurs, it corrupts only 1 isolated bit per channel, allowing Forward Error Correction (FEC) to repair the damage easily!

![Sync vs Async TDM](diagrams/part3_sync_async_tdm_model.jpeg)
![Interleaving TDM](diagrams/part3_interleaving_tdm.png)

---

### C. Code Division Multiplexing (CDM)
* All users transmit **simultaneously** over the **same frequency band**.
* Each user is assigned a unique, mathematically **orthogonal Walsh code**.
* Receiver computes the inner product: matching code evaluates to 1; all other orthogonal codes cancel to 0.
* **Pros**: Highly secure, resistant to jamming.
* **Applications**: 3G Mobile Networks (CDMA), GPS satellites, military communications.

![CDM Model](diagrams/part3_cdm_model.jpeg)

---

### D. Master Multiplexing Comparison Tables (Slides 82, 88)

#### Table 1: FDM vs. TDM vs. CDM
| Parameter | FDM | TDM | CDM |
| :--- | :--- | :--- | :--- |
| **Shared Resource** | **Frequency spectrum** is divided | **Time** is divided into slots | **Orthogonal mathematical codes** |
| **Transmission Timing**| **Simultaneous** continuous | **Sequential** (interleaved slots) | **Simultaneous** continuous |
| **Signal Type** | Primarily **Analog** | Primarily **Digital** | Digital spread spectrum |
| **Interference Guard**| **Guard Bands** prevent crosstalk | **Guard Times** prevent slot overlap| **Orthogonal codes** ($C_A \cdot C_B = 0$) |
| **Standard Example** | AM/FM Radio, CATV | Digital T1, Computer LANs | 3G Mobile networks, GPS |

#### Table 2: Synchronous TDM vs. Statistical TDM
| Feature | Synchronous TDM | Statistical (Asynchronous) TDM |
| :--- | :--- | :--- |
| **Slot Allocation** | **Fixed, static** round-robin | **Dynamic**, on-demand based on traffic |
| **Empty Slots** | **Yes** (wastes bandwidth when idle) | **No** (slots allocated only to active sources) |
| **Addressing Overhead** | **Zero** (slot position identifies source) | **Required** (each slot carries an address tag) |
| **Bandwidth Efficiency**| Moderate | **Highest** |

---

## 5. Solved Numericals

### Numerical 1: Synchronous TDM Output Bit Rate
* **Problem**: Four 1-kbps ($1000\text{ bps}$) channels are multiplexed using Synchronous TDM. Each slot carries $1\text{ bit}$. One framing bit is added per frame. Calculate:
  1. Frame Size: $S_f = (N \times b) + 1 = (4 \times 1) + 1 = \mathbf{5\text{ bits/frame}}$.
  2. Frame Rate: $F = \frac{R}{b} = \frac{1000}{1} = \mathbf{1000\text{ frames/second}}$.
  3. Output Bit Rate: $C = F \times S_f = 1000 \times 5 = \mathbf{5000\text{ bps (5 kbps)}}$.
  4. Frame Duration: $T_f = \frac{1}{F} = \frac{1}{1000}\text{ s} = \mathbf{1\text{ ms}}$.

### Numerical 2: FDM Total Bandwidth with Guard Bands
* **Problem**: Five channels of $4\text{ kHz}$ each are multiplexed using FDM. Adjacent channels are separated by $1\text{ kHz}$ guard bands. Calculate the total bandwidth required.
* **Solution**:
  * $N = 5\text{ channels}$; Guard Bands $= N - 1 = 4\text{ bands}$.
  * $B_{\text{total}} = (N \times B) + ((N - 1) \times G) = (5 \times 4\text{ kHz}) + (4 \times 1\text{ kHz}) = 20 + 4 = \mathbf{24\text{ kHz}}$.

---

## 6. Exam Questions Bank (Ranked by Priority)

### 2-Mark Questions
1. 🔥🔥🔥 **State two differences between a Hub and a Switch.**  
   *(Hub: Layer 1, blind broadcast, 1 shared collision domain. Switch: Layer 2, MAC unicast, collision domain per port).*
2. 🔥🔥🔥 **Why does Circuit Switching have no intermediate storage requirement?**  
   *Because an unbroken continuous physical copper/optical circuit is established end-to-end before transmission starts; bits flow directly through the physical medium without buffering.*
3. 🔥🔥 **What are Guard Bands in FDM?**  
   *Narrow unallocated frequency strips placed between adjacent channels to prevent spectral overlap and crosstalk.*

### 4/5-Mark Questions
1. 🔥🔥🔥 **Explain why the Internet uses Packet Switching instead of Circuit Switching.**  
   *(Detail: Statistical multiplexing handles bursty traffic; dynamic rerouting survives node failures; zero setup delay; worldwide scalability).*
2. 🔥🔥🔥 **Compare Synchronous TDM and Statistical TDM.**  
   *(Include slot allocation, empty slot handling, addressing overhead, and bandwidth efficiency).*
3. 🔥🔥 **Explain the purpose of Interleaving TDM.**  
   *(Slices bits/bytes across frames so burst noise damages only 1 isolated bit per channel, allowing Forward Error Correction to repair the packet).*

### 8/10-Mark Questions
1. 🔥🔥🔥 **Compare Circuit Switching, Message Switching, and Packet Switching across 8 parameters.**  
   *(Reproduce the master comparison table from Section 3.E).*
2. 🔥🔥🔥 **SBI Bank Branch Network Design: (a) Identify required devices and their locations/functions. (b) Explain why hubs are prohibited. (c) Present the 6-tier VLAN design.**  
   *(Answer structure: Router $\rightarrow$ Firewall $\rightarrow$ Core Switch $\rightarrow$ Access Switches; Hub security risks; VLAN 10–60 table).*

---

## 7. Short Notes & Must Know Before Moving On
* **Active Hub**: Layer 1 multiport repeater; broadcasts to all ports; 1 collision domain.
* **Switch**: Layer 2; forwards by destination MAC; dedicated bandwidth; 1 collision domain per port.
* **Router**: Layer 3; routes by IP address; breaks collision AND broadcast domains.
* **Circuit Switching**: 3 phases (Setup, Transfer, Teardown); guaranteed bandwidth; inefficient for bursty data (PSTN).
* **Packet Switching**: Packets routed independently; statistical multiplexing; dynamic rerouting around failures (Internet).
* **FDM**: Analog; splits frequency; uses $(N-1)$ guard bands (Radio/CATV).
* **TDM**: Digital; splits time slots. Synchronous = fixed slots; Statistical = dynamic slots with address overhead.
* **CDM**: Same frequency, same time; orthogonal Walsh codes ($C_A \cdot C_B = 0$).

---

## 8. Active Recall Test & Answer Key

### Questions
1. Which layer does a switch operate at, and which address does it use?
2. Does a network switch break broadcast domains?
3. State the 3 phases of Circuit Switching.
4. What is the difference between an active hub and a passive hub?
5. Why does Statistical TDM require an address header while Synchronous TDM does not?

### Answer Key
1. Layer 2 (Data Link Layer); MAC address.
2. No; all switch ports share 1 broadcast domain.
3. (1) Circuit Setup, (2) Data Transfer, (3) Circuit Teardown.
4. Passive hub is unpowered and simply splits wires; active hub is powered and regenerates/amplifies signals before broadcasting.
5. Because slots in Statistical TDM are dynamic and not tied to a fixed channel, each slot needs an address header so the demultiplexer can identify the destination channel.