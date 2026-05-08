#!/usr/bin/env bash

# Noir Portfolio launcher
# This script starts the local Next.js development server safely.

# Do not exit on command errors globally; we handle errors with messages.
set -u

# ------------------------------------------------------------
# 1) Detect the absolute directory where THIS script lives.
#    This makes the script portable even if the project folder
#    is moved to a different location later.
# ------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="${SCRIPT_DIR}"

echo "--------------------------------------------"
echo " Noir Portfolio Dev Launcher"
echo " Project: ${PROJECT_DIR}"
echo "--------------------------------------------"

# ------------------------------------------------------------
# 2) Move into the project directory.
# ------------------------------------------------------------
cd "${PROJECT_DIR}" || {
  echo "Error: Could not cd into project directory."
  echo "Press Enter to close..."
  read -r
  exit 1
}

# ------------------------------------------------------------
# 3) Validate required tooling: node and npm.
# ------------------------------------------------------------
if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is not installed or not in PATH."
  echo "Install Node.js, then run this launcher again."
  echo "Press Enter to close..."
  read -r
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is not installed or not in PATH."
  echo "Install npm/Node.js, then run this launcher again."
  echo "Press Enter to close..."
  read -r
  exit 1
fi

# ------------------------------------------------------------
# 4) Install dependencies once if node_modules is missing.
# ------------------------------------------------------------
if [ ! -d "node_modules" ]; then
  echo "node_modules not found. Running: npm install"
  npm install
  INSTALL_EXIT_CODE=$?
  if [ "${INSTALL_EXIT_CODE}" -ne 0 ]; then
    echo "Error: npm install failed with exit code ${INSTALL_EXIT_CODE}."
    echo "Press Enter to close..."
    read -r
    exit "${INSTALL_EXIT_CODE}"
  fi
fi

# ------------------------------------------------------------
# 5) Start the Next.js development server.
#    This usually keeps the terminal open while running.
# ------------------------------------------------------------
echo "Starting development server..."
npm run dev
DEV_EXIT_CODE=$?

# ------------------------------------------------------------
# 6) If the server stops, keep terminal open so you can read logs.
# ------------------------------------------------------------
echo
echo "Development server exited with code ${DEV_EXIT_CODE}."
echo "Press Enter to close this Terminal window..."
read -r
exit "${DEV_EXIT_CODE}"
