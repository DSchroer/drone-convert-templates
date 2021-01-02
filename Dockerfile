FROM node

COPY *.json ./
RUN npm ci

COPY dist dist

ENTRYPOINT npm start
