FROM node:10
WORKDIR /app
COPY . /app
COPY package.json /app
RUN npm install && npm run build
CMD [ "npm", "start"]
EXPOSE 5000