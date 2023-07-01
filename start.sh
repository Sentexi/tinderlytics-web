#!/bin/bash

# Activate virtual environment (if applicable)
source venv/Scripts/activate

# Start uWSGI server
uwsgi --http :8080 --wsgi-file app.py \
      --callable app_name \
      --master \
      --processes 4 \
      --threads 2 