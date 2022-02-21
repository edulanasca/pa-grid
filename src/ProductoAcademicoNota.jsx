import './ProductoAcademicoNota.css';
import { useContext, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { ProductoAcademicoContext } from './store/productoAcademico/productoAcademicoContext';

const ProductoAcademicoNota = ({ index, porcentaje, id }) => {
	const { dispatch } = useContext(ProductoAcademicoContext);

	const [toggle, setToggle] = useState(false);
	const [ptj, setPtj] = useState();

	useEffect(() => {
		setPtj(porcentaje);
	}, [porcentaje]);

	const handleRowUp = () => dispatch({ type: 'rowUp', payload: id });
	const handleRowDown = () => dispatch({ type: 'rowDown', payload: id });
	const handleDeleteRow = () => dispatch({ type: 'deleteRow', payload: id });

	function comprobarPtj(event) {
		if (Number(event.target.value) > 100) setPtj(100);

		setToggle(false);
		event.preventDefault();
		event.stopPropagation();
	}

	const handleKeyDown = event => {
		if (event.key === 'Enter' || event.key === 'Escape')
			comprobarPtj(event);
	};

	const handleBlur = event => comprobarPtj(event);

	return (
		<div className="card__nota">
			<IconButton color="error" onClick={handleDeleteRow}>
				<CloseIcon />
			</IconButton>
			<p>Nota {index + 1}</p>
			<svg
				onClick={handleRowUp}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
			</svg>
			{toggle ? (
				<div className="toggle__porcentaje">
					<input
						autoFocus={true}
						type="text"
						value={ptj}
						onBlur={handleBlur}
						onChange={event => setPtj(Number(event.target.value))}
						onKeyDown={handleKeyDown}
					/>
					<p> %</p>
				</div>
			) : (
				<p onDoubleClick={() => setToggle(true)}>
					{ptj < 0 ? 0 : ptj} %
				</p>
			)}
			<svg
				onClick={handleRowDown}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
			</svg>
		</div>
	);
};

export default ProductoAcademicoNota;
