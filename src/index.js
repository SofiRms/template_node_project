import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import conectarDB from './config/db.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
// CORS 
app.use(cors()); 
app.use(express.json());

// Routes definition
app.use('/api/rates', rateRoutes);

const initServer = async () => {
  try {
    // Connect to MongoDB Atlas
    // Wait the success connection
    await conectarDB();
    
    app.listen(PORT, () => {
      console.log(`Server running in the port: ${PORT}`);
      console.log(`Endpoint ready to test: http://localhost:${PORT}/api/sample`);
    });
    
  } catch (error) {
    console.error("Fatal Error fatal inicializating application:", error);
    // Cerramos el proceso si no hay base de datos, ya que la API no funcionaría sin ella
    process.exit(1);
  }
};

// Execute server
initServer();