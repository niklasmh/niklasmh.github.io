FROM node:6

RUN apt-get update
RUN apt-get install vim -y
RUN npm install serve npm-run-all -g --quiet

ENV APP_DIR /srv/niklasmh

WORKDIR $APP_DIR

ADD package.json .
RUN npm install --depth=0 --quiet

COPY . .

EXPOSE 5000
