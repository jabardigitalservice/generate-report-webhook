FROM registry.digitalservice.id/proxyjds/library/alpine:edge

RUN apk add nodejs yarn && rm -rf /var/cache/apk/*

WORKDIR /app

COPY package.json ./

ENV PORT 3003

RUN yarn install

COPY . .

RUN yarn run build

RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /app /app/tmp \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

USER pptruser

EXPOSE ${PORT}

RUN chmod +x ./docker-config/entrypoint.sh

ENTRYPOINT [ "./docker-config/entrypoint.sh" ]
