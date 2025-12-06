# Node.js S3 File Upload with Presigned URLs (Dockerized)

In this mini project, I explore how to securely upload files to an AWS S3 bucket using presigned URLs while keeping the bucket private. My goal was to experiment with **AWS S3 and Docker**, learning how to manage file uploads without exposing credentials.

---

## Project Overview

- Frontend allows users to select files from their computer
- Backend generates presigned URLs to upload directly to a private S3 bucket
- No AWS credentials are exposed to the frontend
- The backend is fully **Dockerized**, making it easy to deploy and test

This project serves as a **local test environment** for learning S3 uploads with Docker, rather than a full production application.

---

## Project Structure
```
project-root/
├─ public/
│ ├─ upload.html # Frontend HTML file
│ ├─ upload.js # Frontend JS for handling file upload
│ └─ upload.css # Frontend CSS
├─ uploadwebserver.js # Node.js backend
├─ Dockerfile # Docker configuration
├─ package.json
├─ .env # Environment variables (ignored in Git)
├─ .dockerignore # Docker ignore file
└─ README.md
```
---

## Environment Variables

Create a `.env` file in the project root:

```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
BUCKET_NAME=your_s3_bucket
PORT=your_port
```
Important: .env is ignored in Git. Do not commit credentials.

```bash
Docker Usage
1. Build Docker Image
docker build -t file-upload-app .

2. Run Docker Container
docker run --env-file .env -p your_port:your_port file-upload-app
```
The app will be available at http://localhost:your_port

Backend uses environment variables to generate presigned URLs for file uploads

# How It Works

## Frontend

User selects a file using the file input

Sends a request to /presigned-url with file name and type

## Backend

Generates a presigned URL using AWS SDK (@aws-sdk/client-s3 and @aws-sdk/s3-request-presigner)

Returns the URL as JSON

## Frontend

Uploads the file directly to S3 using a PUT request with the presigned URL

The private bucket remains secure, credentials are never exposed

## CORS (Cross-Origin Resource Sharing)

The backend uses the cors package to allow requests from the frontend running on a different origin

Without proper CORS configuration, the browser would block HTTP requests to the backend

In this project, app.use(cors()) ensures that the frontend can successfully request presigned URLs from the backend

# Security Notes
Do not include AWS keys in GitHub or frontend

Use .env files for local development

For production, consider using AWS IAM Roles or AWS Secrets Manager

Presigned URLs expire after a short time (5 minutes in this project)

