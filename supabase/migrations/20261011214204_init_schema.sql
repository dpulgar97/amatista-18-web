-- 1. Tipo de actividad
CREATE TYPE activity_type AS ENUM ('terapia', 'taller', 'formacion');

-- 2. Tabla principal
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type activity_type NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT,
  includes TEXT[],
  image_url TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Índice para las consultas públicas (filtro por type + active)
CREATE INDEX activities_active_type_idx ON public.activities (active, type);

-- 4. Auto-actualizar updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER activities_set_updated_at
  BEFORE UPDATE ON public.activities
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 5. RLS
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- 6. Lectura pública de actividades activas
CREATE POLICY "public_read_active" ON public.activities
  FOR SELECT TO anon, authenticated
  USING (active = true);

-- 7. Gestión total solo para administradores (claim is_admin)
CREATE POLICY "admin_manage_all" ON public.activities
  FOR ALL TO authenticated
  USING ((auth.jwt() ->> 'app_metadata')::jsonb ->> 'is_admin' = 'true')
  WITH CHECK ((auth.jwt() ->> 'app_metadata')::jsonb ->> 'is_admin' = 'true');

-- 8. Grants explícitos (robustez)
GRANT SELECT ON public.activities TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.activities TO authenticated;
