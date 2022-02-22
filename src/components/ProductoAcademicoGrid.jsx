import { useEffect, useState, useContext } from 'react';

import { ProductoAcademicoContext } from '../context/productoAcademicoContext';

import { generarEvaluacion } from '../helpers/generar';
import { types } from '../types/productoAcademicoTypes';

import './ProductoAcademicoGrid.css';

import AddIcon from '@mui/icons-material/Add';

import ProductoAcademicoRow from './ProductoAcademicoRow';

export const ProductoAcademicoGrid = () => {
	const { evaluaciones, dispatch } = useContext(ProductoAcademicoContext);
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
		<>
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
		</>
	);
};
