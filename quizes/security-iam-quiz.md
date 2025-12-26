# Security & IAM Quiz (Week 5)

This quiz covers IAM, service accounts, Secret Manager, Workload Identity, VPC security, and authentication in Google Cloud.

---

### 1. What does IAM stand for?
- A. Internet Access Management
- ☑️ B. Identity and Access Management
- C. Infrastructure and Access Module
- D. Integrated Authentication Manager

✅ **Correct:** B. Identity and Access Management
**Why:** IAM controls who (identity) can do what (access) on which resources.

---

### 2. Which IAM role type provides the broadest permissions?
- ☑️ A. Basic roles (Owner, Editor, Viewer)
- B. Predefined roles
- C. Custom roles
- D. Service account roles

✅ **Correct:** A. Basic roles (Owner, Editor, Viewer)
**Why:** Basic roles grant wide permissions and should be avoided in production.

---

### 3. What is the recommended practice for IAM permissions?
- A. Grant Editor to all developers
- ☑️ B. Apply least privilege principle
- C. Use Owner role for simplicity
- D. Grant project-level access

✅ **Correct:** B. Apply least privilege principle
**Why:** Grant only the minimum permissions needed to perform a task.

---

### 4. Which entity is used for application authentication?
- A. User account
- ☑️ B. Service account
- C. Group
- D. Domain

✅ **Correct:** B. Service account
**Why:** Service accounts are special accounts for applications and services, not humans.

---

### 5. What format are service account keys?
- A. XML
- B. YAML
- ☑️ C. JSON
- D. PEM

✅ **Correct:** C. JSON
**Why:** Service account keys are downloaded as JSON files containing credentials.

---

### 6. Which service securely stores API keys and passwords?
- A. Cloud Storage
- B. Cloud KMS
- ☑️ C. Secret Manager
- D. IAM

✅ **Correct:** C. Secret Manager
**Why:** Secret Manager provides secure, centralized storage for sensitive data.

---

### 7. What is Workload Identity?
- ☑️ A. GKE pods accessing GCP services with IAM
- B. User authentication system
- C. Network security feature
- D. Encryption method

✅ **Correct:** A. GKE pods accessing GCP services with IAM
**Why:** Workload Identity allows Kubernetes service accounts to act as IAM service accounts.

---

### 8. Which is more secure than service account keys?
- A. Environment variables
- ☑️ B. Workload Identity
- C. Hardcoded credentials
- D. Public keys

✅ **Correct:** B. Workload Identity
**Why:** Workload Identity eliminates the need for managing and rotating keys.

---

### 9. How are IAM policies inherited?
- A. Child overrides parent
- ☑️ B. Parent policies apply to children (additive)
- C. No inheritance
- D. Only at project level

✅ **Correct:** B. Parent policies apply to children (additive)
**Why:** Policies are inherited down the hierarchy and combined additively.

---

### 10. What is the IAM resource hierarchy (top to bottom)?
- A. Project → Folder → Organization
- ☑️ B. Organization → Folder → Project → Resource
- C. Resource → Project → Organization
- D. Folder → Organization → Project

✅ **Correct:** B. Organization → Folder → Project → Resource
**Why:** Policies flow down from Organization to individual resources.

---

### 11. To create a service account:
- A. `gcloud iam create service-account`
- ☑️ B. `gcloud iam service-accounts create`
- C. `gcloud service-accounts new`
- D. `gcloud create sa`

✅ **Correct:** B. `gcloud iam service-accounts create`
**Why:** This is the correct command to create a new service account.

---

### 12. Which role allows reading secrets from Secret Manager?
- A. roles/secretmanager.admin
- ☑️ B. roles/secretmanager.secretAccessor
- C. roles/secretmanager.viewer
- D. roles/secretmanager.reader

✅ **Correct:** B. roles/secretmanager.secretAccessor
**Why:** This role grants access to read secret versions.

---

### 13. How do you access a secret in Cloud Run?
- A. Environment variable only
- B. Mounted file only
- ☑️ C. Environment variable or mounted file
- D. API call only

✅ **Correct:** C. Environment variable or mounted file
**Why:** Cloud Run supports both --set-secrets for env vars and file mounts.

---

### 14. What connects Cloud Run to private resources?
- A. VPN
- ☑️ B. VPC Connector (Serverless VPC Access)
- C. Cloud NAT
- D. Direct peering

✅ **Correct:** B. VPC Connector (Serverless VPC Access)
**Why:** VPC connectors allow serverless services to access VPC resources.

---

### 15. Which IAM role allows invoking a Cloud Run service?
- A. roles/run.admin
- B. roles/run.viewer
- ☑️ C. roles/run.invoker
- D. roles/run.developer

✅ **Correct:** C. roles/run.invoker
**Why:** The invoker role grants permission to call HTTP endpoints.

---

### 16. For service-to-service authentication, Cloud Run uses:
- A. API keys
- B. OAuth tokens
- ☑️ C. Identity tokens (OIDC)
- D. Basic auth

✅ **Correct:** C. Identity tokens (OIDC)
**Why:** Services use identity tokens obtained from metadata server.

---

### 17. What is the default service account for Cloud Run?
- A. compute@developer.gserviceaccount.com
- ☑️ B. PROJECT_NUMBER-compute@developer.gserviceaccount.com
- C. cloud-run@gserviceaccount.com
- D. default@gserviceaccount.com

✅ **Correct:** B. PROJECT_NUMBER-compute@developer.gserviceaccount.com
**Why:** Cloud Run uses the Compute Engine default service account by default.

---

### 18. How do you grant a role to a service account?
- A. `gcloud iam grant`
- ☑️ B. `gcloud projects add-iam-policy-binding`
- C. `gcloud iam add-role`
- D. `gcloud service-accounts grant`

✅ **Correct:** B. `gcloud projects add-iam-policy-binding`
**Why:** This command binds an IAM role to a member on a project.

---

### 19. What does CMEK stand for?
- A. Cloud Managed Encryption Key
- ☑️ B. Customer-Managed Encryption Keys
- C. Custom Master Encryption Key
- D. Central Management Encryption Kit

✅ **Correct:** B. Customer-Managed Encryption Keys
**Why:** CMEK allows you to use your own Cloud KMS keys for encryption.

---

### 20. Which statement about default encryption is true?
- ☑️ A. GCP encrypts all data at rest automatically
- B. You must enable encryption manually
- C. Only premium tiers include encryption
- D. Encryption requires CMEK

✅ **Correct:** A. GCP encrypts all data at rest automatically
**Why:** All GCP data is encrypted at rest using Google-managed keys by default.

---

### 21. To connect Cloud SQL with private IP:
- A. Use public IP with firewall
- ☑️ B. Configure private services access
- C. Use Cloud SQL Proxy only
- D. Enable direct connect

✅ **Correct:** B. Configure private services access
**Why:** Private services access enables private IP connectivity within VPC.

---

### 22. What is the purpose of VPC Service Controls?
- A. Network routing
- ☑️ B. Create security perimeters around resources
- C. Firewall management
- D. DNS configuration

✅ **Correct:** B. Create security perimeters around resources
**Why:** VPC Service Controls prevent data exfiltration by defining security perimeters.

---

### 23. Which annotation links Kubernetes SA to Google SA?
- A. gcp.serviceaccount
- ☑️ B. iam.gke.io/gcp-service-account
- C. workload.identity
- D. kubernetes.io/service-account

✅ **Correct:** B. iam.gke.io/gcp-service-account
**Why:** This annotation configures Workload Identity binding.

---

### 24. How do you view effective IAM policies?
- A. `gcloud iam show`
- ☑️ B. `gcloud projects get-iam-policy`
- C. `gcloud iam list-policies`
- D. `gcloud access show`

✅ **Correct:** B. `gcloud projects get-iam-policy`
**Why:** This command displays all IAM bindings for a project.

---

### 25. What should you do with unused service account keys?
- A. Keep for backup
- ☑️ B. Delete them immediately
- C. Store in Secret Manager
- D. Archive in Cloud Storage

✅ **Correct:** B. Delete them immediately
**Why:** Unused keys are a security risk and should be deleted.

---

### 26. Which principle requires granting only necessary permissions?
- A. Defense in depth
- ☑️ B. Least privilege
- C. Zero trust
- D. Separation of duties

✅ **Correct:** B. Least privilege
**Why:** Least privilege means granting only the minimum permissions required.

---

### 27. To create a custom IAM role:
- A. `gcloud iam custom-roles create`
- ☑️ B. `gcloud iam roles create`
- C. `gcloud roles create`
- D. `gcloud iam add-role`

✅ **Correct:** B. `gcloud iam roles create`
**Why:** This command creates a custom role with specified permissions.

---

### 28. What type of token is used for GCP API authentication?
- A. API key
- B. Session token
- ☑️ C. Access token (OAuth 2.0)
- D. Basic auth

✅ **Correct:** C. Access token (OAuth 2.0)
**Why:** GCP APIs use OAuth 2.0 access tokens for authentication.

---

### 29. Where does Cloud Run get credentials automatically?
- A. Environment variables
- ☑️ B. Metadata server
- C. Secret Manager
- D. Service account key

✅ **Correct:** B. Metadata server
**Why:** Cloud Run injects credentials via the metadata server automatically.

---

### 30. What is the recommended way to manage secrets in applications?
- A. Environment variables in source
- B. Config files in repository
- ☑️ C. Secret Manager with IAM access
- D. Encrypted files in Cloud Storage

✅ **Correct:** C. Secret Manager with IAM access
**Why:** Secret Manager provides secure storage with versioning, rotation, and audit.

---
