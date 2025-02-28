import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { initMongoConnection } from './db/initMongoConnection.js';
// import { getEnvVar } from './utils/getEnvVar.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

export async function setupServer() {
  try {
    await initMongoConnection();

    const app = express();

    app.use(cors());

    app.use(
      pino({
        transport: {
          target: 'pino-pretty',
        },
      }),
    );

    app.get('/contacts', async (req, res) => {
      const contacts = await contacts.find();

      res.json(contacts);
    });

    app.get('/contacts/:contactId', (req, res) => {
      const { contactId } = req.params;

      res.send(`Contacts ${contactId}`);
    });

    app.use('*', (req, res, next) => {
      res.status(404).json({
        message: 'Not found',
      });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

setupServer();

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });
