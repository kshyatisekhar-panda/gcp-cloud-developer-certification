# Monitoring & Debugging Quiz (Week 6)

This quiz covers Cloud Logging, Cloud Monitoring, Error Reporting, Cloud Trace, alerting, and observability in Google Cloud.

---

### 1. Which service provides centralized log management in GCP?
- A. Cloud Monitoring
- ☑️ B. Cloud Logging
- C. Error Reporting
- D. Cloud Trace

✅ **Correct:** B. Cloud Logging
**Why:** Cloud Logging collects, stores, and analyzes logs from GCP services and applications.

---

### 2. What format is recommended for structured logging?
- A. Plain text
- B. XML
- ☑️ C. JSON
- D. CSV

✅ **Correct:** C. JSON
**Why:** JSON payloads enable powerful querying and automatic field parsing in Cloud Logging.

---

### 3. Which severity level indicates a potential issue?
- A. INFO
- ☑️ B. WARNING
- C. DEBUG
- D. DEFAULT

✅ **Correct:** B. WARNING
**Why:** WARNING indicates potential problems that don't prevent operation.

---

### 4. What is the purpose of log-based metrics?
- ☑️ A. Create custom metrics from log entries
- B. Filter log storage
- C. Export logs to BigQuery
- D. Delete old logs

✅ **Correct:** A. Create custom metrics from log entries
**Why:** Log-based metrics allow creating counters or distributions from log patterns.

---

### 5. Which service tracks application exceptions?
- A. Cloud Logging
- B. Cloud Monitoring
- ☑️ C. Error Reporting
- D. Cloud Trace

✅ **Correct:** C. Error Reporting
**Why:** Error Reporting automatically groups and tracks application errors.

---

### 6. What does Cloud Trace analyze?
- A. Log patterns
- ☑️ B. Request latency across services
- C. Error frequency
- D. Resource usage

✅ **Correct:** B. Request latency across services
**Why:** Cloud Trace provides distributed tracing to identify latency bottlenecks.

---

### 7. Which command reads Cloud Logging entries?
- A. `gcloud logs read`
- ☑️ B. `gcloud logging read`
- C. `gcloud log show`
- D. `gcloud logging list`

✅ **Correct:** B. `gcloud logging read`
**Why:** This command queries and displays log entries.

---

### 8. To filter logs by severity ERROR or higher:
- A. `level>=ERROR`
- ☑️ B. `severity>=ERROR`
- C. `status=ERROR`
- D. `type:ERROR`

✅ **Correct:** B. `severity>=ERROR`
**Why:** The severity field filters by log level in Cloud Logging queries.

---

### 9. What is an uptime check?
- ☑️ A. Periodic HTTP request to verify availability
- B. Log analysis for errors
- C. CPU usage monitoring
- D. Disk space check

✅ **Correct:** A. Periodic HTTP request to verify availability
**Why:** Uptime checks regularly probe endpoints to monitor service availability.

---

### 10. Which service sends notifications when conditions are met?
- A. Cloud Logging
- ☑️ B. Cloud Monitoring (Alerting)
- C. Error Reporting
- D. Cloud Trace

✅ **Correct:** B. Cloud Monitoring (Alerting)
**Why:** Cloud Monitoring alerting policies trigger notifications based on metric conditions.

---

### 11. What notification channels does Cloud Monitoring support?
- A. Email only
- B. SMS only
- ☑️ C. Email, SMS, PagerDuty, Slack, webhooks
- D. Cloud Functions only

✅ **Correct:** C. Email, SMS, PagerDuty, Slack, webhooks
**Why:** Cloud Monitoring supports multiple notification channels for flexibility.

---

### 12. What is an SLO?
- A. Standard Log Output
- ☑️ B. Service Level Objective
- C. System Level Operation
- D. Structured Log Object

✅ **Correct:** B. Service Level Objective
**Why:** SLOs define target reliability levels for services (e.g., 99.9% availability).

---

### 13. Which query language does Cloud Logging use?
- A. SQL
- ☑️ B. Logging query language
- C. Lucene
- D. RegEx only

✅ **Correct:** B. Logging query language
**Why:** Cloud Logging has its own query language for filtering and searching logs.

---

### 14. To export logs to BigQuery for analysis:
- ☑️ A. Create a log sink
- B. Use gsutil cp
- C. Enable BigQuery export
- D. Create a Cloud Function

✅ **Correct:** A. Create a log sink
**Why:** Log sinks route logs to BigQuery, Cloud Storage, or Pub/Sub.

---

### 15. What is the default log retention period?
- A. 7 days
- ☑️ B. 30 days
- C. 90 days
- D. 365 days

✅ **Correct:** B. 30 days
**Why:** Default retention is 30 days; can be extended with custom retention.

---

### 16. Which metric type is collected automatically by GCP?
- ☑️ A. Built-in metrics
- B. Custom metrics
- C. Log-based metrics
- D. Agent metrics

✅ **Correct:** A. Built-in metrics
**Why:** GCP services automatically emit built-in metrics like request count and latency.

---

### 17. What tool collects metrics from Compute Engine VMs?
- A. Cloud SDK
- ☑️ B. Ops Agent
- C. Cloud Run agent
- D. Monitoring API

✅ **Correct:** B. Ops Agent
**Why:** The Ops Agent collects detailed metrics and logs from VMs.

---

### 18. To search for specific text in logs:
- A. `text="error"`
- ☑️ B. `textPayload:"connection refused"`
- C. `message="error"`
- D. `log:error`

✅ **Correct:** B. `textPayload:"connection refused"`
**Why:** textPayload contains the log message and supports substring search.

---

### 19. What does Cloud Profiler analyze?
- A. Network traffic
- ☑️ B. CPU and memory usage in code
- C. API latency
- D. Error frequency

✅ **Correct:** B. CPU and memory usage in code
**Why:** Cloud Profiler identifies performance bottlenecks in application code.

---

### 20. Which log field contains JSON structured data?
- A. textPayload
- ☑️ B. jsonPayload
- C. protoPayload
- D. metadata

✅ **Correct:** B. jsonPayload
**Why:** jsonPayload contains structured JSON log data for querying.

---

### 21. Error Reporting automatically groups errors by:
- ☑️ A. Stack trace signature
- B. Timestamp
- C. User ID
- D. Service name only

✅ **Correct:** A. Stack trace signature
**Why:** Similar stack traces are grouped together as the same error.

---

### 22. What is p99 latency?
- A. Average latency
- B. Maximum latency
- ☑️ C. 99th percentile latency
- D. Minimum latency

✅ **Correct:** C. 99th percentile latency
**Why:** p99 means 99% of requests complete faster than this value.

---

### 23. To create a Cloud Monitoring dashboard:
- A. `gcloud monitoring create`
- ☑️ B. `gcloud monitoring dashboards create`
- C. `gcloud dashboards new`
- D. `gcloud monitor add-dashboard`

✅ **Correct:** B. `gcloud monitoring dashboards create`
**Why:** This command creates a monitoring dashboard from a configuration file.

---

### 24. Which resource type is used for Cloud Run logs?
- A. cloud_run_service
- ☑️ B. cloud_run_revision
- C. run_instance
- D. serverless_container

✅ **Correct:** B. cloud_run_revision
**Why:** Cloud Run logs are associated with the cloud_run_revision resource type.

---

### 25. What is the purpose of correlation IDs?
- A. Group similar errors
- ☑️ B. Track requests across microservices
- C. Identify users
- D. Measure latency

✅ **Correct:** B. Track requests across microservices
**Why:** Correlation IDs help trace a single request through multiple services.

---

### 26. To create an alerting policy for high CPU:
- A. Use Cloud Functions
- ☑️ B. Define condition with metric threshold
- C. Create log-based metric only
- D. Enable uptime check

✅ **Correct:** B. Define condition with metric threshold
**Why:** Alerting policies trigger when metrics exceed defined thresholds.

---

### 27. What does NOT textPayload:"health" do in a query?
- A. Includes health logs
- ☑️ B. Excludes logs containing "health"
- C. Searches for NOT keyword
- D. Error in syntax

✅ **Correct:** B. Excludes logs containing "health"
**Why:** NOT operator excludes matching entries from results.

---

### 28. Which severity is higher: ERROR or CRITICAL?
- A. ERROR
- ☑️ B. CRITICAL
- C. Same level
- D. Depends on configuration

✅ **Correct:** B. CRITICAL
**Why:** CRITICAL indicates more severe conditions than ERROR.

---

### 29. What is the purpose of span in Cloud Trace?
- ☑️ A. Represents a unit of work with timing
- B. Measures memory usage
- C. Counts errors
- D. Stores log entries

✅ **Correct:** A. Represents a unit of work with timing
**Why:** Spans represent operations like HTTP requests or database queries with start/end times.

---

### 30. How do you read Cloud Run service logs?
- A. `gcloud run logs`
- ☑️ B. `gcloud run services logs read SERVICE`
- C. `gcloud logging run`
- D. `kubectl logs`

✅ **Correct:** B. `gcloud run services logs read SERVICE`
**Why:** This command retrieves logs for a specific Cloud Run service.

---
