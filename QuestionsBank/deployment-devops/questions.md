# Deployment & DevOps - Questions Bank

## Question 1: Containerization with Docker

**Question:** Explain Docker containerization and best practices.

**Answer:**
**1. Dockerfile Best Practices:**

```dockerfile
# Multi-stage build for Node.js application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]
```

**2. Docker Compose:**

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/mydb
    depends_on:
      - db
      - redis
    volumes:
      - ./logs:/app/logs
    restart: unless-stopped
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - '5432:5432'
    restart: unless-stopped
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data
    restart: unless-stopped
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped
    networks:
      - app-network

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge
```

**3. Docker Optimization:**

```dockerfile
# Optimized Dockerfile with caching
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

---

## Question 2: Kubernetes Deployment

**Question:** Explain Kubernetes deployment strategies and configurations.

**Answer:**
**1. Kubernetes Deployment:**

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
        - name: web-app
          image: myapp:latest
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: 'production'
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: app-secrets
                  key: database-url
          resources:
            requests:
              memory: '256Mi'
              cpu: '250m'
            limits:
              memory: '512Mi'
              cpu: '500m'
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
          volumeMounts:
            - name: app-logs
              mountPath: /app/logs
      volumes:
        - name: app-logs
          emptyDir: {}
      imagePullSecrets:
        - name: registry-secret
```

**2. Service Configuration:**

```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
spec:
  selector:
    app: web-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
---
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: 'true'
    cert-manager.io/cluster-issuer: 'letsencrypt-prod'
spec:
  tls:
    - hosts:
        - myapp.com
      secretName: myapp-tls
  rules:
    - host: myapp.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web-app-service
                port:
                  number: 80
```

**3. Horizontal Pod Autoscaler:**

```yaml
# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 10
          periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
        - type: Percent
          value: 100
          periodSeconds: 15
        - type: Pods
          value: 4
          periodSeconds: 15
      selectPolicy: Max
```

---

## Question 3: CI/CD Pipelines

**Question:** Explain CI/CD pipeline design and implementation.

**Answer:**
**1. GitHub Actions Pipeline:**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:ci

      - name: Run linting
        run: npm run lint

      - name: Build application
        run: npm run build

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run security audit
        run: npm audit --audit-level high

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  build:
    needs: [test, security]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Log in to Container Registry
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v4
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy to Kubernetes
        uses: azure/k8s-deploy@v1
        with:
          manifests: |
            k8s/deployment.yaml
            k8s/service.yaml
            k8s/ingress.yaml
          images: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
          namespace: production
          kubeconfig: ${{ secrets.KUBE_CONFIG }}

      - name: Verify deployment
        run: |
          kubectl rollout status deployment/web-app -n production
          kubectl get pods -n production
```

**2. GitLab CI/CD Pipeline:**

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: '/certs'

services:
  - docker:dind

test:
  stage: test
  image: node:18-alpine
  script:
    - npm ci
    - npm run test:ci
    - npm run lint
    - npm run build
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
    paths:
      - coverage/
    expire_in: 1 week

build:
  stage: build
  image: docker:latest
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest
    - docker push $CI_REGISTRY_IMAGE:latest
  only:
    - main
    - develop

deploy_staging:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl config use-context staging
    - kubectl set image deployment/web-app web-app=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA -n staging
    - kubectl rollout status deployment/web-app -n staging
  environment:
    name: staging
    url: https://staging.myapp.com
  only:
    - develop

deploy_production:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl config use-context production
    - kubectl set image deployment/web-app web-app=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA -n production
    - kubectl rollout status deployment/web-app -n production
  environment:
    name: production
    url: https://myapp.com
  when: manual
  only:
    - main
```

---

## Question 4: Infrastructure as Code

**Question:** Explain Infrastructure as Code (IaC) with Terraform and CloudFormation.

**Answer:**
**1. Terraform Configuration:**

```hcl
# main.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "my-terraform-state"
    key    = "production/terraform.tfstate"
    region = "us-west-2"
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC Configuration
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "${var.project_name}-vpc"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-igw"
  }
}

# Subnets
resource "aws_subnet" "public" {
  count = length(var.availability_zones)

  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.${count.index + 1}.0/24"
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.project_name}-public-subnet-${count.index + 1}"
  }
}

resource "aws_subnet" "private" {
  count = length(var.availability_zones)

  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 10}.0/24"
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "${var.project_name}-private-subnet-${count.index + 1}"
  }
}

# EKS Cluster
resource "aws_eks_cluster" "main" {
  name     = "${var.project_name}-cluster"
  role_arn = aws_iam_role.eks_cluster.arn
  version  = var.kubernetes_version

  vpc_config {
    subnet_ids = aws_subnet.private[*].id
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_cluster_policy,
    aws_iam_role_policy_attachment.eks_vpc_resource_controller,
  ]

  tags = {
    Name = "${var.project_name}-cluster"
  }
}

# RDS Database
resource "aws_db_subnet_group" "main" {
  name       = "${var.project_name}-db-subnet-group"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name = "${var.project_name}-db-subnet-group"
  }
}

resource "aws_db_instance" "main" {
  identifier = "${var.project_name}-db"

  engine         = "postgres"
  engine_version = "15.4"
  instance_class = var.db_instance_class

  allocated_storage     = 20
  max_allocated_storage = 100
  storage_encrypted     = true

  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name

  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"

  skip_final_snapshot = false
  final_snapshot_identifier = "${var.project_name}-db-final-snapshot-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"

  tags = {
    Name = "${var.project_name}-db"
  }
}
```

**2. CloudFormation Template:**

```yaml
# cloudformation.yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Production infrastructure for web application'

Parameters:
  ProjectName:
    Type: String
    Default: myapp
    Description: Name of the project

  Environment:
    Type: String
    Default: production
    AllowedValues: [development, staging, production]
    Description: Environment name

  InstanceType:
    Type: String
    Default: t3.medium
    AllowedValues: [t3.small, t3.medium, t3.large]
    Description: EC2 instance type

Resources:
  # VPC
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsHostnames: true
      EnableDnsSupport: true
      Tags:
        - Key: Name
          Value: !Sub '${ProjectName}-${Environment}-vpc'

  # Internet Gateway
  InternetGateway:
    Type: AWS::EC2::InternetGateway
    Properties:
      Tags:
        - Key: Name
          Value: !Sub '${ProjectName}-${Environment}-igw'

  InternetGatewayAttachment:
    Type: AWS::EC2::VPCGatewayAttachment
    Properties:
      InternetGatewayId: !Ref InternetGateway
      VpcId: !Ref VPC

  # Public Subnets
  PublicSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !Select [0, !GetAZs '']
      CidrBlock: 10.0.1.0/24
      MapPublicIpOnLaunch: true
      Tags:
        - Key: Name
          Value: !Sub '${ProjectName}-${Environment}-public-subnet-1'

  PublicSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !Select [1, !GetAZs '']
      CidrBlock: 10.0.2.0/24
      MapPublicIpOnLaunch: true
      Tags:
        - Key: Name
          Value: !Sub '${ProjectName}-${Environment}-public-subnet-2'

  # Private Subnets
  PrivateSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !Select [0, !GetAZs '']
      CidrBlock: 10.0.10.0/24
      Tags:
        - Key: Name
          Value: !Sub '${ProjectName}-${Environment}-private-subnet-1'

  PrivateSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !Select [1, !GetAZs '']
      CidrBlock: 10.0.20.0/24
      Tags:
        - Key: Name
          Value: !Sub '${ProjectName}-${Environment}-private-subnet-2'

  # EKS Cluster
  EKSCluster:
    Type: AWS::EKS::Cluster
    Properties:
      Name: !Sub '${ProjectName}-${Environment}-cluster'
      Version: '1.28'
      RoleArn: !GetAtt EKSClusterRole.Arn
      ResourcesVpcConfig:
        SubnetIds:
          - !Ref PrivateSubnet1
          - !Ref PrivateSubnet2
        SecurityGroupIds:
          - !Ref EKSClusterSecurityGroup
      Logging:
        ClusterLogging:
          EnabledTypes:
            - Type: api
            - Type: audit
            - Type: authenticator
            - Type: controllerManager
            - Type: scheduler

  # RDS Database
  DBSubnetGroup:
    Type: AWS::RDS::DBSubnetGroup
    Properties:
      DBSubnetGroupDescription: !Sub '${ProjectName}-${Environment}-db-subnet-group'
      SubnetIds:
        - !Ref PrivateSubnet1
        - !Ref PrivateSubnet2
      Tags:
        - Key: Name
          Value: !Sub '${ProjectName}-${Environment}-db-subnet-group'

  Database:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceIdentifier: !Sub '${ProjectName}-${Environment}-db'
      DBName: !Ref DBName
      DBInstanceClass: !Ref DBInstanceClass
      Engine: postgres
      EngineVersion: '15.4'
      MasterUsername: !Ref DBUsername
      MasterUserPassword: !Ref DBPassword
      AllocatedStorage: 20
      MaxAllocatedStorage: 100
      StorageEncrypted: true
      VPCSecurityGroups:
        - !Ref DatabaseSecurityGroup
      DBSubnetGroupName: !Ref DBSubnetGroup
      BackupRetentionPeriod: 7
      PreferredBackupWindow: '03:00-04:00'
      PreferredMaintenanceWindow: 'sun:04:00-sun:05:00'
      Tags:
        - Key: Name
          Value: !Sub '${ProjectName}-${Environment}-db'

Outputs:
  VPCId:
    Description: VPC ID
    Value: !Ref VPC
    Export:
      Name: !Sub '${ProjectName}-${Environment}-VPC-ID'

  EKSClusterName:
    Description: EKS Cluster Name
    Value: !Ref EKSCluster
    Export:
      Name: !Sub '${ProjectName}-${Environment}-EKS-Cluster-Name'

  DatabaseEndpoint:
    Description: RDS Database Endpoint
    Value: !GetAtt Database.Endpoint.Address
    Export:
      Name: !Sub '${ProjectName}-${Environment}-Database-Endpoint'
```

---

## Question 5: Monitoring and Logging

**Question:** Explain monitoring and logging strategies for production applications.

**Answer:**
**1. Application Monitoring:**

```javascript
// Prometheus metrics
const prometheus = require('prom-client');

// Create metrics
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});

const httpRequestTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

const activeConnections = new prometheus.Gauge({
  name: 'active_connections',
  help: 'Number of active connections',
});

// Middleware to collect metrics
function metricsMiddleware(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const labels = {
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode,
    };

    httpRequestDuration.observe(labels, duration);
    httpRequestTotal.inc(labels);
  });

  next();
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version,
  });
});

// Metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(prometheus.register.metrics());
});
```

**2. Logging Strategy:**

```javascript
// Winston logger configuration
const winston = require('winston');
const { combine, timestamp, errors, json, printf, colorize } = winston.format;

// Custom format
const logFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  return `${timestamp} [${level}]: ${stack || message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
});

// Create logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), errors({ stack: true }), json()),
  defaultMeta: {
    service: 'web-app',
    version: process.env.npm_package_version,
    environment: process.env.NODE_ENV,
  },
  transports: [
    // Console transport
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), logFormat),
    }),

    // File transport for errors
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),

    // File transport for all logs
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});

// Request logging middleware
function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      userId: req.user?.id,
    };

    if (res.statusCode >= 400) {
      logger.error('HTTP Request', logData);
    } else {
      logger.info('HTTP Request', logData);
    }
  });

  next();
}

// Error logging
function errorLogger(err, req, res, next) {
  logger.error('Unhandled Error', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: req.user?.id,
  });

  next(err);
}
```

**3. ELK Stack Configuration:**

```yaml
# docker-compose.elk.yml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - 'ES_JAVA_OPTS=-Xms512m -Xmx512m'
    ports:
      - '9200:9200'
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    networks:
      - elk

  logstash:
    image: docker.elastic.co/logstash/logstash:8.11.0
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline
      - ./logstash/config:/usr/share/logstash/config
    ports:
      - '5044:5044'
      - '5000:5000/tcp'
      - '5000:5000/udp'
      - '9600:9600'
    environment:
      LS_JAVA_OPTS: '-Xmx256m -Xms256m'
    networks:
      - elk
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    ports:
      - '5601:5601'
    environment:
      ELASTICSEARCH_HOSTS: http://elasticsearch:9200
    networks:
      - elk
    depends_on:
      - elasticsearch

  filebeat:
    image: docker.elastic.co/beats/filebeat:8.11.0
    user: root
    volumes:
      - ./filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
      - ./logs:/var/log/app:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
    networks:
      - elk
    depends_on:
      - logstash

volumes:
  elasticsearch_data:

networks:
  elk:
    driver: bridge
```

---

## Question 6: Security and Compliance

**Question:** Explain security best practices for deployment and infrastructure.

**Answer:**
**1. Security Scanning:**

```yaml
# security-scan.yml
name: Security Scan

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  dependency-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run npm audit
        run: npm audit --audit-level high

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  container-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build Docker image
        run: docker build -t myapp:latest .

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'myapp:latest'
          format: 'sarif'
          output: 'trivy-results.sarif'

      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'

  infrastructure-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run Checkov
        uses: bridgecrewio/checkov-action@master
        with:
          directory: terraform/
          framework: terraform
          output_format: sarif
          output_file_path: checkov-results.sarif

      - name: Upload Checkov results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: checkov-results.sarif
```

**2. Secrets Management:**

```yaml
# Kubernetes secrets
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  database-url: <base64-encoded-database-url>
  jwt-secret: <base64-encoded-jwt-secret>
  api-key: <base64-encoded-api-key>
---
# External secrets operator
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: aws-secrets-manager
spec:
  provider:
    aws:
      service: SecretsManager
      region: us-west-2
      auth:
        secretRef:
          accessKeyID:
            name: aws-credentials
            key: access-key-id
          secretAccessKey:
            name: aws-credentials
            key: secret-access-key
---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: app-external-secrets
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets-manager
    kind: SecretStore
  target:
    name: app-secrets
    creationPolicy: Owner
  data:
    - secretKey: database-url
      remoteRef:
        key: myapp/database
        property: url
    - secretKey: jwt-secret
      remoteRef:
        key: myapp/jwt
        property: secret
```

**3. Network Security:**

```yaml
# Network policies
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: web-app-network-policy
spec:
  podSelector:
    matchLabels:
      app: web-app
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: ingress-nginx
      ports:
        - protocol: TCP
          port: 3000
  egress:
    - to:
        - namespaceSelector:
            matchLabels:
              name: database
      ports:
        - protocol: TCP
          port: 5432
    - to: []
      ports:
        - protocol: TCP
          port: 53
        - protocol: UDP
          port: 53
---
# Pod security policy
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: web-app-psp
spec:
  privileged: false
  allowPrivilegeEscalation: false
  requiredDropCapabilities:
    - ALL
  volumes:
    - 'configMap'
    - 'emptyDir'
    - 'projected'
    - 'secret'
    - 'downwardAPI'
    - 'persistentVolumeClaim'
  runAsUser:
    rule: 'MustRunAsNonRoot'
  seLinux:
    rule: 'RunAsAny'
  fsGroup:
    rule: 'RunAsAny'
```

**4. Compliance Monitoring:**

```javascript
// Compliance monitoring
class ComplianceMonitor {
  constructor() {
    this.checks = [
      this.checkDataEncryption,
      this.checkAccessLogs,
      this.checkAuditTrail,
      this.checkDataRetention,
      this.checkUserAccess,
    ];
  }

  async runComplianceChecks() {
    const results = [];

    for (const check of this.checks) {
      try {
        const result = await check();
        results.push({
          check: check.name,
          status: result.passed ? 'PASS' : 'FAIL',
          details: result.details,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        results.push({
          check: check.name,
          status: 'ERROR',
          details: error.message,
          timestamp: new Date().toISOString(),
        });
      }
    }

    return results;
  }

  async checkDataEncryption() {
    // Check if data is encrypted at rest and in transit
    const encryptionStatus = await this.verifyEncryption();
    return {
      passed: encryptionStatus.encrypted,
      details: encryptionStatus,
    };
  }

  async checkAccessLogs() {
    // Verify access logs are being collected
    const logStatus = await this.verifyAccessLogs();
    return {
      passed: logStatus.logging,
      details: logStatus,
    };
  }

  async checkAuditTrail() {
    // Verify audit trail is maintained
    const auditStatus = await this.verifyAuditTrail();
    return {
      passed: auditStatus.auditing,
      details: auditStatus,
    };
  }
}
```

---

## Question 11: Webpack Module Bundler

**Question:** What is Webpack, and what is it used for?

**Answer:**
Webpack is a module bundler. Its primary purpose is to take multiple JavaScript files (and other assets like CSS, images) that use modules (import/export) and bundle them into a smaller number of optimized files (often just one) for the browser. This is necessary because browsers historically couldn't natively handle complex module dependency graphs.

**Basic Webpack Configuration:**

```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
```

**Webpack Loaders:**

```javascript
// Different loaders for different file types
module.exports = {
  module: {
    rules: [
      // JavaScript/TypeScript
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },

      // CSS
      {
        test: /\.css$/,
        use: [
          'style-loader', // Injects CSS into DOM
          'css-loader', // Resolves CSS imports
          'postcss-loader', // PostCSS processing
        ],
      },

      // SCSS/Sass
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },

      // Images
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]',
        },
      },

      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext]',
        },
      },
    ],
  },
};
```

**Webpack Plugins:**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    // Clean dist folder before build
    new CleanWebpackPlugin(),

    // Generate HTML file
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'My App',
      meta: {
        viewport: 'width=device-width, initial-scale=1',
      },
    }),

    // Extract CSS to separate file
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }),

    // Copy static assets
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: 'assets' }],
    }),
  ],
};
```

**Code Splitting:**

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};

// Dynamic imports for code splitting
// In your JavaScript code:
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Or with webpack magic comments:
const LazyComponent = React.lazy(
  () => import(/* webpackChunkName: "lazy-component" */ './LazyComponent')
);
```

**Development vs Production:**

```javascript
// webpack.config.js
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',

  devtool: isProduction ? 'source-map' : 'eval-source-map',

  devServer: {
    static: './dist',
    hot: true,
    open: true,
    port: 3000,
    historyApiFallback: true,
  },

  optimization: {
    minimize: isProduction,
    splitChunks: isProduction
      ? {
          chunks: 'all',
        }
      : false,
  },

  plugins: [
    ...(isProduction
      ? [new MiniCssExtractPlugin(), new TerserPlugin()]
      : [new webpack.HotModuleReplacementPlugin()]),
  ],
};
```

---

## Question 12: Tree Shaking

**Question:** What is tree shaking?

**Answer:**
Tree shaking is a dead code elimination process performed by bundlers like Webpack. It analyzes your code and its module dependencies to identify and remove code that is not actually used (exported but never imported). This significantly reduces the final bundle size. It works best with ES6 module syntax (import/export) due to its static structure.

**How Tree Shaking Works:**

```javascript
// math.js - Library with multiple exports
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  return a / b;
}

// main.js - Only imports what it uses
import { add, multiply } from './math.js';

console.log(add(2, 3)); // 5
console.log(multiply(4, 5)); // 20

// After tree shaking, only add() and multiply() are included in the bundle
// subtract() and divide() are eliminated
```

**ES6 Modules (Tree Shakeable):**

```javascript
// ✅ Good - ES6 modules (tree shakeable)
// utils.js
export const formatDate = date => {
  /* ... */
};
export const formatCurrency = amount => {
  /* ... */
};
export const validateEmail = email => {
  /* ... */
};

// main.js
import { formatDate } from './utils.js';
// Only formatDate is included in bundle

// ❌ Bad - CommonJS (not tree shakeable)
// utils.js
module.exports = {
  formatDate: date => {
    /* ... */
  },
  formatCurrency: amount => {
    /* ... */
  },
  validateEmail: email => {
    /* ... */
  },
};

// main.js
const { formatDate } = require('./utils.js');
// All functions are included in bundle
```

**Tree Shaking with Libraries:**

```javascript
// ✅ Good - Import specific functions
import { debounce, throttle } from 'lodash-es';

// ❌ Bad - Import entire library
import _ from 'lodash';

// ✅ Good - Import from specific path
import debounce from 'lodash/debounce';

// ❌ Bad - Import from main entry
import { debounce } from 'lodash';
```

**Webpack Tree Shaking Configuration:**

```javascript
// webpack.config.js
module.exports = {
  mode: 'production', // Tree shaking only works in production mode

  optimization: {
    usedExports: true, // Mark used exports
    sideEffects: false, // Assume no side effects

    // Or specify files with side effects
    sideEffects: ['*.css', '*.scss', './src/polyfills.js'],
  },
};
```

**Package.json Side Effects:**

```json
{
  "name": "my-package",
  "sideEffects": false,
  // or
  "sideEffects": ["*.css", "*.scss", "./src/polyfills.js"]
}
```

**Tree Shaking with CSS:**

```javascript
// webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),

    // Remove unused CSS
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      safelist: {
        standard: [/^hljs/, /^cm-/, /^CodeMirror/],
      },
    }),
  ],
};
```

**Tree Shaking Best Practices:**

```javascript
// ✅ Good - Pure functions (tree shakeable)
export const utils = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b,
};

// ❌ Bad - Side effects (not tree shakeable)
export const utils = {
  add: (a, b) => {
    console.log('Adding numbers'); // Side effect
    return a + b;
  },
};

// ✅ Good - Separate exports
export const formatDate = date => {
  /* ... */
};
export const formatCurrency = amount => {
  /* ... */
};

// ❌ Bad - Object export
export const formatters = {
  date: date => {
    /* ... */
  },
  currency: amount => {
    /* ... */
  },
};
```

---

## Question 13: Webpack Dependency Graph

**Question:** What is a dependency graph in Webpack?

**Answer:**
A dependency graph is an internal representation Webpack builds starting from your application's entry point (e.g., index.js). It maps out every import and require statement, creating a graph of how all modules depend on each other. This graph is then used to generate the optimized bundles.

**How Dependency Graph Works:**

```javascript
// Entry point: src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';

ReactDOM.render(<App />, document.getElementById('root'));

// App.js
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

export default function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

// Header.js
import Logo from './Logo';
import Navigation from './Navigation';

export default function Header() {
  return (
    <header>
      <Logo />
      <Navigation />
    </header>
  );
}
```

**Dependency Graph Visualization:**

```
index.js
├── react (node_modules)
├── react-dom (node_modules)
├── App.js
│   ├── Header.js
│   │   ├── Logo.js
│   │   └── Navigation.js
│   ├── Main.js
│   └── Footer.js
└── styles.css
```

**Webpack Bundle Analysis:**

```javascript
// webpack.config.js
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-report.html',
    }),
  ],
};

// Or use webpack-bundle-analyzer CLI
// npx webpack-bundle-analyzer dist/bundle.js
```

**Circular Dependencies:**

```javascript
// ❌ Bad - Circular dependency
// user.js
import { getPost } from './post.js';
export const getUser = id => {
  /* ... */
};

// post.js
import { getUser } from './user.js';
export const getPost = id => {
  /* ... */
};

// ✅ Good - Break circular dependency
// user.js
export const getUser = id => {
  /* ... */
};

// post.js
export const getPost = id => {
  /* ... */
};

// user-post.js - Common module
import { getUser } from './user.js';
import { getPost } from './post.js';

export const getUserWithPosts = async userId => {
  const user = await getUser(userId);
  const posts = await getPost(userId);
  return { user, posts };
};
```

**Dynamic Imports and Code Splitting:**

```javascript
// Static import - included in main bundle
import Header from './Header';

// Dynamic import - creates separate chunk
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Dynamic import with webpack magic comments
const LazyComponent = React.lazy(
  () => import(/* webpackChunkName: "lazy-component" */ './LazyComponent')
);

// Multiple dynamic imports
const loadComponent = componentName => {
  return import(`./components/${componentName}`);
};
```

**Webpack Module Resolution:**

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    // File extensions to resolve
    extensions: ['.js', '.jsx', '.ts', '.tsx'],

    // Directory names to resolve
    modules: ['node_modules', 'src'],

    // Alias for shorter imports
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
};

// Usage with aliases
import Header from '@components/Header';
import { formatDate } from '@utils/date';
```

**Dependency Graph Optimization:**

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    // Split chunks based on dependency graph
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // Vendor chunk for node_modules
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },

        // Common chunk for shared code
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};
```

**Webpack Stats and Analysis:**

```javascript
// webpack.config.js
module.exports = {
  stats: {
    // Show module information
    modules: true,

    // Show chunk information
    chunks: true,

    // Show dependency information
    dependencies: true,

    // Show reasons for including modules
    reasons: true,
  },
};

// Generate stats file
// webpack --config webpack.config.js --json > stats.json
```

---

## Question 14: PNPM Package Manager

**Question:** What is pnpm?

**Answer:**
PNPM (performant npm) is a fast, disk space–efficient package manager for Node.js. It uses a global content-addressable store with symlinks to save disk space and improve installation speed. PNPM creates a hard link from the global store to the project's node_modules, allowing multiple projects to share the same package versions without duplicating files.

**Key Features:**
- **Disk Space Efficiency**: Uses symlinks and hard links to avoid duplicating packages
- **Speed**: Faster than npm and yarn due to efficient storage and parallel downloads
- **Strict**: Prevents phantom dependencies by only allowing access to explicitly declared packages
- **Monorepo Support**: Built-in workspace support for managing multiple packages
- **Compatibility**: Compatible with npm and yarn package.json files

**Basic PNPM Commands:**

```bash
# Install all dependencies
pnpm install

# Add a dependency
pnpm add lodash

# Add a dev dependency
pnpm add -D jest

# Remove a package
pnpm remove lodash

# Run scripts
pnpm run build
pnpm test

# Update dependencies
pnpm update

# Check for outdated packages
pnpm outdated

# Audit for security vulnerabilities
pnpm audit
```

**PNPM vs NPM vs Yarn:**

| Feature | NPM | Yarn | PNPM |
|---------|-----|------|------|
| Speed | Medium | Fast | Fastest |
| Disk Usage | High | Medium | Lowest |
| Phantom Dependencies | Allowed | Allowed | Prevented |
| Monorepo Support | Limited | Good | Excellent |
| Lock File | package-lock.json | yarn.lock | pnpm-lock.yaml |

**PNPM Workspace Configuration:**

```json
// pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - 'tools/*'
```

```json
// package.json
{
  "name": "my-monorepo",
  "private": true,
  "scripts": {
    "build": "pnpm -r run build",
    "test": "pnpm -r run test",
    "lint": "pnpm -r run lint"
  }
}
```

**PNPM Configuration (.npmrc):**

```ini
# .npmrc
shamefully-hoist=true
strict-peer-dependencies=false
auto-install-peers=true
save-exact=true
```

---

## Question 15: PNPM Disk Space Efficiency

**Question:** How does pnpm save disk space compared to npm?

**Answer:**
PNPM saves disk space through its unique storage mechanism using a global content-addressable store with symlinks. Here's how it works:

**Traditional NPM Approach:**
```
project1/node_modules/lodash/ (4.2MB)
project2/node_modules/lodash/ (4.2MB)  # Duplicate!
project3/node_modules/lodash/ (4.2MB)  # Duplicate!
Total: 12.6MB for the same package
```

**PNPM Approach:**
```
~/.pnpm-store/lodash@4.17.21/ (4.2MB)  # Single copy
project1/node_modules/lodash -> ~/.pnpm-store/lodash@4.17.21/
project2/node_modules/lodash -> ~/.pnpm-store/lodash@4.17.21/
project3/node_modules/lodash -> ~/.pnpm-store/lodash@4.17.21/
Total: 4.2MB for the same package
```

**Content-Addressable Storage:**

```bash
# PNPM store structure
~/.pnpm-store/
├── v3/
│   ├── files/
│   │   └── 00/
│   │       └── 1234567890abcdef...  # Content hash
│   └── packages/
│       └── lodash@4.17.21/
│           └── node_modules/
│               └── lodash/
```

**Symlink Structure:**

```bash
# Project node_modules structure
project/
├── node_modules/
│   ├── lodash -> .pnpm/lodash@4.17.21/node_modules/lodash
│   └── .pnpm/
│       └── lodash@4.17.21/
│           └── node_modules/
│               └── lodash -> ~/.pnpm-store/v3/packages/lodash@4.17.21/node_modules/lodash
```

**Benefits:**
- **Space Savings**: Up to 90% reduction in disk usage
- **Faster Installs**: No need to download/copy existing packages
- **Consistency**: Same package version across all projects
- **Integrity**: Content-addressable storage ensures package integrity

**Store Management:**

```bash
# Check store size
pnpm store path
pnpm store status

# Prune unused packages
pnpm store prune

# Remove all packages from store
pnpm store prune --force
```

---

## Question 16: PNPM Lock File

**Question:** Which file does pnpm use to lock dependencies?

**Answer:**
PNPM uses `pnpm-lock.yaml` as its lock file to ensure reproducible builds across different environments. This file contains the exact versions of all dependencies and their integrity hashes.

**pnpm-lock.yaml Structure:**

```yaml
# pnpm-lock.yaml
lockfileVersion: '6.0'
settings:
  autoInstallPeers: true
  excludeLinksFromLockfile: false

dependencies:
  lodash:
    specifier: ^4.17.21
    version: 4.17.21

devDependencies:
  jest:
    specifier: ^29.0.0
    version: 29.0.0

packages:
  /lodash/4.17.21:
    resolution: {integrity: sha512-L2R1m2+8hB1QsSkoAK3OHfW5GzyX/I4r445X0ShJfGXYqiF2bY/9y4Fnmqknel4enO3dKitXiwGn6Wp1R0Hmg==}
    dependencies:
      '@types/lodash': 4.14.191
    dev: false

  /jest/29.0.0:
    resolution: {integrity: sha512-...}
    dependencies:
      '@jest/console': 29.0.0
      '@jest/core': 29.0.0
      '@jest/environment': 29.0.0
    dev: true
```

**Lock File Benefits:**
- **Reproducible Builds**: Exact same dependency tree across environments
- **Security**: Integrity hashes prevent tampering
- **Performance**: Faster installs by skipping resolution
- **Consistency**: Team members get identical dependencies

**Lock File Management:**

```bash
# Generate lock file
pnpm install

# Update lock file
pnpm update

# Install from lock file
pnpm install --frozen-lockfile

# Ignore lock file (not recommended)
pnpm install --no-frozen-lockfile
```

**Lock File vs Package.json:**

| File | Purpose | Content |
|------|---------|---------|
| package.json | Dependency declaration | Version ranges, scripts, metadata |
| pnpm-lock.yaml | Dependency resolution | Exact versions, integrity hashes, dependency tree |

**Best Practices:**
- Always commit `pnpm-lock.yaml` to version control
- Use `--frozen-lockfile` in CI/CD pipelines
- Don't manually edit the lock file
- Update lock file when adding/removing dependencies

---

## Question 17: PNPM Installation Commands

**Question:** Which command installs all dependencies listed in package.json?

**Answer:**
The command `pnpm install` (or `pnpm i`) installs all dependencies listed in package.json. This command reads the package.json file and installs all dependencies and devDependencies into the node_modules directory.

**Basic Installation Commands:**

```bash
# Install all dependencies
pnpm install
pnpm i

# Install and update lock file
pnpm install --no-frozen-lockfile

# Install from lock file only (CI/CD)
pnpm install --frozen-lockfile

# Install without optional dependencies
pnpm install --ignore-optional

# Install with specific registry
pnpm install --registry https://registry.npmjs.org/
```

**Adding Dependencies:**

```bash
# Add production dependency
pnpm add lodash
pnpm add lodash@4.17.21  # Specific version
pnpm add lodash@^4.17.0  # Version range

# Add dev dependency
pnpm add -D jest
pnpm add --save-dev typescript

# Add global package
pnpm add -g pnpm

# Add to specific workspace
pnpm add lodash --filter my-package
```

**Removing Dependencies:**

```bash
# Remove package
pnpm remove lodash
pnpm remove -D jest

# Remove from specific workspace
pnpm remove lodash --filter my-package
```

**Installation Options:**

```bash
# Install with specific node version
pnpm install --engine-strict

# Install with specific package manager
pnpm install --package-manager-strict

# Install with specific hoisting
pnpm install --shamefully-hoist

# Install with specific peer dependency handling
pnpm install --strict-peer-dependencies
```

**Workspace Installation:**

```bash
# Install all workspace dependencies
pnpm install -r

# Install dependencies for specific workspace
pnpm install --filter my-package

# Install dependencies for multiple workspaces
pnpm install --filter "my-package" --filter "another-package"
```

**Installation Process:**
1. Read package.json and pnpm-lock.yaml
2. Resolve dependency tree
3. Download packages to global store
4. Create symlinks in node_modules
5. Run postinstall scripts
6. Update lock file (if not frozen)

---

## Question 18: PNPM Adding Dependencies

**Question:** How do you add lodash as a dependency?

**Answer:**
To add lodash as a dependency, use the command `pnpm add lodash`. This command adds lodash to the dependencies section of package.json and installs it.

**Adding Dependencies:**

```bash
# Add as production dependency
pnpm add lodash

# Add specific version
pnpm add lodash@4.17.21

# Add version range
pnpm add lodash@^4.17.0
pnpm add lodash@~4.17.0

# Add latest version
pnpm add lodash@latest
```

**Adding Different Types of Dependencies:**

```bash
# Production dependency
pnpm add lodash
pnpm add --save lodash

# Development dependency
pnpm add -D lodash
pnpm add --save-dev lodash

# Optional dependency
pnpm add -O lodash
pnpm add --save-optional lodash

# Peer dependency
pnpm add -P react
pnpm add --save-peer react
```

**Adding Multiple Packages:**

```bash
# Add multiple packages at once
pnpm add lodash moment axios

# Add with specific versions
pnpm add lodash@4.17.21 moment@2.29.4 axios@1.4.0
```

**Adding from Different Sources:**

```bash
# Add from npm registry
pnpm add lodash

# Add from GitHub
pnpm add github:user/repo

# Add from local path
pnpm add ./local-package

# Add from tarball
pnpm add https://example.com/package.tgz
```

**Workspace Dependencies:**

```bash
# Add to specific workspace
pnpm add lodash --filter my-package

# Add workspace dependency
pnpm add my-workspace-package --filter my-package

# Add to all workspaces
pnpm add -r lodash
```

**Package.json Changes:**

```json
// Before
{
  "dependencies": {}
}

// After pnpm add lodash
{
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

**Installation Process:**
1. Resolve package version
2. Download to global store
3. Create symlink in node_modules
4. Update package.json
5. Update pnpm-lock.yaml

---

## Question 19: PNPM Dev Dependencies

**Question:** How do you add jest as a devDependency?

**Answer:**
To add jest as a devDependency, use the command `pnpm add -D jest`. The `-D` flag (or `--save-dev`) adds the package to the devDependencies section of package.json.

**Adding Dev Dependencies:**

```bash
# Add as dev dependency
pnpm add -D jest
pnpm add --save-dev jest

# Add specific version
pnpm add -D jest@29.0.0

# Add multiple dev dependencies
pnpm add -D jest typescript @types/node
```

**Dev Dependencies vs Dependencies:**

```json
// package.json
{
  "dependencies": {
    "lodash": "^4.17.21"  // Required in production
  },
  "devDependencies": {
    "jest": "^29.0.0",     // Only needed during development
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  }
}
```

**Common Dev Dependencies:**

```bash
# Testing
pnpm add -D jest
pnpm add -D @testing-library/react
pnpm add -D @testing-library/jest-dom

# TypeScript
pnpm add -D typescript
pnpm add -D @types/node
pnpm add -D @types/react

# Linting and Formatting
pnpm add -D eslint
pnpm add -D prettier
pnpm add -D @typescript-eslint/parser

# Build Tools
pnpm add -D webpack
pnpm add -D vite
pnpm add -D rollup

# Development Server
pnpm add -D nodemon
pnpm add -D concurrently
```

**Installation Behavior:**

```bash
# Install all dependencies (including dev)
pnpm install

# Install only production dependencies
pnpm install --prod
pnpm install --production

# Install with specific environment
NODE_ENV=production pnpm install
```

**Workspace Dev Dependencies:**

```bash
# Add to specific workspace
pnpm add -D jest --filter my-package

# Add to all workspaces
pnpm add -r -D jest
```

**Best Practices:**
- Use devDependencies for tools only needed during development
- Keep production dependencies minimal
- Use exact versions for dev dependencies when possible
- Regularly update dev dependencies for security

---

## Question 20: PNPM Removing Packages

**Question:** Which command removes a package?

**Answer:**
The command `pnpm remove <pkg>` removes a package from the project. This command removes the package from package.json and deletes it from node_modules.

**Removing Packages:**

```bash
# Remove package
pnpm remove lodash
pnpm remove jest

# Remove multiple packages
pnpm remove lodash moment axios

# Remove dev dependency
pnpm remove -D jest
pnpm remove --save-dev typescript
```

**Remove vs Uninstall vs Delete:**

```bash
# All these commands do the same thing
pnpm remove lodash
pnpm uninstall lodash
pnpm delete lodash
```

**Removing Different Types:**

```bash
# Remove production dependency
pnpm remove lodash

# Remove dev dependency
pnpm remove -D jest

# Remove optional dependency
pnpm remove -O some-optional-package

# Remove peer dependency
pnpm remove -P react
```

**Workspace Removal:**

```bash
# Remove from specific workspace
pnpm remove lodash --filter my-package

# Remove from all workspaces
pnpm remove -r lodash
```

**Package.json Changes:**

```json
// Before
{
  "dependencies": {
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}

// After pnpm remove lodash
{
  "dependencies": {},
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```

**Removal Process:**
1. Remove package from package.json
2. Remove symlink from node_modules
3. Update pnpm-lock.yaml
4. Clean up unused packages (if any)

**Cleanup Commands:**

```bash
# Remove unused packages
pnpm prune

# Remove all node_modules and reinstall
rm -rf node_modules
pnpm install

# Clean global store
pnpm store prune
```

---

## Question 21: PNPM Running Scripts

**Question:** How do you run a script called build from package.json?

**Answer:**
To run a script called build from package.json, use the command `pnpm run build`. The `run` command executes scripts defined in the package.json file.

**Running Scripts:**

```bash
# Run script
pnpm run build
pnpm run test
pnpm run start

# Short form (for common scripts)
pnpm build
pnpm test
pnpm start
```

**Package.json Scripts:**

```json
{
  "scripts": {
    "build": "webpack --mode production",
    "test": "jest",
    "start": "node server.js",
    "dev": "webpack serve --mode development",
    "lint": "eslint src/",
    "format": "prettier --write src/"
  }
}
```

**Running Different Scripts:**

```bash
# Build script
pnpm run build

# Test script
pnpm run test

# Start script
pnpm run start

# Custom script
pnpm run my-custom-script
```

**Script Options:**

```bash
# Run with arguments
pnpm run build -- --watch
pnpm run test -- --coverage

# Run in specific workspace
pnpm run build --filter my-package

# Run in all workspaces
pnpm run build -r

# Run with environment variables
NODE_ENV=production pnpm run build
```

**Common Scripts:**

```bash
# Development
pnpm run dev
pnpm run develop
pnpm run serve

# Building
pnpm run build
pnpm run compile
pnpm run bundle

# Testing
pnpm run test
pnpm run test:unit
pnpm run test:e2e

# Linting
pnpm run lint
pnpm run lint:fix
pnpm run format

# Deployment
pnpm run deploy
pnpm run publish
pnpm run release
```

**Workspace Scripts:**

```bash
# Run script in specific workspace
pnpm run build --filter my-package

# Run script in all workspaces
pnpm run build -r

# Run script in parallel
pnpm run build -r --parallel

# Run script with dependencies
pnpm run build -r --recursive
```

**Script Execution:**
1. Look for script in package.json
2. Execute command in project directory
3. Pass through any additional arguments
4. Return exit code

---

## Question 22: PNPM Install vs Update

**Question:** What is the difference between pnpm install and pnpm update?

**Answer:**
The difference between `pnpm install` and `pnpm update` is:

- **`pnpm install`**: Installs dependencies according to package.json and pnpm-lock.yaml, without changing versions
- **`pnpm update`**: Updates dependencies to their latest versions within the specified ranges in package.json

**pnpm install:**
```bash
# Install exact versions from lock file
pnpm install

# Install and update lock file
pnpm install --no-frozen-lockfile
```

**pnpm update:**
```bash
# Update all dependencies
pnpm update

# Update specific package
pnpm update lodash

# Update to latest versions
pnpm update --latest

# Update in specific workspace
pnpm update --filter my-package
```

**Version Ranges:**

```json
// package.json
{
  "dependencies": {
    "lodash": "^4.17.21"  // Can update to 4.x.x
  }
}
```

**Install Behavior:**
- Reads package.json and pnpm-lock.yaml
- Installs exact versions from lock file
- Does not change package versions
- Faster execution

**Update Behavior:**
- Reads package.json version ranges
- Updates to latest compatible versions
- Updates pnpm-lock.yaml
- May change package versions

**Update Options:**

```bash
# Update all dependencies
pnpm update

# Update specific package
pnpm update lodash

# Update to latest (ignore ranges)
pnpm update --latest

# Update dev dependencies
pnpm update --dev

# Update with specific depth
pnpm update --depth 1
```

**Best Practices:**
- Use `pnpm install` for consistent builds
- Use `pnpm update` to get latest features/fixes
- Test after updating dependencies
- Use `--frozen-lockfile` in CI/CD

---

## Question 23: PNPM Workspace Support

**Question:** Does pnpm support workspaces (monorepos)?

**Answer:**
Yes, pnpm has built-in workspace support for managing monorepos. It provides excellent monorepo functionality with efficient dependency management and workspace-specific operations.

**Workspace Configuration:**

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - 'tools/*'
  - '!**/test/**'
```

**Workspace Structure:**

```
my-monorepo/
├── pnpm-workspace.yaml
├── package.json
├── packages/
│   ├── shared/
│   │   └── package.json
│   └── ui/
│       └── package.json
├── apps/
│   ├── web/
│   │   └── package.json
│   └── mobile/
│       └── package.json
└── tools/
    └── build/
        └── package.json
```

**Workspace Commands:**

```bash
# Install all workspace dependencies
pnpm install -r

# Add dependency to specific workspace
pnpm add lodash --filter my-package

# Run script in specific workspace
pnpm run build --filter my-package

# Run script in all workspaces
pnpm run build -r

# Run in parallel
pnpm run build -r --parallel
```

**Workspace Dependencies:**

```json
// apps/web/package.json
{
  "name": "@myorg/web",
  "dependencies": {
    "@myorg/shared": "workspace:*",
    "@myorg/ui": "workspace:^1.0.0"
  }
}
```

**Workspace Benefits:**
- **Efficient Storage**: Shared dependencies across workspaces
- **Dependency Management**: Easy cross-workspace dependencies
- **Script Execution**: Run commands across workspaces
- **Version Management**: Consistent versions across workspaces

**Advanced Workspace Features:**

```bash
# Filter by name pattern
pnpm run build --filter "@myorg/*"

# Filter by directory
pnpm run build --filter "./packages/*"

# Filter by changed packages
pnpm run build --filter "...[HEAD~1]"

# Filter by dependencies
pnpm run build --filter "...@myorg/shared"
```

**Workspace vs Other Tools:**

| Feature | PNPM | NPM | Yarn |
|---------|------|-----|------|
| Workspace Support | Built-in | Limited | Good |
| Dependency Hoisting | Configurable | Automatic | Automatic |
| Cross-workspace deps | Easy | Complex | Easy |
| Performance | Fast | Slow | Medium |
