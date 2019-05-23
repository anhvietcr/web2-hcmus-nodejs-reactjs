import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as TYPE from '../../constants/actionTypes'
import CustomDialog from '../helper/Dialog'
import Alert from '../helper/Alert'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  head: {
    width: 'fit-content',
    marginBottom: '10px'
  },
  table: {
    minWidth: "100%",
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  iconButton: {
    padding: 10,
  },
  button: {
    margin: theme.spacing.unit,
  },
})

const lables = [
  { id: 0, label: 'Tên' },
  { id: 1, label: 'Địa chỉ' },
  { id: 2, label: 'Thao tác' },
]

const dataTables = [
  { id: 0, name: 'name 1', description: 'test,test des,test des des 1', disablePadding: false },
  { id: 1, name: 'name 2', description: 'test des 2', disablePadding: false },
  { id: 2, name: 'name 3', description: 'test,test des,test des des 3', disablePadding: false },
  { id: 3, name: 'name 4', description: 'test,test des,test des des test,test des,test des des 4', disablePadding: false },
  { id: 4, name: 'name 5', description: 'test des 5', disablePadding: false },
  { id: 5, name: 'name 6', description: 'test,test des,test des des 1', disablePadding: false },
  { id: 6, name: 'name 7', description: 'test des 2', disablePadding: false },
  { id: 7, name: 'name 8', description: 'test,test des,test des des 3', disablePadding: false },
  { id: 8, name: 'name 9', description: 'test,test des,test des des test,test des,test des des 4', disablePadding: false },
  { id: 9, name: 'name 10', description: 'test des 5', disablePadding: false },
  { id: 10, name: 'name 11', description: 'test,test des,test des des 1', disablePadding: false },
  { id: 11, name: 'name 12', description: 'test des 2', disablePadding: false },
  { id: 12, name: 'name 13', description: 'test,test des,test des des 3', disablePadding: false },
  { id: 13, name: 'name 14', description: 'test,test des,test des des test,test des,test des des 4', disablePadding: false },
  { id: 14, name: 'name 15', description: 'test des 5', disablePadding: false },
  { id: 15, name: 'name 16', description: 'test,test des,test des des 1', disablePadding: false },
  { id: 16, name: 'name 17', description: 'test des 2', disablePadding: false },
  { id: 18, name: 'name 18', description: 'test,test des,test des des test,test des,test des des 4', disablePadding: false },
  { id: 19, name: 'name 19', description: 'test des 5', disablePadding: false },
];

const ToolbarTable = (props) => {
  const { classes, handleSearchName, handleOpenDialog } = props

  return (
    <Grid
      justify="space-between"
      container
      spacing={24}
    >
      <Grid item>
        <Paper className={classes.head} elevation={1}>
          <IconButton className={classes.iconButton} aria-label="Search">
            <SearchIcon />
          </IconButton>
          <InputBase className={classes.input}
            placeholder="Tên cụm rạp"
            onChange={handleSearchName}
          />
        </Paper>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={handleOpenDialog}>
          {TYPE.BTN_ADD_NEW}
        </Button>
      </Grid>
    </Grid>
  )
}

const HeadTable = (props) => {
  return (
    <TableHead >
      <TableRow>
        {lables.map(label => (
          <TableCell
            key={label.id}
            align={label.id < lables.length - 1 ? 'left' : 'right'}
            padding={'default'}
          >{label.label}
          </TableCell>
        )
        )}
      </TableRow>
    </TableHead>
  )
}

const BodyTable = (props) => {
  const { classes, page, rowsPerPage, dataFilter, handleEdit } = props

  return (
    <TableBody>
      {dataFilter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={row.id}
          >
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.description}</TableCell>
            <TableCell align="right">
              <Tooltip
                title="Edit"
                placement={'bottom-start'}
                enterDelay={300}
              >
                <IconButton
                  className={classes.iconButton}
                  aria-label="Edit"
                  onClick={(e) => { handleEdit(e, row.id) }}
                  id={row.id}
                  key={row.id}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Delete"
                placement={'bottom-start'}
                enterDelay={300}
              >
                <IconButton className={classes.iconButton} aria-label="Delete">
                  <Delete />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

const PaginationTable = (props) => {
  const { dataFilter, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = props

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={dataFilter.length}
      rowsPerPage={rowsPerPage}
      page={page}
      backIconButtonProps={{
        'aria-label': 'Previous Page',
      }}
      nextIconButtonProps={{
        'aria-label': 'Next Page',
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  )
}

const CinemaCpanel = (props) => {
  const { classes } = props
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [dataFilter, setDataFilter] = useState(dataTables);
  const [openDialog, setOpenDialog] = useState(false)
  const [addValue, setAddValue] = useState({
    name: '',
    address: ''
  })
  const [alert, setAlert] = useState({
    count: 0,
    open: false,
    message: "",
    variant: "error"
  });

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
  }

  const handleChangePage = (e, page) => {
    setPage(page)
  }

  const handleSearchName = (e) => {
    const { value } = e.target

    let filter = dataTables.filter((item) => {
      return (item.name).indexOf(value) >= 0;
    });

    if (!value) {
      setDataFilter(dataTables)
    } else {
      setDataFilter(filter)
    }
  }

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog)
  }

  const handleAdd = (e) => {
    if (!addValue.name || !addValue.address) {
      setAlert({
        count: alert.count + 1,
        open: true,
        message: TYPE.MESSAGE_ERROR,
        variant: "error"
      })
      return false;
    }
    console.log(addValue);

    // okay's, reset
    setAddValue({
      name: '',
      address: ''
    });

    setAlert({
      count: alert.count + 1,
      open: true,
      message: TYPE.MESSAGE_SUCCESS,
      variant: "success"
    })

    // action here
  }

  const handleEdit = (e, id) => {
    console.log(id);
  }

  return (
    <React.Fragment>
      <Alert
        count={alert.count}
        open={alert.open}
        message={alert.message}
        variant={alert.variant}
      />
      <ToolbarTable classes={classes}
        dataFilter={dataFilter}
        handleSearchName={handleSearchName}
        handleOpenDialog={handleOpenDialog}        
      />
      <Paper>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <HeadTable classes={classes} />
            <BodyTable classes={classes}
              page={page}
              rowsPerPage={rowsPerPage}
              dataFilter={dataFilter}
              handleEdit={handleEdit}
            />
          </Table>
        </div>
        <PaginationTable
          dataFilter={dataFilter}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
        />
        <CustomDialog
          text={TYPE}
          handleOpenDialog={handleOpenDialog}
          openDialog={openDialog}
          values={addValue}
          setAddValue={setAddValue}
          handleAdd={handleAdd}
        />
      </Paper>
    </React.Fragment>
  );
}

CinemaCpanel.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CinemaCpanel)