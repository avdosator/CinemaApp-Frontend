# Stage 1: Build the React application
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

# Install dependencies and ensure `npx` is available
RUN npm install -g npm@latest npx && npm install

# Copy the source code into the container
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Set working directory and copy the nginx configuration
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for production use
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]