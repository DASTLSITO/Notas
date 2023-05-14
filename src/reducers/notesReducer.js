import { TYPES } from "../actions/notesActions";

export const noteInitialState = {
	titulo: "Titulo",
	descripcion: "Descripción",
	texto: "Cuerpo",
};

export const notesReducer = (state, action) => {
	switch (action.type) {
		case TYPES.ADD_ALL:
			return action.newState;
		case TYPES.ADD_NOTE:
			document.querySelector(".aside").classList.add("visible");
			action.añadirTareaDB(noteInitialState);
			action.leerTareas();
			return state;
		default:
			return state;
	}
};
