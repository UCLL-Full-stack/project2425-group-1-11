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
// import userService from '../service/user.service';
// import { UserInput } from '../types/index';

// const userRouter = express.Router();


// userRouter.post(
//     '/signup',
//     async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const user = await userService.creatUser(req.body as UserInput);
//             res.status(200).json(user);
//         } catch (error) {
//             next(error)
//         }
//     }
// )

// export { userRouter };
