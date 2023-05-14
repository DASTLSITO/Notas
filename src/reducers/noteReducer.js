import { TYPES } from "../actions/noteActions";

export const noteReducer = (state, action) => {
	switch (action.type) {
		case TYPES.SET_NOTE:
			document.querySelector(".aside").classList.toggle("visible");
			return action.note;

		case TYPES.SAVE_NOTE:
			action.modificarTarea(
				{
					titulo: state.titulo,
					descripcion: state.descripcion,
					texto: state.texto,
				},
				state.key,
			);

			return state;

		case TYPES.CHANGE_NOTE:
			return { ...state, [action.change_name]: action.change_value };

		case TYPES.DELETE_NOTE:
			action.eliminarTareas(state.key);
			action.leerTareas();
			return null;

		default:
			break;
	}
};
