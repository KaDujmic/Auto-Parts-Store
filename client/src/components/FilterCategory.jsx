import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {useEffect, useState} from 'react';
import axios from 'axios'


const FilterCategory = ({onChange}) => {
  const [category, setCategory] = useState([])
      
  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get(`http://localhost:4000/category`)
        setCategory(response.data.models)
      }
      catch(err)
      {
        console.log(err)
      }
    }
   fetchData()
  }, [])

  return (
    <Stack spacing={3} sx={{ width: 250 }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={category}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id && option.name === value.name}
        onChange={onChange}
        sx = {{mt:2.5}}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Categories"
          />
        )}
      />
    </Stack>
  );
}

export default FilterCategory;