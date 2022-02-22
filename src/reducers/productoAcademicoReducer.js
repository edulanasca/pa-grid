import { types } from '../types/productoAcademicoTypes';
import {
	addProdAcad,
	addRow,
	deleteRow,
	rowDown,
	rowUp
} from '../actions/productoAcademicoActions';

export const ProductoAcademicoReducer = (state = {}, action) => {
	switch (action.type) {
		case types.addRow:
			return addRow([...state, action.payload]);
		case types.deleteRow:
			return deleteRow(state, action.payload);
		case types.addProdAcad:
			return addProdAcad(state, action.payload);
		case types.rowUp:
			return rowUp(state, action.payload);
		case types.rowDown:
			return rowDown(state, action.payload);

		default:
			return state;
	}
};
