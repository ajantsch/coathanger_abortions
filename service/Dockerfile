FROM node:14-alpine

ARG OPTIMIZED_BUILD=true
ENV OPTIMIZED_BUILD=${OPTIMIZED_BUILD}

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG PORT=5000
ENV PORT=${PORT}

ARG AWS_REGION=eu-central-1
ENV AWS_REGION=${AWS_REGION}

WORKDIR /usr/src/app
COPY . ./

RUN yarn install && yarn build
EXPOSE ${PORT}

CMD ["yarn", "start"]
