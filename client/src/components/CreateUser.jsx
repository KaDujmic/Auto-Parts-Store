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
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const theme = createTheme();

const CreateUser = () => {
  const jwt = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${jwt}` }};

  const handleSubmit = async (event) => {
    event.preventDefault();
    const retrievedInput = new FormData(event.currentTarget);
    const objectToPost = {id: uuidv4()};
    retrievedInput.forEach((value, key) => (objectToPost[key] = value));

    try {
      await axios.post(`http://localhost:4000/user`, objectToPost, config);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            paddingTop: 4,
            paddingBottom: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, backgroundColor: 'white', padding: 4, borderRadius: 3 }}>
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
              label="Email"
              name="email"
              type="email"
              id="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Address"
              name="address"
              type="address"
              id="address"
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
              <RadioGroup aria-label="roleName" name="roleName" row  >
                <FormControlLabel value="Customer" control={<Radio />} label="Customer" />
                <FormControlLabel value="SalesPerson" control={<Radio />} label="Sales Person" />
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