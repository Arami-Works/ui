#!/usr/bin/env bash

# @aramiworks/ui — Kill dev processes and free ports
# Runs automatically after mprocs exits.

PORTS=(8082 8083 6006)

for port in "${PORTS[@]}"; do
  pid=$(lsof -iTCP:"$port" -sTCP:LISTEN -P -t 2>/dev/null)
  if [[ -n "$pid" ]]; then
    while IFS= read -r p; do
      printf "\033[0;36m[cleanup]\033[0m Killing port %s (pid %s)\n" "$port" "$p"
      kill "$p" 2>/dev/null || true
    done <<< "$pid"
  fi
done

sleep 1

for port in "${PORTS[@]}"; do
  pid=$(lsof -iTCP:"$port" -sTCP:LISTEN -P -t 2>/dev/null)
  if [[ -n "$pid" ]]; then
    while IFS= read -r p; do
      kill -9 "$p" 2>/dev/null || true
    done <<< "$pid"
  fi
done

printf "\033[0;36m[cleanup]\033[0m All dev ports cleared\n"
