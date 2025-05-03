//import 'src/assets/styles/views/dashboard/dashboard.scss';
import { Box, Grid, Typography, Button, IconButton, InputAdornment, Stack, FormGroup } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { StyledTextField } from 'src/components/shared/forms/formelements';
import { useState } from 'react';

function Dashboard() {
  return (
    <>
      <div data-testid="dashboard-component">
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
      </div>
    </>
  );
}

export default Dashboard;
