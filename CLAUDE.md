@AGENTS.md

# App móvil de apoyo a cuidadores (Grupo 7 · GPTI PUC 2026-2)

Instrucciones específicas de este repo. Lee esto además de `AGENTS.md`
(guía general de Expo/RN) y del `CLAUDE.md` del backend hermano en
`../caregivers-backend/CLAUDE.md`.

## Qué es

Cliente móvil de la app de apoyo a cuidadores: bitácora compartida entre
familiares + asistente de IA con contexto cerrado + recordatorios locales
de medicamentos. Consume el backend FastAPI/Supabase en el repo hermano.
Responsable: David Boyd (backend + móvil). Entrega 24/11/2026.

## Stack

- Expo SDK 58 + expo-router (TS).
- Auth y realtime: Supabase (`@supabase/supabase-js` directo desde el cliente).
- Estado servidor: TanStack Query.
- Notificaciones: expo-notifications locales.
- Sesión: expo-secure-store.

## Reglas del proyecto (además de las de AGENTS.md)

1. **Idioma**: código y comentarios en español.
2. **Voz nunca sale del cliente**: la transcripción se hace acá con
   expo-speech-recognition; al backend le llega texto con `source: "voice"`.
3. **Todo llamado al backend usa el JWT de Supabase.** El helper de API
   (`src/lib/api.ts`) debe inyectarlo automáticamente.
4. **Gate de consentimiento (Ley 21.719)**: si el backend responde 409 en
   cualquier endpoint de negocio, redirigir a la pantalla de política.
5. **Autor visible en la bitácora**: cada entrada muestra quién la escribió.
   Es el KPI de relevo familiar (>60% pacientes con ≥2 autores/semana).
6. **Citaciones visibles en el asistente**: cada respuesta muestra chips
   con las entradas citadas (`cited_entry_ids`) y al tocarse abren la
   entrada. Es el KPI de >90% verificable.
7. **Contrato con el backend congela en `app/schemas.py` del backend.**
   Cualquier cambio a los tipos requiere coordinar con el backend.
8. **Descartadas por decisión de arquitectura** (ver ARCHITECTURE.md §8
   del backend): websockets propios (usar Supabase Realtime), embeddings
   en el cliente, autenticación propia.

## Cómo correr

```bash
npm install
cp .env.example .env
npx expo start
```

## Variables de entorno

- `EXPO_PUBLIC_SUPABASE_URL` — proyecto Supabase.
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` — key `anon` (pública), NUNCA la service role.
- `EXPO_PUBLIC_API_URL` — base URL del backend (local: http://localhost:8000).

## Antes de declarar una tarea terminada

Correr y que pasen:
```bash
npx expo lint
npx tsc --noEmit
npx expo-doctor
```

## Repo hermano

- Backend: https://github.com/davidboyd00/app-apoyo-cuidadores
- Reglas sagradas del proyecto y contexto legal: ver `CLAUDE.md` del backend.
