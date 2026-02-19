import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
  id: String,
  type: {
    type: String,
    enum: ['text', 'email', 'number', 'checkbox', 'radio', 'select', 'textarea', 'date'],
  },
  label: String,
  name: String,
  placeholder: String,
  required: { type: Boolean, default: false },
  options: [String],
  validation: mongoose.Schema.Types.Mixed,
});

const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Form title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fields: [fieldSchema],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    settings: {
      progressBar: { type: Boolean, default: true },
      allowMultipleResponses: { type: Boolean, default: true },
      showResults: { type: Boolean, default: false },
      requireLogin: { type: Boolean, default: false },
    },
    responseCount: {
      type: Number,
      default: 0,
    },
    template: String,
    sharedWith: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        permission: { type: String, enum: ['view', 'edit'], default: 'view' },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Form', formSchema);
