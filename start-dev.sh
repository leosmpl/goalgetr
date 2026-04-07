#!/bin/bash
export PATH="/Users/leo/.local/share/fnm/node-versions/v22.22.0/installation/bin:$PATH"
cd /Users/leo/Desktop/Goalgetr
exec node_modules/.bin/next dev --port "${PORT:-3000}"
