import React, { useReducer } from 'react';

import { ProductoAcademicoContext } from './context/productoAcademicoContext';
import { ProductoAcademicoReducer } from './reducers/productoAcademicoReducer';

import { competencias } from './data/competencias';
import { generarEvaluacion } from './helpers/generar';

import { ProductoAcademicoGrid } from './components/ProductoAcademicoGrid';

const init = () => {
	return [generarEvaluacion()];
};

export const ProductoAcademicoApp = () => {
	const [evaluaciones, dispatch] = useReducer(
		ProductoAcademicoReducer,
		[],
		init
	);

	return (
		<ProductoAcademicoContext.Provider
			value={{ evaluaciones, dispatch, competencias }}
		>
			<ProductoAcademicoGrid />
		</ProductoAcademicoContext.Provider>
	);
};
