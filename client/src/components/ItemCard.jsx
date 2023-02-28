import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ItemCard = ({item}) => {
  return (
    <Card sx={{ minWidth: 250, mx: 0.5, mt:0.5}}>
      <CardContent spacing={5}>
        <Typography sx={{ fontSize: 17 }}>
         <h2>{item.name}</h2>
        </Typography>
        <Typography variant="h5" component="div" sx={{ fontSize: 14 }}>
          <h4> {item.serialNumber}</h4>
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          <h4>{item.price}</h4>
        </Typography>
      </CardContent>
    </Card>
  );
}
export default ItemCard;