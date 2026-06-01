
ALTER TABLE public.contact_submissions
  ADD CONSTRAINT contact_name_len CHECK (char_length(name) BETWEEN 1 AND 100),
  ADD CONSTRAINT contact_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT contact_message_len CHECK (char_length(message) BETWEEN 1 AND 2000),
  ADD CONSTRAINT contact_phone_len CHECK (phone IS NULL OR char_length(phone) BETWEEN 3 AND 30);

ALTER TABLE public.reservations
  ADD CONSTRAINT res_name_len CHECK (char_length(name) BETWEEN 1 AND 100),
  ADD CONSTRAINT res_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT res_phone_len CHECK (char_length(phone) BETWEEN 3 AND 30),
  ADD CONSTRAINT res_notes_len CHECK (notes IS NULL OR char_length(notes) BETWEEN 0 AND 1000),
  ADD CONSTRAINT res_time_len CHECK (char_length(reservation_time) BETWEEN 4 AND 5),
  ADD CONSTRAINT res_date_future CHECK (reservation_date >= '2026-01-01');
