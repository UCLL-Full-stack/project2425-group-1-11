/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
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

export { };