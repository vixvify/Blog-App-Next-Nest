FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm config set registry https://registry.npmmirror.com
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm config set fetch-retries 5
RUN npm config set fetch-timeout 120000

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
