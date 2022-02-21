import { useEffect, useReducer, useState } from 'react';

import ObjectID from 'bson-objectid';

import AddIcon from '@mui/icons-material/Add';

import './ProductoAcademicoGrid.css';

import ProductoAcademicoRow from './ProductoAcademicoRow';

const ProductoAcademicoGrid = () => {
	const reducer = (evaluaciones, action) => {
		console.log(':DDDD');
		switch (action.type) {
			case 'addRow':
				return recalculoPorcentaje([
					...evaluaciones,
					generarEvaluacion()
				]);
			case 'deleteRow':
				return recalculoPorcentaje(
					evaluaciones.filter(e => e.id !== action.payload)
				);
			case 'addProdAcad':
				const ix = action.payload;
				return [
					...evaluaciones.slice(0, ix),
					{
						...evaluaciones[ix],
						productos: [
							...evaluaciones[ix].productos,
							generarProducto()
						]
					},
					...evaluaciones.slice(ix + 1, evaluaciones.length)
				];
			case 'clickRowUp':
				return recalculoPorcentaje(
					evaluaciones.map(evaluacion => {
						if (evaluacion.id === action.payload) {
							const newPorcentaje = evaluacion.porcentaje + 10;
							return {
								...evaluacion,
								hasChanged: true,
								porcentaje:
									newPorcentaje > 100 ? 100 : newPorcentaje
							};
						}

						return evaluacion;
					})
				);
			case 'clickRowDown':
				return recalculoPorcentaje(
					evaluaciones.map(evaluacion => {
						if (evaluacion.id === action.payload) {
							const newPorcentaje = evaluacion.porcentaje - 10;
							return {
								...evaluacion,
								hasChanged: true,
								porcentaje:
									newPorcentaje < 0 ? 0 : newPorcentaje
							};
						}

						return evaluacion;
					})
				);
			default:
				throw new Error();
		}
	};

	const [evaluaciones, dispatch] = useReducer(reducer, [generarEvaluacion()]);
	const [totalPorcentajeEval, setTotalPorcentajeEval] = useState();

	useEffect(() => {
		setTotalPorcentajeEval(
			evaluaciones.reduce((total, e) => total + e.porcentaje, 0)
		);

		const totalPorcentaje = evaluaciones.reduce((total, evaluacion) => {
			return total + evaluacion.porcentaje;
		}, 0);

		console.log(totalPorcentaje);
	}, [evaluaciones]);

	function generarEvaluacion() {
		return {
			id: new ObjectID().toHexString(),
			hasChanged: false,
			porcentaje: 100,
			productos: [generarProducto()]
		};
	}

	function generarProducto() {
		return {
			id: new ObjectID().toHexString(),
			nombre: 'Producto Académico',
			hasChanged: false,
			porcentaje: 100,
			competencias: [],
			metodoEval: '',
			rubrica: {
				nombre: '',
				criterios: [
					{
						titulo: '',
						descripcion: '',
						niveles: [
							{
								titulo: '',
								descripcion: '',
								puntaje: 0
							}
						]
					}
				]
			}
		};
	}

	function recalculoPorcentaje(evals) {
		const evaluacionesChanged = evals.filter(e => e.hasChanged);
		const sumPorcentajesNotChanged =
			100 -
			evaluacionesChanged.reduce((total, e) => total + e.porcentaje, 0);
		const totalNotChanged = evals.length - evaluacionesChanged.length;
		const porcentajeLeft = round(
			sumPorcentajesNotChanged / totalNotChanged
		);

		console.log(':D');

		return evals.map(e => {
			if (!e.hasChanged) e.porcentaje = porcentajeLeft;
			return e;
		});
	}

	function round(num) {
		let m = Number((Math.abs(num) * 100).toPrecision(15));
		return (Math.round(m) / 100) * Math.sign(num);
	}

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

			<button
				className="row__add"
				onClick={() => dispatch({ type: 'addRow' })}
			>
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

export default ProductoAcademicoGrid;
