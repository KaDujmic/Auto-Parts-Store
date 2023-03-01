import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const CreateUser = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(...data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Full Name"
              name="fullName"
              id="fullName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              id="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              id="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Phone Number"
              type="tel"
              pattern= "[0-9]{10}"
              id="phoneNumber"
              name="phoneNumber"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Discount"
              type="number"
              id="discount"
              name="discount"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Currency"
              id="currency"
              name="currency"
            />           
            <Box sx={{ mt: 4 }}>
              Role:
              <RadioGroup aria-label="role" name="role" row  >
                <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                <FormControlLabel value="salesPerson" control={<Radio />} label="Sales Person" />
              </RadioGroup>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create User
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default CreateUser;