# Kave Home · Product Discovery & Favorites

Storefront Next.js 16 (App Router), TypeScript y Tailwind CSS 4 para explorar categorías/productos y guardar favoritos.

## Desarrollo

```bash
npm install
npm run dev
```

Puertas: `/` (home + catálogo paginado), `/products`, `/products/:sku` y `/favorites`.

## Arquitectura

Las rutas son adaptadores App Router; el layout raíz vive en `src/layouts/root-layout`, el shell en `src/layouts/site-shell` y la UI se organiza en `src/page-modules`, `src/primitives`, `src/containers`, `src/providers`, `src/services`, `src/utils` y `src/config`. Favoritos es la única frontera client: Context + `localStorage` versionado y validado. La API real se consume sin mocks ni fixtures. Las primitivas Button, Card, Skeleton y Pagination parten del registro oficial `@shadcn` mediante `npx shadcn@latest add`. shadcn es una plataforma de distribución de código, no una librería runtime; el preset oficial `base-nova` usa Base UI como capa headless subyacente para Button y su polimorfismo `render`. Se conserva `@base-ui/react` porque Button lo usa realmente en CTAs y enlaces. La API expuesta se redujo a las variantes y exports usados por las páginas actuales; no se añaden componentes futuros.

## Configuración

```bash
cp .env.example .env.local
```

La API, origen canónico, host de imágenes y timeout se validan desde `src/config/environment`; no hay secretos ni valores API dispersos.

## Calidad

```bash
npm run typecheck && npm run lint && npm run lint:styles
npm run format:check && npm test && npm run build
```

## Limitaciones conocidas

La API pública puede responder con checkpoint/429; el boundary de error ofrece un reintento honesto y no sustituye la respuesta por mocks. Los productos pueden no tener imágenes y muestran un estado explícito. El botón de cesta permanece deshabilitado porque checkout está fuera del alcance. Las imágenes editoriales de Home no forman parte del contrato público, por lo que la sección editorial usa contenido local mínimo.

## IA

Se utilizó IA para explorar requisitos, proponer estructura y revisar código. La implementación y sus decisiones se validaron contra el contrato real, las capturas y los comandos de calidad. `KAVE_HOME_SITE_URL` configura el origen canónico; en desarrollo se usa `http://localhost:3000` y no se afirma ningún dominio desplegado.
