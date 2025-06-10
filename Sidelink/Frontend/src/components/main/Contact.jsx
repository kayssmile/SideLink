import { useState } from 'react';
import { Button, Box, FormGroup, CircularProgress, Typography, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactSchema } from 'src/config/Schemas';
import { basicPostRequest } from 'src/services/BasicRequests';
import { basicErrorMessage } from 'src/components/shared/utils/ErrorHandling';
import Heading from 'src/components/main/shared/Heading';
import { StyledTextField } from 'src/components/shared/forms/FormElements';

function Contact() {
  const theme = useTheme();
  let [contactMessage, setContactMessage] = useState({ loading: false, error: false, success: false });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = async data => {
    setContactMessage({ ...contactMessage, loading: true });
    try {
      const response = await basicPostRequest('/api/contact-message/', data);
      if (response.status) {
        setContactMessage({ loading: false, success: true, error: false });
        reset();
      } else {
        setContactMessage({ loading: false, error: response.data, success: false });
      }
    } catch (error) {
      console.error('Request failed:', error);
      setContactMessage({ loading: false, error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.', success: false });
    }
  };

  return (
    <Box component="section" sx={{ padding: '2rem 0' }}>
      <Heading titleKey1={'Kontakt.'} subTitle={'Du hast ein Anliegen oder eine Frage? Wir helfen dir gerne weiter.'} />
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '6rem 10rem',
          marginTop: '2rem',
          width: 'auto',
          gap: '35px',
          marginBottom: '4rem',
          backgroundColor: theme.palette.background.primary,
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontWeight: '300',
            margin: '0.5rem 0',
            textAlign: 'left',
            color: 'white',
            width: '100%',
          }}
        >
          Deine Nachricht
        </Typography>

        <FormGroup sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <StyledTextField required label="Vorname" type="text" name="Vorname" {...register('first_name')} error={!!errors.first_name} helperText={errors.first_name?.message} sx={{ width: '48%' }} />
          <StyledTextField label="Nachname" type="text" name="Nachname" {...register('last_name')} error={!!errors.last_name} helperText={errors.last_name?.message} sx={{ width: '48%' }} />
        </FormGroup>

        <StyledTextField required label="Email" type="email" name="email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />

        <StyledTextField required label="Anliegen" type="text" name="subject" {...register('subject')} error={!!errors.subject} helperText={errors.subject?.message} />

        <StyledTextField required type="text" label="Nachricht" name="message" id="message" multiline rows={4} {...register('message')} error={!!errors.message} helperText={errors.message?.message} />
        <input type="hidden" name="honeypot" value="" {...register('honeypot')} />

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          {contactMessage.error && basicErrorMessage(contactMessage.error)}
          {contactMessage.success && <Typography color="success">Die Nachricht wurde erfolgreich übermittelt wir werden uns zeitnah melden.</Typography>}
        </Box>

        <Button
          disabled={contactMessage.success}
          variant="contained"
          color="primary"
          type="submit"
          sx={{ height: '45px', marginTop: '40px', color: 'white', fontSize: '1rem', width: '250px', left: 'calc(100% - 250px)' }}
        >
          {contactMessage.loading ? <CircularProgress size="25px" sx={{ color: 'white' }} /> : 'Nachricht senden'}
        </Button>
      </Box>
    </Box>
  );
}

export default Contact;
