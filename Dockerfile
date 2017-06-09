FROM node:6

RUN apt-get update
RUN apt-get install vim -y

ENV APP_DIR /srv/niklasmh

WORKDIR $APP_DIR

ADD package.json .
RUN npm install --depth=0 --quiet

VOLUME $APP_DIR
EXPOSE 8000
