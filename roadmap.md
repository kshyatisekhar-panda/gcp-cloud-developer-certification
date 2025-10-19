# Google Cloud Professional Cloud Developer - Roadmap

**Target Certification:** [Google Cloud Certified – Professional Cloud Developer](https://cloud.google.com/learn/certification/cloud-developer)  
**Goal:** Pass by **December 5, 2025**  
**Status:** 🟢 In Progress  

---

## Overview
This roadmap defines my complete **8-week plan** to prepare for and pass the Google Cloud Professional Cloud Developer exam.  
It includes tasks, labs, and revision checkpoints for every week.  

---

## Weekly Progress Tracker

| Week | Focus | Status |
|------|--------|---------|
| Week 1 | GCP Foundations & Prerequisites | ☐ |
| Week 2 | Compute & Kubernetes | ☐ |
| Week 3 | Databases & Storage | ☐ |
| Week 4 | CI/CD & Testing | ☐ |
| Week 5 | Security & IAM | ☐ |
| Week 6 | Monitoring & Debugging | ☐ |
| Week 7 | Architecture & Integration | ☐ |
| Week 8 | Mock Exams & Final Review | ☐ |

*(Mark ✅ when you complete each week)*

---

## Study Schedule

| Week | Focus Area | Objective |
|------|-------------|-----------|
| [Week 1](./notes/week-1-note.md) | GCP Foundations & Prerequisites | Build GCP fundamentals, IAM, CLI, and basic deployments |
| [Week 2](./notes/week-2-note.md) | Compute & Kubernetes | Learn GKE, Cloud Run, App Engine, deployments |
| [Week 3](./notes/week-3-note.md) | Databases & Storage | Practice Firestore, Cloud SQL, Cloud Storage integrations |
| [Week 4](./notes/week-4-note.md) | CI/CD & Testing | Automate builds with Cloud Build and testing pipelines |
| [Week 5](./notes/week-5-note.md) | Security & IAM | Secure workloads, use Secret Manager, service accounts |
| [Week 6](./notes/week-6-note.md) | Monitoring & Debugging | Cloud Monitoring, Logging, Error Reporting, tracing |
| [Week 7](./notes/week-7-note.md) | Architecture & Integration | Microservices, Pub/Sub, resilience, event-driven design |
| [Week 8](./notes/week-8-note.md) | Mock Exams & Final Review | Practice exams, final revisions, and exam booking |

---

## Exam Domains and Weighting

| Domain | Weight | Covered In |
|---------|---------|-------------|
| Designing scalable, available, reliable applications | 24% | Weeks 2, 3, 7 |
| Building and testing applications | 26% | Weeks 4, 5, 6 |
| Deploying applications | 24% | Weeks 2, 4 |
| Integrating Google Cloud services | 16% | Weeks 3, 5, 7 |
| Managing application performance monitoring | 10% | Week 6 |

---

## Tools & Platforms

- **Google Cloud Console**  
- **Cloud SDK / gcloud CLI**  
- **Cloud Run, App Engine, GKE, Cloud Functions**  
- **Cloud SQL, Firestore, Pub/Sub, Cloud Storage**  
- **Cloud Build, Artifact Registry, Secret Manager**  
- **Cloud Monitoring, Logging, Error Reporting**  
- **Qwiklabs / Cloud Skills Boost**

---

## Weekly Goals Summary

### Week 1: GCP Foundations & Prerequisites
- Set up Google Cloud account and billing  
- Configure IAM, roles, and service accounts  
- Install and configure gcloud CLI and Docker  
- Deploy first app on Cloud Run using Cloud Shell  
- Complete “Google Cloud Fundamentals: Core Infrastructure” course  
- *Deliverable:* GCP environment ready and “Hello World” app deployed

---

### Week 2: Compute & Kubernetes
- Compare Cloud Run, App Engine, GKE  
- Deploy microservice to GKE  
- Test autoscaling and concurrency  
- *Deliverable:* Containerized app deployed on Cloud Run & GKE  

---

### Week 3: Databases & Storage
- Work with Firestore and Cloud SQL  
- Connect Cloud Run to Cloud SQL  
- Store assets in Cloud Storage  
- *Deliverable:* App using Firestore and Storage integration  

---

### Week 4: CI/CD & Testing
- Learn Cloud Build & Artifact Registry  
- Automate build + test pipelines  
- Understand blue/green & canary deployments  
- *Deliverable:* Pipeline triggering automatic GKE deploy  

---

### Week 5: Security & IAM
- Implement IAM roles and least privilege  
- Manage secrets with Secret Manager  
- Configure service-to-service auth  
- *Deliverable:* Secure Cloud Run to Cloud SQL connection  

---

### Week 6: Monitoring & Debugging
- Set up Cloud Logging & Monitoring  
- Build dashboards, alerts, and custom metrics  
- Analyze traces and errors  
- *Deliverable:* Working monitoring dashboard  

---

### Week 7: Architecture & Integration
- Review microservice & event-driven design  
- Implement retries, idempotency, circuit breakers  
- Design resilient architecture  
- *Deliverable:* Full microservice demo app with Pub/Sub integration  

---

### Week 8: Mock Exams & Final Review
- Take 2–3 mock exams  
- Review official Google samples  
- Focus on weak areas  
- *Deliverable:* Consistent 80%+ in mock tests and exam scheduled  

---

## Revision Strategy
- Review notes weekly in `notes/weekX.md` files  
- Summarize key commands and services in a `cheatsheet.md`  
- Maintain a `mistake-log.md` to capture tricky concepts from mock exams  

---

## Final Checklist
- [ ] Complete all 8 weeks of tasks  
- [ ] Finish all hands-on labs on Cloud Skills Boost  
- [ ] Score ≥ 80% on 3 consecutive practice tests  
- [ ] Book exam via [Webassessor](https://www.webassessor.com/googlecloud)  
- [ ] Revise with cheatsheet and roadmap summaries  

---

## Repository Structure
```text
gcp-cloud-developer-certification/
│
├── README.md                 ← main intro & navigation
├── roadmap.md                ← this file (detailed 8-week plan)
├── resources/                ← PDFs, links, and practice materials
│
└── notes/
    ├── week1.md              ← detailed Week 1 progress & setup notes
    ├── week2.md
    ├── week3.md
    ├── week4.md
    ├── week5.md
    ├── week6.md
    ├── week7.md
    └── week8.md
