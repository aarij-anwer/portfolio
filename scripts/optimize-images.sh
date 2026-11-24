#!/usr/bin/env bash
# Convert PNG/JPG screenshots in public/projects and public/gallery to resized
# WebP, replacing the originals. Re-run after adding new screenshots, then
# update the paths (and width/height) in src/data/site.ts.
# Requires ImageMagick (`brew install imagemagick`).
set -euo pipefail
cd "$(dirname "$0")/../public"

convert_dir() {
  local dir=$1 max_width=$2
  find "$dir" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) | while read -r src; do
    local out="${src%.*}.webp"
    magick "$src" -resize "${max_width}x>" -quality 80 -define webp:method=6 "$out"
    rm "$src"
    printf '%s -> %s (%s)\n' "$src" "$out" "$(magick identify -format '%wx%h' "$out")"
  done
}

convert_dir projects 1280
convert_dir gallery 1920
