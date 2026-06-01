
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TEXT NOT NULL,
  party_size INTEGER NOT NULL CHECK (party_size BETWEEN 1 AND 30),
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT ALL ON public.contact_submissions TO service_role;

GRANT INSERT ON public.reservations TO anon, authenticated;
GRANT ALL ON public.reservations TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can submit contact" ON public.contact_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "anyone can submit reservation" ON public.reservations
  FOR INSERT TO anon, authenticated WITH CHECK (true);
