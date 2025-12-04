# Etapa 1: Build de Angular
FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Etapa 2: Servir con Nginx
FROM nginx:stable

# Copiar config de nginx compatible con Railway
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar el build de Angular
COPY --from=build /app/dist/Sentinel/ /usr/share/nginx/html/

# Puerto (Railway lo ignora, pero es estándar)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
