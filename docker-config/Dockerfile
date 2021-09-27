FROM registry.digitalservice.id/proxyjds/library/alpine:edge

RUN apk add nodejs yarn

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /app /app/tmp \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

USER pptruser

EXPOSE 3003

RUN chmod +x ./docker-config/entrypoint.sh

ENTRYPOINT [ "./docker-config/entrypoint.sh" ]
