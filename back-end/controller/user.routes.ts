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
 *      UsersAdd:
 *          type: object
 *          properties:
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
 *            userName:
 *              type: string
 *              description: User userName.
 *            password:
 *              type: string
 *              description: User fullName.
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types/index';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *        - User
 *     security:
 *        - bearerAuth: []
 *     summary: Get a list of all users.
 *     description: Returns an array of users. Each item in the array is of type Users.
 *     responses:
 *       200:
 *         description: A JSON array of users objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({status: 'error', errorMessage: (error as Error).message});
    }
});

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
 *              $ref: '#/components/schemas/UsersAdd'
 *      responses:
 *         200:
 *            description: The created user.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
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
