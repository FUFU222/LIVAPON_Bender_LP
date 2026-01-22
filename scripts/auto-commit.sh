#!/usr/bin/env bash
set -euo pipefail

if ! command -v git >/dev/null 2>&1; then
  echo "git not found"
  exit 1
fi

if [[ -z "${1:-}" ]]; then
  echo "usage: npm run commit:auto -- \"<commit message>\""
  exit 1
fi

if [[ -z "$(git status --porcelain)" ]]; then
  echo "no changes to commit"
  exit 0
fi

git add -A
git commit -m "$1"
