/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Pacient:
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

export {  };