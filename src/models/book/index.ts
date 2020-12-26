import mongoose, {Document, Schema} from 'mongoose';
import logging from './../../logger';

export interface IBook extends Document {
    isbn: string;
    authors: string[];
    title: string;
}

const BookSchema: Schema = new Schema({
    isbn: {type: String, required: true},
    title: {type: String, required: true},
    authors: {type: [String], required: true}
}, {
    timestamps : true
});

BookSchema.post<IBook>('save', () => {
    logging.info('Mongo', 'Check out the Book we just saved', this);
});

export default mongoose.model<IBook>('Book', BookSchema);