import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { initMongoConnection } from './db/initMongoConnection.js';
import { getAllContacts, getContactById } from './services/contacts.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 8080;

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
      const contacts = await getAllContacts();

      res.status(200).json({
        message: 'Successfully found contacts!',
        data: contacts,
      });
    });

    app.get('/contacts/:contactId', async (req, res, next) => {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);

      if (!contact) {
        res.status(404).json({
          message: 'Contact not found',
        });
        return;
      }

      res.status(200).json({
        message: 'Successfully found contact with id {contactId}!',
        data: contact,
      });
    });

    app.use('*', (req, res, next) => {
      res.status(404).json({
        message: 'Not found',
      });
    });

    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

setupServer();
