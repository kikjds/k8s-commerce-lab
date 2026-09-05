import app from "./server.js";
import "dotenv/config"
import redisConnect from "./lib/redis.js";
import { startOrderCommandsConsumer } from "./service/order-commands.service.js";

const PORT = process.env.PORT || 3000
await redisConnect()
void startOrderCommandsConsumer()
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

