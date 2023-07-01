#!/bin/bash

# Activate virtual environment (if applicable)
source path_to_virtualenv/bin/activate

# Start uWSGI server
uwsgi --http :8080 --wsgi-file myapp.py \
      --callable app_name \
      --master \
      --processes 4 \
      --threads 2 