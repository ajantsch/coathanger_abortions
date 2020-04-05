# Setup and build the client
FROM node:10-alpine as client

WORKDIR /usr/app/client/

COPY client/package*.json ./

COPY client/yarn.lock ./

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

ARG OPTIMIZED_BUILD=true

ENV OPTIMIZED_BUILD=${OPTIMIZED_BUILD}

RUN yarn install

COPY client/ ./

RUN yarn build

# Setup and build the server
FROM node:10-alpine as server

WORKDIR /usr/app/server/

COPY server/package*.json ./

COPY server/yarn.lock ./

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

ARG OPTIMIZED_BUILD=true

ENV OPTIMIZED_BUILD=${OPTIMIZED_BUILD}

ARG PORT=8000

ENV PORT=${PORT}

ARG AWS_REGION=eu-central-1

ENV AWS_REGION=${AWS_REGION}

RUN yarn install

COPY server/ ./

RUN yarn run build

# compose and start the app
FROM node:10-alpine

WORKDIR /usr/app/

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

COPY --from=client /usr/app/client/build/ ./client/build/

COPY --from=server /usr/app/server/node_modules/ ./server/node_modules/

COPY --from=server /usr/app/server/package.json ./server/package.json

COPY --from=server /usr/app/server/build/ ./server/

WORKDIR /usr/app/server/

CMD ["node", "index.js"]