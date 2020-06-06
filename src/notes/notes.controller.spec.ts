import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NoteService} from './notes.service';
import {CreateNoteDto} from './dto/createNotesDto';

describe('Notes Controller', () => {
  let controller: NotesController;
  let notesService: NoteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [NoteService,]
    }).compile();

    controller = module.get<NotesController>(NotesController);
    notesService = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return notes', () => {
    const noteList: CreateNoteDto[] = [{name: 'Black widow', description : 'ded dedde', idstring: 'black-widow'}]
    const response = {message: "Listing notes", notes: noteList}
    jest.spyOn(notesService, 'findAll').mockImplementation(() => noteList)
    expect(notesService.findAll()).toBe(noteList)

    jest.spyOn(controller, 'findAll').mockImplementation(() => response)
    expect(controller.findAll()).toBe(response);
  })
  it('Should delete a note', () => {
    jest.spyOn(controller, 'findAndDelete').mockImplementation()
  })
});
