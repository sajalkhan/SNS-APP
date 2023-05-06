import Logger from 'bunyan';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { config } from '@root/config';
import { BadRequestError } from '@global/helpers/error-handler';

interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const log: Logger = config.createLogger('mailOptions');

class MailTransport {
  public async sendEmail(receiverEmail: string, subject: string, body: string): Promise<void> {
    if (config.NODE_ENV === 'test' || config.NODE_ENV === 'development') {
      this.developmentEmailSender(receiverEmail, subject, body);
    } else {
      this.productionEmailSender(receiverEmail, subject, body);
    }
  }

  //* Test In Local Environment
  private async developmentEmailSender(receiverEmail: string, subject: string, body: string): Promise<void> {
    const transporter: Mail = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: config.SMTP_USER!,
        pass: config.SMTP_PASSWORD!
      }
    });

    const mailOptions: IMailOptions = {
      from: 'SNS App <noreply@sns-app.com>',
      to: receiverEmail,
      subject,
      html: body
    };

    try {
      await transporter.sendMail(mailOptions);
      log.info('Development email sent successfully.');
    } catch (error) {
      log.error('Error sending email', error);
      throw new BadRequestError('Error sending email');
    }
  }

  private async productionEmailSender(receiverEmail: string, subject: string, body: string): Promise<void> {
    const transporter: Mail = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.EMAIL,
        pass: config.MAIL_PASSWORD
      }
    });

    const mailOptions: IMailOptions = {
      from: `SNS App <${config.EMAIL!}>`,
      to: receiverEmail,
      subject,
      html: body
    };

    try {
      transporter.sendMail(mailOptions, (err: Error | null) => {
        if (err) {
          log.error('Error sending email', err);
          throw new BadRequestError('Error sending email');
        } else {
          log.info('Production email sent successfully.');
        }
      });
    } catch (error) {
      log.error('Error sending email', error);
      throw new BadRequestError('Error sending email');
    }
  }
}

export const mailTransport: MailTransport = new MailTransport();
