FROM node:alpine3.10

COPY *.json ./
RUN npm ci --production

COPY dist dist

ENTRYPOINT npm start
