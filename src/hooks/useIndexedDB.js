import { useEffect } from "react";

export const useIndexedDB = (setNotes) => {
	let IDBRequest = indexedDB.open("tareas", 1);

	const getIDBData = (modo) => {
		const db = IDBRequest.result;
		const IDBTransaction = db.transaction("informacion", modo);
		const objectStore = IDBTransaction.objectStore("informacion");
		IDBTransaction.addEventListener("complete", () => {});
		return objectStore;
	};

	const leerTareas = () => {
		let note = [];
		const IDBData = getIDBData("readonly");
		const cursor = IDBData.openCursor();
		cursor.addEventListener("success", () => {
			if (cursor.result) {
				let nota = {
					titulo: cursor.result.value.titulo,
					descripcion: cursor.result.value.descripcion,
					texto: cursor.result.value.texto,
					key: cursor.result.key,
				};

				note.push(nota);

				cursor.result.continue();
			} else {
				setNotes({ type: "ADD_ALL", newState: note });
			}
		});
	};

	const modificarTarea = (objeto, key) => {
		const IDBData = getIDBData("readwrite");
		IDBData.put(objeto, key);
		leerTareas();
	};

	const añadirTareaDB = (objeto) => {
		const IDBData = getIDBData("readwrite");
		IDBData.add(objeto);
	};

	const eliminarTareas = (key) => {
		const IDBData = getIDBData("readwrite");
		IDBData.delete(key);
	};

	useEffect(() => {
		IDBRequest.addEventListener("upgradeneeded", () => {
			console.log("Creada correctamente");
			const db = IDBRequest.result;
			db.createObjectStore("informacion", {
				autoIncrement: true,
			});
		});

		IDBRequest.addEventListener("success", () => {
			leerTareas();
		});

		IDBRequest.addEventListener("error", () => {
			console.log("Error");
		});
	}, []);

	return { leerTareas, añadirTareaDB, modificarTarea, eliminarTareas };
};
