# Shared Data Library

This directory contains shared data files used by both `apps/admin` and `apps/website`.

## Structure

- `json/` - Question data files organized by category (CSS, HTML, JavaScript, React, etc.)
- `sections/` - Section configuration files
- `ideas/` - Documentation and feature ideas

## Usage

These files are shared between the admin and website applications to avoid duplication.

## Migration

Previously, this data was duplicated in:
- `apps/admin/network/data/`
- `apps/website/network/data/`

All shared data has been consolidated here. App-specific data (like `final-questions-v01/` in website) remains in the respective app directories.

