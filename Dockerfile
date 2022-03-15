FROM node:17.7.1-alpine3.14

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY ["index.js", "README.md", "./"]
COPY ["src", "./src"]

CMD [ "node", "index.js" ]
