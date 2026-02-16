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

echo "Done — e-SUS database restored."
