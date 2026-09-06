# 🌐 Computer Networks — Master Exam Study & Revision Portal

> **Comprehensive, offline-ready, exam-focused study and revision portal covering Modules 1, 2, and 3 for Computer Networks (Fr. Conceicao Rodrigues College of Engineering / University of Mumbai).**

🔗 **Live Deployment:** [https://arnavpotale.github.io/computer-networks-study-portal/](https://arnavpotale.github.io/computer-networks-study-portal/)

---

## 🚀 Key Highlights & Features

- **🌐 Single Unified Web Portal:** Seamlessly navigate between Module 1, Module 2, Module 3, the Master Cram Sheet, and Last Year's Exam Paper Solutions using the top pill bar or sidebar.
- **📄 Official Mid-Semester 2025–26 Paper Solved:** Full synaptic solutions matching the official marking scheme, mapped module-by-module and subtopic-by-subtopic.
- **📝 100% Subtopic Coverage:** Audited against all 12 college lecture presentations and PDFs (177/177 subtopics covered).
- **🧮 Solved Numericals (Zero Raw LaTeX):** Every single formula and numerical problem is rendered using clean, high-contrast semantic HTML math cards with step-by-step substitutions and highlighted answer badges.
- **🖼️ Original Embedded Diagrams:** Over 80+ high-resolution diagrams extracted directly from the original course slides and embedded inline next to concepts.
- **⚡ 60-Minute Pre-Exam Cram Sheet:** High-yield comparison tables (OSI vs TCP/IP, Circuit vs Packet vs Virtual Circuit, Stop-and-Wait vs GBN vs Selective Repeat, IPv4 Classes, etc.) for quick final review.
- **🔍 Real-Time Global Search:** Instant keyword search across all modules, formulas, definitions, and question banks.

---

## 📚 Syllabus & Module Coverage

### 📘 Module 1: Fundamentals & Physical / Data Communication
- **Part 1:** Data Communication Components, Transmission Modes (Simplex, Half-Duplex, Full-Duplex), Line Configurations (Point-to-Point vs. Multipoint), Network Categories (PAN, LAN, MAN, WAN, Internetwork).
- **Part 2:** Network Topologies (Mesh, Star, Bus, Ring, Tree, Hybrid) with link and port formulas, advantages, and failure points.
- **Part 3:** Connecting Devices (Passive/Active Hubs, Bridges, Cut-Through vs. Store-and-Forward Switches, Routers, Gateways, Brouters, Firewalls); Switching (Circuit, Datagram Packet, Virtual Circuit, Message); Multiplexing (FDM, WDM, Synchronous & Statistical TDM, CDMA Walsh Codes).
- **Part 4:** 7-Layer OSI Reference Model vs. 4/5-Layer TCP/IP Model, PDU hierarchy (Bits, Frames, Packets, Segments, Data), and step-by-step Encapsulation & Decapsulation.
- **Part 5:** Guided Media (UTP Cat 5/6, STP, Coaxial 50Ω/75Ω, Optical Fiber Step/Graded/Single-Mode); Unguided Media (Radio, Microwave, Infrared); Standards Organizations (ISO, IEEE 802, IETF RFCs, ITU-T, ANSI).

### 📗 Module 2: Data Link Layer & MAC Sublayer
- **Part 1:** Data Link Layer Services (Unacknowledged connectionless, Acknowledged connectionless, Acknowledged connection-oriented); Framing methods (Character Count, Byte Stuffing with `ESC`, Bit Stuffing with `01111110` flag).
- **Part 2:** Error Detection & Correction: Single-bit vs. Burst errors, 1D & 2D Parity, Internet Checksum (1's complement), CRC Modulo-2 polynomial division (CRC-8, CRC-12, CRC-16, CRC-CCITT, CRC-32) and burst detection guarantees; Hamming Code distance laws ($d_{\text{min}} \ge s + 1$, $d_{\text{min}} \ge 2t + 1$), parity calculation ($2^r \ge m + r + 1$), and syndrome decoding.
- **Part 3:** Flow & Error Control: Stop-and-Wait ARQ, Bandwidth-Delay Product (BDP), Link Efficiency ($\eta = 1/(1+2a)$), Sliding Window Protocols, Go-Back-N ($W_s \le 2^k - 1$), Selective Repeat ($W_s \le 2^{k-1}$), and Piggybacking with ACK Delay Timer.
- **Part 4:** MAC Sublayer & LANs: Pure ALOHA (18.4%), Slotted ALOHA (36.8%), CSMA modes (1-persistent, non-persistent, p-persistent), CSMA/CD ($L_{\text{min}} \ge 2 \times R \times T_p$, Binary Exponential Backoff), CSMA/CA, Token Ring (IEEE 802.5), IEEE 802.3 Ethernet frame format (64B min, 1518B max), Fast Ethernet (802.3u), and Gigabit Ethernet (802.3z).

### 📙 Module 3: Network Layer & IPv4 Protocol
- **Part 1:** Network Layer Services: Store-and-Forward packet routing journey, Connectionless Datagram vs. Connection-Oriented Virtual Circuit subnets, Addressing hierarchy (MAC vs. IP vs. Port); IPv4 Classful Addressing (Classes A, B, C, D, E boundaries, default masks), Special IPs (`0.0.0.0`, `255.255.255.255`, `127.0.0.0/8` loopback, directed broadcast); Subnetting ($2^s$ subnets, $2^h - 2$ usable hosts), CIDR slash notation (`/n`), Supernetting / Route Aggregation; NAT (RFC 1918 private spaces: `10/8`, `172.16/12`, `192.168/16`) and NAPT port translation.
- **Part 2:** IPv4 Datagram Header: Complete 20–60 byte header with all 13 fields (VER, HLEN $\times 4$, TOS / DiffServ DSCP + ECN, Total Length, ID, Flags [DF, MF], Fragment Offset $\div 8$, TTL decrement, Protocol ICMP/TCP/UDP, Checksum, Source IP, Dest IP, Options & Padding).
- **Part 3:** Fragmentation & MTU: MTU differences, 8-Byte Offset Rule, and step-by-step worked fragmentation calculations.

---

## 🛠️ Local Setup & Development

To view the project locally:

```bash
# Clone the repository
git clone https://github.com/arnavpotale/computer-networks-study-portal.git

# Navigate into the project
cd computer-networks-study-portal

# Start a local HTTP server
python3 -m http.server 3000

# Open in browser: http://localhost:3000/
```

Or simply open `index.html` directly in any web browser (100% offline-ready with zero external dependencies).

---

## 👨‍💻 Author & Attribution

- **Developed for:** Computer Networks Exam Preparation (Fr. Conceicao Rodrigues College of Engineering / University of Mumbai)
- **Repository:** [arnavpotale/computer-networks-study-portal](https://github.com/arnavpotale/computer-networks-study-portal)
