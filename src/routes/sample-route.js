import express from 'express';
import { getSamples } from '../controllers/sample-controller.js';

const router = express.Router();

router.get('/:base', getSamples);

export default router;