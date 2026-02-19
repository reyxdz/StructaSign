import express from 'express';
import {
  getAllForms,
  getFormById,
  createForm,
  updateForm,
  deleteForm,
  publishForm,
  getFormResponses,
  submitFormResponse,
  getFormStats,
} from '../controllers/formController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/', authenticate, getAllForms);
router.post('/', authenticate, createForm);
router.get('/:id', authenticate, getFormById);
router.put('/:id', authenticate, updateForm);
router.delete('/:id', authenticate, deleteForm);
router.patch('/:id/publish', authenticate, publishForm);
router.get('/:formId/responses', authenticate, getFormResponses);
router.get('/:formId/stats', authenticate, getFormStats);

// Public routes (form submission)
router.post('/:formId/responses', submitFormResponse);

export default router;
