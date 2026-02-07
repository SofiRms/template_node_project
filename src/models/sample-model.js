import mongoose from 'mongoose';

const SampleSchema = new mongoose.Schema({
  // example of schema
  base_code: { 
    type: String, 
    required: true, 
    unique: true 
  },
  time_last_update_unix: Number,
  time_next_update_unix: Number, 
  conversion_rates: {
    type: Map,
    of: Number
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('SampleSchema', SampleSchema);