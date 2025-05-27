# syntax=docker/dockerfile:1.7
FROM --platform=linux/amd64 node:22
WORKDIR /app

RUN corepack enable && corepack prepare yarn@stable --activate

COPY .yarn ./.yarn
COPY .yarnrc.yml package.json yarn.lock ./
RUN yarn install --immutable

COPY . .
RUN yarn build

RUN npm install -g serve
EXPOSE 3000
ENV PORT=3000

CMD ["serve","-s","build","-l","tcp://0.0.0.0:$PORT"]

