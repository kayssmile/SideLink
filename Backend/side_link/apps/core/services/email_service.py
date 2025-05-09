from django.core.mail import EmailMessage
from django.conf import settings
import logging

logger = logging.getLogger('email_service')

class EmailService:
    @staticmethod
    def send_email(context) :
        """
        Send email with the given context and logs the result.
        """
        to_email = context.get('to_email')
        subject = context.get('subject', 'Kein Betreff')
        from_email = context.get('from_email', settings.DEFAULT_FROM_EMAIL)
        body = context.get('text_content', 'Kein Inhalt')
        cc_emails = context.get('cc_emails', [])

        if not to_email:
            raise ValueError("The 'to_email' address must be provided and cannot be empty.")
        elif not isinstance(to_email, list):
            to_email = [to_email]

        try:
            msg = EmailMessage(subject=subject,
                body=body,
                from_email=from_email,
                to=to_email,
                cc=cc_emails,)

            result = msg.send()
            logger.info(f"Sending email to {', '.join(to_email)} with subject: {subject} - Status {result}")
            return True
            
        except Exception as e:
            logger.error(f"Sending email to {', '.join(to_email)} with subject: {subject} : {str(e)}", exc_info=True)
            return False