FROM node:20-slim

WORKDIR /app

# Build frontend
COPY client ./client
RUN cd client && npm install && npm run build

# Setup backend
COPY server ./server
COPY package*.json ./
RUN npm install

ENV NODE_ENV=production
EXPOSE 5000

CMD ["npm", "start"]
