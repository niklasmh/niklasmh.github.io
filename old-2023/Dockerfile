FROM node:6

ENV TMP_DIR /tmp
ENV WS_DIR /srv/niklasmh

RUN apt-get update

WORKDIR ${TMP_DIR}
COPY package.json .
RUN npm install

WORKDIR ${WS_DIR}
