import express, { Application, Request, Response, NextFunction } from 'express';

import cors from 'cors';
import globalErrorHandlar from './app/middlewares/globalErrorHandlar';
import routes from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes

app.use('/api/', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('server running successfully');
});

app.use(globalErrorHandlar);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'route not found',
      },
    ],
  });
  next();
});

export default app;
