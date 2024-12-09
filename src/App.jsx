import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuStore from "./store/MenuStore.jsx";

export const servicesInfo = {
  gitUtil: { displayName: "图传工具", priority: 3 },
  imageProcessing: { displayName: "图片处理", priority: 1 },
  imageAI: { displayName: "图片AI", priority: 2 },
  excelScript: { displayName: "Excel & Script", priority: 4 },
  fileConversion: { displayName: "文件转换", priority: 5 },
  imageUpload: { displayName: "图传", priority: 6 },
};

export const defaultSubscriptions = {
  gitUtil: true,
  imageProcessing: true,
  imageAI: true,
  excelScript: true,
  fileConversion: true,
  imageUpload: true
};


function App() {
  const [subscriptions, setSubscriptions] = useState({});
  const location = useLocation();
  const menuStore = new MenuStore();

  useEffect(() => {
    async function loadSubscriptions() {
      try {
        const loadedSubscriptions = await menuStore.load();
        setSubscriptions(loadedSubscriptions || defaultSubscriptions);
      } catch (error) {
        console.error("Failed to load subscriptions:", error);
      }
    }

    loadSubscriptions();
  }, []);

  function handleSubscriptionChange(event) {
    const { value } = event.target;
    const newSubscriptions = {};
    Object.keys(servicesInfo).forEach(service => {
      newSubscriptions[service] = value.includes(service);
    });
    menuStore.save(newSubscriptions);
    setSubscriptions(newSubscriptions);
  }

  const selectedServices = Object.keys(subscriptions).filter(service => subscriptions[service]);

  // 默认页面重定向逻辑
  const getDefaultRedirect = () => {
    const sortedServices = Object.keys(servicesInfo)
      .sort((a, b) => servicesInfo[a].priority - servicesInfo[b].priority)
      .find(service => subscriptions[service]);
    return sortedServices ? `/views/${sortedServices}` : '/';
  };

  if (location.pathname === '/') {
    const defaultRedirectPath = getDefaultRedirect();
    if (defaultRedirectPath !== '/') {
      return <Navigate to={defaultRedirectPath} />;
    }
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {selectedServices.map(service => (
            <Typography
              key={service}
              variant="h6"
              component={Link}
              to={`/views/${service}`}
              style={{
                marginRight: 20,
                textDecoration: 'none',
                color: location.pathname === `/views/${service}` ? 'yellow' : 'inherit'
              }}
            >
              {servicesInfo[service].displayName}
            </Typography>
          ))}
          <Box sx={{ flexGrow: 1 }} />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-multiple-checkbox-label">订阅</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              multiple
              value={selectedServices}
              onChange={handleSubscriptionChange}
              input={<OutlinedInput label="订阅" />}
              renderValue={() => selectedServices.map(service => servicesInfo[service].displayName).join(', ')}
            >
              {Object.keys(servicesInfo).map((service) => (
                <MenuItem key={service} value={service}>
                  <Checkbox checked={subscriptions[service]} />
                  <ListItemText primary={servicesInfo[service].displayName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}

export default App;
