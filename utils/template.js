export const generateEmailTemplate = (content) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #DEF7E5; padding: 20px; font-family: Arial, sans-serif;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <tr>
            <td align="center" style="padding: 20px;">
              <h1 style="color: #00796B; font-size: 24px; margin: 0;">Welcome to Freelix</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; color: #263238; font-size: 16px; line-height: 1.5;">
              ${content}
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px;">
              <a href="https://freelix24.netlify.app/login" style="text-decoration: none; color: #FFFFFF; background-color: #00796B; padding: 10px 20px; border-radius: 4px; font-size: 16px;">
                Login
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px; font-size: 14px; color: #263238;">
              <p style="margin: 0;">Thank you for choosing Freelix!</p>
              <p style="color: #00796B; margin: 0;">© 2024 Freelix. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;
