import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to Bookmarks App 🎉",
      html: `
        <h1>Welcome 🎉</h1>
        <p>Thanks for joining Bookmarks App</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Email failed" },
      { status: 500 }
    );
  }
}