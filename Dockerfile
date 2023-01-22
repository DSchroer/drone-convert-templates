FROM denoland/deno:alpine-1.29.4

WORKDIR /var/app

COPY src src
COPY lock.json lock.json

RUN deno cache -r --lock lock.json src/server.ts

ENTRYPOINT deno run --unstable --allow-env --allow-net --lock lock.json src/server.ts