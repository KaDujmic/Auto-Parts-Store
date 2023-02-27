import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const card = (
  <>
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
          sx={8}
      >
        <Grid item xs={12} container>
          <Grid item xs={6} alignContent="center">
            <Typography variant='h5'>Customer:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h5'>John Doe</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={6} alignContent="center">
            <Typography variant='h5'>Order Number:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h5'>#0002314</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={6} alignContent="center">
            <Typography variant='h5'>Ordered Date:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h5'>Nov 10th, 2023</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={6} alignContent="center">
            <Typography variant='h5'>Status:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h5'>Ready For Pickup</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={6} alignContent="center">
            <Typography variant='h5'>Price:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h5'>19942.00 $</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </>
);

export default function OutlinedCard() {
  return (
      card
  );
}