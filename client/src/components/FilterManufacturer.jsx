import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {useEffect, useState} from 'react';
import axios from 'axios'


const FilterManufacturer = ({onChange}) => {
  const [manufacturer, setManufacturer] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get(`http://localhost:4000/manufacturer`)
        setManufacturer(response.data.models)
      }
      catch(err)
      {
        console.log(err)
      }
    }
   fetchData()
  }, [])
  return (
    <Stack spacing={3} sx={{ width: 200 }}>
        <Autocomplete
        multiple
        id="tags-outlined"
        options={manufacturer}
        getOptionLabel={(option) => option.brand}
        isOptionEqualToValue={(option, value) => option.brand === value.brand}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Manufacturer"
          />
        )}
      />
    </Stack>
  );
}

export default FilterManufacturer;