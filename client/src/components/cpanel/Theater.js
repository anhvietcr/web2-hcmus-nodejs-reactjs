import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as TYPE from '../../constants/actionTypes'
import TheaterDialog from '../helper/dialog/TheaterDialog'
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

const lableDatas = [
  { id: 0, label: 'Tên', name: 'name', type: 'textbox', display: true, align: 'left' },
  { id: 1, label: 'SL Hàng Ghế', name: 'number_row', type: 'textbox', display: true, align: 'left' },
  { id: 2, label: 'SL Cột Ghế', name: 'number_column', type: 'textbox', display: true, align: 'left' },
  { id: 3, label: 'Cụm rạp', name_id: 'cinema_id', name: 'cinema_name', type: 'combobox', display: true, align: 'left' },
  { id: 4, label: 'Loại rạp', name_id: 'type', name: 'type', type: 'combobox', display: true, align: 'left' },
  { id: 5, label: 'Thao tác', name: 'actions', type: 'icons', display: true, align: 'right' },
]

const dataTheaterType = [
  {id: '2d', name: '2d'},
  {id: '3d', name: '3d'},
  {id: '4dx', name: '4dx'},
]


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
            placeholder="Tên rạp"
            onChange={handleSearchName}
          />
        </Paper>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={(e) => handleOpenDialog(e, 'ADD')}
        >
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
        {lableDatas.map(label => {
          if (label.display) {
            return (
              <TableCell
                key={label.id}
                align={label.align}
                padding={'default'}
              >{label.label}
              </TableCell>
            )
          } else {
            return false;
          }
        }
        )}
      </TableRow>
    </TableHead>
  )
}

const BodyTable = (props) => {
  const { classes, page, rowsPerPage, dataFilter, handleOpenDialog } = props

  return (
    <TableBody>
      {dataFilter && dataFilter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={row.id}
          >
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.number_row}</TableCell>
            <TableCell align="left">{row.number_column}</TableCell>
            <TableCell align="left" id={row.ciname_id}>{row.cinema.name}</TableCell>
            <TableCell align="left">{row.type}</TableCell>
            <TableCell align="right">
              <Tooltip
                title="Edit"
                placement={'bottom-start'}
                enterDelay={300}
              >
                <IconButton
                  className={classes.iconButton}
                  aria-label="Edit"
                  onClick={(e) => { handleOpenDialog(e, 'EDIT', row) }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Delete"
                placement={'bottom-start'}
                enterDelay={300}
              >
                <IconButton
                  className={classes.iconButton}
                  aria-label="Delete"
                  onClick={(e) => { handleOpenDialog(e, 'DELETE', row) }}
                >
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
      count={(dataFilter && dataFilter.length) || 0}
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

const TheaterCpanel = (props) => {
  const { classes, actions } = props
  const { TheaterCpanel, CinemaCpanel } = actions
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [dataTables, setDataTables] = useState([]);
  const [dataFilter, setDataFilter] = useState(dataTables);
  const [dataCinemas, setDataCinemas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [isChoose, setChoose] = useState({
    add: false,
    update: false,
    delete: false
  });
  const [values, setValues] = useState({
    id: 0,
    name: '',
    number_row: '',
    number_column: '',
    cinema_name: '',
    cinema_id: 0,
    type: ''    
  })
  const [alert, setAlert] = useState({
    count: 0,
    open: false,
    message: "",
    variant: "success"
  })

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
  }

  const handleChangePage = (e, page) => {
    setPage(page)
  }

  const handleSearchName = (e) => {
    const { value } = e.target

    if (!dataTables) return [];

    let filter = dataTables.filter((item) => {
      return (item.name).indexOf(value) >= 0;
    });

    if (!value) {
      setDataFilter(dataTables)
    } else {
      setDataFilter(filter)
    }
  }

  const handleOpenDialog = (e, type_open, item) => {
    const {
      id,
      name,
      number_row,
      number_column,
      cinema_name,
      cinema_id,
      type
    } = item || '';

    if (type_open === 'ADD') {
      setChoose({
        add: true,
        update: false,
        delete: false
      })
      setValues({
        id: 0,
        name: '',
        number_row: '',
        number_column: '',
        cinema_name: '',
        cinema_id: 0,
        type: ''
      })
    }

    if (type_open === 'EDIT') {
      setChoose({
        add: false,
        update: true,
        delete: false
      })
      setValues({
        id,
        name,
        number_row,
        number_column,
        cinema_name,
        cinema_id,
        type
      })
    }

    if (type_open === 'DELETE') {
      setChoose({
        add: false,
        update: false,
        delete: true
      })
      setValues({
        id,
        name,
        number_row,
        number_column,
        cinema_name,
        cinema_id,
        type
      })
    }

    setSubmitted(false);
    setOpenDialog(!openDialog)
    actions.List();
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.name || !values.number_row || !values.number_column
      || !parseInt(values.number_row) || !parseInt(values.number_column)
    ) {
      setAlert({
        count: alert.count + 1,
        open: true,
        message: TYPE.MESSAGE_ERROR,
        variant: "error"
      })
      return false;
    }

    setSubmitted(true);

    // action here
    if (isChoose.delete) {
      let payload = {
        id: values.id,
      }
      actions.Delete(payload);
    } else if (isChoose.update) {

      let payload = {
        id: values.id,
        name: values.name,
        number_row: values.number_row,
        number_column: values.number_column,
        cinema_name: values.cinema_name,
        cinema_id: values.cinema_id,
        type: values.type,
      }
      actions.Update(payload);
    } else {

      let payload = {
        id: values.id,
        name: values.name,
        number_row: values.number_row,
        number_column: values.number_column,
        cinema_name: values.cinema_name,
        cinema_id: values.cinema_id,
        type: values.type,
      }
      actions.Add(payload);

      setValues({
        id: 0,
        name: '',
        number_row: '',
        number_column: '',
        cinema_name: '',
        cinema_id: 0,
        type: ''
      })
    }
  }

  useEffect(() => {
    // first load 
    actions.List();
    actions.ListCinemas();
  }, [])

  useEffect(() => {
    if (TheaterCpanel.theaters && CinemaCpanel.cinemas) {
      if (!submitted) {
        // close dialog, update data
        setDataFilter(TheaterCpanel.theaters);
        setDataTables(TheaterCpanel.theaters);
        setDataCinemas(CinemaCpanel.cinemas);
      }

      if (submitted && TheaterCpanel.payload.status) {

        // alert
        if (TheaterCpanel.payload.status === 200) {
          setAlert({
            count: alert.count + 1,
            open: true,
            message: TYPE.MESSAGE_SUCCESS,
            variant: "success"
          });
        } else {
          setAlert({
            count: alert.count + 1,
            open: true,
            message: TheaterCpanel.message,
            variant: "error"
          })
        }
      }
    }
  }, [submitted, TheaterCpanel, CinemaCpanel])


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
              handleOpenDialog={handleOpenDialog}
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
        <TheaterDialog
          textTitle={
            isChoose.add ? TYPE.ADD_THEATER :
              isChoose.update ? TYPE.UPDATE_THEATER :
                TYPE.DELETE_THEATER
          }
          textAction={
            isChoose.add ? TYPE.BTN_ADD :
              isChoose.update ? TYPE.BTN_UPDATE :
                TYPE.BTN_DELETE
          }
          labels={lableDatas}
          handleOpenDialog={handleOpenDialog}
          openDialog={openDialog}
          values={values}
          setValues={setValues}
          handleSubmit={handleSubmit}
          dataCinemas={dataCinemas}
          dataTheaterType={dataTheaterType}
        />
      </Paper>
    </React.Fragment>
  );
}

TheaterCpanel.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default withStyles(styles)(TheaterCpanel)