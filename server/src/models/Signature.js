import mongoose from 'mongoose';

const signatureSchema = new mongoose.Schema(
  {
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
      required: true,
    },
    documentName: String,
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    signer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    signerEmail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'signed', 'rejected', 'expired'],
      default: 'pending',
    },
    signatureUrl: String,
    signedAt: Date,
    expiresAt: Date,
    message: String,
    signingOrder: Number,
  },
  { timestamps: true }
);

export default mongoose.model('Signature', signatureSchema);
