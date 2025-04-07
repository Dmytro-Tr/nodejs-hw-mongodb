import 'dotenv/config';
import express from 'express';
import cors from 'cors';
// import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

// import swaggerUIExpress from 'swagger-ui-express';
// import * as fs from 'node:fs';
// import path from 'node:path';

// const swaggerDocument = JSON.parse(
//   fs.readFileSync(path.resolve('docs', 'swagger.json'), 'utf-8'),
// );

const PORT = Number(process.env.PORT) || 3000;

export async function setupServer() {
  try {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());

    // app.use(
    //   '/api-docs',
    //   swaggerUIExpress.serve,
    //   swaggerUIExpress.setup(swaggerDocument),
    // );

    // app.use(pino({transport: {target: 'pino-pretty',},}),);
    app.use('/api-docs', swaggerDocs());

    app.use(router);

    app.use('*', notFoundHandler);

    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    app.use('/uploads', express.static(UPLOAD_DIR));
  } catch (error) {
    console.error(error);
  }
}
