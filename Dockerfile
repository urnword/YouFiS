# Step 1: Build the app
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the app
# We use 'serve' because Vite's preview isn't meant for heavy production
FROM node:20-slim
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist

# Cloud Run passes the PORT variable, so we use that
EXPOSE 8080
CMD ["sh", "-c", "serve -s dist -l ${PORT:-8080}"]