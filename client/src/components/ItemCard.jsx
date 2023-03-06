import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const ItemCard = ({ item }) => {
	return (
		<Card sx={{ minWidth: 250, mx: 0.5, mt: 0.5 }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<CardContent spacing={5}>
					<Typography sx={{ fontSize: 17 }}>
						{item.name}
					</Typography>
					<Typography variant="h5" component="div" sx={{ fontSize: 14 }}>
						{item.serialNumber}
					</Typography>
					<Typography sx={{ fontSize: 14 }} color="text.secondary">
						{item.price}
					</Typography>
				</CardContent>
				<CardContent spacing={5}>
					<Box
						component="img"
						sx={{
							height: 60,
							width: 80,
							paddingLeft: 1,
							paddingTop: 0.5,
							maxHeight: { xs: 233, md: 167 },
							maxWidth: { xs: 350, md: 250 }
						}}
						alt="HThere"
						src={item.image_link}
					/>
				</CardContent>
			</Box>
		</Card>
	);
};

ItemCard.propTypes = {
	item: PropTypes.object
};

export default ItemCard;
