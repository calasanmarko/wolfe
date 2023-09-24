import { Router } from "express";
import { handleRoute } from "../../lib/utility.js";

export const router = Router();

/**
 * GET /~~name~~
 * @tag default
 * @summary 
 * @returns {void} 200 - Ok
 */
router.get('/', (req, res, next) => handleRoute(async () => {
    
}, req, res, next));

/**
 * POST /~~name~~
 * @tag default
 * @summary 
 * @returns {void} 200 - Ok
 */
router.get('/', (req, res, next) => handleRoute(async () => {
    
}, req, res, next));

/**
 * PATCH /~~name~~
 * @tag default
 * @summary 
 * @returns {void} 200 - Ok
 */
router.get('/', (req, res, next) => handleRoute(async () => {
    
}, req, res, next));

/**
 * DELETE /api/chat/~~name~~
 * @tag Chat
 * @summary 
 * @returns {void} 200 - Ok
 */
router.get('/', (req, res, next) => handleRoute(async () => {
    
}, req, res, next));