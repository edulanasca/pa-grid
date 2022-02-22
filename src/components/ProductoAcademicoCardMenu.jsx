import { useState } from 'react';

import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem
} from '@mui/material';

const options = [
	{ icon: <EditOutlinedIcon />, desc: 'Editar' },
	{ icon: <ContentCopyOutlinedIcon />, desc: 'Clonar' },
	{ icon: <DeleteOutlinedIcon />, desc: 'Borrar' }
];

export default function ProductoAcademicoCardMenu() {
	const [anchor, setAnchor] = useState(null);
	const open = Boolean(anchor);

	const handleClick = event => {
		setAnchor(event.currentTarget);
	};

	const handleClose = () => {
		setAnchor(null);
	};

	return (
		<>
			<IconButton
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<MoreVertIcon htmlColor="white" />
			</IconButton>
            
			<Menu
				anchorEl={anchor}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button'
				}}
			>
				{options.map(option => {
					return (
						<MenuItem key={option.desc} onClick={handleClose}>
							<ListItemIcon>{option.icon}</ListItemIcon>
							<ListItemText>{option.desc}</ListItemText>
						</MenuItem>
					);
				})}
			</Menu>
		</>
	);
}
