FROM node:18.14.2

WORKDIR /arithmetic-calculator-api

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm cache clean --force
RUN npm install

COPY . .
