import { calcularPorcentaje } from '../helpers/calcularPorcentaje';
import { generarProducto } from '../helpers/generar';

const addRow = state => calcularPorcentaje(state);

const deleteRow = (state, deletedRowId) => {
	const updatedState = state.filter(({ id }) => id !== deletedRowId);
	return calcularPorcentaje(updatedState);
};

const addProdAcad = (state, index) => {
	const ix = index;
	return [
		...state.slice(0, ix),
		{
			...state[ix],
			productos: [...state[ix].productos, generarProducto()]
		},
		...state.slice(ix + 1, state.length)
	];
};

const rowUp = (state, id) =>
	calcularPorcentaje(
		state.map(evaluacion => {
			if (evaluacion.id === id) {
				const newPorcentaje = evaluacion.porcentaje + 10;
				return {
					...evaluacion,
					hasChanged: true,
					porcentaje: newPorcentaje > 100 ? 100 : newPorcentaje
				};
			}

			return evaluacion;
		})
	);

const rowDown = (state, id) =>
	calcularPorcentaje(
		state.map(evaluacion => {
			if (evaluacion.id === id) {
				const newPorcentaje = evaluacion.porcentaje - 10;
				return {
					...evaluacion,
					hasChanged: true,
					porcentaje: newPorcentaje < 0 ? 0 : newPorcentaje
				};
			}

			return evaluacion;
		})
	);

export { addRow, deleteRow, addProdAcad, rowUp, rowDown };
