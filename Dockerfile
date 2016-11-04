FROM node:argon


RUN npm install babel-cli -g

# Create app directory
RUN mkdir -p /usr/src/data-engine-node-server
WORKDIR /usr/src/data-engine-node-server


# Install app dependencies
COPY package.json /usr/src/data-engine-node-server
RUN npm install


# Bundle app sources
COPY . /usr/src/data-engine-node-server
RUN npm run build


EXPOSE 8080
EXPOSE 8081


CMD ["npm", "run", "serve"]

#
# https://docs.docker.com/engine/installation/linux/debian/
# https://docs.docker.com/compose/install/
#