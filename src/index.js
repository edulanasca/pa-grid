import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { competencias } from './data/competencias';

import { ProductoAcademicoContext } from './store/productoAcademico/productoAcademicoContext';
import ProductoAcademicoGrid from './ProductoAcademicoGrid';

ReactDOM.render(
	<ProductoAcademicoContext.Provider value={competencias}>
		<ProductoAcademicoGrid />
	</ProductoAcademicoContext.Provider>,
	document.getElementById('root')
);
