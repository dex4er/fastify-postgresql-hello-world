FROM node:18.14.0-bullseye-slim

ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

WORKDIR /server

COPY . ./

RUN npm ci

ENV SERVER_HOST="0.0.0.0"

CMD [ "/tini", "--", "node", "server.js" ]
EXPOSE 3000
