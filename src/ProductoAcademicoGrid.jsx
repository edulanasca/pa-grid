import { useEffect, useReducer, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';

import { ProductoAcademicoReducer } from './store/productoAcademico/productoAcademicoReducer';

import './ProductoAcademicoGrid.css';

import ProductoAcademicoRow from './ProductoAcademicoRow';
import { generarEvaluacion, generarProducto } from './utils/helpers/generar';
import { ProductoAcademicoContext } from './store/productoAcademico/productoAcademicoContext';
import { competencias } from './data/competencias';
import { types } from './types/types';

export const ProductoAcademicoGrid = () => {
	const init = () => {
		return [generarEvaluacion()];
	};

	const [evaluaciones, dispatch] = useReducer(
		ProductoAcademicoReducer,
		[],
		init
	);
	const [totalPorcentajeEval, setTotalPorcentajeEval] = useState();

	useEffect(() => {
		setTotalPorcentajeEval(
			evaluaciones.reduce((total, e) => total + e.porcentaje, 0)
		);
	}, [evaluaciones]);

	const handleAddRow = () => {
		const action = {
			type: types.addRow,
			payload: generarEvaluacion()
		};

		dispatch(action);
	};

	return (
		// <ProductoAcademicoContext.Provider value={{ evaluaciones, dispatch }}>
		<ProductoAcademicoContext.Provider value={{ dispatch, competencias }}>
			{evaluaciones.map((evaluacion, index) => (
				<ProductoAcademicoRow
					key={evaluacion.id}
					index={index}
					dispatch={dispatch}
					{...evaluacion}
				/>
			))}

			<button className="row__add" onClick={handleAddRow}>
				<AddIcon />
			</button>

			<p>
				{totalPorcentajeEval > 100
					? `Hay un ${totalPorcentajeEval - 100}% sobrante`
					: ''}
			</p>

			<button onClick={() => console.log(evaluaciones)}>Guardar</button>
		</ProductoAcademicoContext.Provider>
	);
};
