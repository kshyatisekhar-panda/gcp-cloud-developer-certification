# Week 4 - CI/CD & Testing

## Overview
This week I focused on **Continuous Integration and Continuous Deployment (CI/CD)** in Google Cloud.
I learned how to automate builds with **Cloud Build**, manage container images with **Artifact Registry**, set up build triggers, and implement automated testing pipelines.
By the end of the week, I understood how to create end-to-end pipelines that automatically build, test, and deploy applications to Cloud Run and GKE.

---

## Weekly Progress Tracker
| Task | Status |
|------|--------|
| Learned Cloud Build fundamentals and YAML configuration | ✅ |
| Created and configured Artifact Registry repository | ✅ |
| Built multi-step Cloud Build pipelines | ✅ |
| Implemented automated testing in pipelines | ✅ |
| Set up build triggers (push, PR, manual) | ✅ |
| Practiced Blue/Green deployment automation | ✅ |
| Implemented Canary deployments with traffic splitting | ✅ |
| Configured build notifications and approvals | ✅ |
| Integrated secrets into build pipelines | ✅ |

---

## What I Learned

### 🔧 Cloud Build
- Fully managed CI/CD platform that executes builds on GCP infrastructure.
- Uses **cloudbuild.yaml** to define build steps as a series of containers.
- Each step runs in its own container with shared `/workspace` directory.
- Supports **substitution variables** for dynamic configuration.
- Integrates with Cloud Source Repositories, GitHub, and Bitbucket.

### 📦 Artifact Registry
- Next-generation artifact management (successor to Container Registry).
- Supports Docker images, Maven, npm, Python, and more.
- Provides vulnerability scanning and fine-grained IAM.
- Regional storage for low-latency access.
- Supports immutable tags for production safety.

### 🧪 Testing in Pipelines
- Unit tests run as build steps using testing frameworks.
- Integration tests can run against emulators or test environments.
- Build fails fast on test failures, preventing bad deployments.
- Code coverage reports can be generated and stored.

---

## Core Concepts & Theory

### Cloud Build Configuration
| Component | Description | Example |
|-----------|-------------|---------|
| `steps` | Sequential build steps | Build, test, push, deploy |
| `images` | Images to push to registry | gcr.io/project/app |
| `substitutions` | Variable placeholders | $_ENV, $PROJECT_ID |
| `timeout` | Max build duration | 1200s (20 minutes) |
| `options` | Build options | machineType, logging |
| `availableSecrets` | Secret Manager integration | API keys, credentials |

### Build Trigger Types
| Trigger | Fires When | Use Case |
|---------|-----------|----------|
| Push to branch | Code pushed to specific branch | Dev/staging builds |
| Push to tag | Git tag created | Production releases |
| Pull request | PR opened or updated | Pre-merge validation |
| Manual | Manually triggered | On-demand builds |
| Pub/Sub | Message received | Event-driven builds |
| Webhook | HTTP request received | External integrations |

### Deployment Strategies
| Strategy | Implementation | Best For |
|----------|---------------|----------|
| Rolling | Gradual pod replacement | Standard deployments |
| Blue/Green | Deploy to new revision, switch traffic | Zero-downtime releases |
| Canary | Route % of traffic to new version | Risk mitigation |
| A/B Testing | Route based on headers/cookies | Feature experiments |

---

## Practical Steps Done

### Setting Up Artifact Registry
```bash
# Enable Artifact Registry API
gcloud services enable artifactregistry.googleapis.com

# Create a Docker repository
gcloud artifacts repositories create my-repo \
    --repository-format=docker \
    --location=europe-north1 \
    --description="Docker repository for app images"

# Configure Docker authentication
gcloud auth configure-docker europe-north1-docker.pkg.dev

# List repositories
gcloud artifacts repositories list --location=europe-north1
```

### Basic Cloud Build Configuration
```yaml
# cloudbuild.yaml
steps:
  # Step 1: Install dependencies
  - name: 'node:18'
    entrypoint: 'npm'
    args: ['install']

  # Step 2: Run tests
  - name: 'node:18'
    entrypoint: 'npm'
    args: ['test']

  # Step 3: Build Docker image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'europe-north1-docker.pkg.dev/$PROJECT_ID/my-repo/app:$SHORT_SHA', '.']

  # Step 4: Push to Artifact Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'europe-north1-docker.pkg.dev/$PROJECT_ID/my-repo/app:$SHORT_SHA']

  # Step 5: Deploy to Cloud Run
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - 'run'
      - 'deploy'
      - 'my-service'
      - '--image=europe-north1-docker.pkg.dev/$PROJECT_ID/my-repo/app:$SHORT_SHA'
      - '--region=europe-north1'
      - '--platform=managed'

images:
  - 'europe-north1-docker.pkg.dev/$PROJECT_ID/my-repo/app:$SHORT_SHA'

options:
  logging: CLOUD_LOGGING_ONLY
```

### Setting Up Build Triggers
```bash
# Create a push trigger for main branch
gcloud builds triggers create github \
    --repo-name=my-repo \
    --repo-owner=my-org \
    --branch-pattern="^main$" \
    --build-config=cloudbuild.yaml \
    --name=main-branch-trigger

# Create a tag trigger for releases
gcloud builds triggers create github \
    --repo-name=my-repo \
    --repo-owner=my-org \
    --tag-pattern="^v[0-9]+\.[0-9]+\.[0-9]+$" \
    --build-config=cloudbuild-prod.yaml \
    --name=release-trigger

# List triggers
gcloud builds triggers list

# Run a trigger manually
gcloud builds triggers run main-branch-trigger --branch=main
```

### Using Secrets in Builds
```yaml
# cloudbuild.yaml with secrets
steps:
  - name: 'gcr.io/cloud-builders/docker'
    entrypoint: 'bash'
    args:
      - '-c'
      - 'docker build --build-arg API_KEY=$$API_KEY -t app:latest .'
    secretEnv: ['API_KEY']

availableSecrets:
  secretManager:
    - versionName: projects/$PROJECT_ID/secrets/api-key/versions/latest
      env: 'API_KEY'
```

### Blue/Green Deployment to Cloud Run
```bash
# Deploy new revision without traffic
gcloud run deploy my-service \
    --image=europe-north1-docker.pkg.dev/$PROJECT_ID/my-repo/app:v2 \
    --region=europe-north1 \
    --no-traffic \
    --tag=green

# Test the new revision
curl https://green---my-service-xxxxx.run.app/health

# Switch traffic to new revision
gcloud run services update-traffic my-service \
    --region=europe-north1 \
    --to-latest
```

### Canary Deployment with Traffic Splitting
```bash
# Deploy new revision
gcloud run deploy my-service \
    --image=europe-north1-docker.pkg.dev/$PROJECT_ID/my-repo/app:v2 \
    --region=europe-north1 \
    --no-traffic

# Route 10% traffic to new revision
gcloud run services update-traffic my-service \
    --region=europe-north1 \
    --to-revisions=my-service-00002-abc=10,my-service-00001-xyz=90

# Gradually increase to 50%
gcloud run services update-traffic my-service \
    --region=europe-north1 \
    --to-revisions=my-service-00002-abc=50,my-service-00001-xyz=50

# Full rollout
gcloud run services update-traffic my-service \
    --region=europe-north1 \
    --to-latest
```

### GKE Deployment with Cloud Build
```yaml
# cloudbuild-gke.yaml
steps:
  # Build and push image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'europe-north1-docker.pkg.dev/$PROJECT_ID/my-repo/app:$SHORT_SHA', '.']

  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'europe-north1-docker.pkg.dev/$PROJECT_ID/my-repo/app:$SHORT_SHA']

  # Get GKE credentials
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - 'container'
      - 'clusters'
      - 'get-credentials'
      - 'my-cluster'
      - '--region=europe-north1'

  # Apply Kubernetes manifests
  - name: 'gcr.io/cloud-builders/kubectl'
    args:
      - 'set'
      - 'image'
      - 'deployment/my-deployment'
      - 'app=europe-north1-docker.pkg.dev/$PROJECT_ID/my-repo/app:$SHORT_SHA'
    env:
      - 'CLOUDSDK_COMPUTE_REGION=europe-north1'
      - 'CLOUDSDK_CONTAINER_CLUSTER=my-cluster'

  # Wait for rollout
  - name: 'gcr.io/cloud-builders/kubectl'
    args: ['rollout', 'status', 'deployment/my-deployment']
    env:
      - 'CLOUDSDK_COMPUTE_REGION=europe-north1'
      - 'CLOUDSDK_CONTAINER_CLUSTER=my-cluster'

images:
  - 'europe-north1-docker.pkg.dev/$PROJECT_ID/my-repo/app:$SHORT_SHA'
```

---

## Security & Best Practices
- Use **Artifact Registry** instead of Container Registry for better security features.
- Enable **vulnerability scanning** on container images.
- Use **Secret Manager** for sensitive data in builds — never hardcode secrets.
- Apply **least privilege** IAM roles to Cloud Build service account.
- Use **immutable tags** for production images (e.g., `v1.2.3` not `latest`).
- Implement **build approval** workflows for production deployments.
- Store build logs for **audit compliance**.

---

## Key Commands Summary
```bash
# Submit a build manually
gcloud builds submit --config=cloudbuild.yaml .

# View build history
gcloud builds list --limit=10

# Get build details
gcloud builds describe BUILD_ID

# Cancel a running build
gcloud builds cancel BUILD_ID

# Stream build logs
gcloud builds log BUILD_ID --stream

# List Artifact Registry images
gcloud artifacts docker images list europe-north1-docker.pkg.dev/$PROJECT_ID/my-repo

# Delete old images
gcloud artifacts docker images delete europe-north1-docker.pkg.dev/$PROJECT_ID/my-repo/app:old-tag
```

---

## Deliverables
- [x] Cloud Build pipeline with build, test, and deploy stages
- [x] Artifact Registry repository configured and integrated
- [x] Automated triggers for branch pushes and releases
- [x] Blue/Green and Canary deployment strategies implemented
- [x] Week 4 goals completed successfully

Next → **Week 5:** Security & IAM (service accounts, Secret Manager, secure connections)
