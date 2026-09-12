# k8s-commerce-lab

Small e-commerce microservices demo.

## Services

- `frontend-service`
- `product-service`
- `orders-service`

## Data Stores

MariaDB stores products and orders. Redis Streams handles asynchronous events
between backend services.

When running with Docker, configure `DATABASE_URL` with host `mariadb` and
`REDIS_URL` as `redis://redis:6379` in the backend services `.env` files.


## Environment Variables

Each service includes an `.env.example` template. Copy it to `.env` and replace
the placeholder values before running the service.

## Structure

```text
apps/
	frontend-service/
	product-service/
	orders-service/
infrastructure/
	docker/
	kubernetes/
```

