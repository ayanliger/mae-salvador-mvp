#!/usr/bin/env python3
"""
Import dados_primarios_cidadao_pec.xlsx into the cidadao_dados_pec table
on the mae_salvador application database.

Usage:
    python import_dados_pec.py [--db-url DATABASE_URL]

Defaults to: postgresql://postgres:postgres@localhost:5432/mae_salvador
"""

import argparse
import os
import unicodedata

import pandas as pd
import psycopg2
from psycopg2.extras import execute_values

XLSX_PATH = os.path.join(os.path.dirname(__file__), "dados_primarios_cidadao_pec.xlsx")

DEFAULT_DB_URL = "postgresql://postgres:postgres@localhost:5432/mae_salvador"


def normalise_name(name: str) -> str:
    """Upper-case, strip accents and collapse whitespace."""
    s = unicodedata.normalize("NFD", name)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return " ".join(s.upper().split())


def cpf_to_str(val) -> str | None:
    """Convert a float/int CPF to an 11-digit zero-padded string."""
    if pd.isna(val):
        return None
    digits = str(int(val)).zfill(11)
    if len(digits) != 11 or digits == "0" * 11:
        return None
    return digits


def main():
    parser = argparse.ArgumentParser(description="Import PEC citizen data")
    parser.add_argument(
        "--db-url",
        default=os.environ.get("APP_DATABASE_URL", DEFAULT_DB_URL),
        help="PostgreSQL connection string for mae_salvador DB",
    )
    args = parser.parse_args()

    print(f"Reading {XLSX_PATH} ...")
    df = pd.read_excel(XLSX_PATH)
    print(f"  {len(df)} rows loaded")

    # Normalise
    df["NO_USUARIO_NORM"] = df["NO_USUARIO"].apply(normalise_name)
    df["CPF_STR"] = df["CPF"].apply(cpf_to_str)
    df["DT_NASC"] = pd.to_datetime(df["DT_NASCIMENTO"]).dt.date

    # De-duplicate: keep first occurrence per (normalised name + birth date)
    before = len(df)
    df = df.drop_duplicates(subset=["NO_USUARIO_NORM", "DT_NASC"], keep="first")
    print(f"  {before - len(df)} duplicates removed, {len(df)} unique rows")

    conn = psycopg2.connect(args.db_url)
    cur = conn.cursor()

    # Ensure table exists (run migration if not already applied)
    migration_path = os.path.join(os.path.dirname(__file__), "migrations", "005_cidadao_dados_pec.sql")
    if os.path.exists(migration_path):
        with open(migration_path, encoding="utf-8") as f:
            cur.execute(f.read())
        conn.commit()

    # Prepare rows
    rows = []
    for _, r in df.iterrows():
        rows.append((
            r["NO_USUARIO"],
            r["NO_USUARIO_NORM"],
            r["NO_MAE"] if pd.notna(r["NO_MAE"]) else None,
            r["DT_NASC"],
            r["CPF_STR"],
        ))

    print(f"Inserting {len(rows)} rows into cidadao_dados_pec ...")
    execute_values(
        cur,
        """INSERT INTO cidadao_dados_pec
               (no_usuario, no_usuario_normalizado, no_mae, dt_nascimento, nu_cpf)
           VALUES %s
           ON CONFLICT (no_usuario_normalizado, dt_nascimento)
              WHERE dt_nascimento IS NOT NULL
           DO UPDATE SET
               no_mae     = COALESCE(EXCLUDED.no_mae, cidadao_dados_pec.no_mae),
               nu_cpf     = COALESCE(EXCLUDED.nu_cpf, cidadao_dados_pec.nu_cpf),
               no_usuario = COALESCE(EXCLUDED.no_usuario, cidadao_dados_pec.no_usuario)
        """,
        rows,
        page_size=2000,
    )
    conn.commit()

    cur.execute("SELECT COUNT(*) FROM cidadao_dados_pec")
    total = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM cidadao_dados_pec WHERE nu_cpf IS NOT NULL")
    with_cpf = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM cidadao_dados_pec WHERE no_mae IS NOT NULL")
    with_mae = cur.fetchone()[0]

    print(f"Done — {total} records in cidadao_dados_pec")
    print(f"  with CPF: {with_cpf}")
    print(f"  with nome_mae: {with_mae}")

    cur.close()
    conn.close()


if __name__ == "__main__":
    main()
