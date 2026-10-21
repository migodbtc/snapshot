"use server";

import "server-only";
import { z } from "zod";

const ContactSubmissionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  turnstileToken: z.string().optional(),
});

export async function submitContactAction(formData: {
  name: string;
  email: string;
  message: string;
  turnstileToken?: string;
}) {
  const result = ContactSubmissionSchema.safeParse(formData);
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || "Validation failed.",
    };
  }

  const { name, email, message, turnstileToken } = result.data;

  // 1. Cloudflare Turnstile Verification (if secret key configured)
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret && turnstileToken) {
    try {
      const verifyRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${encodeURIComponent(turnstileSecret)}&response=${encodeURIComponent(turnstileToken)}`,
        }
      );
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return { success: false, error: "Bot verification failed. Please try again." };
      }
    } catch {
      // In case of network failure during bot check, continue or reject based on security requirements
    }
  }

  // 2. Email Delivery via Resend (if RESEND_API_KEY is configured)
  const resendApiKey = process.env.RESEND_API_KEY;
  const targetEmail = process.env.CONTACT_TARGET_EMAIL || "miguejustin1026@gmail.com";

  if (resendApiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Snapshot Contact <onboarding@resend.dev>",
          to: [targetEmail],
          reply_to: email,
          subject: `Portfolio Message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("[Contact] Resend error:", errText);
        return { success: false, error: "Failed to deliver email. Please try again." };
      }
    } catch (err: unknown) {
      console.error("[Contact] Email dispatch exception:", err);
      return { success: false, error: "Network error sending message." };
    }
  } else {
    // In local development or if RESEND_API_KEY not yet set, log for the developer
    console.log("[Contact] Submission received (Dev Mode - no RESEND_API_KEY):", {
      name,
      email,
      message,
    });
  }

  return { success: true };
}
