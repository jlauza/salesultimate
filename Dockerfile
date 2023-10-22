# Build stage
FROM node:16.18.0 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:16.18.0-alpine
WORKDIR /app
COPY --from=build-stage /app/dist ./dist
COPY package*.json ./
RUN npm install --only=prod
EXPOSE 3000

CMD ["node", "dist/server.js"]
