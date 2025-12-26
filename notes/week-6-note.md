# Week 6 - Monitoring & Debugging

## Overview
This week I focused on **monitoring, logging, and debugging** applications in Google Cloud.
I learned how to use **Cloud Logging** for centralized log management, **Cloud Monitoring** for metrics and alerting, **Error Reporting** for tracking exceptions, and **Cloud Trace** for distributed tracing.
By the end of the week, I could build comprehensive observability dashboards and debug production issues effectively.

---

## Weekly Progress Tracker
| Task | Status |
|------|--------|
| Set up Cloud Logging and wrote log queries | ✅ |
| Configured structured logging in applications | ✅ |
| Created Cloud Monitoring dashboards | ✅ |
| Set up alerting policies with notifications | ✅ |
| Created custom metrics | ✅ |
| Implemented Error Reporting for exception tracking | ✅ |
| Configured Cloud Trace for distributed tracing | ✅ |
| Practiced debugging production issues | ✅ |
| Set up uptime checks and SLOs | ✅ |

---

## What I Learned

### 📝 Cloud Logging
- Centralized log storage for all GCP services and applications.
- Supports **structured logging** with JSON payloads.
- Powerful query language for filtering and searching logs.
- Integrates with BigQuery for long-term log analysis.
- Logs can trigger alerts via log-based metrics.

### 📊 Cloud Monitoring
- Collects metrics from GCP resources and custom applications.
- Provides dashboards, charts, and alerting.
- Supports **uptime checks** for availability monitoring.
- Allows **SLO/SLI** definitions for service level management.
- Integrates with PagerDuty, Slack, and other notification channels.

### 🐛 Error Reporting
- Automatically groups and tracks application errors.
- Shows error trends, affected users, and stack traces.
- Integrates with popular languages and frameworks.
- Sends notifications for new or regressing errors.

### 🔍 Cloud Trace
- Distributed tracing for microservices.
- Shows request latency breakdown across services.
- Identifies performance bottlenecks.
- Auto-instrumentation for many GCP services.

---

## Core Concepts & Theory

### Operations Suite (formerly Stackdriver)
| Service | Purpose | Key Features |
|---------|---------|--------------|
| Cloud Logging | Log management | Query, export, retention |
| Cloud Monitoring | Metrics & alerts | Dashboards, SLOs, uptime |
| Error Reporting | Exception tracking | Grouping, notifications |
| Cloud Trace | Distributed tracing | Latency analysis |
| Cloud Profiler | Code profiling | CPU, memory analysis |
| Cloud Debugger | Production debugging | Snapshots (deprecated) |

### Log Severity Levels
| Level | Description | Use Case |
|-------|-------------|----------|
| DEFAULT | No severity | General logs |
| DEBUG | Debug information | Development troubleshooting |
| INFO | Informational | Normal operations |
| NOTICE | Normal but significant | Important events |
| WARNING | Potential issues | Non-critical problems |
| ERROR | Error conditions | Failures requiring attention |
| CRITICAL | Critical conditions | Severe failures |
| ALERT | Action required immediately | System emergencies |
| EMERGENCY | System unusable | Complete failures |

### Metric Types
| Type | Description | Example |
|------|-------------|---------|
| Built-in | Auto-collected GCP metrics | Cloud Run request count |
| Custom | User-defined metrics | Business KPIs |
| Log-based | Created from log entries | Error count from logs |
| Agent | Collected by ops agent | VM memory usage |

---

## Practical Steps Done

### Cloud Logging Queries
```bash
# View logs for a Cloud Run service
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=my-service" \
    --limit=50 \
    --format="table(timestamp,severity,textPayload)"

# Filter by severity
gcloud logging read "severity>=ERROR" --limit=20

# Search for specific text
gcloud logging read 'textPayload:"connection refused"' --limit=10

# View logs in a time range
gcloud logging read "timestamp>=\"2024-01-01T00:00:00Z\" AND timestamp<=\"2024-01-02T00:00:00Z\""

# Export logs to BigQuery
gcloud logging sinks create my-bq-sink \
    bigquery.googleapis.com/projects/$PROJECT_ID/datasets/logs_dataset \
    --log-filter='resource.type="cloud_run_revision"'
```

### Logging Query Language Examples
```
# Cloud Run errors in the last hour
resource.type="cloud_run_revision"
resource.labels.service_name="my-service"
severity>=ERROR
timestamp>="2024-01-15T10:00:00Z"

# HTTP 500 errors
httpRequest.status>=500

# JSON payload queries (structured logs)
jsonPayload.userId="user123"
jsonPayload.action="login"

# Exclude specific logs
NOT textPayload:"health check"

# Regex matching
textPayload=~"error.*timeout"
```

### Structured Logging in Applications
```javascript
// Node.js structured logging for Cloud Run
const { Logging } = require('@google-cloud/logging');
const logging = new Logging();
const log = logging.log('my-app-log');

// Write a structured log entry
const metadata = {
  resource: {
    type: 'cloud_run_revision',
    labels: {
      service_name: 'my-service',
      revision_name: process.env.K_REVISION,
    },
  },
  severity: 'INFO',
};

const entry = log.entry(metadata, {
  message: 'User login successful',
  userId: 'user123',
  action: 'login',
  duration: 150,
});

await log.write(entry);

// Simple console.log with JSON (auto-parsed by Cloud Run)
console.log(JSON.stringify({
  severity: 'INFO',
  message: 'Request processed',
  httpRequest: {
    requestMethod: 'GET',
    requestUrl: '/api/users',
    status: 200,
    latency: '0.150s',
  },
}));
```

### Creating Log-Based Metrics
```bash
# Create a counter metric from logs
gcloud logging metrics create error-count \
    --description="Count of error logs" \
    --log-filter='severity>=ERROR AND resource.type="cloud_run_revision"'

# Create a distribution metric for latency
gcloud logging metrics create request-latency \
    --description="Request latency distribution" \
    --log-filter='resource.type="cloud_run_revision" AND httpRequest.latency:*' \
    --bucket-name=latency_buckets

# List metrics
gcloud logging metrics list

# Delete a metric
gcloud logging metrics delete error-count
```

### Cloud Monitoring Dashboards
```bash
# List available metrics
gcloud monitoring metrics-descriptors list --filter="metric.type:run.googleapis.com"

# Create a dashboard (using JSON config)
gcloud monitoring dashboards create --config-from-file=dashboard.json
```

**Sample dashboard.json:**
```json
{
  "displayName": "My Cloud Run Dashboard",
  "gridLayout": {
    "widgets": [
      {
        "title": "Request Count",
        "xyChart": {
          "dataSets": [{
            "timeSeriesQuery": {
              "timeSeriesFilter": {
                "filter": "metric.type=\"run.googleapis.com/request_count\" resource.type=\"cloud_run_revision\"",
                "aggregation": {
                  "alignmentPeriod": "60s",
                  "perSeriesAligner": "ALIGN_RATE"
                }
              }
            }
          }]
        }
      },
      {
        "title": "Request Latency",
        "xyChart": {
          "dataSets": [{
            "timeSeriesQuery": {
              "timeSeriesFilter": {
                "filter": "metric.type=\"run.googleapis.com/request_latencies\" resource.type=\"cloud_run_revision\""
              }
            }
          }]
        }
      }
    ]
  }
}
```

### Setting Up Alerting Policies
```bash
# Create an alerting policy for high error rate
gcloud alpha monitoring policies create \
    --display-name="High Error Rate Alert" \
    --condition-display-name="Error rate > 5%" \
    --condition-filter='metric.type="run.googleapis.com/request_count" AND metric.labels.response_code_class="5xx"' \
    --condition-threshold-value=0.05 \
    --condition-threshold-comparison=COMPARISON_GT \
    --notification-channels=CHANNEL_ID \
    --combiner=OR \
    --duration=60s

# Create notification channel (email)
gcloud alpha monitoring channels create \
    --display-name="My Email" \
    --type=email \
    --channel-labels=email_address=myemail@example.com

# List notification channels
gcloud alpha monitoring channels list
```

### Creating Custom Metrics
```javascript
// Node.js custom metrics with OpenTelemetry
const { MeterProvider } = require('@opentelemetry/sdk-metrics');
const { MetricExporter } = require('@google-cloud/opentelemetry-cloud-monitoring-exporter');

const exporter = new MetricExporter();
const meterProvider = new MeterProvider();
meterProvider.addMetricReader(new PeriodicExportingMetricReader({
  exporter,
  exportIntervalMillis: 60000,
}));

const meter = meterProvider.getMeter('my-app');

// Create a counter
const requestCounter = meter.createCounter('custom/request_count', {
  description: 'Number of requests processed',
});

// Increment the counter
requestCounter.add(1, { endpoint: '/api/users', method: 'GET' });

// Create a histogram for latency
const latencyHistogram = meter.createHistogram('custom/request_latency', {
  description: 'Request latency in milliseconds',
  unit: 'ms',
});

// Record latency
latencyHistogram.record(150, { endpoint: '/api/users' });
```

### Uptime Checks
```bash
# Create an uptime check
gcloud monitoring uptime create my-uptime-check \
    --display-name="My Service Uptime" \
    --resource-type=cloud-run-revision \
    --monitored-resource=projects/$PROJECT_ID/locations/europe-north1/services/my-service \
    --http-check-path=/health \
    --timeout=10s \
    --period=60s

# List uptime checks
gcloud monitoring uptime list-configs

# Create alert for uptime failure
# (Usually done via Console UI for complex SLO/SLI setup)
```

### Error Reporting Integration
```javascript
// Node.js Error Reporting
const { ErrorReporting } = require('@google-cloud/error-reporting');
const errors = new ErrorReporting();

// Report an error
app.use((err, req, res, next) => {
  errors.report(err);
  res.status(500).send('Internal Server Error');
});

// Report custom error
errors.report(new Error('Something went wrong'), {
  user: 'user123',
  httpRequest: {
    method: 'GET',
    url: '/api/data',
  },
});
```

### Cloud Trace Setup
```javascript
// Node.js automatic tracing
const { TraceExporter } = require('@google-cloud/opentelemetry-cloud-trace-exporter');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');

const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new TraceExporter()));
provider.register();

registerInstrumentations({
  instrumentations: [new HttpInstrumentation()],
});

// Custom spans
const tracer = provider.getTracer('my-app');
const span = tracer.startSpan('database-query');
// ... perform operation
span.end();
```

### Debugging Common Issues
```bash
# Check Cloud Run logs for startup failures
gcloud logging read "resource.type=cloud_run_revision AND severity>=WARNING" \
    --limit=20 --format=json

# Check container instance logs
gcloud run services logs read my-service --region=europe-north1 --limit=50

# View request traces
# (Use Cloud Console: Navigation > Trace > Trace list)

# Check error trends
# (Use Cloud Console: Navigation > Error Reporting)

# Monitor resource usage
gcloud monitoring metrics list --filter="metric.type:container"
```

---

## Monitoring Best Practices
- Use **structured logging** with JSON for better querying.
- Set **log retention policies** to control costs.
- Create **dashboards** for key services and SLIs.
- Configure **alerts** with appropriate thresholds and notification channels.
- Implement **distributed tracing** for microservices.
- Export logs to **BigQuery** for long-term analysis.
- Use **log-based metrics** to create custom monitoring.
- Define **SLOs** to track service reliability.

---

## Key Metrics to Monitor
| Metric | Type | Why It Matters |
|--------|------|----------------|
| Request count | Counter | Traffic volume |
| Error rate | Ratio | Service health |
| Latency (p50, p95, p99) | Distribution | User experience |
| CPU/Memory usage | Gauge | Resource capacity |
| Cold starts | Counter | Serverless performance |
| Concurrent requests | Gauge | Scaling behavior |

---

## Key Commands Summary
```bash
# Logging
gcloud logging read "FILTER" --limit=N
gcloud logging sinks create NAME DESTINATION --log-filter=FILTER
gcloud logging metrics create NAME --log-filter=FILTER

# Monitoring
gcloud monitoring dashboards create --config-from-file=FILE
gcloud monitoring uptime create NAME --http-check-path=PATH
gcloud alpha monitoring policies create --display-name=NAME

# Debugging
gcloud run services logs read SERVICE --region=REGION
gcloud logging read "severity>=ERROR" --format="table(timestamp,textPayload)"
```

---

## Deliverables
- [x] Cloud Logging configured with structured logs
- [x] Monitoring dashboard with key metrics
- [x] Alerting policies for errors and latency
- [x] Error Reporting integrated for exception tracking
- [x] Cloud Trace configured for distributed tracing
- [x] Week 6 goals completed successfully

Next → **Week 7:** Architecture & Integration (Pub/Sub, microservices, event-driven design)
