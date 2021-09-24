FROM python:3.8.11-alpine3.13

ENV CONF_FILE="none"

COPY ./scripts/setup.sh ./setup.sh
COPY ./scripts/run.sh ./run.sh
COPY app.py ./app.py
COPY src/ src/

RUN ./setup.sh

ENTRYPOINT ["./run.sh"]