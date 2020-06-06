import {Injectable } from '@nestjs/common'
import {CreateNoteDto} from './dto/createNotesDto';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Note} from './schemas/note.schema';


@Injectable()
export class NoteService {
    constructor(@InjectModel(Note.name) private noteModel: Model<Note>){}
    readonly notes: CreateNoteDto[] = []

    create(note: CreateNoteDto): Promise<Note> {
        note.slug = note.name.replace(/\s/g, "-").toLowerCase();
        const createdNote = new this.noteModel(note);
        return createdNote.save();
    }

    findAll(): Promise<Note[]> {
        return this.noteModel.find().exec();
    }

    findOne(slug): Promise<Note> {
        return this.noteModel.findOne({
            slug: slug
        }).exec();
    }

    updateOne(id, data): Promise<Note> {
        return this.noteModel.findByIdAndUpdate({_id: id}, data).exec()
    }

    deleteOne (id): Promise<Note> {
        return this.noteModel.findByIdAndDelete({_id:id}).exec();
    }
}