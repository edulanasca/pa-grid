import {useContext, useState} from 'react';

import {ProductoAcademicoContext} from '../context/productoAcademicoContext';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  Fade,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ProductoAcademicoDetalle({
                                                   nombre,
                                                   open,
                                                   handleClose
                                                 }) {
  const {competencias} = useContext(ProductoAcademicoContext);
  const [competenciasEspecificas, setCompetenciasEspecificas] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCompetencia = (event, especificas) => {
    console.log(especificas);
    setCompetenciasEspecificas(especificas);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4
        }}>
          <Typography variant="h3" align="left">
            {nombre}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'left',
              marginTop: 2,
              marginBottom: 1
            }}
          >
            Competencias
          </Typography>
          {competencias.map(competencia => {
            return (
              <Accordion
                key={competencia.id}
                expanded={expanded === competencia.id}
                onChange={handleChange(competencia.id)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    {competencia.nombre}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {competencia.especificas.map(especifica => {
                    return (
                      <ToggleButtonGroup
                        key={especifica.id}
                        orientation="vertical"
                        value={competenciasEspecificas}
                        onChange={handleCompetencia}
                        aria-label="competencia especifica"
                      >
                        <ToggleButton
                          value={especifica.id}
                        >
                          {especifica.nombre}
                        </ToggleButton>
                      </ToggleButtonGroup>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            );
          })}
          <Typography
            variant="h5"
            sx={{
              textAlign: 'left',
              marginTop: 2,
              marginBottom: 1
            }}
          >
            Rúbricas
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}
