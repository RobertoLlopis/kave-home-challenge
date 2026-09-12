# Kave Home · Product Discovery & Favorites

Storefront Next.js 16 (App Router), TypeScript y Tailwind CSS 4 para explorar categorías/productos y guardar favoritos.

## Desarrollo

```bash
npm install
npm run dev
```

`npm run dev` utiliza snapshots versionados de respuestas reales para que el checkpoint antifraude de Vercel no bloquee el trabajo local. `npm run dev:live` consulta directamente la API pública cuando esté disponible. El build y la aplicación de producción siempre usan la API configurada; los snapshots solo los consume `scripts/development.mjs`.

Rutas: `/`, `/products`, `/products/:sku`, `/favorites` y `/search?q=...`.

## Arquitectura

Las rutas son adaptadores App Router; el layout raíz vive en `src/layouts/root-layout`, el shell en `src/layouts/site-shell` y la UI se organiza en `src/page-modules`, `src/primitives`, `src/containers`, `src/providers`, `src/services`, `src/utils` y `src/config`. Las fronteras cliente se limitan a favoritos, carruseles y el control de búsqueda; los resultados se renderizan en servidor. La búsqueda enriquece en paralelo los resultados `{ sku, title, url }` con el detalle cacheable de cada producto para reutilizar las tarjetas del catálogo. Button, Input y Drawer usan Base UI como capa headless. La integración de producción consume la API real sin fallback; el servidor auxiliar de desarrollo vive fuera de `src` y sirve únicamente snapshots capturados.

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

La API pública puede responder con checkpoint/429; `npm run dev:live` conserva ese error real y el boundary ofrece un reintento honesto. Para mantener estable el desarrollo visual, `npm run dev` sirve snapshots capturados de 20 productos y 8 categorías, sin intervenir en producción. La búsqueda enriquece en paralelo todos los SKU devueltos por el endpoint público, que actualmente responde con cinco referencias. Los productos pueden no tener imágenes y muestran un estado explícito. El botón de cesta permanece deshabilitado porque checkout está fuera del alcance.

## IA

Se utilizó IA para explorar requisitos, proponer estructura y revisar código. La implementación y sus decisiones se validaron contra el contrato real, las capturas y los comandos de calidad. `KAVE_HOME_SITE_URL` configura el origen canónico; en desarrollo se usa `http://localhost:3000` y no se afirma ningún dominio desplegado.
