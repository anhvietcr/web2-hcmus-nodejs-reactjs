import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as TYPE from '../../constants/actionTypes'
import ShowtimeDialog from '../helper/dialog/ShowtimeDialog'
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
  { id: 0, label: 'Tên Phim', name_id: 'movie_id', name: 'movie_name', type: 'combobox', display: true, align: 'left' },
  { id: 1, label: 'Rạp', name_id: 'theater_id', name: 'theater_name', type: 'combobox', display: true, align: 'left' },
  { id: 2, label: 'Ngày bắt đầu', name: 'start_time', type: 'textbox', display: true, align: 'left' },
  { id: 3, label: 'Ngày kết thúc', name: 'end_time', type: 'textbox', display: true, align: 'left' },
  { id: 4, label: 'Giá vé', name: 'price', type: 'textbox', display: true, align: 'left' },
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
            placeholder="Ngày bắt đầu"
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
            <TableCell align="left" id={row.movie_id}>{row.movie.name}</TableCell>
            <TableCell align="left" id={row.theater_id}>{row.theater.name}</TableCell>
            <TableCell align="left">{row.start_time}</TableCell>
            <TableCell align="left">{row.end_time}</TableCell>
            <TableCell align="left">{row.price}</TableCell>
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

const ShowtimeCpanel = (props) => {
  const { classes, actions } = props
  const { ShowtimeCpanel, TheaterCpanel, MovieCpanel } = actions
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [dataTables, setDataTables] = useState([]);
  const [dataFilter, setDataFilter] = useState(dataTables);
  const [dataTheaters, setDataTheaters] = useState([]);
  const [dataMovies, setDataMovies] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [isChoose, setChoose] = useState({
    add: false,
    update: false,
    delete: false
  });
  const [values, setValues] = useState({
    id: 0,
    price: '',
    end_time: '',
    start_time: '',
    movie_id: 0,
    theater_id: 0,
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
      return (item.start_time).indexOf(value) >= 0;
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
      price,
      end_time,
      start_time,
      movie_id,
      theater_id
    } = item || '';

    if (type_open === 'ADD') {
      setChoose({
        add: true,
        update: false,
        delete: false
      })
      setValues({
        id: 0,
        price: '',
        end_time: '',
        start_time: '',
        movie_id: 0,
        theater_id: 0,
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
        price,
        end_time,
        start_time,
        movie_id,
        theater_id,
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
        price,
        end_time,
        start_time,
        movie_id,
        theater_id,
      })
    }

    setSubmitted(false);
    setOpenDialog(!openDialog)
    actions.List();
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.price || !values.start_time || !values.end_time
      || !parseInt(values.theater_id) || !parseInt(values.movie_id)
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
        price: values.price,
        end_time: values.end_time,
        start_time: values.start_time,
        movie_id: values.movie_id,
        theater_id: values.theater_id,
      }
      actions.Update(payload);
    } else {

      let payload = {
        id: values.id,
        price: values.price,
        end_time: values.end_time,
        start_time: values.start_time,
        movie_id: values.movie_id,
        theater_id: values.theater_id,
      }
      actions.Add(payload);

      setValues({
        id: 0,
        price: '',
        end_time: '',
        start_time: '',
        movie_id: 0,
        theater_id: 0,
      })
    }
  }

  useEffect(() => {
    // first load 
    actions.List();
    actions.ListTheaters();
    actions.ListMovies();

  }, [])

  useEffect(() => {
    if (ShowtimeCpanel.showtimes && TheaterCpanel.theaters && MovieCpanel.movies) {
      if (!submitted) {
    
        // close dialog, update data
        setDataFilter(ShowtimeCpanel.showtimes);
        setDataTables(ShowtimeCpanel.showtimes);
        setDataTheaters(TheaterCpanel.theaters);
        setDataMovies(MovieCpanel.movies);
      }

      if (submitted && ShowtimeCpanel.payload.status) {

        // alert
        if (ShowtimeCpanel.payload.status === 200) {
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
            message: ShowtimeCpanel.message,
            variant: "error"
          })
        }
      }
    }
  }, [submitted, ShowtimeCpanel, TheaterCpanel, MovieCpanel])


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
        <ShowtimeDialog
          textTitle={
            isChoose.add ? TYPE.ADD_SHOWTIME :
              isChoose.update ? TYPE.UPDATE_SHOWTIME :
                TYPE.DELETE_SHOWTIME
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
          dataTheaters={dataTheaters}
          dataMovies={dataMovies}
        />
      </Paper>
    </React.Fragment>
  );
}

ShowtimeCpanel.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default withStyles(styles)(ShowtimeCpanel)