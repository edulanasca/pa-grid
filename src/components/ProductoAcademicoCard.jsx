import { useState } from 'react';

import './ProductoAcademicoCard.css';

import ProductoAcademicoCardMenu from './ProductoAcademicoCardMenu';
import ProductoAcademicoDetalle from './ProductoAcademicoDetalle';

const ProductoAcademicoCard = ({ nombre, porcentaje }) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div className="card">
			<header className="card__header">
				<p>{nombre}</p>
				<ProductoAcademicoCardMenu />
			</header>

			<h2>{porcentaje} %</h2>

			<button onClick={handleOpen}>Ver detalles</button>
			<ProductoAcademicoDetalle
				nombre={nombre}
				open={open}
				handleClose={handleClose}
			/>
		</div>
	);
};

export default ProductoAcademicoCard;
