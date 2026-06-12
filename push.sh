#!/bin/bash

# Default commit message if none is provided
MSG=${1:-"Update passwale tech"}

echo "Adding changes..."
git add .

echo "Committing with message: '$MSG'..."
git commit -m "$MSG"

echo "Pushing to remote..."
git push

echo "Done!"
