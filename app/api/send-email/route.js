import { Resend } from "resend";
import { EmailTemplate } from "../../../components/email-template";

const resend = new Resend("re_eT67d5kA_D7RcMC4YBXaVQXGbVNtP3L79");

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["deskoemad@gmail.com"],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
