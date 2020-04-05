FROM node:10-alpine

# Create and define the node_modules's cache directory.
RUN mkdir -p /usr/src/cache
WORKDIR /usr/src/cache

# Install the application's dependencies into the node_modules's cache directory.
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
RUN yarn install -qy

# Create and define the application's working directory.
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Set env variables
ENV OPTIMIZED_BUILD=false
ENV NODE_ENV=local
ENV PORT=8000
ENV AWS_REGION=eu-central-1

# Build it
RUN cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/
CMD ["yarn", "build"]
