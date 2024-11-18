#!/bin/sh

# Sync schemes files.
echo "Running sync scheme files.."
npm run prisma:migrate-dev

# Start application.
echo "Starting application.."
npm run dev
