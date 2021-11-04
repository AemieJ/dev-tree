import app from './index.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = 4000 || process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
