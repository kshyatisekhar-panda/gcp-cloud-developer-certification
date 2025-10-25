# Week 1 — Cloud Run Deployment Summary

## Overview
Week 1 focused on setting up Google Cloud Platform (GCP), installing the Cloud SDK, and deploying a live Node.js Express application using Cloud Run.  
By the end of the week, the environment was configured, a container image was built with Cloud Build, deployed to Cloud Run, tested via APIs, and then cleaned up to avoid costs.

---

## Weekly Progress Tracker
| Task | Status |
|------|--------|
| GCP account and billing setup | ✅ |
| IAM and roles configured | ✅ |
| Cloud SDK and Docker installed | ✅ |
| Node Express app created | ✅ |
| Container image built with Cloud Build | ✅ |
| Cloud Run deployment successful | ✅ |
| Service tested via APIs | ✅ |
| Cleanup completed to avoid charges | ✅ |

---

## Setup and Build
- [x] Created new project `{PROJECT_ID}`
- [x] Installed and configured gcloud CLI
- [x] Verified authentication and switched to correct account
- [x] Created `node-express-service` app containing:
  - `index.js`, `package.json`, `Dockerfile`
  - Added `/` and `/health` endpoints
- [x] Built container image with Cloud Build
```bash
gcloud builds submit --tag gcr.io/{PROJECT_ID}/node-express
```

## Deployment
- [x] Deployed the container to Cloud Run
```bash
gcloud run deploy node-express-service --image gcr.io/{PROJECT_ID}/node-express --platform managed --region europe-north1 --allow-unauthenticated
````

* [x] Verified deployment and endpoints

```bash
gcloud run services describe node-express-service --region europe-north1 --format 'value(status.url)'
curl https://node-express-service-xxxxx-europe-north1.run.app/health
```

* [x] Confirmed public HTTPS access working correctly

---

## Troubleshooting and Fixes

* [x] Fixed "Dockerfile required" error by running build in correct folder
* [x] Resolved "PERMISSION_DENIED" by switching to authorized GCP account and setting active project
* [x] Validated APIs responding successfully via Cloud Run

---

## Cleanup (to stay within free tier)

* [x] Deleted Cloud Run service

```bash
gcloud run services delete node-express-service --region europe-north1 --quiet
```

* [x] Removed container image

```bash
gcloud container images delete gcr.io/{PROJECT_ID}/node-express --force-delete-tags --quiet
```

* [x] Deleted Cloud Build source archive

```bash
gsutil rm gs://{PROJECT_ID}_cloudbuild/source/1761424667.039716-f1095ad900fe4c508e2718e98461d831.tgz
```

* [x] Deleted Cloud Build record

```bash
gcloud builds delete cd60cb7a-b0e5-4df3-ba11-7d4e183944d8 --quiet
```

* [x] Verified project clean → no active resources or costs

---

## Learning Highlights

* [x] Understood GCP resource hierarchy and IAM permissions
* [x] Installed and configured Cloud SDK and Docker
* [x] Built, deployed, and tested a containerized Node.js service
* [x] Practiced Cloud Run scaling, logs, and environment variables
* [x] Learned full build–deploy–cleanup workflow on GCP

---

## Deliverables

* [x] Functional Cloud Run service (`node-express-service`) deployed, tested, and cleaned up
* [x] Week 1 goals completed successfully

Next → **Week 2:** Compute and Kubernetes (GKE, autoscaling, multi-container setup)
