# BACKEND
FROM oven/bun:1 as back-base
WORKDIR /usr/src/back

FROM back-base AS back-install
RUN mkdir -p /temp/dev
COPY /back/package*.json ./back/bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

FROM back-install AS back-build
RUN mkdir -p /temp/prod
COPY /back/package*.json ./back/bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM back-base AS back-prerelease
COPY --from=back-install /temp/dev/node_modules ./back/node_modules
COPY . .

ENV NODE_ENV=production
RUN cd back && bun run build

FROM back-base AS back-release
COPY --from=back-install /temp/dev/node_modules ./node_modules
COPY --from=back-prerelease /usr/src/back/src/index.ts .
COPY --from=back-prerelease /usr/src/back/package.json .

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "index.ts" ]

# DATABASE
COPY ./back/docker-compose.yml /usr/src/back/docker-compose.yml
RUN cd back && docker-compose up -d

# FRONTEND
FROM oven/bun:1 as front-base
WORKDIR /usr/src/front

FROM front-base AS front-install
RUN mkdir -p /temp/dev
COPY /app/package*.json ./app/bun.lockb ./app/panda.config.ts /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

FROM front-install AS front-build
RUN mkdir -p /temp/prod
COPY --from=front-install /temp/dev/node_modules /temp/prod/node_modules
COPY ./app/package*.json ./app/bun.lockb ./app/panda.config.ts /temp/prod/
COPY ./app/src /temp/prod/src
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM front-base AS front-prerelease
COPY --from=front-install /temp/dev/node_modules ./node_modules
COPY --from=front-install /temp/dev/panda.config.ts .
COPY --from=front-install /temp/dev/package.json .
COPY ./app/tsconfig*.json .
COPY ./app/vite.config.ts .
COPY --from=front-build /temp/prod/src ./src
COPY . .

ENV NODE_ENV=production
RUN bun run build

FROM front-base AS front-release
COPY --from=front-install /temp/dev/node_modules ./app/node_modules
COPY --from=front-prerelease /usr/src/front/dist ./dist

USER bun
EXPOSE 8080/tcp
ENTRYPOINT [ "bun", "run", "dist" ]

# # PROXY
# FROM nginx:alpine AS proxy
# COPY ./nginx.conf /etc/nginx/nginx.conf
# COPY --from=front-release /usr/src/front/dist /usr/share/nginx/html
# EXPOSE 80/tcp
# ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
