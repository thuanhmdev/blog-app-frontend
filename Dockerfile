FROM node:20-alpine AS base

COPY . /src

WORKDIR /src

RUN npm install pnpm -g

RUN pnpm install --save-dev style-loader css-loader

RUN pnpm build

CMD ["pnpm", "start"]