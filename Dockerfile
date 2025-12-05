FROM node:20-alpine AS builder
WORKDIR /build/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL
ARG VITE_API_TIMEOUT
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_API_TIMEOUT=${VITE_API_TIMEOUT}
RUN npm run build

FROM nginx:1.29-alpine

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /build/app/dist /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

EXPOSE 9090
CMD ["nginx", "-g", "daemon off;"]