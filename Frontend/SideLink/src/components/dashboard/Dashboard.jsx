import { useEffect } from 'react';
import { Box, Grid, Typography, Button, IconButton, InputAdornment, Stack, FormGroup } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { StyledTextField } from 'src/components/shared/forms/FormElements';
import { useState } from 'react';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard/publicprofile');
  }, [navigate]);

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
