FROM node:13-alpine

WORKDIR /usr/src/app
COPY . ./

RUN yarn install --frozen-lockfile --non-interactive --silent

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG OPTIMIZED_BUILD=true
ENV OPTIMIZED_BUILD=${OPTIMIZED_BUILD}

RUN yarn build

CMD ["yarn", "server:build"]
