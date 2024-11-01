/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Record:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            pacient:
 *              $ref: '#/components/schemas/Pacient'
 *            title:
 *              type: string
 *              description: Record title.
 *            description:
 *              type: string
 *              description: Record description.
 */
import express, { Request, Response } from 'express';

export {  };