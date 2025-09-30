# Scripts Directory

This directory contains utility scripts for project maintenance, development, and deployment.

## 🧹 Cleanup Scripts

### `cleanup-project.js`
Comprehensive project cleanup script that:
- Removes temporary files (*.tmp, *.backup, *.log, etc.)
- Cleans build artifacts (.next, build, dist, coverage)
- Removes cache directories
- Cleans OS-generated files (.DS_Store, Thumbs.db)
- Checks for large files
- Identifies unused dependencies
- Removes empty directories

**Usage:**
```bash
npm run cleanup:project
# or
node scripts/cleanup-project.js
```

### `cleanup-build.sh`
Build-specific cleanup script for CI/CD pipelines.

**Usage:**
```bash
npm run cleanup
npm run cleanup:deep
```

## 🏥 Health Check Scripts

### `project-health-check.js`
Comprehensive project health assessment that checks:
- Project structure and required directories
- Configuration files and duplicates
- Package.json health and security
- Large files and test setup
- Documentation completeness
- Environment configuration
- Git hooks setup

**Usage:**
```bash
npm run health-check
# or
node scripts/project-health-check.js
```

## 🔧 Maintenance Scripts

### `maintenance`
Combined script that runs both cleanup and health check.

**Usage:**
```bash
npm run maintenance
```

## 📊 Analysis Scripts

### `analyze-question-sources.js`
Analyzes the QuestionsBank directory to identify question sources and formats.

### `export-questions-for-deployment.js`
Exports questions in a structured format for deployment to new environments.

## 🚀 Development Scripts

### `build-check.sh`
Validates the build process and ensures everything compiles correctly.

### `run-*.sh`
Various test and development runner scripts.

## 📝 Question Management Scripts

### `create-*.js`
Scripts for creating and managing questions in the database.

### `clear-*.js`
Scripts for clearing and resetting question data.

### `update-*.js`
Scripts for updating learning paths and question counts.

## 🧪 Test Scripts

### `run-*.js`
Test runner scripts for different test suites.

## 📋 Best Practices

1. **Always run cleanup before major commits**
2. **Use health-check before deployments**
3. **Run maintenance weekly for ongoing project health**
4. **Test scripts in a development environment first**
5. **Backup important data before running destructive scripts**

## 🔍 Script Categories

- **Cleanup**: Remove temporary files and build artifacts
- **Health Check**: Assess project health and identify issues
- **Analysis**: Analyze project data and generate reports
- **Development**: Support development workflow
- **Question Management**: Manage question data and content
- **Testing**: Run various test suites and validations

## ⚠️ Important Notes

- Some scripts modify the database - use with caution
- Always review script output before proceeding
- Test scripts in development environment first
- Keep backups of important data
- Scripts are designed for this specific project structure
