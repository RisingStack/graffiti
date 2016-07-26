import mongoose from 'mongoose';
import { getSchema } from '@risingstack/graffiti-mongoose';
import User from './user';
import Pet from './pet';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/graphql');

export default getSchema([Pet, User]);
