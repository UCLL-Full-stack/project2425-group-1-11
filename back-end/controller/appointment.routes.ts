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
 *            patient:
 *              $ref: '#/components/schemas/Patient'
 *            doctor:
 *              $ref: '#/components/schemas/Doctor'
 */
import express, { Request, Response } from 'express';
import appointmentService from '../service/appointment.service';
import { AppointmentInput } from '../types';

const appointmentRouter = express.Router();

/**
 * @swagger
 * /appointments:
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

/**
 * @swagger
*      /appointments/{id}:
*        delete:
*          summary: Delete an appointment by ID
*          parameters:
*            - in: path
*              name: id
*              required: true
*              schema:
*                type: integer
*              description: The appointment ID
*          responses:
*            200:
*              description: Appointment deleted successfully
*              content:
*                application/json:
*                  schema:
*                    type: object
*                    properties:
*                      status:
*                        type: string
*                        example: success
*                      message:
*                        type: string
*                        example: Appointment deleted successfully
*            400:
*              description: Bad request
*              content:
*                application/json:
*                  schema:
*                    type: object
*                    properties:
*                      status:
*                        type: string
*                        example: error
*                      errorMessage:
*                        type: string
*                        example: Error message
*/
appointmentRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const appointment = await appointmentService.deleteAppointmentById(Number(req.params.id))
        res.status(200).json(appointment);
    } catch (error) {
        res.status(400).json({status: 'error', errorMessage: (error as Error).message});
    }
});

/**
 * @swagger
 * /appointments/add:
 *   post:
 *      security:
 *       - bearerAuth: []
 *      summary: Create a new appointment for an existing patient.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AppointmentInput'
 *      responses:
 *         200:
 *            description: The created schedule.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Appointment'
 */
appointmentRouter.post('/add', async (req: Request, res: Response) => {
    try {
        const appointment = <AppointmentInput>req.body;
        const result = await appointmentService.makeAppointment(appointment);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

export { appointmentRouter };