import mongoose from 'mongoose';
import User from './user';
import Pet from './pet';
import { getSchema } from '@risingstack/graffiti-mongoose';

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/graphql');

export default getSchema([Pet, User]);
