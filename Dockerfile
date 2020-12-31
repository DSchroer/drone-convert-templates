FROM node

COPY *.json ./
RUN npm ci

COPY server server
COPY templates templates

ENTRYPOINT ["node", "server/server.js"]
