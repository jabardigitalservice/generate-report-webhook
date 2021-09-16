FROM registry.digitalservice.id/proxyjds/library/alpine:edge

RUN apk add chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

WORKDIR /app

COPY . .

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Puppeteer v6.0.0 works with Chromium 89.
RUN yarn install

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app /app/tmp \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user.
USER pptruser

EXPOSE 3003

RUN chmod +x ./docker-config/entrypoint.sh

ENTRYPOINT [ "./docker-config/entrypoint.sh" ]
