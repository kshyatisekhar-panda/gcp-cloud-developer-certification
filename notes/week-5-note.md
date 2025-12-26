# Week 5 - Security, IAM & Networking

## Overview
This week I focused on **security, Identity and Access Management (IAM), and networking** in Google Cloud.
I learned how to implement least-privilege access using IAM roles, manage service accounts securely, use Secret Manager for sensitive data, configure service-to-service authentication, secure network connections, choose the right load balancer, and protect applications with Cloud Armor and IAP.
By the end of the week, I could build secure, well-architected Cloud Run services that connect safely to databases and other GCP services.

---

## Weekly Progress Tracker
| Task | Status |
|------|--------|
| Understood IAM hierarchy and policy inheritance | ✅ |
| Practiced creating and managing IAM roles | ✅ |
| Created and configured service accounts | ✅ |
| Implemented least-privilege access patterns | ✅ |
| Used Secret Manager for credentials and API keys | ✅ |
| Configured service-to-service authentication | ✅ |
| Set up Workload Identity for GKE | ✅ |
| Implemented VPC and network security | ✅ |
| Learned VPC, subnets, and firewall concepts | ✅ |
| Understood Load Balancer types and when to use each | ✅ |
| Configured Cloud Armor for WAF protection | ✅ |
| Implemented Identity-Aware Proxy (IAP) | ✅ |
| Set up Cloud NAT and Private Google Access | ✅ |
| Practiced API security with API Gateway | ✅ |

---

## What I Learned

### 🔐 IAM (Identity and Access Management)
- Controls **who** (identity) can do **what** (roles) on **which** resources.
- Uses a hierarchy: Organization → Folders → Projects → Resources.
- Policies are inherited down the hierarchy and additive.
- Three types of roles: **Basic**, **Predefined**, and **Custom**.

### 👤 Service Accounts
- Special accounts for applications and services (not humans).
- Used for server-to-server authentication.
- Can be assigned IAM roles like regular users.
- Should follow least-privilege principle.
- Keys should be rotated regularly or avoided using Workload Identity.

### 🔑 Secret Manager
- Centralized, secure storage for sensitive data.
- Supports versioning, rotation, and audit logging.
- Integrates with Cloud Run, Cloud Functions, and GKE.
- Encrypted at rest using Google-managed or customer-managed keys.

### 🌐 VPC & Networking
- **VPC** is global; **subnets** are regional.
- **Firewall rules** are stateful and apply at NIC level.
- **VPC Peering** connects VPCs but is NOT transitive.
- **Shared VPC** enables centralized network control across projects.
- **Cloud Run is NOT inside a VPC** — use VPC connectors to access private resources.

### ⚖️ Load Balancers
- Route traffic to backends based on type (HTTP, TCP, UDP).
- **External HTTP(S) LB** is required for Cloud Armor (WAF).
- Choose based on: global vs regional, HTTP vs TCP, external vs internal.

### 🛡️ Cloud Armor
- Web Application Firewall (WAF) for OWASP Top 10 protection.
- Protects against SQL injection, XSS, bots, and DDoS.
- **Only works with HTTP(S) Load Balancer**.

### 🚪 Identity-Aware Proxy (IAP)
- Controls access to applications based on user identity.
- Best for internal apps accessed by employees.
- Does NOT protect against web attacks (use Cloud Armor for that).

### 🌍 Cloud NAT & Private Google Access
- **Cloud NAT** — VMs without public IPs access the internet.
- **Private Google Access** — VMs without public IPs access Google APIs.

---

## Core Concepts & Theory

### IAM Role Types
| Role Type | Description | Example |
|-----------|-------------|---------|
| Basic | Broad access (Owner, Editor, Viewer) | `roles/editor` |
| Predefined | Fine-grained, service-specific | `roles/storage.objectViewer` |
| Custom | User-defined permissions | `roles/myCustomRole` |

### IAM Policy Hierarchy
```
Organization (org-level policies)
    └── Folders (department policies)
        └── Projects (project-level policies)
            └── Resources (resource-specific policies)
```
**Note:** Policies are inherited and additive — a more permissive parent policy applies to children.

### Service Account Types
| Type | Description | Use Case |
|------|-------------|----------|
| Default | Auto-created for services | Quick testing (not recommended for prod) |
| User-managed | Created by you | Production workloads |
| Google-managed | Created by Google | GCP service operations |

### Authentication Methods
| Method | Description | Best For |
|--------|-------------|----------|
| Service Account Key | JSON key file | Legacy/external apps |
| Workload Identity | GKE pods use IAM directly | GKE workloads |
| Identity Token | Short-lived JWT token | Service-to-service auth |
| Metadata Server | Auto-injected credentials | Cloud Run, Cloud Functions |

### VPC & Networking Fundamentals
| Concept | Scope | Must Know |
|---------|-------|-----------|
| VPC | Global | Spans all regions |
| Subnet | Regional | IP range within a region |
| Firewall | Stateful | NIC-level, ingress/egress |
| VPC Peering | Non-transitive | Direct connection only |
| Shared VPC | Cross-project | Centralized network control |
| Cloud NAT | Regional | Internet egress for private VMs |
| Private Google Access | Subnet setting | Google APIs only |

### Load Balancer Selection (EXAM CRITICAL)
| Requirement | Load Balancer | Key Feature |
|-------------|---------------|-------------|
| Global web app (HTTP/HTTPS) | External HTTP(S) LB | Global anycast, CDN |
| WAF / OWASP protection | HTTP(S) LB + Cloud Armor | Required combination |
| CDN for static content | HTTP(S) LB | Enable Cloud CDN |
| Internal HTTP services | Internal HTTP(S) LB | Private access |
| TCP proxy (global) | TCP/SSL Proxy LB | TCP with TLS termination |
| Simple TCP/UDP (regional) | Network LB | Pass-through, low latency |
| Internal TCP/UDP | Internal TCP/UDP LB | Private backends |

### Security Controls Decision Matrix
| Problem | Correct Tool | NOT This |
|---------|--------------|----------|
| SQL injection / XSS / bots | Cloud Armor | Firewall rules |
| OWASP Top 10 attacks | Cloud Armor | IAM |
| User-based app access | IAP | Cloud Armor |
| Identity verification | IAM | Firewall |
| Rate limiting / DDoS | Cloud Armor | Network LB |
| Store secrets | Secret Manager | Env vars |
| Network segmentation | Firewall rules | IAM |

---

## Practical Steps Done

### Creating and Managing Service Accounts
```bash
# Create a service account
gcloud iam service-accounts create my-service-sa \
    --display-name="My Service Account" \
    --description="Service account for my application"

# List service accounts
gcloud iam service-accounts list

# Grant a role to the service account
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:my-service-sa@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/storage.objectViewer"

# Create a key (avoid if possible - use Workload Identity instead)
gcloud iam service-accounts keys create key.json \
    --iam-account=my-service-sa@$PROJECT_ID.iam.gserviceaccount.com

# Delete a key
gcloud iam service-accounts keys delete KEY_ID \
    --iam-account=my-service-sa@$PROJECT_ID.iam.gserviceaccount.com
```

### Implementing Least Privilege
```bash
# View current IAM policy
gcloud projects get-iam-policy $PROJECT_ID

# Grant specific role instead of Editor
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:my-sa@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/cloudsql.client"

# Remove overly permissive role
gcloud projects remove-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:my-sa@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/editor"

# Create custom role with specific permissions
gcloud iam roles create customAppRole \
    --project=$PROJECT_ID \
    --title="Custom App Role" \
    --description="Limited permissions for app" \
    --permissions=storage.objects.get,storage.objects.list
```

### Using Secret Manager
```bash
# Enable Secret Manager API
gcloud services enable secretmanager.googleapis.com

# Create a secret
echo -n "my-super-secret-value" | \
    gcloud secrets create my-api-key --data-file=-

# Create a secret from file
gcloud secrets create db-password --data-file=./password.txt

# Add a new version
echo -n "new-secret-value" | \
    gcloud secrets versions add my-api-key --data-file=-

# Access a secret
gcloud secrets versions access latest --secret=my-api-key

# List secrets
gcloud secrets list

# Grant access to a service account
gcloud secrets add-iam-policy-binding my-api-key \
    --member="serviceAccount:my-sa@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"
```

### Cloud Run with Secret Manager
```bash
# Deploy Cloud Run with secret as environment variable
gcloud run deploy my-service \
    --image=europe-north1-docker.pkg.dev/$PROJECT_ID/my-repo/app:latest \
    --region=europe-north1 \
    --set-secrets=API_KEY=my-api-key:latest

# Deploy with secret mounted as file
gcloud run deploy my-service \
    --image=europe-north1-docker.pkg.dev/$PROJECT_ID/my-repo/app:latest \
    --region=europe-north1 \
    --set-secrets=/secrets/db-password=db-password:latest

# Update secrets
gcloud run services update my-service \
    --region=europe-north1 \
    --update-secrets=NEW_KEY=new-secret:latest
```

### Service-to-Service Authentication
```bash
# Cloud Run invoking another Cloud Run service
# The calling service needs 'roles/run.invoker' on the target

# Grant invoker role
gcloud run services add-iam-policy-binding target-service \
    --region=europe-north1 \
    --member="serviceAccount:caller-sa@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/run.invoker"

# In code, get identity token and call the service
# Python example:
# import google.auth.transport.requests
# import google.oauth2.id_token
#
# auth_req = google.auth.transport.requests.Request()
# token = google.oauth2.id_token.fetch_id_token(auth_req, target_url)
# headers = {"Authorization": f"Bearer {token}"}
# response = requests.get(target_url, headers=headers)
```

### Workload Identity for GKE
```bash
# Enable Workload Identity on cluster
gcloud container clusters update my-cluster \
    --region=europe-north1 \
    --workload-pool=$PROJECT_ID.svc.id.goog

# Create Kubernetes service account
kubectl create serviceaccount my-ksa --namespace default

# Bind Kubernetes SA to Google SA
gcloud iam service-accounts add-iam-policy-binding my-gsa@$PROJECT_ID.iam.gserviceaccount.com \
    --role="roles/iam.workloadIdentityUser" \
    --member="serviceAccount:$PROJECT_ID.svc.id.goog[default/my-ksa]"

# Annotate Kubernetes SA
kubectl annotate serviceaccount my-ksa \
    --namespace default \
    iam.gke.io/gcp-service-account=my-gsa@$PROJECT_ID.iam.gserviceaccount.com
```

### VPC and Network Security
```bash
# Create a VPC network
gcloud compute networks create my-vpc --subnet-mode=custom

# Create a subnet
gcloud compute networks subnets create my-subnet \
    --network=my-vpc \
    --region=europe-north1 \
    --range=10.0.0.0/24

# Create a Serverless VPC connector
gcloud compute networks vpc-access connectors create my-connector \
    --region=europe-north1 \
    --network=my-vpc \
    --range=10.8.0.0/28

# Deploy Cloud Run with VPC connector
gcloud run deploy my-service \
    --image=europe-north1-docker.pkg.dev/$PROJECT_ID/my-repo/app:latest \
    --region=europe-north1 \
    --vpc-connector=my-connector \
    --vpc-egress=private-ranges-only

# Create firewall rules
gcloud compute firewall-rules create allow-internal \
    --network=my-vpc \
    --allow=tcp,udp,icmp \
    --source-ranges=10.0.0.0/8
```

### Cloud SQL with Private IP
```bash
# Enable private services access
gcloud compute addresses create google-managed-services-my-vpc \
    --global \
    --purpose=VPC_PEERING \
    --prefix-length=16 \
    --network=my-vpc

gcloud services vpc-peerings connect \
    --service=servicenetworking.googleapis.com \
    --ranges=google-managed-services-my-vpc \
    --network=my-vpc

# Create Cloud SQL with private IP
gcloud sql instances create my-db \
    --database-version=POSTGRES_14 \
    --tier=db-f1-micro \
    --region=europe-north1 \
    --network=my-vpc \
    --no-assign-ip

# Connect Cloud Run to private Cloud SQL
gcloud run deploy my-service \
    --image=europe-north1-docker.pkg.dev/$PROJECT_ID/my-repo/app:latest \
    --region=europe-north1 \
    --vpc-connector=my-connector \
    --set-env-vars=DB_HOST=PRIVATE_IP
```

### Cloud Armor (WAF) Setup
```bash
# Create a security policy
gcloud compute security-policies create my-security-policy \
    --description="WAF policy for web app"

# Add OWASP ModSecurity rules
gcloud compute security-policies rules create 1000 \
    --security-policy=my-security-policy \
    --expression="evaluatePreconfiguredExpr('xss-stable')" \
    --action=deny-403 \
    --description="Block XSS attacks"

gcloud compute security-policies rules create 1001 \
    --security-policy=my-security-policy \
    --expression="evaluatePreconfiguredExpr('sqli-stable')" \
    --action=deny-403 \
    --description="Block SQL injection"

# Add rate limiting rule
gcloud compute security-policies rules create 2000 \
    --security-policy=my-security-policy \
    --src-ip-ranges="*" \
    --action=throttle \
    --rate-limit-threshold-count=100 \
    --rate-limit-threshold-interval-sec=60 \
    --conform-action=allow \
    --exceed-action=deny-429

# Attach to backend service (requires HTTP(S) LB)
gcloud compute backend-services update my-backend \
    --security-policy=my-security-policy \
    --global
```

### HTTP(S) Load Balancer with Cloud Run
```bash
# Create a serverless NEG for Cloud Run
gcloud compute network-endpoint-groups create my-neg \
    --region=europe-north1 \
    --network-endpoint-type=serverless \
    --cloud-run-service=my-service

# Create backend service
gcloud compute backend-services create my-backend \
    --global \
    --load-balancing-scheme=EXTERNAL_MANAGED

# Add NEG to backend
gcloud compute backend-services add-backend my-backend \
    --global \
    --network-endpoint-group=my-neg \
    --network-endpoint-group-region=europe-north1

# Create URL map
gcloud compute url-maps create my-url-map \
    --default-service=my-backend

# Create target HTTP(S) proxy
gcloud compute target-https-proxies create my-https-proxy \
    --url-map=my-url-map \
    --ssl-certificates=my-cert

# Create forwarding rule (global IP)
gcloud compute forwarding-rules create my-forwarding-rule \
    --global \
    --target-https-proxy=my-https-proxy \
    --ports=443
```

### Cloud NAT for Private VMs
```bash
# Create Cloud Router (required for NAT)
gcloud compute routers create my-router \
    --network=my-vpc \
    --region=europe-north1

# Create Cloud NAT
gcloud compute routers nats create my-nat \
    --router=my-router \
    --region=europe-north1 \
    --nat-all-subnet-ip-ranges \
    --auto-allocate-nat-external-ips
```

### Private Google Access
```bash
# Enable Private Google Access on subnet
gcloud compute networks subnets update my-subnet \
    --region=europe-north1 \
    --enable-private-ip-google-access

# VMs in this subnet can now access Google APIs without public IP
```

### Identity-Aware Proxy (IAP)
```bash
# Enable IAP API
gcloud services enable iap.googleapis.com

# Configure IAP for App Engine
gcloud iap web enable --resource-type=app-engine

# Grant access to users
gcloud iap web add-iam-policy-binding \
    --resource-type=app-engine \
    --member="user:developer@example.com" \
    --role="roles/iap.httpsResourceAccessor"

# For backend services
gcloud iap web add-iam-policy-binding \
    --resource-type=backend-services \
    --service=my-backend \
    --member="group:developers@example.com" \
    --role="roles/iap.httpsResourceAccessor"
```

---

## Canonical Architecture Patterns

### Pattern 1: Public Cloud Run with WAF
```
Internet
   ↓
External HTTP(S) Load Balancer
   ↓
Cloud Armor (OWASP rules)
   ↓
Cloud Run (serverless NEG)
```

### Pattern 2: Cloud Run → Private Cloud SQL
```
Cloud Run
   ↓
Serverless VPC Access Connector
   ↓
VPC (private subnet)
   ↓
Cloud SQL (private IP only)
```

### Pattern 3: VM without Public IP → Google APIs
```
VM (no external IP)
   ↓
Private Google Access (enabled on subnet)
   ↓
Cloud Storage / BigQuery / etc.
```

### Pattern 4: VM without Public IP → Internet
```
VM (no external IP)
   ↓
Cloud NAT
   ↓
Internet
```

### Pattern 5: Internal App with IAP
```
User (with Google identity)
   ↓
Identity-Aware Proxy
   ↓
Internal App Engine / Cloud Run / GKE
```

---

## Security Best Practices
- Always use **least privilege** — grant only necessary permissions.
- Prefer **Workload Identity** over service account keys.
- Never commit secrets to source control — use **Secret Manager**.
- Use **VPC connectors** for private database connections.
- Enable **audit logging** for compliance and troubleshooting.
- Rotate service account keys regularly if you must use them.
- Use **organization policies** to enforce security constraints.
- Implement **defense in depth** with multiple security layers.

---

## IAM Troubleshooting
```bash
# Test if a service account has specific permissions
gcloud asset analyze-iam-policy \
    --organization=ORG_ID \
    --identity="serviceAccount:my-sa@$PROJECT_ID.iam.gserviceaccount.com" \
    --full-resource-name="//storage.googleapis.com/projects/_/buckets/my-bucket"

# Check effective permissions
gcloud projects get-iam-policy $PROJECT_ID \
    --flatten="bindings[].members" \
    --filter="bindings.members:my-sa@" \
    --format="table(bindings.role)"

# View audit logs for access issues
gcloud logging read "protoPayload.authenticationInfo.principalEmail:my-sa@$PROJECT_ID.iam.gserviceaccount.com" \
    --limit=10 \
    --format="table(timestamp,protoPayload.methodName,protoPayload.status.message)"
```

---

## Key Commands Summary
```bash
# IAM
gcloud projects get-iam-policy $PROJECT_ID
gcloud projects add-iam-policy-binding $PROJECT_ID --member=MEMBER --role=ROLE
gcloud iam roles create ROLE_NAME --project=$PROJECT_ID --permissions=PERMISSIONS

# Service Accounts
gcloud iam service-accounts create NAME
gcloud iam service-accounts list
gcloud iam service-accounts keys list --iam-account=SA_EMAIL

# Secret Manager
gcloud secrets create SECRET_NAME --data-file=FILE
gcloud secrets versions access latest --secret=SECRET_NAME
gcloud secrets add-iam-policy-binding SECRET --member=MEMBER --role=ROLE

# VPC & Networking
gcloud compute networks create VPC_NAME --subnet-mode=custom
gcloud compute networks subnets create SUBNET --network=VPC --region=REGION --range=CIDR
gcloud compute networks vpc-access connectors create NAME --region=REGION --network=VPC
gcloud compute networks subnets update SUBNET --enable-private-ip-google-access

# Cloud NAT
gcloud compute routers create ROUTER --network=VPC --region=REGION
gcloud compute routers nats create NAT --router=ROUTER --region=REGION --auto-allocate-nat-external-ips

# Cloud Armor
gcloud compute security-policies create POLICY_NAME
gcloud compute security-policies rules create PRIORITY --security-policy=POLICY --action=ACTION
gcloud compute backend-services update BACKEND --security-policy=POLICY --global

# Load Balancer
gcloud compute network-endpoint-groups create NEG --network-endpoint-type=serverless
gcloud compute backend-services create BACKEND --global
gcloud compute url-maps create URL_MAP --default-service=BACKEND

# IAP
gcloud iap web enable --resource-type=TYPE
gcloud iap web add-iam-policy-binding --member=MEMBER --role=roles/iap.httpsResourceAccessor
```

---

## Deliverables
- [x] Service accounts created with least-privilege roles
- [x] Secrets securely stored in Secret Manager
- [x] Cloud Run connected to Cloud SQL via VPC connector
- [x] Service-to-service authentication implemented
- [x] Week 5 goals completed successfully

Next → **Week 6:** Monitoring & Debugging (Cloud Logging, Monitoring, Error Reporting, Trace)
