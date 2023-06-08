FROM node:16.13-alpine as development

# set working directory
WORKDIR /home/node/app

# add `/home/node/app/node_modules/.bin` to $PATH
ENV PATH /home/node/app/node_modules/.bin:$PATH

COPY package.json yarn.lock ./

RUN yarn install

FROM node:16.13-alpine as build

COPY --from=development /home/node/app/node_modules/ /home/node/app/node_modules

WORKDIR /home/node/app

COPY . .

ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max_old_space_size=4096

#  run build using .env.development

# RUN apk update && apk add bash && yarn run start:dev
# RUN apk update && apk add bash && yarn build:dev

# RUN yarn build:dev
RUN yarn
# RUN yarn start:dev

FROM node:16.13-alpine as production

RUN apk update && apk add bash

COPY --from=build /home/node/app/ /home/node/app
# COPY --from=build /home/node/app/ /home/node/app

EXPOSE 3000

CMD ["yarn", "run","start:dev"]
# CMD ["apk", "add","bash"]