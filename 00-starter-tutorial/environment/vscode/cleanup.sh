#!/bin/sh

# First file: Toggle "enabled" between true and false
OFOSFILE="./.vscode/ofos.json"
if [ -f "$OFOSFILE" ]; then
    if grep -q '"enabled": true' "$OFOSFILE"; then
        sed -i.bak 's/"enabled": true/"enabled": false/' "$OFOSFILE"
    else
        sed -i.bak 's/"enabled": false/"enabled": true/' "$OFOSFILE"
    fi
    rm -f "${OFOSFILE}.bak"  # Remove backup
else
    echo "File not found: $OFOSFILE"
fi

# Second file: Change "runOn": "folderOpen" to "runOn": "default"
TASKSFILE="./.vscode/tasks.json"
if [ -f "$TASKSFILE" ]; then
    sed -i.bak 's/"runOn": "folderOpen"/"runOn": "default"/' "$TASKSFILE"
    rm -f "${TASKSFILE}.bak"  # Remove backup
else
    echo "File not found: $TASKSFILE"
fi