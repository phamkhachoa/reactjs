import React, { useEffect, useState } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "./dashboard.css";
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Draggable from 'react-draggable';

import { getRecentProject, getPercentModel } from "../../functions/dashboard";
import { getRecentModel } from "../../functions/model";
import Highcharts from 'highcharts/highstock';
import HighchartsReact from "highcharts-react-official";
import { Button, Typography } from "@material-ui/core";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }


const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const options = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: []
    }]
}

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

const Dashboard = () => {

    const [projects, setProjects] = useState([]);
    const [models, setModels] = useState([]);
    const [piechart, setPiechart] = useState([]);

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        loadProjects();
        loadPercentModel();
        loadModels();
    }, []);

    const loadProjects = () => {
        getRecentProject()
            .then((res) => {
                setProjects(res.data.data);
            })
            .catch((err) => {
                // setLoading(false);
                console.log(err);
            });
    }

    const loadModels = () => {
        getRecentModel()
            .then((res) => {
                setModels(res.data.data);
            })
            .catch((err) => {
                // setLoading(false);
                console.log(err);
            });
    }

    const loadPercentModel = () => {
        console.log("get percent");
        getPercentModel()
            .then((res) => {
                let dataT = [];

                res.data.data.map((e) => {
                    dataT.push({ name: e.statusCode, y: e.percent });
                })
                console.log("aaaa", dataT);
                options.series.forEach((s) => {
                    s.data = dataT;
                });
                console.log(options);
            })
            .catch((err) => {
                // setLoading(false);
                console.log(err);
            });
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="container-fluid gray_bg">
            <h2>Dashboard</h2>
            <div className="row row1">
                <div className="col-4 ">
                    <h3>Recent Projects</h3>

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">STT</TableCell>
                                    <TableCell align="center">Project Name</TableCell>
                                    <TableCell align="center">Number of models used</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {projects.map((row, index) => (
                                    <TableRow key={row.projectId}>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="center">{row.projectName}</TableCell>
                                        <TableCell align="center">{row.numberModelInUsed}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="col-7 offset-md-1">
                    <h3>Recent Models</h3>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">STT</TableCell>
                                    <TableCell align="center">Model Name</TableCell>
                                    <TableCell align="center">Project</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {models.map((row, index) => (
                                    <TableRow key={row.name}>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="center">{row.modelName}</TableCell>
                                        <TableCell align="center">{row.projectName}</TableCell>
                                        <TableCell align="center"><a href="#" onClick={handleClickOpen}>view details</a></TableCell>
                                        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                                            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                                Modal title
        </DialogTitle>
                                            <DialogContent dividers>
                                                <Typography gutterBottom>
                                                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                                                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Typography>
                                                <Typography gutterBottom>
                                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                                                    lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
                                                <Typography gutterBottom>
                                                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                                                    scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                                                    auctor fringilla.
          </Typography>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button autoFocus onClick={handleClose} color="primary">
                                                    Save changes
          </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div className="row row2">
                <div className="col-4">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                        updateArgs={[true, true, true]}
                        allowChartUpdate={true}
                    />
                </div>
                <div className="col-7 offset-md-1">
                    <h3>Recent Models</h3>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">STT</TableCell>
                                    <TableCell align="center">Model Name</TableCell>
                                    <TableCell align="center">Project</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {models.map((row, index) => (
                                    <TableRow key={row.name}>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="center">{row.modelName}</TableCell>
                                        <TableCell align="center">{row.projectName}</TableCell>
                                        <TableCell align="center"><a href="#">view details</a></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;