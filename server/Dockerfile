FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm config set registry https://registry.npmmirror.com
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm config set fetch-retries 5
RUN npm config set fetch-timeout 120000

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3001
CMD ["npm", "start"]
