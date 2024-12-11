/**
 * @swagger
 *   components:
 *    schemas:
 *      Clinic:
 *          type: object
 *          properties:
 *            id: 
 *              type: number
 *              format: int64
 *            doctors:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Doctor'
 *            address:
 *              type: string
 *              description: Clinic address.
 *            contactNumber:
 *              type: number
 *              description: Appointment contactNumber.
 *            rating:
 *              type: number
 *              description: Appointment rating.
 */
import express, { Request, Response } from 'express';
import clinicService from '../service/clinic.service';

const clinicRouter = express.Router();

/**
 * @swagger
 * /clinics:
 *   get:
 *     tags:
 *       - Clinic
 *     summary: Get a list of all clinics.
 *     description: Returns an array of clinics. Each item in the array is of type Clinic.
 *     responses:
 *       200:
 *         description: A JSON array of clinics objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clinic'
 */
clinicRouter.get('/', async (req: Request, res: Response) => {
    try {
        const clinics = await clinicService.getAllClinics();
        res.status(200).json(clinics);
    } catch (error) {
        res.status(400).json({status: 'error', errorMessage: (error as Error).message});
    }
});
export { clinicRouter };