import React, { ReactNode, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from '@mui/icons-material'
import { AppBar, IconButton, ListItem, Toolbar, Typography, Drawer, List, Box, ListItemButton, Tab } from '@mui/material';
import { RouteType } from './Navigator';

const NavigatorPortrait: React.FC<{routes: RouteType[]}> = ({ routes }) => {

    const [flOpen, setOpen] = useState<boolean>(false);

    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        let index = routes.findIndex(r => r.to === location.pathname);
        if (index < 0) {
            index = 0;
        }
        navigate(routes[index].to);

    }, [routes]);
    function getTitle(): string {
        const route = routes.find(r => r.to === location.pathname)
        return route ? route.label : '';
    }

    function toggleOpen() {
        setOpen(!flOpen);
    }
    // function getListItems(): React.ReactNode {
    //     return routes.map(i => <ListItem onClick={toggleOpen} 
    //         component={Link} to={i.to} key={i.to}>{i.label}</ListItem>)
    // }
    function getTabs(): React.ReactNode {
        return routes.map(r => (
            <ListItem key={r.label} disablePadding>
                <ListItemButton>
                        <Tab component={Link} to={r.to} label={r.label} key={r.label} onClick={toggleOpen}/>
                </ListItemButton>
            </ListItem>
        ))
    }
    return <Box sx={{ marginTop: { xs: "15vh", sm: "20vh" } }}>
        <AppBar position="fixed" sx={{backgroundColor: "lightgray"}}>
            <Toolbar>
                <IconButton onClick={toggleOpen} sx={{ color: 'primary' }}>
                    <Menu />
                </IconButton>
                <Typography sx={{ width: "100%", textAlign: "center", fontSize: "1.5em" }}>
                    {getTitle()}
                </Typography>
                <Drawer open={flOpen} onClose={toggleOpen} anchor="left">
                    <List>
                        {/* {getListItems()} */}
                        {getTabs()}
                    </List>
                </Drawer>
            </Toolbar>

        </AppBar>
        <Outlet></Outlet>
    </Box>
}
export default NavigatorPortrait