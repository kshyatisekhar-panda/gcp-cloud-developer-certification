# Week 2 — Core Compute Services (App Engine, Cloud Run, GKE, Compute Engine) Quizs

Each question includes all options (A–D).  
I selected choice is marked ☑️.  
The correct answer is ✅ with a short explanation.

---

### 1 Which GCP service provides full OS-level access and customization?
- A. Cloud Run  
- ☑️ B. Compute Engine  
- C. App Engine Flexible  
- D. GKE  

✅ **Correct:** B. Compute Engine  
**Why:** It provides VM-level control and full SSH access.

---

### 2 Which service is ideal for stateless HTTP container apps that scale to zero?
- ☑️ A. Cloud Run  
- B. App Engine Standard  
- C. Compute Engine  
- D. GKE  

✅ **Correct:** A. Cloud Run  
**Why:** Cloud Run auto-scales to zero when idle.

---

### 3 Which PaaS solution is best for unpredictable web traffic without infrastructure management?
- A. Compute Engine  
- ☑️ B. App Engine  
- C. Cloud Run  
- D. GKE  

✅ **Correct:** B. App Engine  
**Why:** App Engine Standard auto-scales automatically with no infra setup.

---

### 4 Which platform supports multiple microservices communicating internally?
- A. Compute Engine  
- ☑️ B. GKE  
- C. Cloud Run  
- D. App Engine  

✅ **Correct:** B. GKE  
**Why:** GKE handles internal service discovery between pods.

---

### 5 Which service suits event-driven workloads like file uploads to Cloud Storage?
- ☑️ A. Cloud Functions  
- B. Cloud Run  
- C. App Engine  
- D. Compute Engine  

✅ **Correct:** A. Cloud Functions  
**Why:** Cloud Functions trigger from events like Storage or Pub/Sub.

---

### 6 Which service can scale to zero by default?
- ☑️ A. Cloud Run  
- B. Compute Engine  
- C. App Engine Flexible  
- D. GKE  

✅ **Correct:** A. Cloud Run  
**Why:** Containers shut down when not handling requests.

---

### 7 Which environment fits a monolithic Java app with version management?
- A. Compute Engine  
- ☑️ B. App Engine  
- C. Cloud Run  
- D. GKE  

✅ **Correct:** B. App Engine  
**Why:** App Engine handles version control and traffic splitting.

---

### 8 Which service provides network policies and persistent volumes?
- A. Cloud Run  
- B. App Engine  
- ☑️ C. GKE  
- D. Compute Engine  

✅ **Correct:** C. GKE  
**Why:** Kubernetes supports volumes, storage classes, and policies.

---

### 9 Which option allows SSH-level debugging?
- ☑️ A. Compute Engine  
- B. App Engine  
- C. Cloud Run  
- D. GKE  

✅ **Correct:** A. Compute Engine  
**Why:** You can SSH directly into Compute Engine instances.

---

### 10 Which compute option is best for Pub/Sub-triggered processing?
- A. GKE  
- B. Cloud Run  
- ☑️ C. Cloud Functions  
- D. Compute Engine  

✅ **Correct:** C. Cloud Functions  
**Why:** Cloud Functions handle event-driven execution.

---

### 11 You must migrate a Java app with minimal changes, always running.
- A. Cloud Run  
- ☑️ B. Compute Engine  
- C. App Engine Flexible  
- D. App Engine Standard  

✅ **Correct:** C. App Engine Flexible  
**Why:** Flex supports always-on containers and custom libraries.

---

### 12 A container runs for 30 minutes processing files, scales automatically.
- ☑️ A. Cloud Run  
- B. App Engine Flexible  
- C. GKE  
- D. Cloud Functions  

✅ **Correct:** A. Cloud Run  
**Why:** Cloud Run allows long HTTP requests (up to 60 min).

---

### 13 A company has multiple microservices with internal networking.
- A. App Engine  
- ☑️ B. GKE  
- C. Compute Engine  
- D. Cloud Run  

✅ **Correct:** B. GKE  
**Why:** GKE provides private service-to-service networking.

---

### 14 You want to add replicas when CPU > 70%.
- ☑️ A. GKE HPA / Compute Engine autoscaler  
- B. Cloud Run  
- C. App Engine  
- D. None  

✅ **Correct:** A.  
**Why:** Both have CPU-based autoscaling.

---

### 15 Which service scales down to zero automatically?
- ☑️ A. Cloud Run  
- B. App Engine Flexible  
- C. GKE  
- D. Compute Engine  

✅ **Correct:** A. Cloud Run  
**Why:** Idle containers stop completely.

---

### 16 Connect Cloud Run securely to Cloud SQL.
- ☑️ A. VPC Connector + Cloud SQL Proxy  
- B. Public IP Connection  
- C. SSH Tunnel  
- D. Direct JDBC without Proxy  

✅ **Correct:** A.  
**Why:** Recommended way for private secure DB access.

---

### 17 Run nightly non-HTTP batch containers.
- ☑️ A. Cloud Run Jobs  
- B. Cloud Functions  
- C. App Engine Flex  
- D. Compute Engine Cron  

✅ **Correct:** A. Cloud Run Jobs  
**Why:** Ideal for scheduled, containerized workloads.

---

### 18 Deploy a Node.js app with a custom domain.
- ☑️ A. Map domain + verify DNS  
- B. Add external IP  
- C. Manual CNAME only  
- D. SSL upload  

✅ **Correct:** A.  
**Why:** Must verify domain ownership in Cloud DNS.

---

### 19 Which service supports blue/green deployment out of the box?
- ☑️ A. App Engine  
- B. GKE  
- C. Compute Engine  
- D. Cloud Run  

✅ **Correct:** A. App Engine  
**Why:** App Engine supports versioned traffic splitting.

---

### 20 Ephemeral PR test environments that scale to zero.
- A. App Engine Flex  
- ☑️ B. Cloud Run  
- C. Compute Engine  
- D. GKE  

✅ **Correct:** B. Cloud Run  
**Why:** Cloud Run creates quick, disposable revisions.

---

### 21 Deploy Node.js app with custom Nginx proxy & custom libs.
- A. App Engine Standard  
- ☑️ B. App Engine Flexible  
- C. Compute Engine  
- D. Cloud Run  

✅ **Correct:** B. App Engine Flexible  
**Why:** Flex allows Docker customization.

---

### 22 Legacy billing service needs daemons & root access.
- A. App Engine Standard  
- ☑️ B. Compute Engine  
- C. Cloud Run  
- D. GKE  

✅ **Correct:** B. Compute Engine  
**Why:** Compute Engine allows full OS-level privileges.

---

### 23 Deploy a new API version and send 5 % of traffic first.
- ☑️ A. Blue/Green with Traffic Splitting  
- B. Rolling Update  
- C. Canary  
- D. Manual  

✅ **Correct:** A.  
**Why:** Blue/Green supports partial traffic testing.

---

### 24 Rollout new pods in Kubernetes with zero downtime.
- A. Blue/Green  
- ☑️ B. Rolling Update  
- C. Canary  
- D. Manual  

✅ **Correct:** B. Rolling Update  
**Why:** Kubernetes replaces pods gradually.

---

### 25 Cloud Run revision should handle 20 % traffic.
- ☑️ A. Revisions + Traffic Splitting  
- B. Manual Load Balancer  
- C. New Service  
- D. Compute Target Proxy  

✅ **Correct:** A.  
**Why:** Cloud Run allows weighted revision traffic.

---

### 26 Which platform supports traffic splitting without LB?
- A. GKE  
- ☑️ B. App Engine  
- C. Compute Engine  
- D. Cloud Functions  

✅ **Correct:** B.  
**Why:** App Engine’s internal router handles version traffic.

---

### 27 During a rolling update, a new pod fails readiness.
- A. Replace all pods  
- ☑️ B. Rollout pauses  
- C. Restart service  
- D. Delete deployment  

✅ **Correct:** B.  
**Why:** Kubernetes halts rollout until healthy pods are ready.

---

### 28 Continuous Java app connecting to Cloud SQL with minimal setup.
- A. Compute Engine  
- ☑️ B. App Engine Flexible  
- C. Cloud Run  
- D. GKE  

✅ **Correct:** B.  
**Why:** Flex has built-in Cloud SQL connectors.

---

### 29 In Blue/Green deployment, rollback method?
- A. Re-deploy old version  
- ☑️ B. Switch traffic back to Blue  
- C. Delete Green  
- D. Restart App  

✅ **Correct:** B.  
**Why:** Blue/Green rollback is instant via traffic redirection.

---

### 30 What is true about App Engine Flexible scaling?
- A. Scales to zero  
- ☑️ B. Requires one instance always  
- C. Manual only  
- D. Kubernetes-based  

✅ **Correct:** B.  
**Why:** Flex always keeps at least one instance running.

---
