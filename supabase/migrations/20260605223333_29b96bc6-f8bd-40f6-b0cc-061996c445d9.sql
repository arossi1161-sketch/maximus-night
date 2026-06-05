
CREATE TABLE public.form_submission_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('success','db_error','email_error','validation_error')),
  error_stage TEXT,
  error_message TEXT,
  recipient_email TEXT,
  payload_summary JSONB,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.form_submission_log TO anon, authenticated;
GRANT ALL ON public.form_submission_log TO service_role;

ALTER TABLE public.form_submission_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert form logs"
  ON public.form_submission_log
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role full access form logs"
  ON public.form_submission_log
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE INDEX idx_form_submission_log_created_at ON public.form_submission_log (created_at DESC);
CREATE INDEX idx_form_submission_log_status ON public.form_submission_log (status, form_type);
