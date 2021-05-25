import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import logo2 from "../../../../images/logo2.png";
import './header.css';
import { Link } from 'react-router-dom';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Header() {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="header">
            {/* <AppBar position="static" style={{flexDirection: "revert"}}>
                <img src={logo2} style={{width: "2%", marginLeft: "10px", height: "90%"}}/>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Dashboard" {...a11yProps(0)} />
                    <Tab label="Project" {...a11yProps(1)} />
                    <Tab label="Model" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Dashboard/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Project/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Model/>
            </TabPanel> */}

            <div className="header-left">
                <img src={logo2} style={{width: "10%", marginLeft: "80px", height: "90%", marginRight: "80px"}}/>
                <div>
                    <Link to='/dashboard' className='nav-link'>Dashboard</Link>
                </div>
                <div>
                    <Link to='/project' className='nav-link'>Project</Link>
                </div><div>
                    <Link to='/model' className='nav-link'>Model</Link>
                </div>
            </div>

            <div className="header-right">
                <p>Logout</p>
            </div>
        </div>
    );
}
