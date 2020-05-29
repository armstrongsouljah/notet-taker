import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import {CreateNoteDto} from './dto/createNotesDto';

const notes: Array<any> = [];

@Controller('notes')
export class NotesController {
   @Get()
   findAll() {
       return {
           message: 'Listing notes',
           notes: notes
       }
   }

   @Get(':idstring')
   findOne(@Param() param): object {
        return {
            message: `Found ${param.idstring}`
        }
   }

   @Post('create')
   create(@Body() noteCreateDto: CreateNoteDto) {
       return {
           message: 'Saving Note',
           name: noteCreateDto.name,
           description: noteCreateDto.description,
           idstring: noteCreateDto.idstring
       }
   }

   @Put(':idstring')
   updateOne(@Param() params, @Body() updateDto: CreateNoteDto) {
        return {
            message: `Updating note ${params.idstring}`,
            name: updateDto.name,
            description: updateDto.description,
            idstring: updateDto.idstring
        }
   }

   @Delete(':idstring')
   findAndDelete(@Param() params) {
       return {
           message: `Successfully deleted ${params.idstring}`
       }
   }
}
