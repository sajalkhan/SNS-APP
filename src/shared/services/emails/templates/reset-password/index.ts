import fs from 'fs';
import { load } from 'cheerio';
import { IResetPasswordParams } from '@user/interfaces/user.interface';

class ResetPasswordTemplate {
  public passwordResetConfirmationTemplate(templateParams: IResetPasswordParams): string {
    const { username, email, ipaddress, date } = templateParams;
    // Load index.html and parse it using Cheerio
    const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
    const $ = load(html);

    // Update the username and reset link values in the HTML template
    $('.reset-password__userName').text(username);
    $('.reset-password__email').text(email);
    $('.reset-password__ip').text(ipaddress);
    $('.reset-password__date').text(date);

    // Return the updated HTML content as a string
    return $.html();
  }
}

export const resetPasswordTemplate: ResetPasswordTemplate = new ResetPasswordTemplate();
