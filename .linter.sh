#!/bin/bash
cd /home/kavia/workspace/code-generation/fittrack-pro-18935-801a66b8/fittrack_pro
./gradlew lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
   exit 1
fi

