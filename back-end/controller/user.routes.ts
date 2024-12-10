/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            userName:
 *              type: string
 *              description: User userName.
 *            firstName:
 *              type: string
 *              description: User firstName.
 *            lastName:
 *              type: string
 *              description: User lastName.
 *            email:
 *              type: string
 *              description: User email.
 *            password:
 *              type: string
 *              description: User password.
 *            role:
 *              type: string
 *              description: User role.
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types/index';
import { User } from '@prisma/client';

const userRouter = express.Router();
const registerRouter = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *      summary: Create a new user.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserInput'
 *      responses:
 *         200:
 *            description: The created user.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.post('/register', async (req: Request, res: Response) => {
    try {
        const user = req.body as UserInput;
        const result = await userService.makeUser(user);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

export { userRouter, registerRouter };
