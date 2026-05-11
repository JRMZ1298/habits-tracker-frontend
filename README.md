# Vitality — Habits Tracker

Aplicación frontend para seguimiento de hábitos, diseñada para fomentar el crecimiento personal mediante el registro diario de hábitos, rachas, estadísticas y un sistema de insignias gamificado.

**Idioma:** Español (es-MX)

---

## Stack

| Categoría | Tecnología |
|---|---|
| Framework | React 19 + TypeScript 6 + Vite 8 |
| Package manager | pnpm |
| Router | react-router v7 (createBrowserRouter) |
| Estado servidor | @tanstack/react-query v5 |
| Estado cliente | Zustand v5 (con persist) |
| Formularios | react-hook-form v7 + Zod v4 |
| UI | shadcn/ui (radix-nova) + Tailwind CSS v4 |
| Iconos | Lucide React, Material Symbols |
| Gráficas | Recharts |
| Notificaciones | Sonner |
| HTTP | Axios v1 (interceptors: token JWT, 401 → logout) |
| i18n | i18next + react-i18next |
| Tema | Zustand + persist + CSS view transitions |
| Tests | Vitest v4 + @testing-library/react v16 |

> ⚡ React Compiler habilitado vía `@rolldown/plugin-babel` — afecta rendimiento de HMR y build.

---

## Requisitos

- Node.js ≥ 20
- pnpm ≥ 9

## Variables de entorno

Crear un archivo `.env` en la raíz:

```
VITE_BASE_URL=http://localhost:8000
```

`VITE_BASE_URL` es la URL base de la API backend (FastAPI).

---

## Comandos

| Comando | Descripción |
|---|---|
| `pnpm dev` | Inicia servidor de desarrollo con HMR |
| `pnpm build` | Type-check (`tsc -b`) + build (`vite build`) |
| `pnpm lint` | Ejecuta ESLint |
| `pnpm preview` | Sirve el build de producción |
| `pnpm test` | Tests con Vitest (modo watch) |
| `pnpm test:run` | Tests una sola vez |
| `pnpm test:coverage` | Tests con reporte de cobertura |

---

## Rutas

| Ruta | Página | Auth |
|---|---|---|
| `/home` | Landing page | ✗ |
| `/auth/login` | Inicio de sesión | ✗ |
| `/auth/registro` | Registro | ✗ |
| `/auth/callback` | Callback Google OAuth | ✗ |
| `/app` | Dashboard | ✓ |
| `/app/habits` | Lista de hábitos | ✓ |
| `/app/habits/new` | Crear hábito | ✓ |
| `/app/habits/edit/:id` | Editar hábito | ✓ |
| `/app/metrics` | Estadísticas | ✓ |
| `/app/settings` | Configuración | ✓ |
| `/app/badges` | Galería de insignias | ✓ |
| `*` | Redirige a `/home` | — |

---

## Backend

Este repositorio contiene solo el frontend. Espera una API FastAPI en `VITE_BASE_URL` con endpoints para autenticación, CRUD de hábitos, registros diarios, estadísticas e insignias.

---

## Estructura del proyecto

```
src/
├── main.tsx                  # Entry point
├── HabitsMain.tsx            # Componente raíz (providers + router)
├── i18n.ts                   # Configuración i18next (es-MX)
├── index.css                 # Tailwind v4 + animaciones
├── routes/routes.tsx         # Definición de rutas
├── api/                      # Axios instance + llamadas API
├── app/                      # Páginas, layouts, componentes y hooks del área autenticada
├── auth/                     # Flujo de autenticación (login, registro, callback)
├── landingPage/              # Landing page pública
├── components/
│   ├── ui/                   # Primitivas shadcn/ui
│   └── routes/               # Guardianes de ruta (AuthenticatedRoute, NotAuthenticatedRoute)
├── interfaces/               # Tipos TypeScript (api, forms, store)
├── stores/                   # Stores de Zustand (theme)
├── lib/                      # Utilidades (cn, format, colors, etc.)
└── test/                     # Configuración y tests
```

---

## Diseño

El diseño está inspirado en Apple: minimalista, fotografía为主的, acento azul "Action Blue", botones tipo píldora. Consulta `DESIGN.md` para la guía completa.
