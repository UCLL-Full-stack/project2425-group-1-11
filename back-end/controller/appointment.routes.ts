/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Appointment:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            startDate:
 *              type: string
 *              format: date-time
 *            endDate:
 *              type: string
 *              format: date-time
 *            comment:
 *              type: string
 *              description: Appointment comment.
 *            pacient:
 *              $ref: '#/components/schemas/Pacient'
 *            doctor:
 *              $ref: '#/components/schemas/Doctor'
 */
import express, { Request, Response } from 'express';
import appointmentService from '../service/appointment.service';

const appointmentRouter = express.Router();

/**
 * @swagger
 * /appointment:
 *   get:
 *     summary: Get a list of all appointments.
 *     description: Returns an array of appointments. Each item in the array is of type Appointment.
 *     responses:
 *       200:
 *         description: A JSON array of appointment objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 */
appointmentRouter.get('/', async (req: Request, res: Response) => {
    try {
        const appointments = await appointmentService.getAllAppointments();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({status: 'error', errorMessage: (error as Error).message});
    }
});

export { appointmentRouter };