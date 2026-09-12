# Kave Home · Frontend Challenge

Storefront con Next.js 16, React 19, TypeScript y Tailwind CSS 4 para descubrir productos y guardar favoritos.

## Puesta en marcha

```bash
npm ci
cp .env.example .env.local
npm run dev
```

`npm run dev` usa datos capturados y reproducibles. `npm run dev:live` consulta la API pública. Para producción local: `npm run build && npm start`.

Rutas: `/`, `/products`, `/products/[sku]`, `/favorites` y `/search?q=...`.

## Funcionalidad

- Home editorial y categorías.
- Catálogo de 20 productos por página, filtro por categoría y paginación por URL.
- Detalle de producto con galería, precio, disponibilidad y favorito.
- Favoritos con React Context y persistencia versionada en `localStorage`.
- Búsqueda, estados de carga, vacío, error y producto sin imagen.
- Diseño mobile-first, HTML semántico, navegación por teclado y metadata por ruta.

## Arquitectura

App Router se mantiene como una capa fina — cada ruta reexporta desde el módulo que la implementa. La estructura sigue un patrón **fractal**: lo que es común a varias features vive en el nivel compartido inmediatamente superior; lo propio de una feature se queda dentro de ella.

```
src/
  app/                  ← capa fina: reexporta layouts y pages
  features/             ← lógica de dominio por feature
    favorites/          ← page-module, containers/list y layout propios
    home/
    product/
    products/
    search/
  containers/           ← composiciones compartidas entre features
    favorite-button/    ← header, product-card, product-image, price, pagination, etc.
  primitives/           ← átomos de UI: button, card, input, skeleton
  providers/            ← estado global: favorites (usado por root-layout + containers)
  layouts/              ← layouts globales: root-layout, site-shell
  page-modules/         ← solo páginas transversales: error, not-found
  services/             ← integración externa: catalog-api
  utils/                ← funciones puras: classnames, format-price, pagination, try-catch
  config/               ← variables de entorno validadas
  constants/            ← constantes globales: accesibilidad, catálogo, rutas
  styles/               ← estilos compartidos
```

### Disposición fractal

Cada feature repite la misma estructura interna:

```
features/<feature>/
  page-module/          ← render, metadata, page component, helpers, constants, styles, types
  containers/           ← composiciones de UI propias de la feature
  provider/             ← contexto/estado (solo si aplica)
  layout.tsx            ← layout de ruta (solo si la feature lo necesita)
```

**Regla de promoción:** cuando un container, provider o primitiva se usa desde **dos o más features o desde un nivel superior** (ej: root-layout), se promociona al nivel compartido:

- `FavoritesProvider` lo inyecta `root-layout` (global) y lo consume `FavoriteButton` (container compartido) → `src/providers/favorites/`.
- `FavoriteButton` lo usan `containers/product-card` y `features/favorites` → `src/containers/favorite-button/`.
- `Price`, `ProductImage`, `ProductCard`, `ProductGrid` los usan tanto products como product-detail → `src/containers/`.
- `Button`, `Card`, `Input`, `Skeleton` los usan todos los containers → `src/primitives/`.
- `classnames`, `try-catch` los usan todos los módulos → `src/utils/`.

El catálogo se obtiene en Server Components, valida HTTP, JSON y contrato, aplica timeout y usa la caché de `fetch` con revalidación de cinco minutos. El JavaScript cliente se limita a favoritos, búsqueda y carruseles; las primitivas parten de shadcn/Base UI. Poppins se sirve con `next/font` y las imágenes con `next/image`.

La configuración pública está centralizada y validada en `src/config/environment`; no hay secretos ni URLs operativas dispersas.

## API y desarrollo determinista

La API puede devolver `429`, `x-vercel-mitigated: challenge` y HTML desde el servidor de Next. Aunque el endpoint funciona al abrirlo en un navegador, CORS impide consumirlo desde `localhost`.

Como solución de desarrollo, `scripts/development.mjs` levanta una API sólo en loopback a partir de snapshots versionados de 20 productos y 8 categorías. Este modo nunca se activa como fallback de producción. `npm run dev:live` conserva la integración y sus errores reales; `connection()` evita que Home dependa de la API durante el build.

Los snapshots permiten revisar la interfaz, pero no contienen páginas adicionales: paginación y filtros reutilizan la misma muestra. Si el acceso servidor-a-servidor fuese estable, podrían eliminarse `development/catalog-snapshots`, `scripts/development.mjs` y `dev:live`.

## Calidad y testing

```bash
npm run typecheck
npm run lint
npm run lint:styles
npm run format:check
npm test
npm run build
```

El testing no fue el foco del ejercicio. Se dejó una primera cobertura básica en `tests/storefront.test.ts` para paginación, configuración, adaptación de la API, errores, precios y persistencia de favoritos. No existe todavía una suite completa de componentes, E2E, accesibilidad o regresión visual.

## Limitaciones conocidas

- La disponibilidad de la integración live depende del checkpoint externo.
- El brief original pedía catálogo y paginación también en Home; la implementación los concentra en `/products` para respetar la referencia editorial del figma recibida.
- Carrito y checkout están fuera de alcance; sus controles permanecen deshabilitados.
- Las comprobaciones con lector de pantalla, Lighthouse y comparación visual siguen siendo manuales.

## Uso de IA

Se utilizó IA para explorar requisitos, proponer estructura, implementar y revisar. El resultado se contrastó con el contrato de la API, los snapshots y los comandos de calidad, y cada decisión debe poder explicarse y defenderse.
