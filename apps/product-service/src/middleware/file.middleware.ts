import multer from "multer"
import { SourceTextModule } from "node:vm"

const storage = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } })

export default storage