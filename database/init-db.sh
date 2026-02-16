#!/bin/bash
set -e

echo "Restoring e-SUS dump into database 'esus'..."
pg_restore \
  --verbose \
  --no-owner \
  --no-privileges \
  --dbname=esus \
  /dump/dump-esus-202602160936 || true

echo "Creating read-only role if not exists..."
psql -U postgres -d esus -c "
  DO \$\$
  BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'esus_leitura') THEN
      CREATE ROLE esus_leitura LOGIN PASSWORD 'leitura123';
    END IF;
  END
  \$\$;
  GRANT USAGE ON SCHEMA public TO esus_leitura;
  GRANT SELECT ON ALL TABLES IN SCHEMA public TO esus_leitura;
  ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO esus_leitura;
"

echo "Creating Mãe Salvador application database..."
psql -U postgres -c "SELECT 'exists' FROM pg_database WHERE datname = 'mae_salvador';" | grep -q exists || \
  psql -U postgres -c "CREATE DATABASE mae_salvador ENCODING 'UTF8' LOCALE 'pt_BR.UTF-8' TEMPLATE template0;"

echo "Running migrations on esus database..."
for f in /dump/migrations/001_*.sql; do
  if [ -f "$f" ]; then
    echo "  Applying $(basename $f) on esus..."
    psql -U postgres -d esus -f "$f"
  fi
done

echo "Running migrations on mae_salvador database..."
for f in /dump/migrations/002_*.sql /dump/migrations/003_*.sql; do
  if [ -f "$f" ]; then
    echo "  Applying $(basename $f) on mae_salvador..."
    psql -U postgres -d mae_salvador -f "$f"
  fi
done

echo "Done — databases ready."
