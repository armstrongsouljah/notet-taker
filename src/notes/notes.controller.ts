import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import {CreateNoteDto} from './dto/createNotesDto';
import {NoteService} from './notes.service';
import {ConfigService} from '@nestjs/config';

@Controller('notes')
export class NotesController {
    constructor(private noteService: NoteService, private configService: ConfigService){}
   @Get()
   async findAll() {
       
       const notes = await this.noteService.findAll()
       return {
           notes
       }
   }

   @Get(':slug')
   async findOne(@Param() param) {
        const foundNote = await this.noteService.findOne(param.slug)
        if(foundNote == null) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        return {
            data: foundNote
        }
   }

   @Post('create')
   create(@Body() noteCreateDto: CreateNoteDto) {
    return this.noteService.create(noteCreateDto)
   }

   @Put(':slug')
   async updateOne(@Param() params, @Body() updateDto: CreateNoteDto) {
        const noteToUpdate = await this.noteService.findOne(params.slug)
        if(noteToUpdate == null) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        return this.noteService.updateOne(noteToUpdate.id, updateDto);
   }

   @Delete(':slug')
   async findAndDelete(@Param() params) {
       const noteToDelete = await this.noteService.findOne(params.slug);
       if(noteToDelete == null) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)

       const deletedNote = await this.noteService.deleteOne(noteToDelete.id)
       if(deletedNote == null) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)

       return {
           message: "Noted deleted successfully"
       }
   }
}
