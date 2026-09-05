import app from "./server.js";
import "dotenv/config"
import redisConnect from "./lib/redis.js"
import { startOrderEventsConsumer } from "./service/order-events.service.js"

const PORT = process.env.PORT || 3001

await redisConnect()
void startOrderEventsConsumer()

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))