import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesController } from './notes/notes.controller';
import {NoteService} from './notes/notes.service'; 

@Module({
  imports: [],
  controllers: [AppController, NotesController],
  providers: [AppService, NoteService],
})
export class AppModule {}
