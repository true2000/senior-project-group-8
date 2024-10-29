FROM python:3.10-slim

WORKDIR /app/

COPY ./ /app/

RUN pip install --upgrade pip
RUN apt-get update && apt-get install -y cargo
RUN pip install -r requirements.txt

ENV FLASK_APP=app.py
ENV FLASK_ENV=development

EXPOSE 8000

CMD ["flask", "run", "--host", "0.0.0.0", "--port", "8000"]
