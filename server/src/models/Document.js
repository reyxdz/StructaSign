import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Document name is required'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ['pdf', 'doc', 'docx', 'txt', 'xlsx'],
    },
    fileSize: Number,
    description: String,
    status: {
      type: String,
      enum: ['uploaded', 'processing', 'ready'],
      default: 'ready',
    },
    tags: [String],
    sharedWith: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        permission: { type: String, enum: ['view', 'sign', 'edit'], default: 'view' },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Document', documentSchema);
