/**
 * @swagger
 *   components:
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
 *      UserInput:
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
 *      AuthenticationResponse:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              description: User token.
 *            userName:
 *              type: string
 *              description: User userName.
 *            fullName:
 *              type: string
 *              description: User fullName.
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types/index';

const userRouter = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *      tags:
 *        - User
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

/**
 * @swagger
 * /users/login:
 *   post:
 *      tags:
 *        - User
 *      summary: Authenticate a user and return a JWT token.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthenticationResponse'
 *      responses:
 *         200:
 *            description: The authentication token.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body;
        const result = await userService.login(userName, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

export { userRouter };
