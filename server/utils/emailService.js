const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email templates
const emailTemplates = {
  formDataEmail: (contact) => ({
    subject: `New Photography Inquiry from ${contact.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f0f0f0; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; text-align: center; font-size: 28px;">New Contact Form Submission</h1>
          <p style="color: white; text-align: center; margin-top: 10px; opacity: 0.9;">Cs Photography</p>
        </div>
        
        <div style="background-color: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 30px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Details</h2>
          
          <div style="margin-bottom: 25px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #e9ecef; width: 30%; font-weight: bold; color: #495057;">
                  <strong>Name:</strong>
                </td>
                <td style="padding: 12px; background-color: #ffffff; border: 1px solid #e9ecef; color: #333;">
                  ${contact.name}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #e9ecef; font-weight: bold; color: #495057;">
                  <strong>Email:</strong>
                </td>
                <td style="padding: 12px; background-color: #ffffff; border: 1px solid #e9ecef;">
                  <a href="mailto:${
                    contact.email
                  }" style="color: #667eea; text-decoration: none;">
                    ${contact.email}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #e9ecef; font-weight: bold; color: #495057;">
                  <strong>Phone:</strong>
                </td>
                <td style="padding: 12px; background-color: #ffffff; border: 1px solid #e9ecef;">
                  <a href="tel:${
                    contact.phone
                  }" style="color: #667eea; text-decoration: none;">
                    ${contact.phone}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #e9ecef; font-weight: bold; color: #495057;">
                  <strong>Event Date:</strong>
                </td>
                <td style="padding: 12px; background-color: #ffffff; border: 1px solid #e9ecef; color: #333;">
                  ${new Date(contact.eventDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #e9ecef; font-weight: bold; color: #495057;">
                  <strong>Service Type:</strong>
                </td>
                <td style="padding: 12px; background-color: #ffffff; border: 1px solid #e9ecef; color: #333;">
                  <span style="background-color: #667eea; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
                    ${contact.eventType}
                  </span>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #e9ecef; font-weight: bold; color: #495057;">
                  <strong>Submitted At:</strong>
                </td>
                <td style="padding: 12px; background-color: #ffffff; border: 1px solid #e9ecef; color: #333;">
                  ${new Date(contact.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
              </tr>
            </table>
          </div>
          
          <div style="margin-top: 30px;">
            <h3 style="color: #333; margin-bottom: 15px; font-size: 18px;">Message from Client:</h3>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
              <p style="color: #495057; line-height: 1.8; margin: 0; white-space: pre-wrap; font-size: 15px;">
                ${contact.message}
              </p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #e8f0fe; border-radius: 8px; text-align: center;">
            <p style="color: #1a73e8; margin: 0; font-weight: bold;">Quick Actions</p>
            <div style="margin-top: 15px;">
              <a href="mailto:${contact.email}" 
                 style="display: inline-block; background-color: #667eea; color: white; padding: 10px 25px; text-decoration: none; border-radius: 5px; margin: 0 5px;">
                Reply to Client
              </a>
              <a href="tel:${contact.phone}" 
                 style="display: inline-block; background-color: #28a745; color: white; padding: 10px 25px; text-decoration: none; border-radius: 5px; margin: 0 5px;">
                Call Client
              </a>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; text-align: center; color: #6c757d; font-size: 14px;">
            <p style="margin: 5px 0;">This is an automated email from Cs Photography Contact Form</p>
            <p style="margin: 5px 0;">Contact ID: ${contact.id}</p>
          </div>
        </div>
      </div>
    `,
  }),

  // Confirmation email to the client
  contactConfirmation: (name) => ({
    subject: "Thank you for contacting Cs Photography",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); padding: 40px; text-align: center;">
          <h1 style="color: white; margin: 0;">Cs</h1>
          <p style="color: white; margin: 10px 0 0 0;">Professional Photography Studio</p>
        </div>
        
        <div style="padding: 40px; background-color: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${name}!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out to us. We've received your inquiry and are excited 
            to learn more about your photography needs.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Our team will review your message and get back to you within 24 hours with 
            more information about our services and availability.
          </p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">What happens next?</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li>We'll review your requirements</li>
              <li>Check our availability for your date</li>
              <li>Prepare a customized quote</li>
              <li>Schedule a consultation call if needed</li>
            </ul>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            In the meantime, feel free to browse our 
            <a href="${process.env.CLIENT_URL}/gallery" style="color: #a855f7; text-decoration: none;">portfolio</a> 
            to see more of our work.
          </p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #999; font-size: 14px; margin: 5px 0;">
              Best regards,<br>
              The Cs Team
            </p>
            <p style="color: #999; font-size: 12px; margin: 5px 0;">
              mandir hasaud , raipur chhattisgarh <br>
              Phone: +1 (234) 567-890 | Email: hello@CSphotography.com
            </p>
          </div>
        </div>
      </div>
    `,
  }),
};

// Send email function
const sendEmail = async (to, template) => {
  try {
    const mailOptions = {
      from: `"Cs Photography" <${
        process.env.EMAIL_FROM || process.env.EMAIL_USER
      }>`,
      to,
      ...template,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email error:", error);
    // Don't throw error to prevent form submission failure
    // Just log the error
  }
};

// Export email service functions
module.exports = {
  sendContactConfirmation: async (email, name) => {
    return sendEmail(email, emailTemplates.contactConfirmation(name));
  },

  sendFormDataEmail: async (contact) => {
    // Send to offsuraj28@gmail.com
    return sendEmail(
      process.env.EMAIL_TO || process.env.EMAIL_USER,
      emailTemplates.formDataEmail(contact)
    );
  },

  // Verify email configuration
  verifyConnection: async () => {
    try {
      await transporter.verify();
      console.log("Email service is ready");
      return true;
    } catch (error) {
      console.error("Email service error:", error);
      return false;
    }
  },
};
