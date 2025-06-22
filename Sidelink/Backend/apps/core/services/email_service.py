import logging
from django.core.mail import EmailMessage
from django.conf import settings

logger = logging.getLogger('email_service')

class EmailService:

    def __init__(self, to, subject, body, from_email=None, cc_emails=None):
        """
        Initialize the EmailService with email parameters.
        Args:
            to: Recipient(s)
            subject: Email subject
            body: Plain text content
            from_email: Sender email
            cc_emails: Optional list of CC recipients
        """
        self.to = to if isinstance(to, list) else [to]
        self.subject = subject
        self.body = body
        self.from_email = from_email or settings.DEFAULT_FROM_EMAIL
        self.cc_emails = cc_emails or []

    def send(self):
        """
        Send the email using the initialized parameters.
        Returns:
            bool: True if sent successfully, False otherwise
        """
        try:
            msg = EmailMessage(to=self.to, subject=self.subject, body=self.body, from_email=self.from_email, cc=self.cc_emails)
            result = msg.send()
            if result == 0:
                raise Exception("No emails were sent.")
            logger.info(f"Sent email to {', '.join(self.to)} | Subject: {self.subject} | Status: {result}")
            return True
        except Exception as e:
            logger.error(f"Error sending email to {', '.join(self.to)} | Subject: {self.subject} | {e}", exc_info=True)
            return False
