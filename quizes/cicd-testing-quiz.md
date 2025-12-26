# CI/CD & Testing Quiz (Week 4)

This quiz covers Cloud Build, Artifact Registry, build pipelines, deployment strategies, and automated testing in Google Cloud.

---

### 1. Which service is Google Cloud's fully managed CI/CD platform?
- A. Jenkins on GCE
- ☑️ B. Cloud Build
- C. Cloud Deploy
- D. Artifact Registry

✅ **Correct:** B. Cloud Build
**Why:** Cloud Build is Google's serverless CI/CD platform that executes builds in containers.

---

### 2. What file defines Cloud Build pipeline steps?
- A. Dockerfile
- B. pipeline.yaml
- ☑️ C. cloudbuild.yaml
- D. build.json

✅ **Correct:** C. cloudbuild.yaml
**Why:** Cloud Build uses cloudbuild.yaml to define build steps, images, and configuration.

---

### 3. Which service replaced Container Registry for artifact management?
- A. Cloud Storage
- ☑️ B. Artifact Registry
- C. Cloud Build
- D. GKE Registry

✅ **Correct:** B. Artifact Registry
**Why:** Artifact Registry is the next-generation service supporting Docker, Maven, npm, and more.

---

### 4. What happens between Cloud Build steps?
- A. Data is lost
- ☑️ B. /workspace directory is shared
- C. New VM is created
- D. Steps run in parallel

✅ **Correct:** B. /workspace directory is shared
**Why:** All steps share the /workspace directory for passing files between steps.

---

### 5. Which trigger fires when code is pushed to a branch?
- ☑️ A. Push trigger
- B. Tag trigger
- C. Pull request trigger
- D. Webhook trigger

✅ **Correct:** A. Push trigger
**Why:** Push triggers execute builds when commits are pushed to specified branches.

---

### 6. To deploy a new Cloud Run revision without traffic:
- A. `gcloud run deploy --no-deploy`
- ☑️ B. `gcloud run deploy --no-traffic`
- C. `gcloud run deploy --traffic=0`
- D. `gcloud run deploy --canary`

✅ **Correct:** B. `gcloud run deploy --no-traffic`
**Why:** The --no-traffic flag deploys a revision without routing traffic to it.

---

### 7. What deployment strategy gradually replaces pods in Kubernetes?
- A. Blue/Green
- ☑️ B. Rolling Update
- C. Canary
- D. Recreate

✅ **Correct:** B. Rolling Update
**Why:** Rolling updates incrementally replace old pods with new ones for zero-downtime deployments.

---

### 8. Blue/Green deployment requires:
- ☑️ A. Two environments running simultaneously
- B. Single environment with gradual rollout
- C. Kubernetes only
- D. Manual intervention

✅ **Correct:** A. Two environments running simultaneously
**Why:** Blue/Green maintains both versions, then switches traffic from Blue to Green.

---

### 9. Which deployment strategy routes a percentage of traffic to the new version?
- A. Rolling Update
- B. Blue/Green
- ☑️ C. Canary
- D. Recreate

✅ **Correct:** C. Canary
**Why:** Canary deployments test new versions with a small percentage of traffic before full rollout.

---

### 10. How do you store secrets in Cloud Build pipelines?
- A. Environment variables in cloudbuild.yaml
- B. Hardcode in source
- ☑️ C. Secret Manager with availableSecrets
- D. Cloud Storage text file

✅ **Correct:** C. Secret Manager with availableSecrets
**Why:** Cloud Build integrates with Secret Manager to securely inject secrets into build steps.

---

### 11. Which command submits a build to Cloud Build?
- A. `gcloud build run`
- ☑️ B. `gcloud builds submit`
- C. `gcloud cloud-build start`
- D. `gcloud run build`

✅ **Correct:** B. `gcloud builds submit`
**Why:** The `gcloud builds submit` command uploads source and starts a build.

---

### 12. What is the purpose of substitution variables in Cloud Build?
- A. Store secrets
- ☑️ B. Dynamic configuration values
- C. Define build steps
- D. Specify machine type

✅ **Correct:** B. Dynamic configuration values
**Why:** Substitutions like $PROJECT_ID or $_ENV allow dynamic values in build configurations.

---

### 13. Which built-in variable contains the short commit SHA?
- A. $COMMIT_ID
- ☑️ B. $SHORT_SHA
- C. $GIT_HASH
- D. $VERSION

✅ **Correct:** B. $SHORT_SHA
**Why:** $SHORT_SHA is a built-in variable containing the first 7 characters of the commit hash.

---

### 14. To create a GitHub push trigger:
- A. `gcloud triggers create --github`
- ☑️ B. `gcloud builds triggers create github`
- C. `gcloud build trigger github`
- D. `gcloud ci triggers add`

✅ **Correct:** B. `gcloud builds triggers create github`
**Why:** This command creates a Cloud Build trigger connected to a GitHub repository.

---

### 15. What does Artifact Registry vulnerability scanning do?
- A. Scans source code
- ☑️ B. Scans container images for known CVEs
- C. Scans build logs
- D. Scans network traffic

✅ **Correct:** B. Scans container images for known CVEs
**Why:** Vulnerability scanning checks container images for known security vulnerabilities.

---

### 16. Which image tag should be avoided in production?
- A. v1.2.3
- B. commit-sha
- ☑️ C. latest
- D. release-2024

✅ **Correct:** C. latest
**Why:** The 'latest' tag is mutable and can cause inconsistent deployments. Use immutable tags.

---

### 17. To split traffic 90/10 between Cloud Run revisions:
- A. `gcloud run services traffic`
- ☑️ B. `gcloud run services update-traffic --to-revisions`
- C. `gcloud run deploy --split`
- D. `gcloud run traffic set`

✅ **Correct:** B. `gcloud run services update-traffic --to-revisions`
**Why:** This command allows specifying traffic percentages for different revisions.

---

### 18. What is the default timeout for Cloud Build?
- A. 5 minutes
- ☑️ B. 10 minutes
- C. 60 minutes
- D. No timeout

✅ **Correct:** B. 10 minutes
**Why:** Cloud Build has a default timeout of 10 minutes (600 seconds) per build.

---

### 19. Which section in cloudbuild.yaml specifies images to push?
- A. push
- B. artifacts
- ☑️ C. images
- D. outputs

✅ **Correct:** C. images
**Why:** The images section lists container images to push to the registry after build.

---

### 20. To run tests in a Cloud Build pipeline:
- ☑️ A. Add a step with test command
- B. Use separate test trigger
- C. Tests run automatically
- D. Configure in Cloud Console

✅ **Correct:** A. Add a step with test command
**Why:** Testing is a build step like any other, using a container with test framework.

---

### 21. What happens if a build step fails?
- ☑️ A. Build stops and fails
- B. Continues to next step
- C. Retries automatically
- D. Sends notification only

✅ **Correct:** A. Build stops and fails
**Why:** By default, Cloud Build stops on first step failure (fail-fast behavior).

---

### 22. Which command lists recent Cloud Build history?
- A. `gcloud builds history`
- ☑️ B. `gcloud builds list`
- C. `gcloud builds show`
- D. `gcloud builds log`

✅ **Correct:** B. `gcloud builds list`
**Why:** This command shows recent builds with their status and IDs.

---

### 23. To authenticate Docker with Artifact Registry:
- A. `docker login gcr.io`
- ☑️ B. `gcloud auth configure-docker REGION-docker.pkg.dev`
- C. `gcloud docker auth`
- D. `gcloud artifacts login`

✅ **Correct:** B. `gcloud auth configure-docker REGION-docker.pkg.dev`
**Why:** This configures Docker to use gcloud credentials for Artifact Registry.

---

### 24. Which Cloud Build option specifies the machine type?
- A. `machine: n1-standard-1`
- ☑️ B. `options: machineType: E2_HIGHCPU_8`
- C. `resources: cpu: 8`
- D. `compute: high`

✅ **Correct:** B. `options: machineType: E2_HIGHCPU_8`
**Why:** Machine type is specified in the options section of cloudbuild.yaml.

---

### 25. What is Cloud Deploy used for?
- A. Building containers
- ☑️ B. Managed continuous delivery to GKE/Cloud Run
- C. Storing artifacts
- D. Running tests

✅ **Correct:** B. Managed continuous delivery to GKE/Cloud Run
**Why:** Cloud Deploy is a managed service for continuous delivery with approval workflows.

---

### 26. To rollback a Cloud Run deployment:
- A. Delete current revision
- ☑️ B. Route traffic to previous revision
- C. Redeploy old image manually
- D. Use rollback command

✅ **Correct:** B. Route traffic to previous revision
**Why:** Cloud Run keeps revisions, allowing instant rollback by switching traffic.

---

### 27. Which trigger type requires manual execution?
- A. Push trigger
- B. Tag trigger
- C. Pull request trigger
- ☑️ D. Manual trigger

✅ **Correct:** D. Manual trigger
**Why:** Manual triggers must be explicitly invoked, useful for on-demand builds.

---

### 28. Build steps run in which order?
- A. Parallel by default
- ☑️ B. Sequential by default
- C. Random order
- D. Based on dependencies

✅ **Correct:** B. Sequential by default
**Why:** Build steps execute sequentially unless configured to run in parallel with waitFor.

---

### 29. Which format does Artifact Registry NOT support?
- A. Docker
- B. Maven
- C. npm
- ☑️ D. Git repositories

✅ **Correct:** D. Git repositories
**Why:** Artifact Registry stores artifacts (Docker, Maven, npm, Python), not source code.

---

### 30. To view streaming logs of a running build:
- A. `gcloud builds show BUILD_ID`
- ☑️ B. `gcloud builds log BUILD_ID --stream`
- C. `gcloud builds watch BUILD_ID`
- D. `gcloud logging read builds`

✅ **Correct:** B. `gcloud builds log BUILD_ID --stream`
**Why:** The --stream flag shows real-time logs as the build progresses.

---
