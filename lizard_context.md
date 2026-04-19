# LIZARD - Unified Media Tracker Context

## 1. Visión del Proyecto
LIZARD es una aplicación móvil multiplataforma (iOS y Android) diseñada para ser una red social y un registro personal de consumo de medios. Funciona como un "Letterboxd" unificado, permitiendo a los usuarios descubrir, calificar, reseñar y crear listas de:
- Música (Álbumes/EPs)
- Videojuegos
- Libros
- (Próximamente) Anime y Manga

## 2. Identidad Visual (Deep Dark & High Contrast)
- **Concepto Estético:** "Industrial-Manga". Inspirado en estéticas de alto contraste, minimalismo oscuro y un toque crudo (referencias visuales: Blame!, Berserk, Chainsaw Man).
- **Colores (Definidos ahora vía CSS variables en global.css):**
  - Fondo Primario: Pure Black.
  - Superficies/Tarjetas: Zinc-900 o grises muy oscuros.
  - Texto Primario: Zinc-100.
  - Texto Secundario: Zinc-400.
  - Acento: Alto impacto (ej. Cian neón o Rojo sangre) usado con extrema moderación.
- **Tipografía:** Sans-serif moderna y limpia para datos; Serifa brutalista para títulos de secciones.
- **Enfoque Visual:** Diseño brutalista y limpio. Las portadas de los medios proporcionan el color principal de la pantalla.

## 3. Stack Tecnológico
- **Core:** React Native + Expo (SDK más reciente, usando Expo Go para desarrollo inicial).
- **Estilos:** NativeWind v4 + Tailwind CSS v4 (Configuración zero-config basada en CSS).
- **Lenguaje:** TypeScript (Strict Mode).
- **Navegación:** React Navigation (Bottom Tabs + Native Stack) o Expo Router.
- **Estado:** Zustand (Global) + TanStack Query (Server State).

## 4. Backend & Infraestructura (Low-Cost Strategy)
- **Proveedor:** Supabase (PostgreSQL). Elegido por su robustez relacional en la capa gratuita.
- **Autenticación:** Supabase Auth.
- **Esquema de Base de Datos (Conceptos Clave):**
  - `profiles`: `id`, `username`, `bio`, `avatar_url`, `created_at`.
  - `media_items`: `id`, `external_id` (Spotify/IGDB/Books ID), `type` (enum: music, game, book, anime), `title`, `poster_path`.
  - `reviews`: `id`, `user_id` (FK), `media_id` (FK), `rating`, `content`, `created_at`.
  - `follows`: `follower_id` (FK), `followed_id` (FK).
- **Estrategia de Optimización:** Las carátulas e imágenes de los medios NO se guardan en Supabase. Se renderizan directamente mediante las URLs proporcionadas por las APIs externas.

## 5. Integraciones de Datos (APIs Externas)
- **Música:** Spotify API o Last.fm API.
- **Videojuegos:** IGDB API (Twitch).
- **Libros:** Google Books API o OpenLibrary API.
- **Anime/Manga:** Jikan API (MyAnimeList) o AniList API.

## 6. Estructura del Proyecto
```text
lizard-app/
├── src/
│   ├── api/                # Wrappers de APIs externas y hooks de React Query
│   ├── assets/             # Imágenes estáticas y fuentes
│   ├── components/         # UI Atoms & Molecules
│   │   ├── ui/             # Componentes base (Boton, Input, Card)
│   │   ├── shared/         # RatingStars, UserAvatar, MediaPoster
│   │   └── layout/         # SafeScreenView, CustomTabBar
│   ├── constants/          # Constantes de la app
│   ├── hooks/              # Custom hooks
│   ├── navigation/         # Configuración de rutas
│   ├── screens/            # Pantallas organizadas por dominio
│   ├── store/              # Zustand stores
│   ├── types/              # Interfaces de TS
│   └── utils/              # Formateadores, validadores
├── global.css              # Archivo principal de Tailwind v4 (@import "tailwindcss"; o @tailwind directivas y variables CSS)
├── app.json                # Configuración de Expo
└── App.tsx                 # Punto de entrada principal (importa global.css aquí)