#!/bin/sh
set -e

echo "🔄 Running database migrations..."
npm run prisma:migrate-dev

echo "🚀 Starting application..."
npm run dev
