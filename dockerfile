FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./

RUN npm install

# Bundle app source
COPY . .
RUN rm /app/README.md

EXPOSE 3000
# CMD [ "npm", "start" ]
ENTRYPOINT ["npm", "start"]