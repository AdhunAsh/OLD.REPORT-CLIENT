# AWS S3 Deployment Guide

## Prerequisites
- AWS CLI installed and configured
- AWS account with S3 access

## Step 1: Build for Production
```bash
npm run build
```

## Step 2: Install AWS CLI (if not installed)
```bash
# Windows (using chocolatey)
choco install awscli

# Or download from: https://aws.amazon.com/cli/
```

## Step 3: Configure AWS CLI
```bash
aws configure
# Enter your:
# - AWS Access Key ID
# - AWS Secret Access Key  
# - Default region (e.g., us-east-1)
# - Default output format (json)
```

## Step 4: Create S3 Bucket
```bash
# Replace 'your-bucket-name' with your desired bucket name
aws s3 mb s3://your-bucket-name --region us-east-1
```

## Step 5: Enable Static Website Hosting
```bash
aws s3 website s3://your-bucket-name --index-document index.html --error-document index.html
```

## Step 6: Upload Build Files
```bash
# Upload all files from dist folder
aws s3 sync dist/ s3://your-bucket-name --delete

# Make files publicly readable
aws s3api put-bucket-policy --bucket your-bucket-name --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}'
```

## Step 7: Get Website URL
Your website will be available at:
```
http://your-bucket-name.s3-website-us-east-1.amazonaws.com
```

## Quick Deploy Script
Create `deploy.bat` in your project root:
```batch
@echo off
echo Building project...
npm run build

echo Uploading to S3...
aws s3 sync dist/ s3://your-bucket-name --delete

echo Deployment complete!
echo Website: http://your-bucket-name.s3-website-us-east-1.amazonaws.com
```

## Environment Variables
Update your `.env` for production:
```env
VITE_BACKEND_URL=https://your-api-domain.com
VITE_CLERK_PUBLISHABLE_KEY=your_production_clerk_key
```

## Notes
- Replace `your-bucket-name` with your actual bucket name
- Bucket names must be globally unique
- Use CloudFront for better performance and HTTPS