"use client"
import React, { useRef, useState } from 'react';
import { DataGrid, GridColDef, GridApi, GridCellValue, GridActionsCellItem, GridActionsCellItemProps } from "@mui/x-data-grid";
import Paper from '@mui/material/Paper';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Popover, Switch, Typography } from '@mui/material';
import EnhancedTable from './blog';
import { DeleteIcon } from 'lucide-react';
import Link from 'next/link';

function DeleteUserActionItem({
  deleteUser,
  ...props
}: GridActionsCellItemProps & { deleteUser: () => void }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <GridActionsCellItem {...props} onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete this user?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.label}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setOpen(false);
              deleteUser();
            }}
            color="warning"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
function DeleteUserAction({
  deleteUser,
  ...props
}: GridActionsCellItemProps & { deleteUser: () => void }) {

  return (
    <Link
        href={"/"}
        className='bg-slate-500 flex justify-center items-center text-white gap-4'
        key={`${props.id}+22` }
    >
        {props.icon}
        {props.label}
    </Link>
  );
}
const columns: GridColDef[] = [
    {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api: GridApi = params.api;
        const thisRow: Record<string, GridCellValue> = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = (params.id, c.field))
          );

        return console.log(JSON.stringify(thisRow, null, 4));
      };

      return <Switch
            onChange={(e) => {    
            e.stopPropagation();
            console.log(params.firstName);
            }}
            inputProps={{ 'aria-label': 'controlled' }}
            />;
    }
  }, {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
            <DeleteUserActionItem
                key={params.id }
            label={(params.id).toString()}
            showInMenu
            icon={<DeleteIcon />}
            deleteUser={()=>{console.log(params.id)}}
            closeMenuOnClick={false}
          />,
            <DeleteUserAction
                key={params.id }
            label={(params.id).toString()}
            showInMenu
            icon={<DeleteIcon />}
            deleteUser={()=>{console.log(params.id)}}
            closeMenuOnClick={false}
          />,
        ],
      },
   {
  field: 'country',
  type: 'singleSelect',
  valueOptions: ['United Kingdom', 'Spain', 'Brazil']
},
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },  
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [selected, setSelected] = useState < readonly number[]> ([]);
const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.checked) {
    const newSelected = rows.map((n) => n.id);
    setSelected(newSelected);
    return;
  }
  setSelected([]);
};


//   const columns = React.useMemo<GridColDef<Row>[]>(
//     () => [
//       { field: 'name', type: 'string' },
     
//     ],
//     [deleteUser],
//   );
const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
  const selectedIndex = selected.indexOf(id);
  let newSelected: readonly number[] = [];

  console.log(id)

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, id);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1),
    );
  }
  setSelected(newSelected);
};

const handleRowClick = (
  params, // GridRowParams
  event, // MuiEvent<React.MouseEvent<HTMLElement>>
  details, // GridCallbackDetails
) => {
    console.log(params);
    console.log(event);
    console.log(details);
    
};

    return (
      <>
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
              onRowClick={handleRowClick}
              
              onCellClick={(params: GridCellParams, event: MuiEvent<React.MouseEvent>) => {
                  event.defaultMuiPrevented = true;
                }}
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
                onRowSelectionModelChange={(ids) => {
                    console.log(ids);
                }}
                />
    </Paper>
        <EnhancedTable />
            </>
  );
}
