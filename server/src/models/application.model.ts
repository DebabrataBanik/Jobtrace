import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ['Applied', 'OA', 'Interview', 'Offer', 'Rejected'],
      required: true,
    },
    appliedDate: { type: Date, required: true },
    url: String,
    description: String,
    notes: String,
    timeline: [{ status: String, date: Date, note: String }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  },
);

export const Application = mongoose.model('Application', ApplicationSchema);
