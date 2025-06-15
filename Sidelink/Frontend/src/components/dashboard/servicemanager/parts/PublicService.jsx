import { useState } from 'react';
import { Chip, Typography, Box, useTheme, useMediaQuery, Stack, IconButton } from '@mui/material';
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
    <Box
      p={2}
      sx={{
        position: 'relative',
        cursor: 'default',
        mb: 1,
        borderRadius: '8px',
        boxShadow: '0 0 5px 0 grey',
        backgroundColor: theme.palette.background.white,
        margin: smDown ? '0' : '1rem',
        marginBottom: '1rem !important',
      }}
    >
      <Typography variant="h5" sx={{ color: theme.palette.text.dark, opacity: '1', fontSize: { xs: '1.2rem', sm: '1.4rem' } }}>
        {service.title}
      </Typography>

      <Typography variant="p" sx={{ color: theme.palette.text.dark, opacity: '1', display: 'block', marginTop: '1rem', fontSize: '1.2rem' }}>
        {service.description}
      </Typography>

      <Stack direction="row" sx={{ display: smDown ? 'flex' : 'block', flexWrap: 'wrap', marginTop: '1rem' }}>
        <Chip label={service.category_details} color="primary" sx={{ margin: '3px', marginLeft: '0' }} />
        {service.sub_categories_details.map((subcat, index) => (
          <Chip key={index} label={subcat.name} color="primary" sx={{ margin: '3px' }} />
        ))}
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={0}>
        <Typography component="p" color={theme.palette.text.dark}>
          <strong>
            {service.region_details} | {service.location_details}
          </strong>
        </Typography>
        <Box>
          <IconButton aria-label="edit" size="small" onClick={handleOpenEditService}>
            <IconEdit width={32} color="green" />
          </IconButton>

          <IconButton aria-label="delete" size="small" onClick={handleOpenDeleteService}>
            <IconTrash width={32} color="red" />
          </IconButton>
        </Box>
        {editServiceComponent && <EditPublicService service={service} modalState={editServiceComponent} handleCancel={handleCancelEditService} type={type} />}

        {deleteServiceComponent && (
          <DeletePublicService service={service} modalState={deleteServiceComponent} handleCancel={handleCancelDeleteService} handleCancelWithSuccess={handleCancelWithSuccess} type={type} />
        )}
      </Stack>
    </Box>
  );
};

export default PublicService;
