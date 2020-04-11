FROM node:12-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG OPTIMIZED_BUILD=true
ENV OPTIMIZED_BUILD=${OPTIMIZED_BUILD}

ARG PORT=8080
ENV PORT=${PORT}

WORKDIR /usr/src/app
COPY . ./

RUN yarn install && yarn build
EXPOSE ${PORT}

CMD ["yarn", "server:build"]
