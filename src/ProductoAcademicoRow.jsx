import ProductoAcademicoNota from "./ProductoAcademicoNota";
import ProductoAcademicoCard from "./ProductoAcademicoCard";
import "./ProductoAcademicoRow.css";

import AddIcon from '@mui/icons-material/Add';

const ProductoAcademicoRow = ({index, dispatch, id, porcentaje, productos}) => {

    const handleAddProdAcad = () => dispatch({type: "addProdAcad", payload: index});
    const handleNotaActions = {
        handleRowUp: () => dispatch({type: "clickRowUp", payload: id}),
        handleRowDown: () => dispatch({type: "clickRowDown", payload: id}),
        handleDeleteRow: () => dispatch({type: "deleteRow", payload: id})
    }

    return (
        <div className="row">
            <ProductoAcademicoNota index={index} porcentaje={porcentaje} {...handleNotaActions}/>
            {
                productos.map(producto =>
                    <ProductoAcademicoCard
                    key={producto.id}
                    {...producto}
                    />)
            }
            <button className="producto__add" onClick={handleAddProdAcad}>
                <AddIcon/>
            </button>
        </div>
    );
}

export default ProductoAcademicoRow;