# Roadmap MVP · App móvil de apoyo a cuidadores

**Entrega final: 24/11/2026 · ~8 semanas desde el 29/09/2026**

Roadmap por semana con entregables verificables. El orden es importante:
cada semana desbloquea la siguiente. Si algo se cae, la prioridad para
recortar es (de mayor a menor sacrificable): Semana 7 → 6 → 5. El resto
es intocable porque toca los KPIs comprometidos.

---

## Semana 0 — arranque (29 sep – 30 sep)

- [x] `create-expo-app` con expo-router + TS.
- [ ] Deps del proyecto instaladas (`@supabase/supabase-js`,
  `@tanstack/react-query`, `expo-notifications`, `expo-secure-store`,
  `react-native-url-polyfill`).
- [ ] `.env.example` completado.
- [ ] CI mínimo: `expo lint` + `tsc --noEmit` + `expo-doctor`.
- [ ] Cliente HTTP base (`src/lib/api.ts`) con interceptor de JWT.

**Entrega**: app corre en Expo Go, llama a `GET /health` del backend y
muestra "OK".

## Semana 1 — auth + consentimiento (30 sep – 6 oct)

- [ ] Pantalla de sign-in (email + password) con Supabase Auth.
- [ ] Pantalla de sign-up.
- [ ] Persistencia de sesión en `expo-secure-store`.
- [ ] Gate de consentimiento: si `GET /me/consent` no está al día,
  bloquea con la política y `POST /me/consent`. Aplica a **todas** las
  rutas protegidas.
- [ ] Logout.

**Entrega**: usuario nuevo se registra, acepta la política y entra.

## Semana 2 — pacientes + grupo de cuidado (7 – 13 oct)

- [ ] Lista de pacientes (`GET /patients`).
- [ ] Alta de paciente.
- [ ] Invitación de familiares al grupo (`POST /patients/{id}/members`).
- [ ] Switcher de paciente en el header.

**Entrega**: David crea "Doña Elba", invita a un familiar, ambos la ven.

## Semanas 3 – 4 — bitácora + relevo familiar (14 – 27 oct)

- [ ] Feed cronológico de `log_entries` con paginación (`GET /entries`).
- [ ] Filtro por `kind` (nota / síntoma / ánimo / medicamento / otro).
- [ ] Crear entrada con formulario.
- [ ] **Entrada por voz**: expo-speech-recognition transcribe en cliente,
  se envía como texto con `source: "voice"`.
- [ ] Editar / borrar propias (o admin) — manejar 404 del backend cuando
  RLS bloquea.
- [ ] **Realtime**: suscripción de Supabase a INSERT en `log_entries`
  filtrado por `patient_id`. Entradas aparecen en vivo.
- [ ] **Autor visible** en cada entrada — es la evidencia del KPI de
  relevo familiar.

**Entrega — Momento KPI #1**: dos familiares registran entradas
simultáneas, ambos las ven en vivo con el autor visible.

## Semana 5 — medicamentos + notificaciones (28 oct – 3 nov)

- [ ] CRUD de medicamentos con `horarios[]`.
- [ ] Al abrir la app: `GET /medications/upcoming?within_hours=24`,
  cancelar notificaciones agendadas previas y agendar nuevas con
  expo-notifications. Idempotente al reabrir.
- [ ] Botones "tomada / omitida / postpuesta" en cada notificación →
  `POST /medications/{id}/doses`.
- [ ] Historial de dosis (`GET /medications/{id}/doses`).

**Entrega**: notificaciones locales llegan a la hora exacta; marcar
dosis se registra en la BD.

## Semana 6 — asistente IA con citaciones (4 – 10 nov)

- [ ] Pantalla de chat contra `POST /assistant/ask`.
- [ ] **Chips de citación**: cada respuesta muestra chips con
  `cited_entry_ids` que al tocarse abren la entrada citada. Es la
  evidencia del KPI >90% verificable.
- [ ] Historial de conversaciones.

**Entrega — Momento KPI #2**: la IA responde con citaciones tappables
que llevan a la entrada exacta de la bitácora.

## Semana 7 — resúmenes + adherencia + ARCO (11 – 17 nov)

- [ ] Generar resumen médico (`POST /patients/{id}/summaries/generate`).
- [ ] Dashboard simple de adherencia (`GET /medications/adherence`).
- [ ] Pantalla "Mis datos" con:
  - Export (`GET /me/data-export` → `expo-sharing`).
  - Eliminar cuenta (`DELETE /me` con confirmación doble).
  - Revisar consentimiento (`GET /me/consent`).

**Entrega**: la app cumple derechos ARCO end-to-end.

## Semana 8 — pulido + demo (18 – 24 nov)

- [ ] QA de flujos: golden path + sin sesión + sin permisos + offline +
  backend caído + RLS bloqueando.
- [ ] Screenshots y video demo con ambos KPIs bien visibles.
- [ ] Manual de usuario (1 página).
- [ ] Congelar contrato del backend con David: `app/schemas.py` no se
  toca más.
- [ ] Publicar build de Expo en channel `production`.

**Entrega final**: build publicado + video demo + repo entregable.

---

## Fuera del MVP (v2)

- Push notifications server-side (Opción B del diseño).
- Mapa de centros/farmacias (depende del scraper).
- Multi-idioma.
- `frecuencia_horas` en `/upcoming` (el backend ya lo tiene documentado
  como TODO).

## Riesgos y mitigación

- **Render duerme**: primera request post-15min tarda ~30s. Mitigar con
  loading state tolerante + Supabase directo cuando se pueda.
- **RLS mal probada explota en el móvil**: cubierta por tests del
  backend.
- **Recorte por tiempo**: orden de sacrificio 7 → 6 → 5. El resto es
  intocable.
