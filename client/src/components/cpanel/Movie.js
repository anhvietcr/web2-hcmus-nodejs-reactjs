import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as TYPE from '../../constants/actionTypes'
import MovieDialog from '../helper/dialog/MovieDialog'
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
  { id: 1, label: 'Thời lượng', name: 'minute_time', type: 'textbox', display: true, align: 'left' },
  { id: 2, label: 'Ngày chiếu', name: 'opening_day', type: 'textbox', display: true, align: 'left' },
  { id: 3, label: 'Giới thiệu', name: 'introduce', type: 'textbox', display: true, align: 'left' },
  { id: 4, label: 'Link Trailer', name: 'trailer', type: 'textbox', display: true, align: 'left' },
  { id: 5, label: 'Hình ảnh', name: 'image', type: 'image', display: true, align: 'left' },
  { id: 6, label: 'Thao tác', name: 'actions', type: 'icons', display: true, align: 'right' },
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
            placeholder="Tên phim"
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
        {lableDatas.map(label => (
          <TableCell
            key={label.id}
            align={label.id < lableDatas.length - 1 ? 'left' : 'right'}
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
            <TableCell align="left">{row.minute_time}</TableCell>
            <TableCell align="left">{row.opening_day}</TableCell>
            <TableCell align="left">{row.introduce}</TableCell>
            <TableCell align="left">{row.trailer}</TableCell>
            <TableCell align="left">{row.image}</TableCell>
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
      count={dataFilter && dataFilter.length}
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

const MovieCpanel = (props) => {
  const { classes, actions } = props
  const { MovieCpanel } = actions
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [dataTables, setDataTables] = useState([]);
  const [dataFilter, setDataFilter] = useState(dataTables);
  const [openDialog, setOpenDialog] = useState(false);
  
  const [isChoose, setChoose] = useState({
    add: false,
    update: false,
    delete: false
  });
  const [values, setValues] = useState({
    id: 0,
    name: '',
    minute_time: '',
    opening_day: TYPE.DEFAULT_DATE,
    introduce: '',
    trailer: '',
    image: ''
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

  const handleOpenDialog = (e, type, item) => {
    const {id, name, minute_time, opening_day, image, introduce, trailer} = item || '';

    if (type === 'ADD') {
      setChoose({
        add: true,
        update: false,
        delete: false
      })
      setValues({
        id: 0,
        name: '',
        minute_time: '',
        opening_day: TYPE.DEFAULT_DATE,
        introduce: '',
        trailer: '',
        image: ''
      })
    }
    
    if (type === 'EDIT') {
      setChoose({
        add: false,
        update: true,
        delete: false
      })
      setValues({
        id,
        name,
        minute_time,
        opening_day,
        introduce,
        trailer,
        image
      })
    }

    if (type === 'DELETE') {
      setChoose({
        add: false,
        update: false,
        delete: true
      })
      setValues({
        id,
        name, 
        minute_time,
        opening_day,
        introduce,
        trailer,
        image
      })
    }

    setSubmitted(false);
    setOpenDialog(!openDialog)
    actions.List();
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.name || !values.minute_time || !values.opening_day ) {
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
        minute_time: values.minute_time,
        opening_day: values.opening_day,
        introduce: values.introduce,
        trailer: values.trailer,
        image: values.image
      }
      
      console.log(values)

      actions.Update(payload);
    } else {

      let payload = {
          name: values.name,
          minute_time: values.minute_time,
          opening_day: values.opening_day,
          introduce: values.introduce,
          trailer: values.trailer,
          image: values.image
      }
      actions.Add(payload);

      setValues({
        id: 0,
        name: '',
        minute_time: '',
        opening_day: TYPE.DEFAULT_DATE,
        introduce: '',
        trailer: '',
        image: ''
      })
    }

    // setDataLoaded(false);
  }

  useEffect(() => {
    // first load
    actions.List()
  }, [])

  useEffect(() => {

    if (MovieCpanel.movies) {
      if (!submitted) {
        // close dialog, update data
        setDataFilter(MovieCpanel.movies);
        setDataTables(MovieCpanel.movies);
      } 
      
      if (submitted && MovieCpanel.payload.status) {
        // alert
        if (MovieCpanel.payload.status === 200) {
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
            message: MovieCpanel.message,
            variant: "error"
          })
        }
      }
    }
  }, [submitted, MovieCpanel])


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
        <MovieDialog
          textTitle={
            isChoose.add ? TYPE.ADD_MOVIE :
            isChoose.update ? TYPE.UPDATE_MOVIE :
            TYPE.DELETE_MOVIE
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
        />
      </Paper>
    </React.Fragment>
  );
}

MovieCpanel.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default withStyles(styles)(MovieCpanel)