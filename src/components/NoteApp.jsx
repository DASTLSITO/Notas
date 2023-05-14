import React from "react";
import { NotesProvider } from "../context/NotesContext";
import Header from "./Header";
import Main from "./Main";

const NoteApp = () => {
	const mostrarAside = () => {
		document.querySelector(".aside").classList.toggle("visible");
	};

	return (
		<NotesProvider>
			<Header mostrarAside={mostrarAside} />
			<Main />
		</NotesProvider>
	);
};

export default NoteApp;
