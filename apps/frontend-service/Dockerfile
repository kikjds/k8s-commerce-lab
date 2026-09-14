FROM node:24-alpine AS builder
WORKDIR /app

ARG VITE_S3_BUCKET
ARG VITE_S3_REGION
ENV VITE_S3_BUCKET=$VITE_S3_BUCKET
ENV VITE_S3_REGION=$VITE_S3_REGION

COPY package*.json .
RUN npm install
COPY . .
RUN npm run build


FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]