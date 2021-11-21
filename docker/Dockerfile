FROM registry.digitalservice.id/proxyjds/library/node:12-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM registry.digitalservice.id/proxyjds/library/node:12-alpine AS server
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder ./app/build ./build
ENV PORT 3003
EXPOSE ${PORT}
CMD [ "npm", "run", "start" ]