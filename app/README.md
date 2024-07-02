# App - Jewely Configurator
 Vue.js app that allows users to customize jewelry and see the price change in real time. Syncs with a jewelry website to allow users to purchase their custom jewelry.
 
## Table of Contents 📚

- [Tech Stack](#tech-stack)
- [Installation](#installation-)
- [Environment variables](#environment-variables-)
- [Build](#build-)
- [Getting Started](#getting-started-)
- [Commands](#commands-)
  - [Prettier Formatting](#prettier-formatting)
- [Routes](#routes-)
  - [User Routes](#user-routes-)
  - [Admin Routes](#admin-routes-)

## Tech Stack 🛠️

- Bun
- TypeScript
- Vue
- Vue Router
- Pinia
- PandaCSS
- Lucide

## Installation 📥

```bash
bun install
```

## Environment variables 🌐

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Fill in the environment variables:
  
```bash
VITE_LAMBDA_URL="http://localhost:3000/v1"
```

## Build 🚀

```bash
bun run build
```

> Preview the production build with:
> ```bash
> bun preview
> ```

## Getting Started 🚦

```bash
bun dev
```

> Open your browser and visit `http://localhost:5173/`

## Commands 📜

### Prettier Formatting 🎨

```bash
bun run format
```

## Routes 🛣️

### User Routes 🧑‍🤝‍🧑

| Name | Path | Description |
| --- | --- | --- |
| Configurator | `/configurator/:brand/:collection/:model` | Configurator page for a specific model |

### Admin Routes 👑

| Name | Path | Description |
| --- | --- | --- |
| Login | `/login` | Login page |
| Dashboard | `/admin/dashboard` | Dashboard page |
| Websites Management | `/admin/websites` | Websites management page |
| Users Management | `/admin/users` | Users management page |
| Configs Management | `/admin/configs` | Configs management page |
| APIs Management | `/admin/apis` | APIs management page |
| API Types Management | `/admin/api-types` | API types management page |
| Admins Management | `/admin/admins` | Admins management page |
