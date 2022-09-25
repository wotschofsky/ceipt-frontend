
FROM node:16-alpine

RUN apk add --no-cache libc6-compat
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

COPY --chown=nextjs:nodejs package.json yarn.lock ./
RUN yarn install --frozen-lockfile && \
    yarn cache clean

COPY --chown=nextjs:nodejs . .
RUN yarn build

EXPOSE 3000
ENV PORT 3000

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

USER nextjs

CMD ["yarn", "start"]
