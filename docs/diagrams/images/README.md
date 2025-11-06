# Diagram Images

This directory contains PNG images generated from Mermaid diagrams in the project documentation.

## Generated Images

### Architecture Overview Diagrams

1. **architecture-overview--complete-system-architecture-0.png**
   - Complete system architecture showing Nx monorepo structure, apps, and shared libraries

2. **architecture-overview--core-features-flow-1.png**
   - User flow diagram showing authentication, learning modes, and practice flows

3. **architecture-overview--data-model-relationships-2.png**
   - Entity-relationship diagram showing database schema relationships

4. **architecture-overview--request-flow-3.png**
   - Sequence diagram showing request flow from user to Supabase

5. **architecture-overview--technology-stack-4.png**
   - Mindmap of the technology stack

### Project Architecture Diagrams

1. **project-architecture--system-architecture-overview-0.png**
   - Detailed system architecture with all components and connections

2. **project-architecture--library-dependencies-graph-1.png**
   - Dependency graph showing how shared libraries depend on each other

3. **project-architecture--website-application-structure-2.png**
   - Website app structure showing pages, features, and API routes

4. **project-architecture--admin-application-structure-3.png**
   - Admin app structure showing admin pages and components

5. **project-architecture--data-flow-diagram-4.png**
   - Sequence diagram showing data flow through the system

6. **project-architecture--feature-modules-5.png**
   - Mindmap of all feature modules in the system

7. **project-architecture--database-schema-overview-6.png**
   - Complete database schema with all tables and relationships

8. **project-architecture--technology-stack-7.png**
   - Technology stack breakdown by category

9. **project-architecture--component-hierarchy-8.png**
   - Component hierarchy showing React component structure

## Regenerating Images

To regenerate these images, run:

```bash
node scripts/generate-diagram-images.js
```

This script will:

1. Extract all Mermaid diagrams from markdown files in `docs/diagrams/`
2. Convert each diagram to a PNG image
3. Save images to this directory

## Requirements

- Node.js
- `@mermaid-js/mermaid-cli` (installed as dev dependency)
- `puppeteer` (installed as dev dependency)

## Image Specifications

- **Format**: PNG
- **Width**: 2400px
- **Height**: 1800px
- **Background**: Transparent
