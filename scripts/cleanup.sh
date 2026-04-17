#!/usr/bin/env bash
# hermes101 cleanup helper
# default: report review candidates
# apply:   remove local junk only (not tracked content files)

set -euo pipefail
cd "$(dirname "$0")/.."

APPLY=0
if [[ "${1:-}" == "--apply" ]]; then
  APPLY=1
fi

review_candidates=(
  "="
  "public/images/days/day2/openclaw-status.jpg"
  "public/images/video-course-qr-code.jpg"
  "public/images/video-course-qr-new.jpg"
  "public/images/video-course-qr.jpg"
  "public/video-course-qr-code.jpg"
  "public/wechat-personal-qr.jpg"
  "public/wechat-qr.jpg"
  "public/og-image.svg"
)

safe_junk=(
  ".DS_Store"
)

report_candidate() {
  local target="$1"
  [[ -e "$target" ]] || return 0
  echo "[review] candidate: $target"
}

remove_safe_junk() {
  local target="$1"
  [[ -e "$target" ]] || return 0
  rm -rf "$target"
  echo "[apply] removed junk: $target"
}

echo "=== hermes101 cleanup helper ==="
echo "Mode: $([[ "$APPLY" -eq 1 ]] && echo apply || echo report-only)"
echo

echo "Review-first candidates (tracked or content-affecting files):"
for target in "${review_candidates[@]}"; do
  report_candidate "$target"
done

echo
if [[ "$APPLY" -eq 1 ]]; then
  echo "Removing safe local junk only:"
  for target in "${safe_junk[@]}"; do
    remove_safe_junk "$target"
  done

  while IFS= read -r d; do
    rm -rf "$d"
    echo "[apply] removed junk dir: $d"
  done < <(find . -type d -name __pycache__ -prune -print)
else
  echo "Safe junk cleanup is disabled in report-only mode."
  echo "Pass --apply to remove .DS_Store and __pycache__ only."
fi
