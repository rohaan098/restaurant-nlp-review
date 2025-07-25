# Use a stable Python base with build tools
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create working directory
WORKDIR /app

# Copy dependency list
COPY backend/requirements.txt /app/requirements.txt

# Upgrade pip and install dependencies
RUN pip install --upgrade pip setuptools wheel
RUN pip install -r /app/requirements.txt

# Copy source code
COPY backend /app

# Expose port (Render default is 10000 or set PORT env var)
EXPOSE 10000

# Start the app
CMD ["python", "app.py"]
