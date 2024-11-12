# Use a lightweight Python base image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app/

# Copy only the necessary files
# Copy requirements.txt first for efficient caching
COPY requirements.txt .  
RUN pip install --upgrade pip
RUN apt-get update && apt-get install -y --no-install-recommends cargo

# Install dependencies
RUN pip install -r requirements.txt

# Copy the application code
COPY . .

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=8000
# Use 'production' for production environments
ENV FLASK_ENV=development  

# Expose the Flask port
EXPOSE 8000

# Command to run the Flask application
CMD ["flask", "run", "--port=8000"]
