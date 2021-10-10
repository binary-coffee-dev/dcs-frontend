#!/bin/bash

echo "Commit and push package version"

# setting up the git information
git config --global user.name 'Guillermo'
git config --global user.email 'ggjnez92@gmail.com'

# creating commit and pushing it
git reset
git add package.json
git commit -m "Update app version)"
git push
