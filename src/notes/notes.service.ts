import {Injectable } from '@nestjs/common'
import {CreateNoteDto} from './dto/createNotesDto';

@Injectable()
export class NoteService {
    readonly notes: CreateNoteDto[] = []
    create(note: CreateNoteDto){
        const noteIndex = this.notes.find(item => item.name == note.name)
        if(noteIndex == undefined) {
            this.notes.push(note);
            return {
                message: "Note successfully added"
            }
        } else {
            return {
                message: "Note already exists",
                statusCode: 400
            }
        }
    }

    findAll(): CreateNoteDto[] {
        return this.notes;
    }

    findOne(noteString) {
       const note: CreateNoteDto = this.notes.find(item => item.idstring === noteString);
       if(note == undefined) return {message: "Note could not be found"}
       if(note != undefined) return {message: note}
    }

    deleteOne(notestring) {
        if(this.notes.length) return this.notes.filter(note => note.idstring !=notestring); 
        return "No notes to delete"
    }

    updateOne (noteString, updateBody ) {
        const noteIndex = this.notes.findIndex(item => item.idstring == noteString);
         if(noteIndex != -1){
             this.notes[noteIndex] = {...updateBody}
             return {message: "Updated successfully"}
         } else {return {message: "Could not find a note"}}

    }
}