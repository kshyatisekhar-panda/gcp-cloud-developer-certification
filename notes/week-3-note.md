## Overview
This week I focused on **data storage and management** in Google Cloud.  
I spent time learning the differences between **Cloud Storage, Cloud SQL, Firestore, Bigtable, BigQuery**, and other storage services like Filestore.  
My goal was to understand which service to choose for each data type, how to connect them securely, and how to manage backups and lifecycle rules effectively.  

By the end of the week, I was able to create and test a Cloud Storage bucket, set lifecycle rules, connect Cloud Run to Cloud SQL through a VPC connector, and explore Firestore collections.  
I also practiced data security using IAM roles and Secret Manager.

---

## Weekly Progress Tracker
| Task | Status |
|------|--------|
| Learned about Cloud Storage architecture and storage classes | ✅ |
| Created a bucket and uploaded/downloaded data using gsutil | ✅ |
| Implemented lifecycle and versioning rules | ✅ |
| Understood Cloud SQL, Firestore, and BigQuery differences | ✅ |
| Configured secure Cloud SQL connection via VPC connector | ✅ |
| Explored Firestore queries and structure | ✅ |
| Compared Bigtable vs BigQuery for analytics use cases | ✅ |
| Used Secret Manager for secure credentials | ✅ |
| Reviewed IAM roles and permissions for storage access | ✅ |

---

## What I Learned

### ☁️ Cloud Storage
- Object storage for any file type — images, backups, archives, etc.  
- Supports multiple **storage classes**: Standard, Nearline, Coldline, and Archive.  
- Data can be managed with **lifecycle rules** and **object versioning**.  
- Access is managed with **IAM roles** (`storage.objectViewer`, `storage.admin`) or **signed URLs**.  
- Best for static assets, logs, and backup archives.  

### 🗄️ Cloud SQL
- Managed relational database for MySQL, PostgreSQL, and SQL Server.  
- Supports automatic **backups, replication, and point-in-time recovery (PITR)**.  
- Can connect securely using the **Cloud SQL Auth Proxy** or **VPC connectors**.  
- Use **Secret Manager** for credentials and connection strings.

### 🔥 Firestore
- Serverless NoSQL database with real-time synchronization.  
- Supports **hierarchical collections**, **documents**, and **subcollections**.  
- Works well for mobile and web apps.  
- Integrates with Cloud Functions and Cloud Run for event-driven apps.  

### 📊 Bigtable vs BigQuery
| Feature | Bigtable | BigQuery |
|----------|-----------|-----------|
| Type | NoSQL wide-column | Analytical warehouse |
| Use Case | Real-time, high-throughput workloads (IoT, telemetry) | SQL-based analytics, reporting |
| Scaling | Manual | Serverless |
| Latency | Milliseconds | Seconds |
| Integration | Dataflow, Dataproc | Looker, AI Platform |

### 📁 Filestore
- Managed **NFS** (file storage) for shared access by GKE pods or Compute Engine VMs.  
- Provides low-latency, POSIX-compliant file access for applications needing shared state.

---

## Security & Best Practices
- Use **service accounts** with least-privilege IAM roles.  
- Always connect through **private VPCs** when accessing databases.  
- Store sensitive information in **Secret Manager**.  
- Enable **CMEK** (Customer-Managed Encryption Keys) for regulated data.  
- Use **lifecycle rules** to control data retention and reduce cost.

---

## Key Commands I Practiced
```bash
# Create a Cloud Storage bucket
gsutil mb -l europe-north1 gs://my-bucket/

# Upload a file
gsutil cp file.txt gs://my-bucket/

# Download a file
gsutil cp gs://my-bucket/file.txt .

# Apply lifecycle rule
gsutil lifecycle set rule.json gs://my-bucket/

# Enable versioning
gsutil versioning set on gs://my-bucket/

# Deploy Cloud Run with Cloud SQL connection
gcloud run deploy my-service --image gcr.io/$PROJECT_ID/app --add-cloudsql-instances=$INSTANCE_CONNECTION_NAME --region=europe-north1 --vpc-connector=connector-name
