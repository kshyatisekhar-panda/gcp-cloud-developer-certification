# Networking & Security Quiz (Week 5 - Extended)

This quiz covers VPC, Load Balancers, Cloud Armor, IAP, Cloud NAT, and network security — heavily tested topics on the exam.

---

### 1. Which scope does a VPC have?
- A. Regional
- ☑️ B. Global
- C. Zonal
- D. Project-only

✅ **Correct:** B. Global
**Why:** VPCs span all regions; subnets are regional.

---

### 2. What scope does a subnet have?
- ☑️ A. Regional
- B. Global
- C. Zonal
- D. VPC-level

✅ **Correct:** A. Regional
**Why:** Subnets exist within a single region with a specific IP range.

---

### 3. Is VPC peering transitive?
- A. Yes
- ☑️ B. No
- C. Only within same project
- D. Only cross-project

✅ **Correct:** B. No
**Why:** VPC-A peered to VPC-B, VPC-B peered to VPC-C does NOT mean VPC-A can reach VPC-C.

---

### 4. Which load balancer is REQUIRED for Cloud Armor?
- ☑️ A. External HTTP(S) Load Balancer
- B. Network Load Balancer
- C. Internal HTTP(S) Load Balancer
- D. TCP Proxy Load Balancer

✅ **Correct:** A. External HTTP(S) Load Balancer
**Why:** Cloud Armor only attaches to HTTP(S) LB backend services.

---

### 5. What does Cloud Armor protect against?
- A. IAM misconfiguration
- ☑️ B. SQL injection, XSS, DDoS, bots
- C. Network segmentation issues
- D. Secret leakage

✅ **Correct:** B. SQL injection, XSS, DDoS, bots
**Why:** Cloud Armor is a WAF for OWASP Top 10 and DDoS protection.

---

### 6. Can Cloud Armor attach directly to Cloud Run?
- A. Yes
- ☑️ B. No, requires HTTP(S) LB
- C. Yes, via IAM
- D. Only with VPC connector

✅ **Correct:** B. No, requires HTTP(S) LB
**Why:** Cloud Run must be behind an HTTP(S) LB to use Cloud Armor.

---

### 7. Is Cloud Run inside a VPC?
- A. Yes, always
- ☑️ B. No, use VPC connector for private access
- C. Yes, with default settings
- D. Only in GKE mode

✅ **Correct:** B. No, use VPC connector for private access
**Why:** Cloud Run is serverless and outside VPC; use Serverless VPC Access to reach private resources.

---

### 8. When should you use Cloud NAT?
- A. VMs with public IPs accessing internet
- ☑️ B. VMs without public IPs accessing internet
- C. Accessing Google APIs
- D. Internal VM communication

✅ **Correct:** B. VMs without public IPs accessing internet
**Why:** Cloud NAT provides outbound internet access for private VMs.

---

### 9. When should you use Private Google Access?
- A. Internet access from private VMs
- ☑️ B. Google API access from private VMs
- C. VPC peering
- D. Cross-region communication

✅ **Correct:** B. Google API access from private VMs
**Why:** Private Google Access allows VMs without external IPs to reach Google APIs.

---

### 10. What is the purpose of Identity-Aware Proxy (IAP)?
- A. Web attack protection
- ☑️ B. User identity-based access to internal apps
- C. DDoS mitigation
- D. Secret storage

✅ **Correct:** B. User identity-based access to internal apps
**Why:** IAP verifies user identity before allowing access to applications.

---

### 11. For SQL injection protection, use:
- A. Firewall rules
- ☑️ B. Cloud Armor
- C. IAM
- D. IAP

✅ **Correct:** B. Cloud Armor
**Why:** Cloud Armor has preconfigured WAF rules for SQL injection.

---

### 12. For user-based app access, use:
- A. Cloud Armor
- B. Firewall rules
- ☑️ C. IAP
- D. Cloud NAT

✅ **Correct:** C. IAP
**Why:** IAP controls access based on user identity and group membership.

---

### 13. Which LB provides global anycast IP?
- ☑️ A. External HTTP(S) LB
- B. Network LB
- C. Internal HTTP(S) LB
- D. Internal TCP LB

✅ **Correct:** A. External HTTP(S) LB
**Why:** External HTTP(S) LB uses global anycast for low-latency routing.

---

### 14. What is a Serverless VPC Access Connector used for?
- A. Internet egress
- ☑️ B. Cloud Run/Functions accessing VPC resources
- C. Load balancing
- D. VPC peering

✅ **Correct:** B. Cloud Run/Functions accessing VPC resources
**Why:** VPC connectors allow serverless services to reach private VPC resources.

---

### 15. Which is true about firewall rules?
- A. Stateless
- ☑️ B. Stateful
- C. Apply at subnet level
- D. Only for outbound traffic

✅ **Correct:** B. Stateful
**Why:** GCP firewall rules are stateful — return traffic is automatically allowed.

---

### 16. To protect against bot traffic, use:
- A. Firewall rules
- B. IAP
- ☑️ C. Cloud Armor
- D. IAM

✅ **Correct:** C. Cloud Armor
**Why:** Cloud Armor provides bot management and rate limiting.

---

### 17. Which service provides CDN capability?
- A. Cloud Storage alone
- ☑️ B. HTTP(S) LB with Cloud CDN
- C. Network LB
- D. Cloud Armor

✅ **Correct:** B. HTTP(S) LB with Cloud CDN
**Why:** Cloud CDN integrates with HTTP(S) Load Balancer for caching.

---

### 18. For simple TCP/UDP regional load balancing, use:
- A. HTTP(S) LB
- ☑️ B. Network LB
- C. TCP Proxy LB
- D. Internal HTTP LB

✅ **Correct:** B. Network LB
**Why:** Network LB is pass-through, regional, for TCP/UDP traffic.

---

### 19. What is required for Cloud NAT?
- ☑️ A. Cloud Router
- B. VPC Connector
- C. HTTP(S) LB
- D. Cloud Armor

✅ **Correct:** A. Cloud Router
**Why:** Cloud NAT requires a Cloud Router to advertise routes.

---

### 20. How do you enable Private Google Access?
- A. Create Cloud NAT
- ☑️ B. Enable on subnet
- C. Configure IAP
- D. Add firewall rule

✅ **Correct:** B. Enable on subnet
**Why:** Private Google Access is a subnet-level setting.

---

### 21. Which security tool does NOT protect against XSS?
- A. Cloud Armor
- ☑️ B. Firewall rules
- C. WAF policies
- D. Security policies

✅ **Correct:** B. Firewall rules
**Why:** Firewall rules are for network-level filtering, not application attacks.

---

### 22. For internal HTTP services, use:
- A. External HTTP(S) LB
- ☑️ B. Internal HTTP(S) LB
- C. Network LB
- D. Cloud Armor

✅ **Correct:** B. Internal HTTP(S) LB
**Why:** Internal HTTP(S) LB is for private, internal-only HTTP traffic.

---

### 23. What is Shared VPC used for?
- A. VPC peering
- ☑️ B. Centralized network control across projects
- C. Internet access
- D. Load balancing

✅ **Correct:** B. Centralized network control across projects
**Why:** Shared VPC allows a host project to share network with service projects.

---

### 24. Rate limiting is implemented using:
- A. Firewall rules
- B. IAM
- ☑️ C. Cloud Armor
- D. VPC

✅ **Correct:** C. Cloud Armor
**Why:** Cloud Armor security policies support rate limiting rules.

---

### 25. To add WAF to Cloud Run, the correct order is:
- A. Cloud Armor → Cloud Run
- ☑️ B. HTTP(S) LB → Cloud Armor → Serverless NEG → Cloud Run
- C. Cloud Armor → VPC Connector → Cloud Run
- D. Network LB → Cloud Armor → Cloud Run

✅ **Correct:** B. HTTP(S) LB → Cloud Armor → Serverless NEG → Cloud Run
**Why:** Cloud Run needs HTTP(S) LB with serverless NEG for Cloud Armor.

---

### 26. What type of firewall rules control traffic leaving VMs?
- A. Ingress rules
- ☑️ B. Egress rules
- C. NAT rules
- D. Armor rules

✅ **Correct:** B. Egress rules
**Why:** Egress rules control outbound traffic from VMs.

---

### 27. For TCP with TLS termination at global scale, use:
- A. Network LB
- ☑️ B. SSL Proxy LB
- C. Internal TCP LB
- D. HTTP(S) LB

✅ **Correct:** B. SSL Proxy LB
**Why:** SSL Proxy LB handles TLS termination for TCP traffic globally.

---

### 28. Cloud Run needs to access Cloud SQL with private IP. What's needed?
- ☑️ A. Serverless VPC Access Connector
- B. Cloud NAT
- C. IAP
- D. Public IP on Cloud SQL

✅ **Correct:** A. Serverless VPC Access Connector
**Why:** VPC connector allows Cloud Run to reach private IP resources.

---

### 29. Which is NOT a valid load balancer type?
- A. External HTTP(S) LB
- B. Internal TCP/UDP LB
- ☑️ C. Global Network LB
- D. Regional External HTTP(S) LB

✅ **Correct:** C. Global Network LB
**Why:** Network LB is regional only; use TCP/SSL Proxy for global TCP.

---

### 30. Defense in depth means:
- A. Using one strong security control
- ☑️ B. Multiple layers of security
- C. Maximum firewall rules
- D. Public access disabled

✅ **Correct:** B. Multiple layers of security
**Why:** Defense in depth uses multiple controls (WAF + IAM + firewall + encryption).

---
