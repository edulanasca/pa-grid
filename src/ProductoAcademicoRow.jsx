import ProductoAcademicoNota from './ProductoAcademicoNota';
import ProductoAcademicoCard from './ProductoAcademicoCard';
import './ProductoAcademicoRow.css';

import AddIcon from '@mui/icons-material/Add';
import { useContext } from 'react';
import { ProductoAcademicoContext } from './store/productoAcademico/productoAcademicoContext';
import { types } from './types/types';

const ProductoAcademicoRow = productoAcademico => {
	const { dispatch } = useContext(ProductoAcademicoContext);
	const { index, id, porcentaje, productos } = productoAcademico;

	const handleAddProdAcad = () => {
		dispatch({ type: types.addProdAcad, payload: index });
	};

	return (
		<div className="row">
			<ProductoAcademicoNota
				index={index}
				porcentaje={porcentaje}
				id={id}
			/>

			{productos.map(producto => (
				<ProductoAcademicoCard key={producto.id} {...producto} />
			))}

			<button className="producto__add" onClick={handleAddProdAcad}>
				<AddIcon />
			</button>
		</div>
	);
};

export default ProductoAcademicoRow;
