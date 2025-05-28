import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
