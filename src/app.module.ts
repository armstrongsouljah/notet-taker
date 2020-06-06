import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesController } from './notes/notes.controller';
import {NoteService} from './notes/notes.service'; 
import {ConfigModule, ConfigService} from '@nestjs/config';
import { NotesModule } from './notes/notes.module';
import {MongooseModule } from '@nestjs/mongoose';
import {Note, NoteSchema} from './notes/schemas/note.schema';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, }),
    NotesModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
          uri: configService.get('DATABASE_URL')
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([{
      name: Note.name,
      schema: NoteSchema
  }],
  )
  ],
  controllers: [AppController, NotesController],
  providers: [AppService, NoteService,],
})
export class AppModule {
  constructor(private configService: ConfigService){}
}
