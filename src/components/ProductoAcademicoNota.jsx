import {useContext, useEffect, useState} from 'react';

import {ProductoAcademicoContext} from '../context/productoAcademicoContext';

import './ProductoAcademicoNota.css';

import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import CloseIcon from '@mui/icons-material/Close';
import {Box, Button, IconButton, Typography} from '@mui/material';

const ProductoAcademicoNota = ({index, porcentaje, id}) => {
  const {dispatch} = useContext(ProductoAcademicoContext);

  const [toggle, setToggle] = useState(false);
  const [ptj, setPtj] = useState();

  useEffect(() => {
    setPtj(porcentaje);
  }, [porcentaje]);

  const handleRowUp = () => dispatch({type: 'rowUp', payload: id});
  const handleRowDown = () => dispatch({type: 'rowDown', payload: id});
  const handleDeleteRow = () => dispatch({type: 'deleteRow', payload: id});

  function comprobarPtj(event) {
    event.preventDefault();
    event.stopPropagation();
    if (Number(event.target.value) > 100) setPtj(100);
    setToggle(false);
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === 'Escape')
      comprobarPtj(event);
  };

  const handleBlur = event => comprobarPtj(event);

  return (
    <Box sx={{
      height: '170px',
      bgcolor: 'white',
      borderRadius: 5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      p: 2,
    }}>
      <Button variant="outlined"
              color="error"
              onClick={handleDeleteRow}
              sx={{
                bgcolor: '#FFDED3',
                minWidth: '0px',
                position : 'absolute',
                p:0.1,
                top: '5px',
                left: '75px'}
      }>
        <CloseIcon fontSize="small"/>
      </Button>
      <Typography>
        Nota {index + 1}
      </Typography>
      <IconButton onClick={handleRowUp} sx={{p: 0.5}}>
        <ArrowDropUpRoundedIcon fontSize="large"/>
      </IconButton>
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
        <Typography onDoubleClick={() => setToggle(true)}>
          {ptj < 0 ? 0 : ptj}%
        </Typography>
      )}
      <IconButton onClick={handleRowDown} sx={{p: 0.5}}>
        <ArrowDropDownRoundedIcon fontSize="large"/>
      </IconButton>
    </Box>
  );
};

export default ProductoAcademicoNota;
