/**
 * @swagger
 *   components:
 *    schemas:
 *      Patient:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            user:
 *              $ref: '#/components/schemas/User'
 *            records:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Record'
 *            appointments:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Appointment'
 */
import express, { Request, Response } from 'express';
import patientService from '../service/patient.service';

const patientRouter = express.Router();

/**
 * @swagger
 * /patients:
 *   get:
 *     tags:
 *       - Patient
 *     summary: Get a list of all patients.
 *     description: Returns an array of patients. Each item in the array is of type Patients.
 *     responses:
 *       200:
 *         description: A JSON array of patients objects.
 *         content:
 *           patient/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 */
patientRouter.get('/', async (req: Request, res: Response) => {
    try {
        const patients = await patientService.getAllPatients();
        res.status(200).json(patients);
    } catch (error) {
        res.status(400).json({status: 'error', errorMessage: (error as Error).message});
    }
});

export { patientRouter };
