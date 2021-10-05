# docker build -t lindsay_app_backend .
# docker run -e "CONF_FILE=$(cat ./conf.json)" lindsay_app_backend

FROM python:3.8.11-alpine3.13

RUN apk add bash

# All of this is needed for pillow package / qrcode packages 

RUN apk update \
&& apk add --virtual build-deps gcc python3-dev musl-dev \  
&& apk add postgresql \
&& apk add libc-dev \
&& apk add fortify-headers \
&& apk add linux-headers \
&& apk add postgresql-dev \
&& pip install psycopg2 \
&& apk add jpeg-dev zlib-dev libjpeg 

ENV CONF_FILE="none"

COPY ./scripts/setup.sh ./setup.sh
COPY ./scripts/run.sh ./run.sh
COPY app.py ./app.py
COPY src/ src/

RUN ./setup.sh

ENTRYPOINT ["./run.sh"]