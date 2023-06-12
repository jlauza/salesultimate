# Build stage
FROM node:16.18.0 as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# Check if npm and yarn are already installed
RUN command -v npm >/dev/null 2>&1 && npm_installed=1 || npm_installed=0
RUN command -v yarn >/dev/null 2>&1 && yarn_installed=1 || yarn_installed=0

# Install npm if it doesn't exist
RUN if [ $npm_installed -eq 0 ]; then \
        apt-get update && \
        apt-get install -y npm && \
        npm_installed=1; \
    fi

# Install yarn if it doesn't exist
RUN if [ $yarn_installed -eq 0 ]; then \
        npm install -g yarn && \
        yarn_installed=1; \
    fi

# Copy your application files
COPY . /app
WORKDIR /app
COPY package*.json ./

# Install dependencies using npm or yarn
RUN if [ $yarn_installed -eq 1 ]; then \
        yarn install; \
    else \
        npm install; \
    fi
    
CMD [ "npm", "start", "--watch" ]

# Production stage
FROM node:16.18.0-alpine
WORKDIR /app
COPY --from=build-stage /app /app
EXPOSE 3000
RUN npm install -g nodemon

CMD ["nodemon", "--watch", ".", "server.js"]
# CMD [ "npm", "start:dev", "--watch" ]