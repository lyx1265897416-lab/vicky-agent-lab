#!/bin/zsh
cd "$(dirname "$0")/.." || exit 1
NODE_BIN="$(command -v node)"
if [[ -z "$NODE_BIN" && -x "$HOME/.local/bin/node" ]]; then NODE_BIN="$HOME/.local/bin/node"; fi
if [[ -z "$NODE_BIN" ]]; then echo "需要 Node.js 22 或更高版本。"; read -k 1; exit 1; fi
exec "$NODE_BIN" server/main.mjs
