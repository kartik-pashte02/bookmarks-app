import { resend } from "./resend";

export async function sendWelcomeEmail(
  email: string
) {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to Bookmarks App 🎉",
      html: `
        <h1>Welcome!</h1>
        <p>Your account has been created successfully.</p>
        <p>Start saving your bookmarks today.</p>
      `,
    });

    console.log("Welcome email sent");
  } catch (error) {
    console.error(error);
  }
}