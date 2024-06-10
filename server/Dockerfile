# Use the official lightweight Node.js image.
# https://hub.docker.com/_/node
FROM node:16-alpine AS build

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install production dependencies.
COPY package*.json ./
RUN npm install

# Copy build scripts and compile the TypeScript code.
COPY . .
RUN npm run build

# Use the official lightweight Node.js image for the final image.
FROM node:16-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy production dependencies and compiled files.
COPY --from=build /usr/src/app /usr/src/app

# Expose the port the app runs on
EXPOSE 3001

# Run the web service on container startup.
CMD [ "node", "dist/app.js" ]
