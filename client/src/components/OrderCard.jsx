import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const OrderCard = ( { order } ) => {
  return (
    <Paper
      sx={{
        p: 2,
        margin: '5%',
        padding: '4%',
        maxWidth: 500,
        backgroundColor: '#d3d3d3',
        flexGrow: 1,
      }}
    >
      <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justify="center"
      >
        <Grid item xs={12} container>
          <Grid item xs={6} alignContent="center">
            <Typography variant='h5'>Customer:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h5'>{order.user.fullName}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={6} alignContent="center">
            <Typography variant='h5'>Order Number:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='p'>{order.id}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={6} alignContent="center">
            <Typography variant='h5'>Ordered Date:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='p'>{order.orderDate}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={6} alignContent="center">
            <Typography variant='h5'>Status:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='p'>{order.orderStatus}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={6} alignContent="center">
            <Typography variant='h5'>Price:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h5'>{order.finalPrice}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default OrderCard