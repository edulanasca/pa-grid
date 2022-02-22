export const calcularPorcentaje = evaluaciones => {
	const evaluacionesChanged = evaluaciones.filter(e => e.hasChanged);
	const sumPorcentajesNotChanged =
		100 - evaluacionesChanged.reduce((total, e) => total + e.porcentaje, 0);
	const totalNotChanged = evaluaciones.length - evaluacionesChanged.length;
	const porcentajeLeft = round(sumPorcentajesNotChanged / totalNotChanged);

	return evaluaciones.map(e => {
		if (!e.hasChanged) e.porcentaje = porcentajeLeft;
		return e;
	});
};

const round = num => {
	let m = Number((Math.abs(num) * 100).toPrecision(15));
	return (Math.round(m) / 100) * Math.sign(num);
};
