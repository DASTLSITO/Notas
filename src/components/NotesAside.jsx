import React, { useContext } from "react";
import NotesContext from "../context/NotesContext";

const NotesAside = ({ note }) => {
	const { setNote } = useContext(NotesContext);

	const setArticle = () => {
		setNote({ type: "SET_NOTE", note });
	};

	return (
		<button className="contenedor-tarea" onClick={setArticle}>
			<p className="titulo-tarea">{note.titulo}</p>
			<p className="descripcion-tarea">{note.descripcion}</p>
		</button>
	);
};

export default NotesAside;
