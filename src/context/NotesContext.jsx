import { createContext, useReducer } from "react";
import { useIndexedDB } from "../hooks/useIndexedDB";
import { notesReducer } from "../reducers/notesReducer";
import { noteReducer } from "../reducers/noteReducer";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
	const [note, setNote] = useReducer(noteReducer);
	const [notes, setNotes] = useReducer(notesReducer, []);
	let { leerTareas, añadirTareaDB, modificarTarea, eliminarTareas } =
		useIndexedDB(setNotes);

	const addNote = () => {
		setNotes({ type: "ADD_NOTE", añadirTareaDB, leerTareas });
	};

	const saveNote = () => {
		setNote({ type: "SAVE_NOTE", modificarTarea });
	};

	const deleteData = () => {
		setNote({ type: "DELETE_NOTE", eliminarTareas, setNote, leerTareas });
	};

	const data = { addNote, saveNote, deleteData, note, setNote, notes };

	return <NotesContext.Provider value={data}>{children}</NotesContext.Provider>;
};

export { NotesProvider };
export default NotesContext;
