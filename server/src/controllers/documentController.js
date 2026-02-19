import Document from '../models/Document.js';

export const getAllDocuments = async (req, res, next) => {
  try {
    const documents = await Document.find({
      $or: [
        { owner: req.user.id },
        { 'sharedWith.userId': req.user.id },
      ],
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      documents,
    });
  } catch (error) {
    next(error);
  }
};

export const getDocumentById = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (document.owner.toString() !== req.user.id && !document.sharedWith.find((s) => s.userId.toString() === req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({
      success: true,
      document,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadDocument = async (req, res, next) => {
  try {
    const { name, description, tags } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({ message: 'Document name and file are required' });
    }

    const document = await Document.create({
      name,
      owner: req.user.id,
      fileUrl: req.file.path,
      fileType: req.file.mimetype.split('/')[1],
      fileSize: req.file.size,
      description,
      tags: tags || [],
    });

    res.status(201).json({
      success: true,
      message: 'Document uploaded successfully',
      document,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDocument = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (document.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Document.deleteOne({ _id: req.params.id });

    res.json({
      success: true,
      message: 'Document deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
