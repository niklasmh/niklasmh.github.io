FROM node:6

RUN apt-get update
RUN apt-get install vim -y
RUN npm install serve npm-run-all inferno-scripts -g --quiet

ENV APP_DIR /srv/niklasmh

WORKDIR /opt/tmp

ADD package.json .
RUN npm install --depth=0 --quiet

VOLUME $APP_DIR
EXPOSE 5000

RUN mv node_modules $APP_DIR
