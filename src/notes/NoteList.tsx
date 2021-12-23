import { FC, ReactElement, useRef, useEffect, useState, HtmlHTMLAttributes } from 'react';
import { CreateNoteDTO, Client, NoteLookupDTO } from '../api/api';
import { FormControl } from 'react-bootstrap';

const apiClient = new Client('https://localhost:44381')

async function createNote(note: CreateNoteDTO) {
    await apiClient.create('1.0', note);
    console.log('Note is created.');
}

const NoteList: FC<{}> = (): ReactElement => {
    let textInput = useRef(null);
    const [notes, setNotes] = 
        useState<NoteLookupDTO[] | undefined>(undefined);

    async function getNotes() {
        const noteListVm = await apiClient.getAll('1.0');
        setNotes(noteListVm.notes);
    }

    useEffect(() => {
        getNotes();
    }, []);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            const note: CreateNoteDTO = {
                title: event.currentTarget.value
            };
            createNote(note);
            event.currentTarget.value = '';
            getNotes();
        }
    };
    return (
        <div>
            Notes
            <div>
                <FormControl ref={textInput} onKeyPress={handleKeyPress}/>
            </div>
            <div>
                {notes?.map(note => (
                    <div>{note.title}</div>
                ))}
            </div>
        </div>
    );
};
export default NoteList;