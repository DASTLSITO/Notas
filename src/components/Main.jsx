import { useContext } from "react";
import NotesContext from "../context/NotesContext";
import NoteArticle from "./NoteArticle";
import NotesAside from "./NotesAside";

const Main = () => {
	const { notes, note } = useContext(NotesContext);

	return (
		<main className="main">
			<aside className="aside">
				<div className="contenedor-tareas">
					{notes.map((note) => (
						<NotesAside note={note} key={note.key} />
					))}
					<div className="githubAside">
						<a
							rel="noreferrer"
							target="_BLANK"
							href="https://github.com/DASTLSITO"
						>
							<i className="fab fa-github" aria-hidden="true"></i>
						</a>
					</div>
				</div>
			</aside>

			<article className="article">
				<div className="contenedor-tareas__texto">
					{note && <NoteArticle />}
				</div>
			</article>
		</main>
	);
};

export default Main;
