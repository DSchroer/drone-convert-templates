FROM node

COPY *.json ./
RUN npm ci --production

COPY dist dist

ENTRYPOINT npm start
