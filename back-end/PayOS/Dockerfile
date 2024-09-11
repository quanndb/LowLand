# Step 1: Use another Node.js image to run the backend service
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy only the necessary files for runtime
COPY package*.json ./

# Step 4: Install production dependencies
RUN npm install --only=production

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Expose the port the app runs on
EXPOSE 3000

# Step 13: Start the application
CMD ["node", "index.js"]
