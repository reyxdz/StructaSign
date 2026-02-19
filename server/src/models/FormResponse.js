import mongoose from 'mongoose';

const formResponseSchema = new mongoose.Schema(
  {
    form: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: true,
    },
    respondent: {
      name: String,
      email: String,
      userId: mongoose.Schema.Types.ObjectId,
    },
    responses: mongoose.Schema.Types.Mixed,
    ipAddress: String,
    userAgent: String,
    status: {
      type: String,
      enum: ['submitted', 'draft', 'incomplete'],
      default: 'submitted',
    },
  },
  { timestamps: true }
);

export default mongoose.model('FormResponse', formResponseSchema);
