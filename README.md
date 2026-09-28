# App móvil — Apoyo a cuidadores

**Grupo 7 · GPTI PUC 2026-2 · Entrega final 24/11/2026**

App móvil (React Native + Expo) para cuidadores de personas dependientes.
Consume la API [`caregivers-backend`](https://github.com/davidboyd00/app-apoyo-cuidadores)
y usa Supabase para auth + realtime.

## Stack

- **Expo** SDK 58 + **expo-router** (rutas file-based).
- **TypeScript**.
- **@supabase/supabase-js** para auth (JWT) y realtime en la bitácora.
- **@tanstack/react-query** para el estado servidor.
- **expo-notifications** para recordatorios locales de medicamentos.
- **expo-secure-store** para persistir la sesión.

## Cómo correr

```bash
npm install
cp .env.example .env          # completar con URL/keys
npx expo start                # abre Expo Go o dev build
```

Requisitos:
- Node 20+
- Cuenta de Supabase con `db/schema.sql` del backend aplicado.
- Backend corriendo (local con `uvicorn` o el deploy de Render).

## Estructura

```
src/
  app/            rutas de expo-router (screens)
  components/     UI reutilizable
  hooks/          hooks compartidos (auth, queries)
  constants/      colores, tipografía, endpoints
```

## Contrato con el backend

- Toda llamada a `/patients/**` requiere `Authorization: Bearer <jwt>` (el JWT lo emite Supabase).
- Antes de operar contra endpoints de negocio, hay que aceptar la política vigente (`POST /me/consent`) — si no, el backend responde 409.
- Los tipos de `app/schemas.py` del backend son la fuente de verdad del contrato; ver la sección **Contrato con Móvil** de ese repo antes de cambiarlos.

## Convenciones

- Código y comentarios en **español** (mismo criterio que el backend, proyecto chileno).
- Nunca enviar audio al backend: la voz se transcribe en el cliente (regla sagrada del proyecto).
- El estado del asistente IA debe mostrar `cited_entry_ids` como chips clickeables (KPI >90% verificable).
- Cada entrada de bitácora muestra el autor (KPI relevo familiar >60%).

## Docs

- Roadmap del MVP: ver `docs/ROADMAP.md` (por escribir).
- Contrato de API: `docs/API.md` (por escribir).
