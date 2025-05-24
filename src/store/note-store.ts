import { create } from 'zustand';

interface Note {
  id: string;
  title: string;
  body: string;
  slug: string;
  category: string;
  created: Date;
  updated: Date;
}

interface NoteStore {
  allNotes: Note[];
  setAllNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  updateNote: (slug: string, updatedNote: Partial<Note>) => void;
  deleteNote: (slug: string) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  allNotes: [],
  setAllNotes: (notes) => set({ allNotes: notes }),
  addNote: (note) => set((state) => ({ allNotes: [note, ...state.allNotes] })),
  updateNote: (id, updatedNote) =>
    set((state) => ({
      allNotes: state.allNotes.map((note) =>
        note.id === id ? { ...note, ...updatedNote } : note
      ),
    })),
  deleteNote: (slug) =>
    set((state) => ({
      allNotes: state.allNotes.filter((note) => note.slug !== slug),
    })),
}));
