# Week 7 - Architecture & Integration

## Overview
This week I focused on **architecture patterns and service integration** in Google Cloud.
I learned how to design **microservices architectures**, implement **event-driven systems** with Pub/Sub, build **resilient applications** with retries and circuit breakers, and integrate various GCP services together.
By the end of the week, I could design and build scalable, loosely-coupled applications that handle failures gracefully.

---

## Weekly Progress Tracker
| Task | Status |
|------|--------|
| Understood microservices architecture principles | ✅ |
| Implemented Pub/Sub messaging patterns | ✅ |
| Built event-driven applications with Cloud Functions | ✅ |
| Designed push and pull subscription patterns | ✅ |
| Implemented retry logic and exponential backoff | ✅ |
| Applied idempotency patterns for message handling | ✅ |
| Configured circuit breakers for resilience | ✅ |
| Integrated Cloud Tasks for async processing | ✅ |
| Practiced API design with Cloud Endpoints | ✅ |

---

## What I Learned

### 🏗️ Microservices Architecture
- Decompose applications into small, independently deployable services.
- Each service owns its data and communicates via APIs or messaging.
- Enables independent scaling, deployment, and technology choices.
- Requires careful attention to service boundaries and data consistency.

### 📨 Pub/Sub Messaging
- Fully managed, real-time messaging service.
- Decouples producers (publishers) from consumers (subscribers).
- Supports **push** and **pull** subscription modes.
- Guarantees **at-least-once** delivery.
- Messages are retained for up to 7 days.

### 🔄 Resilience Patterns
- **Retry with backoff** — Handle transient failures gracefully.
- **Circuit breaker** — Prevent cascade failures.
- **Idempotency** — Ensure safe message reprocessing.
- **Timeouts** — Avoid hanging requests.

---

## Core Concepts & Theory

### Microservices vs Monolith
| Aspect | Monolith | Microservices |
|--------|----------|---------------|
| Deployment | Single unit | Independent services |
| Scaling | Scale entire app | Scale per service |
| Technology | Single stack | Polyglot |
| Data | Shared database | Database per service |
| Complexity | Lower initially | Higher, but manageable |
| Failure | Affects whole app | Isolated failures |

### Communication Patterns
| Pattern | Type | Use Case | GCP Service |
|---------|------|----------|-------------|
| REST/HTTP | Synchronous | Real-time APIs | Cloud Run, App Engine |
| gRPC | Synchronous | Low-latency, high-throughput | Cloud Run, GKE |
| Pub/Sub | Asynchronous | Event-driven, decoupled | Pub/Sub |
| Task Queue | Asynchronous | Deferred processing | Cloud Tasks |
| Streaming | Real-time | Data pipelines | Dataflow |

### Pub/Sub Subscription Types
| Type | Description | Best For |
|------|-------------|----------|
| Pull | Subscriber polls for messages | Batch processing, control over rate |
| Push | Pub/Sub sends to HTTP endpoint | Real-time processing, serverless |
| BigQuery | Direct export to BigQuery | Analytics, data warehousing |
| Cloud Storage | Direct export to GCS | Archival, batch analysis |

### Resilience Patterns
| Pattern | Description | Implementation |
|---------|-------------|----------------|
| Retry | Reattempt failed operations | Exponential backoff |
| Circuit Breaker | Stop calling failing services | State: Closed → Open → Half-Open |
| Timeout | Limit wait time | Set reasonable timeouts |
| Bulkhead | Isolate failures | Separate thread pools/resources |
| Fallback | Provide alternatives | Cache, default values |

---

## Practical Steps Done

### Creating Pub/Sub Topics and Subscriptions
```bash
# Enable Pub/Sub API
gcloud services enable pubsub.googleapis.com

# Create a topic
gcloud pubsub topics create order-events

# Create a pull subscription
gcloud pubsub subscriptions create order-processor \
    --topic=order-events \
    --ack-deadline=60

# Create a push subscription
gcloud pubsub subscriptions create order-webhook \
    --topic=order-events \
    --push-endpoint=https://my-service-xxxxx.run.app/webhook \
    --ack-deadline=30

# Create a dead-letter topic for failed messages
gcloud pubsub topics create order-events-dlq

gcloud pubsub subscriptions create order-processor-with-dlq \
    --topic=order-events \
    --dead-letter-topic=order-events-dlq \
    --max-delivery-attempts=5

# List topics and subscriptions
gcloud pubsub topics list
gcloud pubsub subscriptions list
```

### Publishing Messages
```bash
# Publish a message via CLI
gcloud pubsub topics publish order-events \
    --message='{"orderId": "12345", "status": "created"}'

# Publish with attributes
gcloud pubsub topics publish order-events \
    --message='{"orderId": "12345"}' \
    --attribute=type=order,priority=high
```

```javascript
// Node.js publisher
const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();

async function publishMessage(topicName, data) {
  const topic = pubsub.topic(topicName);
  const messageBuffer = Buffer.from(JSON.stringify(data));

  const messageId = await topic.publishMessage({
    data: messageBuffer,
    attributes: {
      type: 'order',
      timestamp: new Date().toISOString(),
    },
  });

  console.log(`Message ${messageId} published.`);
  return messageId;
}

// Publish with ordering key for ordered delivery
async function publishOrderedMessage(topicName, data, orderingKey) {
  const topic = pubsub.topic(topicName, {
    enableMessageOrdering: true,
  });

  await topic.publishMessage({
    data: Buffer.from(JSON.stringify(data)),
    orderingKey: orderingKey,
  });
}
```

### Pull Subscription Consumer
```javascript
// Node.js pull subscriber
const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();

async function pullMessages(subscriptionName) {
  const subscription = pubsub.subscription(subscriptionName);

  const messageHandler = async (message) => {
    console.log(`Received message: ${message.id}`);
    console.log(`Data: ${message.data.toString()}`);
    console.log(`Attributes: ${JSON.stringify(message.attributes)}`);

    try {
      // Process the message
      const data = JSON.parse(message.data.toString());
      await processOrder(data);

      // Acknowledge successful processing
      message.ack();
    } catch (error) {
      console.error('Error processing message:', error);
      // Negative acknowledgment - message will be redelivered
      message.nack();
    }
  };

  subscription.on('message', messageHandler);
  subscription.on('error', (error) => {
    console.error('Subscription error:', error);
  });
}

pullMessages('order-processor');
```

### Push Subscription Handler (Cloud Run)
```javascript
// Express handler for Pub/Sub push
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', async (req, res) => {
  try {
    // Verify this is a Pub/Sub message
    if (!req.body.message) {
      return res.status(400).send('Invalid message format');
    }

    // Decode the message
    const messageData = Buffer.from(req.body.message.data, 'base64').toString();
    const data = JSON.parse(messageData);
    const messageId = req.body.message.messageId;
    const attributes = req.body.message.attributes;

    console.log(`Processing message ${messageId}:`, data);

    // Process the message (implement idempotency!)
    await processOrderIdempotently(messageId, data);

    // Return 200-299 to acknowledge
    res.status(200).send('OK');
  } catch (error) {
    console.error('Error processing message:', error);
    // Return 4xx/5xx to trigger retry
    res.status(500).send('Processing failed');
  }
});
```

### Cloud Functions with Pub/Sub Trigger
```javascript
// Cloud Function triggered by Pub/Sub
const functions = require('@google-cloud/functions-framework');

functions.cloudEvent('processOrderEvent', async (cloudEvent) => {
  const message = cloudEvent.data.message;
  const data = JSON.parse(Buffer.from(message.data, 'base64').toString());

  console.log(`Processing order: ${data.orderId}`);

  // Process the order
  await processOrder(data);

  // Function completes = message acknowledged
  // Throwing error = message will be retried
});
```

```bash
# Deploy Cloud Function with Pub/Sub trigger
gcloud functions deploy processOrderEvent \
    --gen2 \
    --runtime=nodejs18 \
    --region=europe-north1 \
    --trigger-topic=order-events \
    --entry-point=processOrderEvent
```

### Implementing Idempotency
```javascript
// Idempotent message processing using Firestore
const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();

async function processOrderIdempotently(messageId, orderData) {
  const processedRef = firestore.collection('processed_messages').doc(messageId);

  // Use transaction to ensure exactly-once processing
  await firestore.runTransaction(async (transaction) => {
    const doc = await transaction.get(processedRef);

    if (doc.exists) {
      console.log(`Message ${messageId} already processed, skipping`);
      return;
    }

    // Process the order
    await processOrder(orderData);

    // Mark as processed
    transaction.set(processedRef, {
      processedAt: new Date(),
      orderId: orderData.orderId,
    });
  });
}

// Alternative: Use order ID as idempotency key
async function createOrderIdempotently(orderId, orderData) {
  const orderRef = firestore.collection('orders').doc(orderId);

  try {
    await orderRef.create(orderData); // Fails if exists
    console.log(`Order ${orderId} created`);
  } catch (error) {
    if (error.code === 6) { // ALREADY_EXISTS
      console.log(`Order ${orderId} already exists, skipping`);
    } else {
      throw error;
    }
  }
}
```

### Implementing Retry with Exponential Backoff
```javascript
// Retry utility with exponential backoff
async function retryWithBackoff(fn, options = {}) {
  const {
    maxRetries = 5,
    baseDelay = 1000,
    maxDelay = 30000,
    retryableErrors = [500, 502, 503, 504],
  } = options;

  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Check if error is retryable
      if (!retryableErrors.includes(error.status)) {
        throw error;
      }

      // Calculate delay with jitter
      const delay = Math.min(
        baseDelay * Math.pow(2, attempt) + Math.random() * 1000,
        maxDelay
      );

      console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

// Usage
const result = await retryWithBackoff(async () => {
  return await callExternalService();
}, { maxRetries: 3, baseDelay: 500 });
```

### Implementing Circuit Breaker
```javascript
// Simple circuit breaker implementation
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 30000;
    this.state = 'CLOSED';
    this.failures = 0;
    this.lastFailure = null;
  }

  async execute(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailure > this.resetTimeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failures++;
    this.lastFailure = Date.now();

    if (this.failures >= this.failureThreshold) {
      this.state = 'OPEN';
      console.log('Circuit breaker OPENED');
    }
  }
}

// Usage
const breaker = new CircuitBreaker({ failureThreshold: 3 });

try {
  const result = await breaker.execute(async () => {
    return await callPaymentService();
  });
} catch (error) {
  if (error.message === 'Circuit breaker is OPEN') {
    // Use fallback or return cached response
    return getCachedPaymentStatus();
  }
  throw error;
}
```

### Cloud Tasks for Async Processing
```bash
# Enable Cloud Tasks API
gcloud services enable cloudtasks.googleapis.com

# Create a queue
gcloud tasks queues create order-processing-queue \
    --location=europe-west1 \
    --max-dispatches-per-second=100 \
    --max-concurrent-dispatches=10 \
    --max-attempts=5 \
    --min-backoff=10s \
    --max-backoff=300s
```

```javascript
// Creating tasks programmatically
const { CloudTasksClient } = require('@google-cloud/tasks');
const client = new CloudTasksClient();

async function createTask(payload, scheduledTime = null) {
  const project = process.env.PROJECT_ID;
  const location = 'europe-west1';
  const queue = 'order-processing-queue';
  const url = 'https://my-service-xxxxx.run.app/process-order';

  const parent = client.queuePath(project, location, queue);

  const task = {
    httpRequest: {
      httpMethod: 'POST',
      url,
      headers: { 'Content-Type': 'application/json' },
      body: Buffer.from(JSON.stringify(payload)).toString('base64'),
      oidcToken: {
        serviceAccountEmail: `${project}@appspot.gserviceaccount.com`,
      },
    },
  };

  // Schedule for later execution
  if (scheduledTime) {
    task.scheduleTime = {
      seconds: scheduledTime.getTime() / 1000,
    };
  }

  const [response] = await client.createTask({ parent, task });
  console.log(`Created task: ${response.name}`);
  return response;
}
```

### Event-Driven Architecture Example
```javascript
// Order service publishes events
async function createOrder(orderData) {
  // Save order
  const order = await saveOrder(orderData);

  // Publish event for other services
  await publishMessage('order-events', {
    type: 'ORDER_CREATED',
    orderId: order.id,
    customerId: order.customerId,
    items: order.items,
    total: order.total,
    timestamp: new Date().toISOString(),
  });

  return order;
}

// Inventory service subscribes to events
functions.cloudEvent('handleOrderEvent', async (event) => {
  const data = JSON.parse(Buffer.from(event.data.message.data, 'base64'));

  switch (data.type) {
    case 'ORDER_CREATED':
      await reserveInventory(data.orderId, data.items);
      break;
    case 'ORDER_CANCELLED':
      await releaseInventory(data.orderId, data.items);
      break;
  }
});

// Notification service subscribes to same events
functions.cloudEvent('sendOrderNotification', async (event) => {
  const data = JSON.parse(Buffer.from(event.data.message.data, 'base64'));

  if (data.type === 'ORDER_CREATED') {
    await sendEmail(data.customerId, 'Order Confirmation', data);
  }
});
```

---

## Architecture Best Practices
- Design for **failure** — assume services will fail.
- Use **asynchronous communication** for loose coupling.
- Implement **idempotency** for safe message reprocessing.
- Apply **retry with exponential backoff** for transient failures.
- Use **circuit breakers** to prevent cascade failures.
- Set **timeouts** on all external calls.
- Use **dead-letter queues** for failed message handling.
- Design **stateless services** for easy scaling.
- Use **correlation IDs** for distributed tracing.

---

## Common Patterns Summary
| Pattern | Problem | Solution |
|---------|---------|----------|
| Saga | Distributed transactions | Choreography or orchestration |
| CQRS | Read/write scaling | Separate read/write models |
| Event Sourcing | Audit trail, replay | Store events as source of truth |
| API Gateway | Routing, auth, rate limiting | Cloud Endpoints, Apigee |
| Sidecar | Cross-cutting concerns | Service mesh (Istio/Anthos) |

---

## Key Commands Summary
```bash
# Pub/Sub
gcloud pubsub topics create TOPIC
gcloud pubsub subscriptions create SUB --topic=TOPIC
gcloud pubsub topics publish TOPIC --message=MESSAGE

# Cloud Tasks
gcloud tasks queues create QUEUE --location=LOCATION
gcloud tasks create-http-task --queue=QUEUE --url=URL --body-content=DATA

# Cloud Functions
gcloud functions deploy FUNC --trigger-topic=TOPIC --runtime=nodejs18
```

---

## Deliverables
- [x] Pub/Sub topics and subscriptions configured
- [x] Event-driven Cloud Functions deployed
- [x] Retry and circuit breaker patterns implemented
- [x] Idempotent message processing working
- [x] Cloud Tasks queue for async processing
- [x] Week 7 goals completed successfully

Next → **Week 8:** Mock Exams & Final Review (practice tests, weak areas, exam preparation)
