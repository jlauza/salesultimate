# Build stage
FROM node:16.18.0 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:16.18.0-alpine
WORKDIR /app
COPY --from=build-stage /app /app
EXPOSE 3000
RUN npm install -g nodemon
# CMD ["nodemon", "--watch", ".", "server.js"]
CMD [ "npm", "start:dev", "--watch" ]