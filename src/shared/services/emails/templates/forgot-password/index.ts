import fs from 'fs';
import { load } from 'cheerio';

class ForgotPasswordTemplate {
  public passwordResetTemplate(username: string, resetLink: string): string {
    // Load index.html and parse it using Cheerio
    const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
    const $ = load(html);

    // Update the username and reset link values in the HTML template
    $('.forgot-password__userName').text(username);
    $('.forgot-password__reset-button').attr('href', resetLink);

    // Return the updated HTML content as a string
    return $.html();
  }
}

export const forgotPasswordTemplate: ForgotPasswordTemplate = new ForgotPasswordTemplate();
