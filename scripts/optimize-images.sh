#!/usr/bin/env bash
# Convert PNG/JPG screenshots in public/projects and public/gallery to resized
# WebP, replacing the originals. Re-run after adding new screenshots, then
# update the paths (and width/height) in src/data/site.ts.
# Requires ImageMagick (`brew install imagemagick`).
set -euo pipefail
cd "$(dirname "$0")/../public"

seen=$(mktemp)
trap 'rm -f "$seen"' EXIT

convert_dir() {
  local dir=$1 max_width=$2
  find "$dir" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) | while IFS= read -r src; do
    local out="${src%.*}.webp"
    # e.g. foo.png and foo.jpg would both become foo.webp; stop before one
    # overwrites the other (its original is still on disk).
    if grep -qxF "$out" "$seen"; then
      echo "error: $src would overwrite $out, written from another file in this run" >&2
      exit 1
    fi
    echo "$out" >> "$seen"
    magick "$src" -resize "${max_width}x>" -quality 80 -define webp:method=6 "$out"
    rm "$src"
    printf '%s -> %s (%s)\n' "$src" "$out" "$(magick identify -format '%wx%h' "$out")"
  done
}

convert_dir projects 1280
convert_dir gallery 1920
