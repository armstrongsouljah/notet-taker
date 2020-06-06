import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Note extends Document {
    @Prop({required: true})
    name : string
    
    @Prop({required: true})
    description: string

    @Prop({required: true})
    slug: string
}

export const NoteSchema = SchemaFactory.createForClass(Note);
