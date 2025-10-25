# Use the official Node.js LTS image
FROM node:18-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the rest of the app
COPY . .

# Set environment variables
ENV PORT=8080
ENV NODE_ENV=production
ENV GCP_REGION=europe-north1

# Expose port and start app
EXPOSE 8080
CMD ["npm", "start"]
