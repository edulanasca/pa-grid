import { types } from '../../types/types';

export const ProductoAcademicoReducer = (state = {}, action) => {
	switch (action.type) {
		case types.addRow:
			return {};
		case types.deleteRow:
			return {};
		case types.addProdAcad:
			return {};
		case types.rowUp:
			return {};
		case types.rowDown:
			return {};

		default:
			return state;
	}
};
