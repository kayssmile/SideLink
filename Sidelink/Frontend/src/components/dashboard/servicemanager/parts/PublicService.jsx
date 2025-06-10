import { useState } from 'react';
import { Chip, Typography, Box, useTheme, useMediaQuery, Stack, Tooltip, IconButton } from '@mui/material';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { resetStatus } from 'src/store/dashboard/publicservices/PublicServicesManagment';
import { removePublicService } from 'src/store/dashboard/publicservices/PublicServicesManagment';
import DeletePublicService from './DeletePublicService';
import EditPublicService from './EditPublicService';

const PublicService = ({ service, type }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const [deleteServiceComponent, setDeleteServiceComponent] = useState(false);
  const [editServiceComponent, setEditServiceComponent] = useState(false);

  const handleOpenDeleteService = () => {
    setDeleteServiceComponent(true);
  };

  const handleCancelDeleteService = () => {
    setDeleteServiceComponent(false);
  };

  const handleCancelWithSuccess = () => {
    dispatch(resetStatus());
    dispatch(removePublicService({ public_service_id: service.id }));
    setDeleteServiceComponent(false);
  };

  const handleOpenEditService = () => {
    setEditServiceComponent(true);
  };

  const handleCancelEditService = () => {
    dispatch(resetStatus());
    setEditServiceComponent(false);
  };

  return (
    <Box sx={{ padding: smDown ? '0' : '1rem' }}>
      <Box
        p={2}
        sx={{
          position: 'relative',
          cursor: 'pointer',
          mb: 1,
          borderRadius: '8px',
          boxShadow: '0 0 5px 0 grey',
          backgroundColor: theme.palette.background.white,
        }}
      >
        <Typography variant="h5" color={'black'} sx={{ opacity: '1', fontSize: { xs: '1.2rem', sm: '1.4rem' } }}>
          {service.title}
        </Typography>

        <Typography variant="p" color={'black'} sx={{ opacity: '1', display: 'block', marginTop: '1rem', fontSize: '1.2rem' }}>
          {service.description}
        </Typography>

        <Stack direction="row" sx={{ display: smDown ? 'flex' : 'block', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Chip label={service.category_details} color="primary" sx={{ margin: '3px', marginLeft: '0' }} />
          {service.sub_categories_details.map((subcat, index) => (
            <Chip key={index} label={subcat.name} color="primary" sx={{ margin: '3px' }} />
          ))}
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={0}>
          <Typography component="p" color={'black'}>
            <strong>
              {service.region_details} | {service.location_details}
            </strong>
          </Typography>
          <Box>
            <Tooltip title="Edit">
              <IconButton aria-label="edit" size="small" onClick={handleOpenEditService}>
                <IconEdit width={32} color="green" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton aria-label="delete" size="small" onClick={handleOpenDeleteService}>
                <IconTrash width={32} color="red" />
              </IconButton>
            </Tooltip>
          </Box>
          {editServiceComponent && <EditPublicService service={service} modalState={editServiceComponent} handleCancel={handleCancelEditService} type={type} />}

          {deleteServiceComponent && (
            <DeletePublicService service={service} modalState={deleteServiceComponent} handleCancel={handleCancelDeleteService} handleCancelWithSuccess={handleCancelWithSuccess} type={type} />
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default PublicService;
