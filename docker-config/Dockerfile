FROM registry.digitalservice.id/proxyjds/library/node:12-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM registry.digitalservice.id/proxyjds/library/node:12-alpine AS server
WORKDIR /app
COPY package*.json ./
COPY docker-config ./
RUN npm install --production
COPY --from=builder ./app/build ./build
COPY --from=builder ./app/docker-config ./docker-config
ENV PORT 3003
EXPOSE ${PORT}
RUN chmod +x ./docker-config/entrypoint.sh
ENTRYPOINT [ "./docker-config/entrypoint.sh" ]