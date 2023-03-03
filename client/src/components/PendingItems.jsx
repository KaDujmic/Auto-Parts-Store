import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Title from './Title'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';

export default function Items() {
    const [pendingItems, setPendingItems] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
          try {
            const jwt = localStorage.getItem("token");
            const config = {
            headers: { Authorization: `Bearer ${jwt}` }
        };
            let response = await axios.get(`http://localhost:4000/orderItem`,config)
            setPendingItems(response.data)
    }
          catch(err)
          {
            navigate("/login")
            console.log(err)
          }
        }
       fetchData()
      }, [navigate])
  return (
    <React.Fragment>
      <Title>Pending Items</Title>
      <Box sx={{
        padding: 4,
        borderRadius: 1, 
        boxShadow: 2,
        paddingTop: 3,
        backgroundColor: 'white'
      }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingItems.map((row) => (
              <TableRow item={row} key={row.id}>
                <TableCell>{row.deliveryDate}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.item.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </React.Fragment>
  );
}