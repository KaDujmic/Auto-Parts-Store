import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Items() {
    const [pendingItems, setPendingItems] = useState([])
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
            console.log(err)
          }
        }
       fetchData()
      }, [])
      console.log(pendingItems)
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}