import mongoose from 'mongoose';

const PetSchema = new mongoose.Schema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  age: {
    type: Number
  }
});

const Pet = mongoose.model('Pet', PetSchema);

export default Pet;
