import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const FilterCategory = ({ onChange }) => {
	const [category, setCategory] = useState([]);

	useEffect(() => {
		async function fetchData () {
			try {
				const response = await axios.get('http://localhost:4000/category');
				setCategory(response.data);
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, []);

	FilterCategory.propTypes = {
		onChange: PropTypes.func
	};

	return (
		<Stack spacing={3} sx={{ width: 200 }}>
			<Autocomplete
				id="tags-outlined"
				options={category}
				getOptionLabel={(option) => option.name}
				isOptionEqualToValue={(option, value) => option.name === value.name}
				onChange={onChange}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder="Categories"
					/>
				)}
			/>
		</Stack>
	);
};

export default FilterCategory;
