# GCP Professional Cloud Developer - Exam Cheat Sheet

> **Quick revision guide for exam day. Memorize these mental models, decision trees, and instant-answer questions.**

---

## 🧠 The 4 Mental Models (ONE picture per domain)

### 1️⃣ Networking/Security Mental Model
Every networking/security question reduces to 4 decisions:
1. **How does traffic enter?** (LB / public / private)
2. **How is it protected?** (IAM / Armor / IAP)
3. **Who can access it?** (identity)
4. **Does it need VPC access?** (private resources)

### 2️⃣ Compute Mental Model
Ask: **Serverless? Containers? Control needed?**
- Scale to zero + containers → **Cloud Run**
- Event-driven functions → **Cloud Functions**
- Full Kubernetes control → **GKE**
- Full OS control → **Compute Engine**

### 3️⃣ Data Storage Mental Model
Ask: **Relational? NoSQL? Analytics? Global?**
- SQL + transactional → **Cloud SQL**
- SQL + global → **Spanner**
- NoSQL + mobile/web → **Firestore**
- NoSQL + high-throughput → **Bigtable**
- Analytics + SQL → **BigQuery**

### 4️⃣ Integration Mental Model
Ask: **Sync or Async? Decouple or Direct?**
- Decouple services → **Pub/Sub**
- Deferred tasks → **Cloud Tasks**
- Scheduled jobs → **Cloud Scheduler**
- Direct calls → HTTP/gRPC

---

## 📊 Must-Memorize Tables

### Compute Services
| Service | Scale to Zero | Best For |
|---------|---------------|----------|
| Cloud Run | ✅ Yes | HTTP containers, APIs |
| Cloud Functions | ✅ Yes | Event-driven, triggers |
| App Engine Standard | ✅ Yes | Web apps, quick deploy |
| App Engine Flexible | ❌ No (min 1) | Custom runtimes, background |
| GKE | ❌ No | Complex microservices |
| Compute Engine | ❌ No | Full VM control |

### Storage Selection
| Requirement | Service |
|-------------|---------|
| Relational, single region | Cloud SQL |
| Relational, global, ACID | Spanner |
| NoSQL, mobile/web, real-time | Firestore |
| NoSQL, high-throughput, IoT | Bigtable |
| Analytics, petabyte SQL | BigQuery |
| Files, backups, static | Cloud Storage |
| Caching, sessions | Memorystore |

### VPC & Networking
| Concept | Scope | Must Know |
|---------|-------|-----------|
| VPC | Global | Spans all regions |
| Subnet | Regional | IP range in a region |
| Firewall | Stateful | NIC-level |
| VPC Peering | Non-transitive | No hop-through |
| Cloud NAT | Regional | Internet for private VMs |
| Private Google Access | Subnet | APIs for private VMs |

### Load Balancers (EXAM GOLD)
| Requirement | Load Balancer |
|-------------|---------------|
| Global web app | External HTTP(S) LB |
| WAF / OWASP | HTTP(S) LB + Cloud Armor |
| CDN | HTTP(S) LB + Cloud CDN |
| Internal HTTP | Internal HTTP(S) LB |
| TCP proxy (global) | TCP/SSL Proxy LB |
| Simple TCP/UDP | Network LB |

**📌 Cloud Armor mentioned → HTTP(S) LB required**

### Security Controls
| Problem | Tool | NOT This |
|---------|------|----------|
| SQL injection / XSS | Cloud Armor | Firewall |
| OWASP Top 10 | Cloud Armor | IAM |
| User-based access | IAP | Cloud Armor |
| Bot protection | Cloud Armor | IAP |
| Identity verification | IAM | Firewall |
| Rate limiting / DDoS | Cloud Armor | Network LB |
| Store secrets | Secret Manager | Env vars |

---

## 🏗️ Canonical Architecture Patterns

### Pattern 1: Public Cloud Run with WAF
```
Internet → External HTTP(S) LB → Cloud Armor → Cloud Run
```

### Pattern 2: Cloud Run → Private DB
```
Cloud Run → VPC Connector → VPC → Cloud SQL (private IP)
```

### Pattern 3: Private VM → Google APIs
```
VM (no public IP) → Private Google Access → Cloud Storage/BigQuery
```

### Pattern 4: Private VM → Internet
```
VM (no public IP) → Cloud NAT → Internet
```

### Pattern 5: Internal App with IAP
```
User → Identity-Aware Proxy → Internal App
```

---

## 🌳 Decision Trees

### Security Decision Tree
```
Is it a web attack (SQL/XSS/bots/DDoS)?
 └─ Yes → Cloud Armor
     └─ Requires → HTTP(S) LB

Is access based on user identity?
 └─ Yes → IAM / IAP

Is it network segmentation?
 └─ Yes → Firewall rules
```

### Compute Decision Tree
```
Need scale to zero?
 └─ Yes → Cloud Run or Cloud Functions
     └─ Containers? → Cloud Run
     └─ Functions? → Cloud Functions
 └─ No → GKE or App Engine Flex

Need full control?
 └─ Yes → Compute Engine
```

### Networking Decision Tree
```
Does serverless need private resources?
 └─ Yes → Serverless VPC Connector
 └─ No  → Do NOT add connector

Does private VM need internet?
 └─ Yes → Cloud NAT

Does private VM need Google APIs?
 └─ Yes → Private Google Access
```

---

## ❓ 20 Instant-Answer Questions

If you hesitate on ANY, re-study the topic:

1. **Can Cloud Armor attach directly to Cloud Run?** → No, needs HTTP(S) LB
2. **Is VPC peering transitive?** → No
3. **When do you need Cloud NAT?** → Private VMs accessing internet
4. **When do you need Private Google Access?** → Private VMs accessing Google APIs
5. **Which LB supports WAF?** → External HTTP(S) LB only
6. **Is Cloud Run inside a VPC?** → No, use VPC connector
7. **What protects against OWASP Top 10?** → Cloud Armor
8. **Firewall vs IAM — when to use which?** → Firewall = network, IAM = identity
9. **Does BigQuery require VPC access?** → No (public API)
10. **What LB gives global anycast IPs?** → External HTTP(S) LB
11. **How do you restrict Cloud Run access?** → IAM (roles/run.invoker)
12. **What is the purpose of IAP?** → Identity-based access to internal apps
13. **What delivery guarantee does Pub/Sub provide?** → At-least-once
14. **Why implement idempotency?** → Handle duplicate messages safely
15. **What stores secrets securely?** → Secret Manager
16. **What replaces service account keys in GKE?** → Workload Identity
17. **Cloud Run max timeout?** → 60 minutes
18. **What defines Cloud Build steps?** → cloudbuild.yaml
19. **What enables vulnerability scanning?** → Artifact Registry
20. **What tracks exceptions automatically?** → Error Reporting

---

## ⚠️ Common Exam Traps

### ❌ DON'T Use:
- **Firewall rules** for: SQL injection, user identity
- **IAP** for: Bot protection, DDoS
- **VPC Connector** "just in case" — only when needed
- **Network LB** when HTTP features needed
- **Service account keys** in GKE (use Workload Identity)
- **"latest" tag** for production images

### ❌ DON'T Assume:
- Cloud Run lives in a VPC (it doesn't)
- VPC peering is transitive (it isn't)
- Pub/Sub is exactly-once (it's at-least-once)
- All services need VPC access (most don't)

---

## 🔑 Key Command Patterns

### Deployment
```bash
gcloud run deploy SERVICE --image=IMAGE --region=REGION
gcloud builds submit --config=cloudbuild.yaml
gcloud container clusters get-credentials CLUSTER
```

### Security
```bash
gcloud secrets create SECRET --data-file=FILE
gcloud iam service-accounts create NAME
gcloud projects add-iam-policy-binding PROJECT --member=MEMBER --role=ROLE
```

### Networking
```bash
gcloud compute networks vpc-access connectors create CONNECTOR
gcloud compute security-policies create POLICY
gcloud compute backend-services update BACKEND --security-policy=POLICY
```

### Messaging
```bash
gcloud pubsub topics create TOPIC
gcloud pubsub subscriptions create SUB --topic=TOPIC
gcloud tasks queues create QUEUE --location=LOCATION
```

---

## 📝 Exam Domain Weights

| Domain | Weight |
|--------|--------|
| Building and testing applications | **26%** |
| Deploying applications | **24%** |
| Designing applications | **24%** |
| Integrating Google Cloud services | **16%** |
| Managing performance monitoring | **10%** |

---

## 🎯 Final 10-Minute Drill

Say these out loud before the exam:

1. "OWASP → Cloud Armor → HTTP(S) LB"
2. "No public IP → NAT (internet) / Private Google Access (APIs)"
3. "Cloud Run is NOT in a VPC"
4. "VPC peering is NOT transitive"
5. "Identity problems ≠ firewall problems"
6. "Pub/Sub = at-least-once → need idempotency"
7. "Secret Manager for secrets, not env vars"
8. "Workload Identity, not service account keys"
9. "Cloud Trace for latency, Error Reporting for exceptions"
10. "Blue/Green = instant rollback"

---

**If this feels natural — you're ready. Good luck! 🎯**
