import express from 'express';
import {
  getAllSignatures,
  getSignatureById,
  requestSignature,
  signDocument,
  getSignatureStats,
} from '../controllers/signatureController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/', authenticate, getAllSignatures);
router.post('/request', authenticate, requestSignature);
router.get('/stats', authenticate, getSignatureStats);
router.get('/:id', authenticate, getSignatureById);
router.post('/:id/sign', authenticate, signDocument);

export default router;
