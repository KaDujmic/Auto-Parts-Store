import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Input from '@mui/material/Input';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

const theme = createTheme();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreateOrder = () => {
  const [itemList, setItemList] = useState([])
  const [selectedItemList, setSelectedItemList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({})

  const jwt = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${jwt}` }};
        
  useEffect(() => {
    async function fetchData() {
      try {
        const itemListGetResponse = await axios.get(`http://localhost:4000/item`)
        const fullItemList = itemListGetResponse.data

        const userListGetResponse = await axios.get(`http://localhost:4000/user`, config)
        const fullUserList = userListGetResponse.data.models
        
        //Remove properties sent from Backend that aren't required for this component
        const filteredItemList = fullItemList.map(({ serialNumber, price, categoryId, manufacturerId, quantity, ...keepAttributes }) => keepAttributes)
        const filteredUserList = fullUserList.map(({ fullName, address, phoneNumber, roleName, discount, currency, ...keepAttributes }) => keepAttributes)

        setItemList(filteredItemList)
        setCustomerList(filteredUserList)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  //Handles Selected Item List state when user selects items from the Select Element
  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedItemList(value);
  };

  //Handles Selected Customer state when employee selects items from the Autocomplete Element
  const handleEmailChange = (selectedCustomer) => {
    setSelectedCustomer(selectedCustomer)
  };

  //Handles quantity of the updated item
  const handleValueChange = (event, modifiedItemId) => {
    const {
      target: { value },
    } = event;
    const ItemList = selectedItemList
    const foundItemIndex = ItemList.findIndex(item => item.id === modifiedItemId);

    const itemToModify = ItemList[foundItemIndex]
    itemToModify.quantity = value
    ItemList[foundItemIndex] = itemToModify

    setSelectedItemList(ItemList)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const filteredItemList = selectedItemList.map(({ name, ...keepAttributes }) => keepAttributes)

    //Set default quantity of an item to 1 if the employee hasn't specified a different value during order
    filteredItemList.forEach(item => {
      if(item.hasOwnProperty('quantity') === false) {
        item.quantity = 1
    }})

    const objectToPost = {
      id: uuidv4(),
      userId: selectedCustomer.id,
      itemList: filteredItemList
    }
    await axios.post(`http://localhost:4000/order`, objectToPost, config)
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: 500 }}>
            {/* Autocomplete Element serves as a dropdown email list of users the order can be submitted for.*/}
            <InputLabel id="customer-email-list">Customer Email</InputLabel>
            <Autocomplete
              id="filter"
              options={customerList}
              getOptionLabel={(option) => option.email}
              isOptionEqualToValue={(option, value) => option.email === value.email}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params}/>}
              onChange = {(event, data) => {
                handleEmailChange(data);
              }}
            />
            {/* Select Element serves as a multiple checkbox dropdown list of items the order can contain.*/}
            <InputLabel id="item-list">Item List</InputLabel>
            <Select
              labelId="item-list"
              id="multiple-checkbox"
              multiple
              fullWidth
              value={selectedItemList}
              onChange={handleSelectChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => {
                let stringToRender = '';
                selected.forEach(element => stringToRender += element.name + ', ');
                //slice the comma at the end of the final string
                return stringToRender.slice(0, -2);
              }}
              MenuProps={MenuProps}
            >
              {itemList.map((item) => (
                <MenuItem key={item.id} value={item} name={item.name}>
                  <Checkbox checked={selectedItemList.findIndex((selectedItem) => selectedItem.id === item.id) >= 0} />
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
            {/* List Element serves as a item quantity overview, and possible addition of the number of each item type the customer requires*/}
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {[...selectedItemList].map((selectedItem) => (
                <ListItem
                  key={selectedItem.id}
                  disableGutters
                >
                  <ListItemText primary={`${selectedItem.name}`} />
                  <ListItemSecondaryAction>
                    <Input
                      defaultValue={1}
                      type="number"
                      required={true}
                      style={{ width: 30 }}
                      onChange={event => handleValueChange(event, selectedItem.id)}
                    />
                  </ListItemSecondaryAction>

                </ListItem>
              ))}
            </List>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Order
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default CreateOrder