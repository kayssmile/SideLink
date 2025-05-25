import logging
from smtplib import SMTPException
from django.core.mail import EmailMessage
from django.conf import settings

logger = logging.getLogger('email_service')

class EmailService:
    @staticmethod
    def send_email(to_email, subject="Kein Betreff", body="Kein Inhalt", from_email=None, cc_emails=None):
        """
        Send an email and log the result.
        Args:
            to_email (str or list): Recipient(s)
            subject (str): Email subject
            body (str): Plain text content
            from_email (str): Sender email
            cc_emails (list): Optional list of CC recipients
        Returns:
            bool: True if sent successfully, False otherwise
        """
        if not to_email:
            raise ValueError("The 'to_email' address must be provided and cannot be empty.")
        if not isinstance(to_email, list):
            to_email = [to_email]

        from_email = from_email or settings.DEFAULT_FROM_EMAIL
        cc_emails = cc_emails or []

        try:
            msg = EmailMessage(subject=subject, body=body, from_email=from_email, to=to_email, cc=cc_emails)
            result = msg.send()
            if result == 0:
                raise Exception("No emails were sent.")
            logger.info(f"Sent email to {', '.join(to_email)} | Subject: {subject} | Status: {result}")
            return True
        except Exception as e:
            logger.error(f"Error sending email to {to_email} | Subject: {subject} | {e}", exc_info=True)
        return False
