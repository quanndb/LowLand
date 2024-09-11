# Step 1: Use an official Node.js image as the base image
FROM node:18-alpine AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Build the Vite application
RUN npm run build

# Step 7: Use an official Nginx image to serve the app
FROM nginx:alpine

# Step 8: Copy the built files from the previous stage to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80
EXPOSE 80

# Step 10: Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
