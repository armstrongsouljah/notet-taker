import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import {CreateNoteDto} from './dto/createNotesDto';
import {NoteService} from './notes.service'; 

@Controller('notes')
export class NotesController {
    constructor(private noteService: NoteService){}
   @Get()
   findAll() {
       return {
           message: 'Listing notes',
           notes: this.noteService.findAll()
       }
   }

   @Get(':idstring')
   findOne(@Param() param): object {
        return {
            data: this.noteService.findOne(param.idstring)
        }
   }

   @Post('create')
   create(@Body() noteCreateDto: CreateNoteDto) {
    return this.noteService.create(noteCreateDto)
   }

   @Put(':idstring')
   updateOne(@Param() params, @Body() updateDto: CreateNoteDto) {
        return this.noteService.updateOne(params.idstring, updateDto);
   }

   @Delete(':idstring')
   findAndDelete(@Param() params) {
       return {
           message: this.noteService.deleteOne(params.idstring)
       }
   }
}
