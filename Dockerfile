FROM hayd/alpine-deno:1.10.2

WORKDIR /var/app

COPY src src
COPY lock.json lock.json

RUN deno cache -r --lock lock.json src/server.ts

ENTRYPOINT deno run --unstable --allow-env --allow-net --lock lock.json src/server.ts