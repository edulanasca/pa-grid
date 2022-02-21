import {createContext, useEffect, useReducer, useState} from "react";
import ProductoAcademicoRow from "./ProductoAcademicoRow";
import ObjectID from "bson-objectid";
import "./ProductoAcademicoGrid.css";

import AddIcon from '@mui/icons-material/Add';

const competencias = [
    {
        "id": "6211132d00489e4ebee43343",
        "cursoId": "61e0e2dc96bebc981003a490",
        "nombre": "Aplica conocimientos a la práctica para resolver problemas con compromiso ético",
        "especificas": [
            {
                "id": "6211132d00489e4ebee4333f",
                "nombre": "Desarrollo ético"
            },
            {
                "id": "6211132d00489e4ebee43340",
                "nombre": "Pensamiento Crítico"
            },
            {
                "id": "6211132d00489e4ebee43341",
                "nombre": "Desarrolla y mantiene soluciones de software con actitud innovadora"
            },
            {
                "id": "6211132d00489e4ebee43342",
                "nombre": "Aplica metodologías, métodos, técnicas y herramientas de Ingeniería de software"
            }
        ]
    },
    {
        "id": "6211132d00489e4ebee4333b",
        "cursoId": "61e0e2dc96bebc981003a490",
        "nombre": "Gestiona la información y la difusión de conocimientos con adecuada comunicación oral y escrita de la propia profesión, ejerciendo el derecho de libertad de pensamiento con responsabilidad",
        "especificas": [
            {
                "id": "6211132d00489e4ebee43339",
                "nombre": " Comunicación oral y escrita"
            },
            {
                "id": "6211132d00489e4ebee4333a",
                "nombre": "Capacidad de Análisis"
            }
        ]
    },
    {
        "id": "6211132d00489e4ebee4333e",
        "cursoId": "61e0e2dc96bebc981003a490",
        "nombre": "Capacidad de análisis y síntesis en la toma de decisiones con responsabilidad, sentido crítico y autocrítico",
        "especificas": [
            {
                "id": "6211132d00489e4ebee4333c",
                "nombre": "Capacidad de Análisis"
            },
            {
                "id": "6211132d00489e4ebee4333d",
                "nombre": "Pensamiento Crítico"
            }
        ]
    }
];
export const CompContext = createContext(competencias);

const ProductoAcademicoGrid = () => {
    const reducer = (evaluaciones, action) => {
        switch (action.type) {
            case 'addRow':
                return recalculoPorcentaje([...evaluaciones, generarEvaluacion()]);
            case 'deleteRow':
                return recalculoPorcentaje(evaluaciones.filter(e => e.id !== action.payload));
            case 'addProdAcad':
                const ix = action.payload;
                return [
                    ...evaluaciones.slice(0, ix),
                    {
                        ...evaluaciones[ix],
                        productos: [...evaluaciones[ix].productos, generarProducto()]
                    },
                    ...evaluaciones.slice(ix + 1, evaluaciones.length)
                ];
            case 'clickRowUp':
                return recalculoPorcentaje(evaluaciones.map(evaluacion => {
                    if (evaluacion.id === action.payload) {
                        const newPorcentaje = evaluacion.porcentaje + 10;
                        return {
                            ...evaluacion,
                            hasChanged: true,
                            porcentaje: newPorcentaje > 100 ? 100 : newPorcentaje
                        }
                    }

                    return evaluacion;
                }));
            case 'clickRowDown':
                return recalculoPorcentaje(evaluaciones.map(evaluacion => {
                    if (evaluacion.id === action.payload) {
                        const newPorcentaje = evaluacion.porcentaje - 10;
                        return {
                            ...evaluacion,
                            hasChanged: true,
                            porcentaje: newPorcentaje < 0 ? 0 : newPorcentaje
                        }
                    }

                    return evaluacion;
                }));
            default:
                throw new Error();
        }
    }

    const [evaluaciones, dispatch] = useReducer(reducer, [generarEvaluacion()]);
    const [totalPorcentajeEval, setTotalPorcentajeEval] = useState();

    useEffect(() => {
        setTotalPorcentajeEval(evaluaciones.reduce((total, e) => total + e.porcentaje, 0));
    }, [evaluaciones]);

    function generarEvaluacion() {
        return {
            id: new ObjectID().toHexString(),
            hasChanged: false,
            porcentaje: 100,
            productos: [generarProducto()]
        }
    }

    function generarProducto() {
        return {
            id: new ObjectID().toHexString(),
            nombre: "Producto Académico",
            hasChanged: false,
            porcentaje: 100,
            competencias: [],
            metodoEval: "",
            rubrica: {
                nombre: "",
                criterios: [{
                    titulo: "",
                    descripcion: "",
                    niveles: [{
                        titulo: "",
                        descripcion: "",
                        puntaje: 0
                    }]
                }]
            }
        }
    }

    function recalculoPorcentaje(evals) {
        const evaluacionesChanged = evals.filter(e => e.hasChanged);
        const sumPorcentajesNotChanged = 100 - evaluacionesChanged.reduce((total, e) => total + e.porcentaje, 0);
        const totalNotChanged = evals.length - evaluacionesChanged.length;
        const porcentajeLeft = round(sumPorcentajesNotChanged / totalNotChanged);

        return evals.map(e => {
            if (!e.hasChanged) e.porcentaje = porcentajeLeft;
            return e;
        })
    }

    function round(num) {
        let m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
    }

    return (
        <CompContext.Provider value={competencias}>
            {
                evaluaciones.map((evaluacion, index) =>
                    <ProductoAcademicoRow
                        key={evaluacion.id}
                        index={index}
                        dispatch={dispatch}
                        {...evaluacion}
                    />
                )
            }
            <button className="row__add" onClick={() => dispatch({type: "addRow"})}>
                <AddIcon/>
            </button>
            <p>{totalPorcentajeEval > 100 ? `Hay un ${totalPorcentajeEval - 100}% sobrante` : ""}</p>
            <button onClick={() => console.log(evaluaciones)}>Guardar</button>
        </CompContext.Provider>
    );
}

export default ProductoAcademicoGrid;