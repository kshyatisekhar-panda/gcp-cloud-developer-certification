# Architecture & Integration Quiz (Week 7)

This quiz covers Pub/Sub, event-driven architecture, microservices patterns, resilience strategies, and service integration in Google Cloud.

---

### 1. What is Pub/Sub?
- A. Database service
- ☑️ B. Asynchronous messaging service
- C. Compute service
- D. Storage service

✅ **Correct:** B. Asynchronous messaging service
**Why:** Pub/Sub is a fully managed real-time messaging service for event-driven systems.

---

### 2. What is a Pub/Sub topic?
- ☑️ A. A named resource for publishing messages
- B. A message queue
- C. A subscription endpoint
- D. A storage bucket

✅ **Correct:** A. A named resource for publishing messages
**Why:** Topics are channels where publishers send messages.

---

### 3. What is a Pub/Sub subscription?
- A. A payment plan
- ☑️ B. A named resource that receives messages from a topic
- C. A message filter
- D. A topic alias

✅ **Correct:** B. A named resource that receives messages from a topic
**Why:** Subscriptions define how messages are delivered to consumers.

---

### 4. Which subscription type has Pub/Sub send messages to an endpoint?
- A. Pull
- ☑️ B. Push
- C. Streaming
- D. Batch

✅ **Correct:** B. Push
**Why:** Push subscriptions deliver messages to an HTTP endpoint automatically.

---

### 5. What delivery guarantee does Pub/Sub provide by default?
- A. Exactly-once
- ☑️ B. At-least-once
- C. At-most-once
- D. Best effort

✅ **Correct:** B. At-least-once
**Why:** Pub/Sub guarantees messages are delivered at least once; duplicates are possible.

---

### 6. Why is idempotency important with Pub/Sub?
- A. Improves performance
- ☑️ B. Safely handles duplicate messages
- C. Reduces cost
- D. Enables ordering

✅ **Correct:** B. Safely handles duplicate messages
**Why:** Idempotent operations produce the same result when executed multiple times.

---

### 7. What is the message retention period in Pub/Sub?
- A. 1 day
- B. 3 days
- ☑️ C. Up to 7 days
- D. 30 days

✅ **Correct:** C. Up to 7 days
**Why:** Unacknowledged messages are retained for up to 7 days.

---

### 8. What is a dead-letter topic?
- ☑️ A. Topic for messages that failed processing
- B. Deleted topic
- C. Inactive topic
- D. Priority topic

✅ **Correct:** A. Topic for messages that failed processing
**Why:** Dead-letter topics receive messages that exceed delivery attempts.

---

### 9. What pattern decouples message producers from consumers?
- A. Synchronous API
- ☑️ B. Pub/Sub messaging
- C. Direct database access
- D. Shared memory

✅ **Correct:** B. Pub/Sub messaging
**Why:** Pub/Sub allows publishers and subscribers to operate independently.

---

### 10. Which command creates a Pub/Sub topic?
- A. `gcloud pubsub create topic`
- ☑️ B. `gcloud pubsub topics create`
- C. `gcloud topics create`
- D. `gcloud messaging topics new`

✅ **Correct:** B. `gcloud pubsub topics create`
**Why:** This is the correct command to create a new Pub/Sub topic.

---

### 11. What is exponential backoff?
- A. Linear retry delay
- ☑️ B. Increasing delay between retries
- C. Immediate retry
- D. No retry

✅ **Correct:** B. Increasing delay between retries
**Why:** Exponential backoff doubles wait time between retries (e.g., 1s, 2s, 4s, 8s).

---

### 12. What is a circuit breaker pattern?
- ☑️ A. Stop calling failing services temporarily
- B. Retry indefinitely
- C. Load balancing
- D. Request caching

✅ **Correct:** A. Stop calling failing services temporarily
**Why:** Circuit breakers prevent cascade failures by stopping calls to unhealthy services.

---

### 13. What are the circuit breaker states?
- A. Open, Closed
- ☑️ B. Closed, Open, Half-Open
- C. On, Off, Pending
- D. Active, Inactive

✅ **Correct:** B. Closed, Open, Half-Open
**Why:** Closed (normal), Open (failing, no calls), Half-Open (testing recovery).

---

### 14. What service handles deferred task execution?
- A. Pub/Sub
- ☑️ B. Cloud Tasks
- C. Cloud Scheduler
- D. Cloud Functions

✅ **Correct:** B. Cloud Tasks
**Why:** Cloud Tasks manages asynchronous task execution with rate limiting.

---

### 15. What service triggers scheduled jobs?
- A. Cloud Tasks
- ☑️ B. Cloud Scheduler
- C. Pub/Sub
- D. Cloud Build

✅ **Correct:** B. Cloud Scheduler
**Why:** Cloud Scheduler is a managed cron job service.

---

### 16. In microservices, each service should:
- A. Share a database
- ☑️ B. Own its data
- C. Use same technology
- D. Deploy together

✅ **Correct:** B. Own its data
**Why:** Services should have independent databases to reduce coupling.

---

### 17. What is event-driven architecture?
- ☑️ A. Systems react to events asynchronously
- B. Polling for updates
- C. Direct API calls
- D. Batch processing

✅ **Correct:** A. Systems react to events asynchronously
**Why:** Event-driven systems respond to published events rather than direct calls.

---

### 18. Which service routes events to Cloud Run?
- A. Pub/Sub only
- ☑️ B. Eventarc
- C. Cloud Tasks
- D. API Gateway

✅ **Correct:** B. Eventarc
**Why:** Eventarc provides unified eventing for Cloud Run with various sources.

---

### 19. What is the Saga pattern used for?
- A. API versioning
- ☑️ B. Distributed transactions
- C. Service discovery
- D. Load balancing

✅ **Correct:** B. Distributed transactions
**Why:** Saga manages transactions across multiple services with compensating actions.

---

### 20. To ensure message ordering in Pub/Sub:
- A. Use FIFO topics
- ☑️ B. Use ordering keys
- C. Order is guaranteed by default
- D. Not possible

✅ **Correct:** B. Use ordering keys
**Why:** Messages with the same ordering key are delivered in order.

---

### 21. What does CQRS stand for?
- A. Command Query Response System
- ☑️ B. Command Query Responsibility Segregation
- C. Central Query Routing Service
- D. Cloud Query Response Service

✅ **Correct:** B. Command Query Responsibility Segregation
**Why:** CQRS separates read and write operations for scalability.

---

### 22. How do you acknowledge a Pub/Sub message in code?
- A. Return 200
- ☑️ B. Call message.ack()
- C. Delete the message
- D. Close connection

✅ **Correct:** B. Call message.ack()
**Why:** Calling ack() confirms successful processing.

---

### 23. What happens if a push subscription receives 5xx response?
- ☑️ A. Message is retried
- B. Message is deleted
- C. Message goes to dead-letter
- D. Subscription is disabled

✅ **Correct:** A. Message is retried
**Why:** 4xx/5xx responses trigger automatic retries.

---

### 24. Which pattern stores events as source of truth?
- A. CQRS
- ☑️ B. Event Sourcing
- C. Saga
- D. Pub/Sub

✅ **Correct:** B. Event Sourcing
**Why:** Event sourcing stores all state changes as a sequence of events.

---

### 25. What is a correlation ID used for?
- A. Database keys
- ☑️ B. Tracking requests across services
- C. Message ordering
- D. Authentication

✅ **Correct:** B. Tracking requests across services
**Why:** Correlation IDs trace a single request through multiple microservices.

---

### 26. Cloud Tasks vs Pub/Sub: which has rate limiting?
- ☑️ A. Cloud Tasks
- B. Pub/Sub
- C. Both
- D. Neither

✅ **Correct:** A. Cloud Tasks
**Why:** Cloud Tasks provides built-in rate limiting and task deduplication.

---

### 27. What is the bulkhead pattern?
- A. Message queuing
- ☑️ B. Isolating failures to prevent cascade
- C. Load balancing
- D. Caching

✅ **Correct:** B. Isolating failures to prevent cascade
**Why:** Bulkheads isolate components so failures don't affect the entire system.

---

### 28. How do you implement idempotency?
- A. Retry logic
- ☑️ B. Store processed message IDs
- C. Use transactions
- D. Rate limiting

✅ **Correct:** B. Store processed message IDs
**Why:** Tracking processed IDs prevents duplicate processing.

---

### 29. What does negative acknowledgment (nack) do?
- A. Deletes the message
- ☑️ B. Triggers redelivery
- C. Sends to dead-letter
- D. Logs an error

✅ **Correct:** B. Triggers redelivery
**Why:** Nack tells Pub/Sub to redeliver the message for retry.

---

### 30. Which approach is best for calling unreliable external APIs?
- A. Single retry
- ☑️ B. Retry with exponential backoff + circuit breaker
- C. No retries
- D. Increase timeout only

✅ **Correct:** B. Retry with exponential backoff + circuit breaker
**Why:** Combining patterns provides resilience against transient and persistent failures.

---
