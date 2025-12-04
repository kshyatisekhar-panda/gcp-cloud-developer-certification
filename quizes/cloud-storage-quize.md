# Cloud Storage Quiz (Week 3)

This quiz covers Google Cloud Storage (GCS) concepts — storage classes, security, lifecycle rules, and usage best practices.

---

### 1. Which storage class should you choose for frequently accessed website assets?
- A. Nearline  
- B. Coldline  
- ☑️ C. Standard  
- D. Archive  

✅ **Correct:** C. Standard  
**Why:** The Standard class provides low-latency, high-availability access for frequently accessed data like web assets.

---

### 2. You need to store monthly backup files with occasional reads. Which class should you use?
- ☑️ A. Nearline  
- B. Coldline  
- C. Standard  
- D. Archive  

✅ **Correct:** A. Nearline  
**Why:** Nearline storage is optimized for data accessed about once per month and offers lower cost than Standard.

---

### 3. For data accessed once per quarter, choose:
- ☑️ A. Coldline  
- B. Standard  
- C. Nearline  
- D. Archive  

✅ **Correct:** A. Coldline  
**Why:** Coldline is designed for infrequent (quarterly) access while maintaining high durability.

---

### 4. What is the cheapest class for data that must be retained for years and rarely accessed?
- A. Coldline  
- ☑️ B. Archive  
- C. Nearline  
- D. Standard  

✅ **Correct:** B. Archive  
**Why:** Archive offers the lowest cost for long-term, rarely accessed compliance data.

---

### 5. Which command creates a regional bucket in `europe-north1`?
- ☑️ A. `gsutil mb -l europe-north1 gs://my-bucket/`  
- B. `gsutil create -r europe-north1 my-bucket`  
- C. `gsutil bucket create europe-north1`  
- D. `gsutil cp -l europe-north1`  

✅ **Correct:** A. `gsutil mb -l europe-north1 gs://my-bucket/`  
**Why:** The `-l` flag specifies the location when creating a new bucket.

---

### 6. What does “object” mean in Cloud Storage?
- A. A virtual machine  
- ☑️ B. A file and its metadata  
- C. A table row  
- D. A database record  

✅ **Correct:** B. A file and its metadata  
**Why:** Each file stored in GCS is treated as an object with associated metadata.

---

### 7. What is the top-level container in GCS?
- A. Folder  
- B. Region  
- ☑️ C. Bucket  
- D. Object  

✅ **Correct:** C. Bucket  
**Why:** Buckets are top-level containers that define storage class, location, and access policies.

---

### 8. Which IAM role grants read-only access to objects?
- A. roles/storage.admin  
- ☑️ B. roles/storage.objectViewer  
- C. roles/storage.objectAdmin  
- D. roles/storage.legacyOwner  

✅ **Correct:** B. roles/storage.objectViewer  
**Why:** The `objectViewer` role grants read-only permissions without write or delete access.

---

### 9. To prevent accidental public access, you should:
- ☑️ A. Enable Uniform bucket-level access  
- B. Use signed URLs  
- C. Set ACLs manually  
- D. Make bucket public  

✅ **Correct:** A. Enable Uniform bucket-level access  
**Why:** Uniform access disables object-level ACLs and enforces IAM-based access control.

---

### 10. Which feature allows time-limited public access?
- A. Object ACL  
- ☑️ B. Signed URL  
- C. IAM Policy  
- D. CMEK  

✅ **Correct:** B. Signed URL  
**Why:** Signed URLs grant temporary access to specific objects without exposing IAM permissions.

---

### 11. How do you delete files automatically after 30 days?
- A. Use gsutil rm manually  
- ☑️ B. Create a lifecycle rule with age condition = 30  
- C. Change class to Coldline  
- D. Use Object Versioning  

✅ **Correct:** B. Create a lifecycle rule with age condition = 30  
**Why:** Lifecycle rules automate deletion or transition based on object age.

---

### 12. What feature maintains older versions of replaced files?
- ☑️ A. Object Versioning  
- B. Object Locking  
- C. ACLs  
- D. CMEK  

✅ **Correct:** A. Object Versioning  
**Why:** Object versioning keeps previous object generations for recovery or rollback.

---

### 13. To encrypt data with your own Cloud KMS key:
- ☑️ A. Enable CMEK  
- B. Enable CSEK  
- C. Use IAM  
- D. ACLs  

✅ **Correct:** A. Enable CMEK  
**Why:** CMEK (Customer-Managed Encryption Keys) uses user-controlled KMS keys for encryption.

---

### 14. Which command uploads a file?
- A. `gsutil upload file.txt gs://bucket/`  
- ☑️ B. `gsutil cp file.txt gs://bucket/`  
- C. `gsutil mb file.txt`  
- D. `gsutil add file.txt`  

✅ **Correct:** B. `gsutil cp file.txt gs://bucket/`  
**Why:** The `gsutil cp` command is used for uploading or downloading objects.

---

### 15. To view all buckets in your project:
- A. `gsutil buckets`  
- B. `gsutil list`  
- ☑️ C. `gsutil ls`  
- D. `gcloud storage list`  

✅ **Correct:** C. `gsutil ls`  
**Why:** Lists all buckets in the current project.

---

### 16. What is the maximum size of a single object in GCS?
- A. 500 GB  
- B. 2 TB  
- ☑️ C. 5 TB  
- D. 10 TB  

✅ **Correct:** C. 5 TB  
**Why:** Each object can be up to 5 TB in size in Cloud Storage.

---

### 17. Which statement about encryption is true?
- A. Data is not encrypted by default  
- ☑️ B. GCS automatically encrypts data at rest  
- C. You must enable encryption manually  
- D. Encryption requires CMEK  

✅ **Correct:** B. GCS automatically encrypts data at rest  
**Why:** All GCS data is encrypted at rest by default using Google-managed keys.

---

### 18. Which feature ensures compliance retention?
- ☑️ A. Retention Policy  
- B. Object Versioning  
- C. ACLs  
- D. CMEK  

✅ **Correct:** A. Retention Policy  
**Why:** Retention policies prevent deletion or modification before a specified retention period expires.

---

### 19. GCS integrates directly with which analytics services?
- ☑️ A. Looker & BigQuery  
- B. Cloud Run  
- C. Dataproc only  
- D. GKE  

✅ **Correct:** A. Looker & BigQuery  
**Why:** GCS integrates natively with BigQuery and Looker for data analysis and visualization.

---

### 20. Lifecycle management can:
- A. Transition storage class  
- B. Delete old objects  
- C. Combine multiple rules  
- ☑️ D. All of the above  

✅ **Correct:** D. All of the above  
**Why:** Lifecycle rules can transition classes, delete data, and define multiple actions per bucket.

---

### 21. What’s the durability of GCS?
- A. 99.9%  
- B. 99.99%  
- ☑️ C. 99.999999999%  
- D. 100%  

✅ **Correct:** C. 99.999999999%  
**Why:** GCS achieves 11 nines of durability through redundant storage across locations.

---

### 22. What happens when you enable Uniform Bucket-Level Access?
- ☑️ A. Disables object ACLs and enforces IAM  
- B. Makes bucket public  
- C. Deletes objects  
- D. Enables versioning  

✅ **Correct:** A. Disables object ACLs and enforces IAM  
**Why:** Uniform access simplifies management by applying IAM policies at the bucket level only.

---

### 23. Temporary user uploads from browsers are best implemented with:
- ☑️ A. Signed POST policy URLs  
- B. Public bucket  
- C. ACLs  
- D. Cloud Functions trigger  

✅ **Correct:** A. Signed POST policy URLs  
**Why:** Signed POST URLs allow client-side uploads securely without exposing service credentials.

---

### 24. Cloud Storage is what kind of storage?
- A. Block  
- B. File  
- ☑️ C. Object  
- D. Relational  

✅ **Correct:** C. Object  
**Why:** GCS is object storage—each file is an immutable object with metadata.

---

### 25. Which API interacts with GCS?
- ☑️ A. Storage JSON/REST API  
- B. Compute API  
- C. BigQuery API  
- D. IAM API  

✅ **Correct:** A. Storage JSON/REST API  
**Why:** The Cloud Storage API handles bucket and object operations.

---

### 26. CLI tool for Cloud Storage operations?
- A. gsql  
- ☑️ B. gsutil  
- C. kubectl  
- D. bq  

✅ **Correct:** B. gsutil  
**Why:** `gsutil` is the official command-line interface for GCS operations.

---

### 27. What events can trigger a Cloud Function from GCS?
- ☑️ A. Object create/delete events  
- B. Lifecycle rule updates  
- C. CMEK usage  
- D. Signed URL access  

✅ **Correct:** A. Object create/delete events  
**Why:** GCS publishes events like object creation or deletion that can invoke Cloud Functions.

---

### 28. What permission allows creating buckets?
- ☑️ A. storage.buckets.create  
- B. storage.objects.create  
- C. storage.viewer  
- D. storage.delete  

✅ **Correct:** A. storage.buckets.create  
**Why:** Required permission for creating new Cloud Storage buckets.

---

### 29. How can you host a static website?
- ☑️ A. Cloud Storage public bucket + index.html  
- B. Cloud SQL  
- C. Cloud Run  
- D. BigQuery  

✅ **Correct:** A. Cloud Storage public bucket + index.html  
**Why:** GCS can serve static websites directly via HTTPS with public read access.

---

### 30. Enable versioning on a bucket:
- A. gsutil version on  
- ☑️ B. gsutil versioning set on gs://bucket/  
- C. gcloud version enable  
- D. gsutil object set-version  

✅ **Correct:** B. gsutil versioning set on gs://bucket/  
**Why:** This enables object versioning for recovery or rollback of overwritten files.

---

