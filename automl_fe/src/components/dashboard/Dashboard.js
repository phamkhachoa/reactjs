import React, { useEffect, useState } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "./dashboard.css";

import { getRecentProject, getPercentModel } from "../../functions/dashboard";
import { getRecentModel } from "../../functions/model";
import Highcharts from 'highcharts/highstock';
import HighchartsReact from "highcharts-react-official";

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

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

const Dashboard = () => {

    const [projects, setProjects] = useState([]);
    const [models, setModels] = useState([]);
    const [piechart, setPiechart] = useState([]);

    useEffect(() => {
        loadProjects();
    }, []);

    useEffect(() => {
        loadModels();
        loadPercentModel();
    }, []);

    useEffect(() => {
        loadPercentModel();
    }, [piechart]);

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
        getPercentModel()
        .then((res) => {
            let dataT = [];
            let total = 0;
            // res.data.data.map((e) => {
            //     total += e.percent;
            // })

            res.data.data.map((e) => {
                dataT.push({name: e.statusCode, y: e.percent });
            })

            options.series.forEach((s) => {
                s.data = dataT;
            })
            console.log(options);
        })
        .catch((err) => {
            // setLoading(false);
            console.log(err);
        });
    }

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
                                        <TableCell align="center"><a href="#">view details</a></TableCell>
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
                    />
                </div>
                <div className="col-6">
                    row-6
                </div>
            </div>
        </div>
    )
}

export default Dashboard;