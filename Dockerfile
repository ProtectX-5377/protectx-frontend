# Etapa 1: build de Angular
FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Etapa 2: servir con Nginx
FROM nginx:stable

# Copia el build de Angular a nginx
COPY --from=build /app/dist/Sentinel/ /usr/share/nginx/html/

# Expone puerto 80 para Railway
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
