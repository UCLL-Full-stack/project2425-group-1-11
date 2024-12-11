import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { appointmentRouter } from './controller/appointment.routes';
import doctorRouter from './controller/doctor.routes';
import { recordRouter } from './controller/record.routes';
import { patientRouter } from './controller/pacient.routes';
import { clinicRouter } from './controller/clinic.routes';
import { userRouter } from './controller/user.routes';

const app = express();

dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/appointments', appointmentRouter);
app.use('/doctors', doctorRouter);
app.use('/records', recordRouter)
app.use('/patients', patientRouter)
app.use('/clinics', clinicRouter)
app.use('/users', userRouter)

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
