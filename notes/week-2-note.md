# Week 2 - Compute & Kubernetes in GCP

## Overview
This week I focused on understanding Google Cloud’s core compute services — **Compute Engine, App Engine, Cloud Run, and Google Kubernetes Engine (GKE)**.  
I deployed my Node.js Express container to both **Cloud Run** and **GKE**, practiced scaling, rolling updates, and learned how each service behaves differently.  
By the end of the week, I had a good grasp of when to use each compute option, how deployment strategies work, and how to clean up everything to avoid costs.

---

## Weekly Progress Tracker
| Task | Status |
|------|--------|
| Reviewed GCP compute service options | ✅ |
| Compared Compute Engine vs App Engine vs Cloud Run vs GKE | ✅ |
| Created and deployed container on Cloud Run | ✅ |
| Built and pushed container image using Cloud Build | ✅ |
| Created and configured GKE cluster | ✅ |
| Deployed app to GKE using deployment & service YAML files | ✅ |
| Practiced scaling, rolling updates, and autoscaling | ✅ |
| Troubleshot common errors (permissions, quotas, ImagePullBackOff) | ✅ |
| Cleaned up GKE cluster and container images to avoid billing | ✅ |

---

## ☁️ Core Concepts & Theory

### Compute Options Comparison
| Service | Type | Scaling | Control | Typical Use |
|----------|------|----------|----------|--------------|
| Compute Engine | IaaS | Manual / autoscale | Full OS control | Legacy apps, custom VMs |
| App Engine Standard | PaaS | Auto (→ 0) | No OS access | Lightweight web apps |
| App Engine Flexible | PaaS / Custom | Auto (≥ 1) | Custom Docker runtime | Continuous apps with libs |
| Cloud Run | Serverless | Auto (→ 0) | Deploy containers | HTTP containers, APIs |
| GKE | Managed Kubernetes | Configurable | Full control | Microservices / multi-container apps |

### Deployment Strategies
| Strategy | Description | Pros | Cons |
|-----------|-------------|------|------|
| Blue/Green | Run two versions (blue & green) and switch traffic | Zero downtime, easy rollback | Needs two environments |
| Rolling Update | Gradually replace pods | Continuous deployments | Rollback takes time |


### When to Use Each

| Scenario | Recommended Service | Reason |
|-----------|--------------------|---------|
| Event-driven task (Pub/Sub trigger) | Cloud Functions | Triggers on events without servers |
| Stateless API or HTTP microservice | Cloud Run | Deploy container fast with auto-scale 0 |
| Multi-service microservices architecture | GKE | Full Kubernetes control |
| Legacy VM-based app needs custom OS config | Compute Engine | Direct OS and network access |
| Web app with spiky traffic / version control | App Engine Standard | Scales automatically to zero |
| Always-on custom runtime (Java/.NET etc.) | App Engine Flexible | Persistent VM with Docker customization |
| Long background workers / cron processing | AEF or GKE | Supports continuous background threads |


### Deployment Models

| Strategy | Used In | Description | Advantage | Limitation |
|-----------|----------|-------------|------------|-------------|
| **Blue/Green** | App Engine, Cloud Run, GKE | Two environments (Blue = live, Green = new) → switch traffic | Zero downtime + instant rollback | Double resources during deploy |
| **Rolling Update** | GKE | Replace pods incrementally | Continuous availability | Rollback slower |
| **Canary** | Cloud Run, GKE | Route small % traffic to new version | Test new version gradually | Complex monitoring |
| **Recreate** | GKE (optional) | Stop old, start new pods | Simplicity | Downtime |

### App Engine Standard vs Flexible

| Feature | **Standard Environment** | **Flexible Environment** |
|----------|--------------------------|---------------------------|
| **Language Runtimes** | Pre-defined (Google-managed) | Custom Docker / Any runtime |
| **Scaling Behavior** | Automatic to zero instances | Automatic but ≥ 1 instance always |
| **Startup Time** | Fast (~seconds) | Slower (~minutes) |
| **OS Access** | None | Full Docker control |
| **Instance Type** | Sandbox (locked runtime) | VM-based container |
| **Traffic Splitting** | ✅ Supported | ✅ Supported |
| **Versioning** | ✅ Supported | ✅ Supported |
| **Background Tasks/Threads** | ❌ Limited (short-lived) | ✅ Allowed |
| **Use When** | Quick deployment, low config | Custom lib/runtime, long tasks |
| **Billing** | Per-instance-hour only when running | Continuous (≥ 1 VM up) |

---

## Practical Steps Done

### Cloud Run Deployment
1. **Build and push image**
   ```bash
   gcloud builds submit --tag gcr.io/${project-id}/node-express
   ```
2. **Deploy**
   ```bash
   gcloud run deploy node-express-service --image gcr.io/${project-id}/node-express --platform managed --region europe-north1 --allow-unauthenticated  ``` 

### GKE Deployment

```bash

### Enable the GKE API
```bash
gcloud services enable container.googleapis.com

# Create cluster
gcloud container clusters create node-cluster --num-nodes=2 --region=europe-north1

# Authenticate
gcloud container clusters get-credentials node-cluster --region=europe-north1 && kubectl get nodes

# Apply YAMLs (Deployment, Service)
kubectl apply -f deployment.yaml && kubectl apply -f service.yaml


# Get Status of Deployment and Service
 && kubectl get pods && kubectl get svc

# Scale
kubectl scale deployment node-express-deployment --replicas=4

# Rolling Update

docker build -t gcr.io/${project-id}/node-express:v2 .
docker push gcr.io/${project-id}/node-express:v2
kubectl set image deployment/node-express-deployment node-express=gcr.io/${project-id}/node-express:v2
```

### Clean Up
```bash
kubectl delete service node-express-service
kubectl delete deployment node-express-deployment
gcloud container clusters delete node-cluster --zone=europe-north1-b --quiet
```


## [Take the Quiz](quizes/compute-service-quize.md)