import * as yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MAX_FILE_SIZE = 3 * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

const loginSchema = yup.object().shape({
  email: yup.string().matches(emailRegex, 'Ungültige E-Mail').email('Ungültige E-Mail').required('E-Mail ist erforderlich'),
  password: yup
    .string()
    .min(3, 'Mindestens 6 Zeichen')
    .matches(/[A-Z]/, 'Mindestens ein Großbuchstabe erforderlich')
    .matches(/[@$!%*?&]/, 'Mindestens ein Sonderzeichen erforderlich (@, $, !, %, *, ?, &)')
    .required('Passwort ist erforderlich'),
  honeypot: yup.string().test('is-empty', 'Dieses Feld muss leer bleiben.', value => !value || value.trim() === ''),
});

const registerSchema = yup.object().shape({
  first_name: yup
    .string()
    .required('Vorname ist erforderlich')
    .matches(/^[A-Za-z\s]+$/, 'Nur Buchstaben sind erlaubt'),
  last_name: yup
    .string()
    .required('Nachname ist erforderlich')
    .matches(/^[A-Za-z\s]+$/, 'Nur Buchstaben sind erlaubt'),
  profession: yup.string().required('Beruf ist erforderlich'),
  phone_number: yup
    .string()
    .required('Telefonnummer ist erforderlich')
    .matches(/^\+?[0-9\s]{7,20}$/, 'Ungültige Telefonnummer'),
  street_address: yup.string().required('Strasse ist erforderlich'),
  postal_code: yup
    .string()
    .required('Postleitzahl ist erforderlich')
    .test('is-numeric', 'Nur Zahlen erlaubt', value => /^\d+$/.test(value)),
  place: yup.string().required('Ort ist erforderlich'),
  region: yup.string().required('Region ist erforderlich'),
  email: yup.string().matches(emailRegex, 'Ungültige E-Mail').email('Ungültige E-Mail').required('E-Mail ist erforderlich'),
  password: yup
    .string()
    .min(6, 'Mindestens 6 Zeichen')
    .matches(/[A-Z]/, 'Mindestens ein Großbuchstabe erforderlich')
    .matches(/[@$!%*?&]/, 'Mindestens ein Sonderzeichen erforderlich (@, $, !, %, *, ?, &)')
    .required('Passwort ist erforderlich'),
  honeypot: yup.string().test('is-empty', 'Dieses Feld muss leer bleiben.', value => !value || value.trim() === ''),
});

const contactSchema = yup.object().shape({
  first_name: yup
    .string()
    .required('Vorname ist erforderlich')
    .matches(/^[A-Za-z\s]+$/, 'Nur Buchstaben sind erlaubt'),
  last_name: yup.string(),
  email: yup.string().matches(emailRegex, 'Ungültige E-Mail').email('Ungültige E-Mail').required('E-Mail ist erforderlich'),
  subject: yup.string().required('Anliegen ist erforderlich').min(5, 'Mindestens 5 Zeichen').max(200, 'Maximal 200 Zeichen'),
  message: yup.string().required('Nachricht ist erforderlich').min(10, 'Mindestens 10 Zeichen').max(2000, 'Maximal 2000 Zeichen'),
  honeypot: yup.string().test('is-empty', 'Dieses Feld muss leer bleiben.', value => !value || value.trim() === ''),
});

const passwordForgotSchema = yup.object().shape({
  email: yup.string().matches(emailRegex, 'Ungültige E-Mail').email('Ungültige E-Mail').required('E-Mail ist erforderlich'),
  honeypot: yup.string().test('is-empty', 'Dieses Feld muss leer bleiben.', value => !value || value.trim() === ''),
});

const passwordResetSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Mindestens 6 Zeichen')
    .matches(/[A-Z]/, 'Mindestens ein Großbuchstabe erforderlich')
    .matches(/[@$!%*?&]/, 'Mindestens ein Sonderzeichen erforderlich (@, $, !, %, *, ?, &)')
    .required('Passwort ist erforderlich'),
  confirm_password: yup
    .string()
    .required('Bitte wiederhole dein neues Passwort')
    .oneOf([yup.ref('password')], 'Die Passwörter stimmen nicht überein'),
  honeypot: yup.string().test('is-empty', 'Dieses Feld muss leer bleiben.', value => !value || value.trim() === ''),
});

const editAccountSchema = yup.object().shape({
  first_name: yup
    .string()
    .required('Vorname ist erforderlich')
    .matches(/^[A-Za-z\s]+$/, 'Nur Buchstaben sind erlaubt'),
  last_name: yup
    .string()
    .required('Nachname ist erforderlich')
    .matches(/^[A-Za-z\s]+$/, 'Nur Buchstaben sind erlaubt'),
  profession: yup.string().required('Beruf ist erforderlich'),
  phone_number: yup
    .string()
    .required('Telefonnummer ist erforderlich')
    .matches(/^\+?[0-9]{7,15}$/, 'Ungültige Telefonnummer'),
  street_address: yup.string().required('Strasse ist erforderlich'),
  postal_code: yup
    .string()
    .required('Postleitzahl ist erforderlich')
    .test('is-numeric', 'Nur Zahlen erlaubt', value => /^\d+$/.test(value)),
  place: yup.string().required('Ort ist erforderlich'),
  region: yup.string().required('Region ist erforderlich'),
});

const changeEmailSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, 'Ungültige E-Mail')
    .email('Ungültige E-Mail')
    .required('E-Mail ist erforderlich')
    .test('email-match', 'Diese E-Mail stimmt nicht mit deinem Account überein', function (value) {
      const { userEmail } = this.options.context;
      return value === userEmail;
    }),
  email_new: yup
    .string()
    .matches(emailRegex, 'Ungültige E-Mail')
    .email('Ungültige E-Mail')
    .required('Neue E-Mail ist erforderlich')
    .test('email-match', 'Diese E-Mail bereits in Verwendung', function (value) {
      const { userEmail } = this.options.context;
      return value != userEmail;
    }),
});

const changePasswordSchema = yup.object().shape({
  current_password: yup
    .string()
    //.min(6, 'Mindestens 6 Zeichen')
    //.matches(/[A-Z]/, 'Mindestens ein Großbuchstabe erforderlich')
    //.matches(/[@$!%*?&]/, 'Mindestens ein Sonderzeichen erforderlich (@, $, !, %, *, ?, &)')
    .required('Passwort ist erforderlich'),
  new_password: yup
    .string()
    //.min(6, 'Mindestens 6 Zeichen')
    //.matches(/[A-Z]/, 'Mindestens ein Großbuchstabe erforderlich')
    //.matches(/[@$!%*?&]/, 'Mindestens ein Sonderzeichen erforderlich (@, $, !, %, *, ?, &)')
    .required('Passwort ist erforderlich'),
  confirm_password: yup
    .string()
    .required('Bitte wiederhole dein neues Passwort')
    .oneOf([yup.ref('new_password')], 'Die Passwörter stimmen nicht überein'),
});

const publicProfileSchema = yup.object().shape({
  /*
   * @description: validators for publicprofile picture, validate if new file is uploaded.
   */
  profile_picture: yup
    .mixed()
    .test('fileLength', 'Dateiname ist zu lang max. 100 Zeichen', value => {
      if (!value || value.length === 0) return true;
      return value && value[0].name.length < 100;
    })
    .test('fileSize', 'Datei ist zu groß (max. 3MB)', value => {
      if (!value || value.length === 0) return true;
      return value && value[0].size <= MAX_FILE_SIZE;
    })
    .test('fileFormat', 'Ungültiges Dateiformat (nur JPG, PNG, WebP)', value => {
      if (!value || value.length === 0) return true;
      return value && SUPPORTED_FORMATS.includes(value[0].type);
    }),
  showed_name: yup.string().required('Name ist erforderlich').max(250, 'Maximal 500 Zeichen'),
  description: yup.string().required('Beschreibung ist erforderlich').max(500, 'Maximal 500 Zeichen'),
  contact_info: yup.string().required('Kontaktinformationen sind erforderlich').max(500, 'Maximal 500 Zeichen'),
});

const publicServiceSchema = yup.object().shape({
  category: yup.string().required('Kategorie ist erforderlich'),
  sub_categories: yup.array().max(3, 'Maximal 3 Unterkategorien erlaubt'),
  region: yup.string().required('Region ist erforderlich'),
  location: yup.string().required('Ort ist erforderlich'),
  additional_location_info: yup.string().matches(/^[\p{L}0-9\s.,;:!?()\-äöüÄÖÜß]*$/u, 'Ungültige Zeichen enthalten'),
  title: yup.string().required('Titel ist erforderlich').max(100, 'Maximal 100 Zeichen'),
  description: yup.string().required('Beschreibung ist erforderlich').max(500, 'Maximal 350 Zeichen'),
});

export { loginSchema, registerSchema, contactSchema, editAccountSchema, changeEmailSchema, changePasswordSchema, publicProfileSchema, publicServiceSchema, passwordForgotSchema, passwordResetSchema };
