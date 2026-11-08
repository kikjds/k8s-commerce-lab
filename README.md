# k8s-commerce-lab

A microservices-based e-commerce demo. The project is intended for learning
Docker, Kubernetes, Terraform, and asynchronous communication with Redis
Streams.

## Services

- `frontend-service` - React + Vite application,
- `product-service` - product API and S3 image handling,
- `orders-service` - order API,
- MariaDB - database,
- Redis - inter-service communication.

## Running with Docker Compose

1. Create `.env` files from the provided templates:

   ```bash
   cp apps/product-service/.env.example apps/product-service/.env
   cp apps/orders-service/.env.example apps/orders-service/.env
   cp apps/frontend-service/.env.example apps/frontend-service/.env
   ```

2. Fill in the required values in the `.env` files, especially the database
   and AWS S3 credentials. For the backend services, use `mariadb` as the
   database host and `REDIS_URL=redis://redis:6379`.
3. Start the application:

   ```bash
   docker compose -f infrastructure/docker/docker-compose.yaml up --build
   ```

The frontend is available at [http://localhost:2000](http://localhost:2000).
The product API runs on port `3000` and the order API on port `3001`.

## Running services locally

Install dependencies and start development mode in each service directory:

```bash
cd apps/product-service
npm install
npm run dev
```

Run the same commands for `orders-service` and `frontend-service`. When running
outside Docker, configure the backend `.env` files with the addresses of your
local MariaDB and Redis instances.


## Project structure

```text
apps/
  frontend-service/       React frontend
  product-service/        Product API
  orders-service/         Order API
infrastructure/
  docker/                 Docker Compose
  kubernetes/             Kubernetes manifests
  terraform/              S3 and CloudFront configuration
```
