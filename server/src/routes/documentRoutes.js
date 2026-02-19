import express from 'express';
import multer from 'multer';
import {
  getAllDocuments,
  getDocumentById,
  uploadDocument,
  deleteDocument,
} from '../controllers/documentController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Protected routes
router.get('/', authenticate, getAllDocuments);
router.post('/upload', authenticate, upload.single('file'), uploadDocument);
router.get('/:id', authenticate, getDocumentById);
router.delete('/:id', authenticate, deleteDocument);

export default router;
