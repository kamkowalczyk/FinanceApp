FROM node:18-alpine AS build

WORKDIR /app

RUN npm install -g npm@10.9.0

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]