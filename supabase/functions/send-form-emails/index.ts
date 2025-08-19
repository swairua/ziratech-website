import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FormSubmissionData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  position?: string;
  form_type: 'contact' | 'career';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: FormSubmissionData = await req.json();
    console.log("Processing form submission:", formData);

    // Send confirmation email to user
    const confirmationEmail = await sendConfirmationEmail(formData);
    console.log("Confirmation email result:", confirmationEmail);

    // Send notification email to admin
    const adminEmail = await sendAdminNotification(formData);
    console.log("Admin email result:", adminEmail);

    return new Response(JSON.stringify({ 
      success: true, 
      confirmationSent: confirmationEmail.success,
      adminNotificationSent: adminEmail.success 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in send-form-emails function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

async function sendConfirmationEmail(data: FormSubmissionData) {
  try {
    const subject = data.form_type === 'career' 
      ? "Thank you for your job application - Zira Technologies"
      : "Thank you for contacting Zira Technologies";

    const htmlContent = data.form_type === 'career' 
      ? getCareerConfirmationTemplate(data)
      : getContactConfirmationTemplate(data);

    const response = await resend.emails.send({
      from: "Zira Technologies <noreply@ziratech.com>",
      to: [data.email],
      subject,
      html: htmlContent,
    });

    return { success: true, data: response };
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return { success: false, error };
  }
}

async function sendAdminNotification(data: FormSubmissionData) {
  try {
    const adminEmail = data.form_type === 'career' 
      ? "careers@ziratech.com" 
      : "info@ziratech.com";

    const subject = data.form_type === 'career'
      ? `New Job Application: ${data.position || 'Position not specified'}`
      : "New Contact Form Submission";

    const htmlContent = data.form_type === 'career'
      ? getCareerAdminTemplate(data)
      : getContactAdminTemplate(data);

    const response = await resend.emails.send({
      from: "Zira Technologies <noreply@ziratech.com>",
      to: [adminEmail],
      subject,
      html: htmlContent,
    });

    return { success: true, data: response };
  } catch (error) {
    console.error("Error sending admin notification:", error);
    return { success: false, error };
  }
}

function getContactConfirmationTemplate(data: FormSubmissionData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting Zira Technologies</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1C2B3A 0%, #FF6A00 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Zira Technologies</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Building Tomorrow's Digital Solutions</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <h2 style="color: #1C2B3A; margin-top: 0;">Thank you for reaching out!</h2>
        
        <p>Dear ${data.name},</p>
        
        <p>Thank you for contacting Zira Technologies. We have received your message and our team will review it shortly. We typically respond within 24-48 hours during business days.</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #1C2B3A; margin-top: 0;">Your Message Details:</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p style="font-style: italic;">${data.message || 'No message provided'}</p>
        </div>
        
        <p>In the meantime, feel free to explore our services and solutions on our website. If you have any urgent matters, please don't hesitate to call us directly.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://ziratech.com" style="background: #FF6A00; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Visit Our Website</a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="font-size: 14px; color: #6b7280;">
          Best regards,<br>
          The Zira Technologies Team<br>
          <a href="mailto:info@ziratech.com" style="color: #FF6A00;">info@ziratech.com</a>
        </p>
      </div>
    </body>
    </html>
  `;
}

function getCareerConfirmationTemplate(data: FormSubmissionData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for your application - Zira Technologies</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1C2B3A 0%, #FF6A00 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Zira Technologies</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Career Opportunities</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <h2 style="color: #1C2B3A; margin-top: 0;">Application Received!</h2>
        
        <p>Dear ${data.name},</p>
        
        <p>Thank you for your interest in joining the Zira Technologies team! We have successfully received your job application and our HR team will review it carefully.</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #1C2B3A; margin-top: 0;">Application Details:</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.position ? `<p><strong>Position:</strong> ${data.position}</p>` : ''}
          ${data.company ? `<p><strong>Current Company:</strong> ${data.company}</p>` : ''}
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        </div>
        
        <h3 style="color: #1C2B3A;">What happens next?</h3>
        <ul style="color: #4b5563;">
          <li>Our HR team will review your application within 5-7 business days</li>
          <li>If your profile matches our requirements, we'll contact you for an initial interview</li>
          <li>We'll keep you updated throughout the process via email</li>
        </ul>
        
        <div style="background: #fef3cd; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e;"><strong>Important:</strong> Please keep this email as confirmation of your application. We'll reference your application using the details provided above.</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="font-size: 14px; color: #6b7280;">
          Best regards,<br>
          Zira Technologies HR Team<br>
          <a href="mailto:careers@ziratech.com" style="color: #FF6A00;">careers@ziratech.com</a>
        </p>
      </div>
    </body>
    </html>
  `;
}

function getContactAdminTemplate(data: FormSubmissionData): string {
  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #1C2B3A;">New Contact Form Submission</h2>
      
      <div style="background: #f3f4f6; padding: 20px; border-radius: 6px; border-left: 4px solid #FF6A00;">
        <h3>Contact Details:</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        
        <h3>Message:</h3>
        <p>${data.message || 'No message provided'}</p>
      </div>
      
      <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
        This email was automatically generated from the Zira Technologies contact form.
      </p>
    </body>
    </html>
  `;
}

function getCareerAdminTemplate(data: FormSubmissionData): string {
  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #1C2B3A;">New Job Application Received</h2>
      
      <div style="background: #f3f4f6; padding: 20px; border-radius: 6px; border-left: 4px solid #FF6A00;">
        <h3>Candidate Details:</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.position ? `<p><strong>Position Applied:</strong> ${data.position}</p>` : ''}
        ${data.company ? `<p><strong>Current Company:</strong> ${data.company}</p>` : ''}
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        <p><strong>Applied:</strong> ${new Date().toLocaleString()}</p>
        
        ${data.message ? `
          <h3>Cover Letter/Message:</h3>
          <p>${data.message}</p>
        ` : ''}
      </div>
      
      <div style="margin: 20px 0; padding: 15px; background: #e0f2fe; border-radius: 6px;">
        <p style="margin: 0;"><strong>Next Steps:</strong></p>
        <ul style="margin: 10px 0;">
          <li>Review the candidate's CV/resume</li>
          <li>Schedule initial screening if suitable</li>
          <li>Update application status in admin panel</li>
        </ul>
      </div>
      
      <p style="font-size: 14px; color: #6b7280;">
        This email was automatically generated from the Zira Technologies careers page.
      </p>
    </body>
    </html>
  `;
}

serve(handler);