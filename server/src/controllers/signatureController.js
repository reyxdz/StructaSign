import Signature from '../models/Signature.js';
import Document from '../models/Document.js';

export const getAllSignatures = async (req, res, next) => {
  try {
    const signatures = await Signature.find({
      $or: [
        { requester: req.user.id },
        { signer: req.user.id },
      ],
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      signatures,
    });
  } catch (error) {
    next(error);
  }
};

export const getSignatureById = async (req, res, next) => {
  try {
    const signature = await Signature.findById(req.params.id);

    if (!signature) {
      return res.status(404).json({ message: 'Signature request not found' });
    }

    if (signature.requester.toString() !== req.user.id && signature.signer?.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({
      success: true,
      signature,
    });
  } catch (error) {
    next(error);
  }
};

export const requestSignature = async (req, res, next) => {
  try {
    const { documentId, signerEmail, message, expiresAt } = req.body;

    if (!documentId || !signerEmail) {
      return res.status(400).json({ message: 'Document ID and signer email are required' });
    }

    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (document.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const signature = await Signature.create({
      document: documentId,
      documentName: document.name,
      requester: req.user.id,
      signerEmail,
      message,
      expiresAt,
    });

    res.status(201).json({
      success: true,
      message: 'Signature request sent successfully',
      signature,
    });
  } catch (error) {
    next(error);
  }
};

export const signDocument = async (req, res, next) => {
  try {
    const { signatureUrl } = req.body;

    const signature = await Signature.findById(req.params.id);

    if (!signature) {
      return res.status(404).json({ message: 'Signature request not found' });
    }

    if (signature.status !== 'pending') {
      return res.status(400).json({ message: 'Signature request is no longer pending' });
    }

    signature.status = 'signed';
    signature.signatureUrl = signatureUrl;
    signature.signedAt = new Date();
    await signature.save();

    res.json({
      success: true,
      message: 'Document signed successfully',
      signature,
    });
  } catch (error) {
    next(error);
  }
};

export const getSignatureStats = async (req, res, next) => {
  try {
    const signatures = await Signature.find({
      requester: req.user.id,
    });

    const stats = {
      totalRequests: signatures.length,
      pending: signatures.filter((s) => s.status === 'pending').length,
      signed: signatures.filter((s) => s.status === 'signed').length,
      rejected: signatures.filter((s) => s.status === 'rejected').length,
      expired: signatures.filter((s) => s.status === 'expired').length,
    };

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    next(error);
  }
};
