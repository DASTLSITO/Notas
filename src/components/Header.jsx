import { useContext } from "react";
import NotesContext from "../context/NotesContext";

const Header = ({ mostrarAside }) => {
	const { addNote } = useContext(NotesContext);

	return (
		<header className="header">
			<div className="contenedor-logo">
				<button className="bars" onClick={mostrarAside}>
					<i className="fas fa-bars"></i>
				</button>
				<a
					className="github logo"
					rel="noreferrer"
					title="Ir a mi github :)"
					target="_BLANK"
					href="https://github.com/DASTLSITO"
				>
					<i className="fab fa-github"></i>
				</a>
				<p className="nombre logo">Notas</p>
			</div>
			<div className="contenedor-opciones">
				<button className="añadir" onClick={addNote}>
					Añadir nota
				</button>
			</div>
		</header>
	);
};

export default Header;
