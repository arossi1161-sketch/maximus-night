import { supabase } from "@/integrations/supabase/client";

export type FormLogStatus = "success" | "db_error" | "email_error" | "validation_error";

export interface FormLogInput {
  formType: string;
  status: FormLogStatus;
  errorStage?: string;
  errorMessage?: string;
  recipientEmail?: string;
  payloadSummary?: Record<string, unknown>;
}

/**
 * Fire-and-forget logger for form submissions. Never throws — logging
 * failures must not break the user flow. Console-warns on error so devs
 * can spot issues during development.
 */
export async function logFormSubmission(input: FormLogInput): Promise<void> {
  try {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null;
    const { error } = await supabase.from("form_submission_log").insert({
      form_type: input.formType,
      status: input.status,
      error_stage: input.errorStage ?? null,
      error_message: input.errorMessage?.slice(0, 1000) ?? null,
      recipient_email: input.recipientEmail ?? null,
      payload_summary: input.payloadSummary ?? null,
      user_agent: ua,
    });
    if (error) console.warn("[form-log] insert failed", error.message);
  } catch (e) {
    console.warn("[form-log] unexpected error", e);
  }
}
