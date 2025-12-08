# Documentation Index

Welcome to the Elzatona Web documentation! This directory contains all project documentation organized by area.

## 📚 Quick Links

### Getting Started
- **[Main README](../README.md)** - Project overview and quick start
- **[Local Development](flows/local-development.md)** - Complete development guide
- **[Environment Setup](flows/environment-setup.md)** - Environment configuration

### Development Flows
- **[Local Development](flows/local-development.md)** - Development workflow and commands
- **[Environment Setup](flows/environment-setup.md)** - How to configure environments
- **[CI/CD Pipeline](flows/ci-cd-pipeline.md)** - Continuous integration and deployment
- **[Deployment](flows/deployment.md)** - Deployment process and procedures

### Project Structure
- **[Project Structure](structure.md)** - Complete project structure and organization
- **[Website Application](website/README.md)** - Website-specific documentation
- **[Admin Application](admin/README.md)** - Admin panel documentation
- **[Shared Libraries](libs/README.md)** - Libraries documentation

### Security & Quality
- **[Security Guide](SECURITY.md)** - Security best practices and pipeline
- **[Complete Security Pipeline](COMPLETE_SECURITY_PIPELINE.md)** - Detailed security setup
- **[Secret Rotation Guide](SECRET_ROTATION_GUIDE.md)** - How to rotate secrets
- **[Secret Scanning Automation](SECRET_SCANNING_AUTOMATION.md)** - Automated secret detection

### Testing
- **[Testing Summary](TESTING_SUMMARY.md)** - Testing strategy overview
- **[Comprehensive Test Report](COMPREHENSIVE_TEST_REPORT.md)** - Detailed test results
- **[Test Summary](TEST_SUMMARY.md)** - Test coverage summary

### Database
- **[Database Schema](database/questions-schema.md)** - Database structure

### Development Tools
- **[How to Get Supabase Keys](HOW_TO_GET_SUPABASE_SERVICE_ROLE_KEY.md)** - Supabase setup
- **[Setup Test Database](SETUP_TEST_DATABASE.md)** - Test database configuration
- **[Git History Remediation](GIT_HISTORY_REMEDIATION.md)** - Clean up git history
- **[Security Fix Tools](SECURITY_FIX_TOOLS_GUIDE.md)** - Security tooling

### Refactoring
- **[Refactoring Analysis](REFACTORING_ANALYSIS.md)** - Code analysis and priorities
- **[Refactoring Progress](REFACTORING_PROGRESS.md)** - Refactoring status and strategy

## 📁 Directory Structure

```
docs/
├── flows/                  # Development flows
│   ├── local-development.md
│   ├── environment-setup.md
│   ├── ci-cd-pipeline.md
│   └── deployment.md
├── website/                # Website application docs
│   └── README.md
├── admin/                  # Admin application docs
│   └── README.md
├── libs/                   # Libraries documentation
│   └── README.md
├── database/              # Database documentation
│   └── questions-schema.md
└── [other docs]            # General documentation
```

## 🎯 Documentation by Role

### For New Developers
1. Start with [Main README](../README.md)
2. Read [Local Development](flows/local-development.md)
3. Set up [Environment](flows/environment-setup.md)
4. Review [Project Structure](structure.md)

### For DevOps/CI
1. [CI/CD Pipeline](flows/ci-cd-pipeline.md)
2. [Deployment](flows/deployment.md)
3. [Security Pipeline](COMPLETE_SECURITY_PIPELINE.md)

### For Security
1. [Security Guide](SECURITY.md)
2. [Secret Rotation](SECRET_ROTATION_GUIDE.md)
3. [Secret Scanning](SECRET_SCANNING_AUTOMATION.md)

### For Testing
1. [Testing Summary](TESTING_SUMMARY.md)
2. [Comprehensive Test Report](COMPREHENSIVE_TEST_REPORT.md)

## 📝 Contributing to Documentation

When adding new documentation:

1. **Place in appropriate directory:**
   - `flows/` - Development workflows
   - `website/` - Website-specific
   - `admin/` - Admin-specific
   - `libs/` - Library-specific
   - Root `docs/` - General documentation

2. **Update this index** if adding major documentation

3. **Link from relevant README** files

4. **Follow existing format** and structure

