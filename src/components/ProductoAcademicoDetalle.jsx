import { useContext, useState } from 'react';

import { ProductoAcademicoContext } from '../context/productoAcademicoContext';

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

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	borderRadius: 2,
	boxShadow: 24,
	p: 4
};

export default function ProductoAcademicoDetalle({
	nombre,
	open,
	handleClose
}) {
	const { competencias } = useContext(ProductoAcademicoContext);
	const [competenciasss, setCompetencias] = useState([]);
	const [expanded, setExpanded] = useState(false);

	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const handleCompetencia = (event, especificas) => {
		console.log(especificas);
		setCompetencias(especificas);
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
				<Box sx={style}>
					<Typography variant="h3" align="left">
						{nombre}
					</Typography>
					{competencias.map(competencia => {
						return (
							<Accordion
								key={competencia.id}
								expanded={expanded === competencia.id}
								onChange={handleChange(competencia.id)}
							>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography>
										{competencia.nombre}
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									{competencia.especificas.map(especifica => {
										return (
											<ToggleButtonGroup
												key={especifica.id}
												orientation="vertical"
												value={competenciasss}
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
				</Box>
			</Fade>
		</Modal>
	);
}
