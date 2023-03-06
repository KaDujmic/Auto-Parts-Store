import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Items() {
    const [dashboardOrder, setDashboardOrder] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
          try {
            const jwt = localStorage.getItem("token");
            const config = {
            headers: { Authorization: `Bearer ${jwt}` }
        };
            let response = await axios.get(`http://localhost:4000/order`, config)
            setDashboardOrder(response.data.splice(0,3))
    }
          catch(err)
          {
            navigate("/login")
            console.log(err)
          }
        }
       fetchData()
      }, [])
  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '1%',
        }}
      >
        <Title>Pending Orders</Title>
          <Table 
            size="small" 
            sx={{
              backgroundColor: 'white',
              marginTop: '3%',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Order No.</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dashboardOrder.map((row) => (
                <TableRow item={row} key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.user.fullName}</TableCell>
                  <TableCell>{row.orderDate}</TableCell>
                  <TableCell>{row.orderStatus}</TableCell>
                  <TableCell>{row.finalPrice}{row.currency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </Box>
    </React.Fragment>
  );
}
