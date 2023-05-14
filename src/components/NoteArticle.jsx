import React, { useContext, useEffect, useRef } from "react";
import NotesContext from "../context/NotesContext";

const NoteArticle = () => {
	const { note, setNote, saveNote, deleteData } = useContext(NotesContext);

	//tamaños iniciales de los textareas
	const sizes = {
		titulo: 60,
		descripcion: 55,
		texto: 50,
	};

	const titulo = useRef(),
		descripcion = useRef(),
		texto = useRef();

	//funcion que se ejecuta cuando hay cambios en los textareas
	const handleChange = (e) => {
		setNote({
			type: "CHANGE_NOTE",
			change_value: e.target.value,
			change_name: e.target.name,
		});

		//Textarea rezisable
		let textArea = document.querySelector(`.${e.target.className}`);

		textArea.style.height = `${sizes[e.target.name]}px`;
		textArea.style.height = `${e.target.scrollHeight}px`;

		//Dar color boton
		if (
			titulo.current.value.length > 0 &&
			descripcion.current.value.length > 0 &&
			texto.current.value.length > 0
		)
			document.querySelector(".guardar-tarea").classList.add("posible");
		else document.querySelector(".guardar-tarea").classList.remove("posible");
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		//Evitar que guarde una nota vacia
		if (
			titulo.current.value.length > 0 &&
			descripcion.current.value.length > 0 &&
			texto.current.value.length > 0
		)
			saveNote();
	};

	//useEffect para los cambios de tarea
	useEffect(() => {
		const tituloArticle = document.querySelector(`.titulo-tarea__texto`);
		const descripcionArticle = document.querySelector(
			`.descripcion-tarea__texto`,
		);
		const cuerpoArticle = document.querySelector(`.contenido-tarea__texto`);

		tituloArticle.style.height = `${sizes.titulo}px`;
		descripcionArticle.style.height = `${sizes.descripcion}px`;
		cuerpoArticle.style.height = `${sizes.texto}px`;

		tituloArticle.style.height = `${tituloArticle.scrollHeight}px`;
		descripcionArticle.style.height = `${descripcionArticle.scrollHeight}px`;
		cuerpoArticle.style.height = `${cuerpoArticle.scrollHeight}px`;

		document.querySelector(".guardar-tarea").classList.remove("posible");
	}, [note.key]);

	return (
		<form onSubmit={handleSubmit} className="contenedor-tarea__texto">
			<div className="contenedor-tarea-main">
				<textarea
					type="textarea"
					className="titulo-tarea__texto"
					onChange={handleChange}
					name="titulo"
					ref={titulo}
					placeholder="Titulo..."
					value={note.titulo}
				/>
				<textarea
					type="text"
					className="descripcion-tarea__texto"
					onChange={handleChange}
					name="descripcion"
					ref={descripcion}
					placeholder="Descripción..."
					value={note.descripcion}
				/>
				<textarea
					type="text"
					className="contenido-tarea__texto"
					onChange={handleChange}
					name="texto"
					ref={texto}
					placeholder="Cuerpo..."
					value={note.texto}
				/>
			</div>
			<div className="contenedor-boton-main">
				<input type="submit" className="guardar-tarea" value="Guardar nota" />
				<button className="borrar-tarea" onClick={deleteData}>
					Borrar nota
				</button>
			</div>
		</form>
	);
};

export default NoteArticle;
