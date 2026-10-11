-- 1. Tabla de eventos (próximos eventos de la empresa)
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  facilitator TEXT NOT NULL,
  event_date DATE NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Índice para listar próximos eventos (activos, ordenados por fecha)
CREATE INDEX events_active_date_idx ON public.events (active, event_date);

-- 3. Auto-actualizar updated_at (reutiliza la función del schema inicial)
CREATE TRIGGER events_set_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4. RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 5. Lectura pública de eventos activos
CREATE POLICY "public_read_active_events" ON public.events
  FOR SELECT TO anon, authenticated
  USING (active = true);

-- 6. Gestión total solo para administradores (claim is_admin)
CREATE POLICY "admin_manage_events" ON public.events
  FOR ALL TO authenticated
  USING ((auth.jwt() ->> 'app_metadata')::jsonb ->> 'is_admin' = 'true')
  WITH CHECK ((auth.jwt() ->> 'app_metadata')::jsonb ->> 'is_admin' = 'true');

-- 7. Grants explícitos (robustez)
GRANT SELECT ON public.events TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.events TO authenticated;
