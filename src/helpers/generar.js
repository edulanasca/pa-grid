import ObjectID from 'bson-objectid';

export const generarEvaluacion = () => {
	return {
		id: new ObjectID().toHexString(),
		hasChanged: false,
		porcentaje: 100,
		productos: [generarProducto()]
	};
};

export const generarProducto = () => {
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
};
