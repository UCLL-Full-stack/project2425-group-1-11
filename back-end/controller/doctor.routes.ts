/**
 * @swagger
 *   components:
 *    schemas:
 *      Doctor:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            user:
 *              $ref: '#/components/schemas/User'
 *            department:
 *              type: string
 *              description: Doctor department.
 */
import express, { Request, Response } from 'express';
import doctorService from '../service/doctor.service';

const doctorRouter = express.Router();

/**
 * @swagger
 * /doctors:
 *   get:
 *     tags:
 *       - Doctor
 *     summary: Get a list of all doctors.
 *     description: Returns an array of doctors. Each item in the array is of type Doctor.
 *     responses:
 *       200:
 *         description: A JSON array of doctor objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doctor'
 */
doctorRouter.get('/', async (req: Request, res: Response) => {
    try {
        const doctors = await doctorService.getAllDoctors();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(400).json({status: 'error', errorMessage: (error as Error).message});
    }
});

export default doctorRouter;