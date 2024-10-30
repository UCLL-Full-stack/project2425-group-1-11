/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
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
 *            appointments:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Appointment'
 */
import express, { Request, Response } from 'express';

export {  };