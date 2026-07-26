/*
# Create reservations table for La Candelaria Casa de Eventos

## Purpose
Stores booking/reservation requests submitted by visitors through the website's
"Reservar" (Reserve) form. This is a single-tenant, no-auth public site: visitors
do not sign in, so the anon-key client must be able to insert new reservations and
read its own submissions.

## New Tables
- `reservations`
  - `id` (uuid, primary key)
  - `name` (text, not null) — full name of the person requesting the reservation
  - `email` (text, not null) — contact email
  - `phone` (text, not null) — contact phone / WhatsApp
  - `event_type` (text, not null) — type of event: Boda, Quince Años, Corporativo, Recepción, Otro
  - `event_date` (date, not null) — requested date of the event
  - `guests` (integer, not null) — estimated number of guests
  - `message` (text, nullable) — optional additional details / special requests
  - `status` (text, not null, default 'pendiente') — reservation status: pendiente, confirmada, cancelada
  - `created_at` (timestamptz, default now()) — when the request was submitted

## Security
- RLS enabled on `reservations`.
- Allow anon + authenticated INSERT so visitors can submit reservation requests without signing in.
- Allow anon + authenticated SELECT so the confirmation screen can display the submitted request.
- UPDATE and DELETE are restricted to authenticated (admin) users only — visitors cannot modify or delete their submissions.

## Important Notes
1. This is a public booking form — no sign-in required for visitors.
2. All policies use `TO anon, authenticated` for public read/write access.
3. The `status` column defaults to 'pendiente' so new requests start as pending.
4. An index on `created_at` helps with admin sorting of recent requests.
*/

CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  event_type text NOT NULL,
  event_date date NOT NULL,
  guests integer NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'pendiente',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_reservations" ON reservations;
CREATE POLICY "anon_select_reservations"
ON reservations FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_reservations" ON reservations;
CREATE POLICY "anon_insert_reservations"
ON reservations FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_reservations" ON reservations;
CREATE POLICY "auth_update_reservations"
ON reservations FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_reservations" ON reservations;
CREATE POLICY "auth_delete_reservations"
ON reservations FOR DELETE
TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations (created_at DESC);
