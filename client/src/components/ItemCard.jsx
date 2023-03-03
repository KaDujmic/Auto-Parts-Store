import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ItemCard = ({item}) => {
  return (
    <Card sx={{ minWidth: 250, mx: 0.5, mt:0.5}}>
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
    </Card>
  );
}
export default ItemCard;