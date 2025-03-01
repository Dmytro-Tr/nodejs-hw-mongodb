import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { initMongoConnection } from './db/initMongoConnection.js';
import { getAllContacts, getContactById } from './services/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';

const PORT = Number(getEnvVar('PORT', '3000')) || 3000;

export async function setupServer() {
  try {
    await initMongoConnection();

    const app = express();
    app.use(express.json());
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
      res.status(500).json({
        message: 'Something went wrong',
      });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}
