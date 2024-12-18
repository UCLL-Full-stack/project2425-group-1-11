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
 *      RecordsAdd:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *            description: Title of the record.
 *          description:
 *            type: string
 *            description: Description of the record.
 */
import express, { Request, Response } from 'express';
import recordService from '../service/record.service';
import { RecordInput } from '../types';

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
 *           application/json:
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
 * 
 * /records/add/{id}:
 *   post:
 *      tags:
 *       - Record
 *      summary: Create a new record for an existing patient.
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The patient ID
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RecordsAdd'
 *      responses:
 *         200:
 *            description: The created record.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Record'
 *         400:
 *           description: Bad request. The input data is invalid.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: error
 *                   errorMessage:
 *                     type: string
 *                     example: Invalid input data.
 */
recordRouter.post('/add/:id', async (req: Request, res: Response) => {
    try {
        const record = <RecordInput>req.body;
        const result = await recordService.makeRecord({ id: Number(req.params.id), record });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

/**
 * @swagger
 * 
 * /records/update/{id}:
 *   put:
 *      tags:
 *       - Record
 *      summary: Update a record.
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The record ID
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RecordsAdd'
 *      responses:
 *         200:
 *            description: The updated record.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Record'
 *         400:
 *           description: Bad request. The input data is invalid.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: error
 *                   errorMessage:
 *                     type: string
 *                     example: Invalid input data.
 */
recordRouter.put('/update/:id', async (req: Request, res: Response) => {
    try {
        const record = <RecordInput>req.body;
        const result = await recordService.updateRecord({ recordId: Number(req.params.id), record });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
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
 *           application/json:
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
 *           application/json:
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