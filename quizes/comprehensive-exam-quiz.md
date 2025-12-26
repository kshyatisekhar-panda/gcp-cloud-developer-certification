# Comprehensive Exam Prep Quiz (Week 8)

This quiz covers all domains of the Google Cloud Professional Cloud Developer certification exam with scenario-based questions.

---

### 1. You need a serverless compute option that scales to zero and runs containers. Which service?
- A. App Engine Flexible
- ☑️ B. Cloud Run
- C. GKE
- D. Compute Engine

✅ **Correct:** B. Cloud Run
**Why:** Cloud Run is serverless, runs containers, and scales to zero when idle.

---

### 2. An application needs strong consistency for global financial transactions. Which database?
- A. Firestore
- ☑️ B. Cloud Spanner
- C. Cloud SQL
- D. Bigtable

✅ **Correct:** B. Cloud Spanner
**Why:** Spanner provides global distribution with strong consistency and ACID transactions.

---

### 3. You want to decouple microservices and handle traffic spikes. Which pattern?
- A. Direct HTTP calls
- ☑️ B. Pub/Sub messaging
- C. Shared database
- D. Synchronous gRPC

✅ **Correct:** B. Pub/Sub messaging
**Why:** Pub/Sub decouples services and buffers messages during traffic spikes.

---

### 4. A Cloud Run service needs to access Cloud SQL securely. Best approach?
- A. Public IP with firewall rules
- ☑️ B. VPC connector with private IP
- C. Cloud SQL Proxy on public internet
- D. Hardcode credentials

✅ **Correct:** B. VPC connector with private IP
**Why:** VPC connector enables private, secure connections without public exposure.

---

### 5. You need to trigger a function when files are uploaded to Cloud Storage. Which service?
- A. Cloud Tasks
- ☑️ B. Cloud Functions with GCS trigger
- C. Cloud Scheduler
- D. Pub/Sub only

✅ **Correct:** B. Cloud Functions with GCS trigger
**Why:** Cloud Functions can trigger directly from Cloud Storage events.

---

### 6. How should sensitive credentials be stored for Cloud Run?
- A. Environment variables in source code
- B. Config files in container
- ☑️ C. Secret Manager
- D. Cloud Storage text file

✅ **Correct:** C. Secret Manager
**Why:** Secret Manager provides secure, versioned storage with IAM access control.

---

### 7. You need to identify latency bottlenecks in a microservices application. Which tool?
- A. Cloud Logging
- B. Cloud Monitoring
- ☑️ C. Cloud Trace
- D. Error Reporting

✅ **Correct:** C. Cloud Trace
**Why:** Cloud Trace provides distributed tracing to analyze request latency across services.

---

### 8. What IAM principle should guide permission assignment?
- A. Maximum convenience
- ☑️ B. Least privilege
- C. Shared access
- D. Full project access

✅ **Correct:** B. Least privilege
**Why:** Grant only the minimum permissions required for the task.

---

### 9. You want to automate container builds on GitHub push. Best solution?
- A. Manual builds
- ☑️ B. Cloud Build with GitHub trigger
- C. Local Docker builds
- D. Scheduled builds

✅ **Correct:** B. Cloud Build with GitHub trigger
**Why:** Cloud Build triggers automatically build on repository events.

---

### 10. An application must process messages exactly once. How to implement?
- A. Use at-most-once delivery
- ☑️ B. Implement idempotency with message IDs
- C. Disable retries
- D. Use synchronous calls

✅ **Correct:** B. Implement idempotency with message IDs
**Why:** Track processed message IDs to prevent duplicate processing.

---

### 11. Which deployment strategy provides instant rollback?
- ☑️ A. Blue/Green
- B. Rolling Update
- C. Recreate
- D. In-place update

✅ **Correct:** A. Blue/Green
**Why:** Blue/Green keeps both versions; rollback is instant traffic switch.

---

### 12. You need real-time NoSQL data for a mobile app. Which database?
- A. Cloud SQL
- ☑️ B. Firestore
- C. BigQuery
- D. Bigtable

✅ **Correct:** B. Firestore
**Why:** Firestore provides real-time sync and is optimized for mobile/web apps.

---

### 13. How do you secure service-to-service calls in Cloud Run?
- A. API keys in headers
- ☑️ B. Identity tokens with IAM invoker role
- C. Basic authentication
- D. IP whitelisting

✅ **Correct:** B. Identity tokens with IAM invoker role
**Why:** Cloud Run uses OIDC identity tokens for authenticated service calls.

---

### 14. Which metric indicates service reliability issues?
- A. Request count
- ☑️ B. Error rate
- C. Instance count
- D. Memory usage

✅ **Correct:** B. Error rate
**Why:** High error rate indicates problems affecting users.

---

### 15. You need to run a container weekly for batch processing. Best option?
- A. Cloud Run with HTTP trigger
- ☑️ B. Cloud Run Jobs with Cloud Scheduler
- C. Always-running Compute Engine
- D. App Engine cron

✅ **Correct:** B. Cloud Run Jobs with Cloud Scheduler
**Why:** Cloud Run Jobs handles batch workloads, Scheduler triggers on schedule.

---

### 16. An external API frequently fails. How to handle gracefully?
- A. Increase timeout only
- ☑️ B. Retry with exponential backoff and circuit breaker
- C. Ignore errors
- D. Single retry

✅ **Correct:** B. Retry with exponential backoff and circuit breaker
**Why:** Combined patterns handle transient failures and prevent cascade failures.

---

### 17. Which storage class is cheapest for rarely accessed archival data?
- A. Standard
- B. Nearline
- C. Coldline
- ☑️ D. Archive

✅ **Correct:** D. Archive
**Why:** Archive class has lowest storage cost for long-term, rarely accessed data.

---

### 18. You need to alert when Cloud Run error rate exceeds 5%. Which service?
- A. Cloud Logging
- ☑️ B. Cloud Monitoring with alerting policy
- C. Error Reporting
- D. Cloud Trace

✅ **Correct:** B. Cloud Monitoring with alerting policy
**Why:** Cloud Monitoring alerting triggers notifications based on metric thresholds.

---

### 19. What is the benefit of Workload Identity over service account keys?
- A. Faster authentication
- ☑️ B. No key management, automatic rotation
- C. Works outside GCP
- D. Simpler configuration

✅ **Correct:** B. No key management, automatic rotation
**Why:** Workload Identity eliminates keys, reducing security risk.

---

### 20. Which compute option is best for multi-container microservices with networking?
- A. Cloud Run
- B. Cloud Functions
- ☑️ C. GKE
- D. App Engine

✅ **Correct:** C. GKE
**Why:** GKE provides Kubernetes networking, service discovery, and pod management.

---

### 21. To test a new version with 10% of traffic before full rollout:
- A. Blue/Green with full switch
- ☑️ B. Canary deployment with traffic splitting
- C. Rolling update
- D. Manual testing

✅ **Correct:** B. Canary deployment with traffic splitting
**Why:** Canary routes a percentage of traffic to test the new version safely.

---

### 22. Which service stores container images with vulnerability scanning?
- A. Cloud Storage
- ☑️ B. Artifact Registry
- C. Cloud Build
- D. Container Registry (deprecated)

✅ **Correct:** B. Artifact Registry
**Why:** Artifact Registry provides image storage with integrated vulnerability scanning.

---

### 23. You need to export logs to BigQuery for long-term analysis. How?
- A. gsutil cp
- ☑️ B. Create a log sink
- C. BigQuery import job
- D. Cloud Functions

✅ **Correct:** B. Create a log sink
**Why:** Log sinks route logs to BigQuery, Storage, or Pub/Sub.

---

### 24. An application needs to handle high-throughput IoT data. Which database?
- A. Firestore
- B. Cloud SQL
- ☑️ C. Bigtable
- D. BigQuery

✅ **Correct:** C. Bigtable
**Why:** Bigtable is designed for high-throughput, low-latency workloads like IoT.

---

### 25. What defines Cloud Build pipeline steps?
- A. Dockerfile
- ☑️ B. cloudbuild.yaml
- C. pipeline.json
- D. build.sh

✅ **Correct:** B. cloudbuild.yaml
**Why:** cloudbuild.yaml configures build steps, images, and substitutions.

---

### 26. How to implement scheduled tasks in serverless architecture?
- A. Cron on Compute Engine
- ☑️ B. Cloud Scheduler triggering Cloud Run/Functions
- C. Infinite loop in Cloud Run
- D. Manual triggers

✅ **Correct:** B. Cloud Scheduler triggering Cloud Run/Functions
**Why:** Cloud Scheduler is a managed cron service for serverless.

---

### 27. Which pattern helps manage distributed transactions across services?
- A. Two-phase commit
- ☑️ B. Saga pattern
- C. Direct database updates
- D. Synchronous calls

✅ **Correct:** B. Saga pattern
**Why:** Saga manages transactions with local operations and compensating actions.

---

### 28. You need SQL analytics on petabytes of data. Which service?
- A. Cloud SQL
- B. Spanner
- ☑️ C. BigQuery
- D. Bigtable

✅ **Correct:** C. BigQuery
**Why:** BigQuery is a serverless data warehouse for large-scale SQL analytics.

---

### 29. What HTTP response should a Cloud Run Pub/Sub handler return on success?
- ☑️ A. 200-299 status code
- B. 400 status code
- C. 500 status code
- D. No response needed

✅ **Correct:** A. 200-299 status code
**Why:** 2xx responses acknowledge successful message processing.

---

### 30. You need to version and audit all configuration changes. Which pattern?
- A. Store in environment variables
- ☑️ B. Use Secret Manager with versioning
- C. Git repository only
- D. Cloud Storage

✅ **Correct:** B. Use Secret Manager with versioning
**Why:** Secret Manager provides versioning and audit logging for secrets.

---

### 31. Which service is best for real-time data streaming and processing?
- A. Cloud Tasks
- B. Pub/Sub only
- ☑️ C. Dataflow with Pub/Sub
- D. BigQuery

✅ **Correct:** C. Dataflow with Pub/Sub
**Why:** Dataflow processes streaming data from Pub/Sub in real-time.

---

### 32. What is the maximum Cloud Run request timeout?
- A. 5 minutes
- B. 15 minutes
- ☑️ C. 60 minutes
- D. No limit

✅ **Correct:** C. 60 minutes
**Why:** Cloud Run supports request timeouts up to 60 minutes.

---

### 33. Which GCP service provides API management and security?
- A. Cloud Endpoints
- ☑️ B. Apigee or Cloud Endpoints
- C. Cloud Run only
- D. Load Balancer

✅ **Correct:** B. Apigee or Cloud Endpoints
**Why:** Both provide API management, authentication, and rate limiting.

---

### 34. To minimize cold start latency in Cloud Run:
- A. Use larger containers
- ☑️ B. Set minimum instances > 0
- C. Increase memory
- D. Use HTTP/2

✅ **Correct:** B. Set minimum instances > 0
**Why:** Minimum instances keep containers warm, eliminating cold starts.

---

### 35. What happens to unacknowledged Pub/Sub messages after the deadline?
- ☑️ A. Redelivered to subscribers
- B. Deleted
- C. Sent to dead-letter immediately
- D. Retained forever

✅ **Correct:** A. Redelivered to subscribers
**Why:** Messages are redelivered if not acknowledged within the deadline.

---

### 36. You need to run background threads in a web application. Best option?
- A. Cloud Run
- ☑️ B. App Engine Flexible or GKE
- C. Cloud Functions
- D. Cloud Tasks

✅ **Correct:** B. App Engine Flexible or GKE
**Why:** Flexible environment and GKE support long-running background processes.

---

### 37. Which log severity should be used for normal operations?
- A. DEBUG
- ☑️ B. INFO
- C. WARNING
- D. ERROR

✅ **Correct:** B. INFO
**Why:** INFO is for normal operational messages.

---

### 38. What is the purpose of VPC Service Controls?
- A. Network routing
- ☑️ B. Prevent data exfiltration
- C. Firewall rules
- D. DNS management

✅ **Correct:** B. Prevent data exfiltration
**Why:** VPC Service Controls create security perimeters to prevent data leakage.

---

### 39. You need to implement feature flags for gradual rollout. Best approach?
- A. Multiple deployments
- ☑️ B. Remote Config or environment variables with traffic splitting
- C. Code comments
- D. Separate repositories

✅ **Correct:** B. Remote Config or environment variables with traffic splitting
**Why:** Feature flags allow enabling features for specific users or percentages.

---

### 40. Which exam domain has the highest weight?
- A. Deploying applications (24%)
- ☑️ B. Building and testing applications (26%)
- C. Designing applications (24%)
- D. Monitoring (10%)

✅ **Correct:** B. Building and testing applications (26%)
**Why:** Building and testing has the highest weight at 26% of the exam.

---
