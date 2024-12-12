/**
 * @swagger
 *   components:
 *    schemas:
 *      Record:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            patient:
 *              $ref: '#/components/schemas/Patient'
 *            title:
 *              type: string
 *              description: Record title.
 *            description:
 *              type: string
 *              description: Record description.
 */
import express, { Request, Response } from 'express';
import recordService from '../service/record.service';

const recordRouter = express.Router();

/**
 * @swagger
 * /records:
 *   get:
 *     tags:
 *       - Record
 *     summary: Get a list of all records.
 *     description: Returns an array of records. Each item in the array is of type Records.
 *     responses:
 *       200:
 *         description: A JSON array of records objects.
 *         content:
 *           record/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Record'
 */
recordRouter.get('/', async (req: Request, res: Response) => {
    try {
        const records = await recordService.getAllRecords();
        res.status(200).json(records);
    } catch (error) {
        res.status(400).json({status: 'error', errorMessage: (error as Error).message});
    }
});

/**
 * @swagger
 * /records/{id}:
 *   delete:
 *     tags:
 *       - Record
 *     summary: Delete an record by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The record ID
 *     responses:
 *       200:
 *         description: Record deleted successfully
 *         content:
 *           record/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Record deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           record/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errorMessage:
 *                   type: string
 *                   example: Error message
 */
recordRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const appointment = await recordService.deleteRecordById({ id: Number(req.params.id) })
        res.status(200).json(appointment);
    } catch (error) {
        res.status(400).json({status: 'error', errorMessage: (error as Error).message});
    }
});

export { recordRouter };