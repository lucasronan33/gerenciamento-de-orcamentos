require('dotenv').config();

const app = require('./app');
const connectDatabase = require('./config/database');

const PORT = process.env.API_PORT || process.env.PORT || 3001;

async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`API running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start API:', error.message);
    process.exit(1);
  }
}

startServer();
