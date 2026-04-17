# Voodoo Vape Project Structure

This structure is designed for a single Next.js application that contains both the storefront and the admin panel.

```text
vape-shop/
|-- docs/
|   `-- project-structure.md
|-- prisma/
|   |-- schema.prisma
|   |-- migrations/
|   `-- seed.ts
|-- public/
|   |-- images/
|   `-- icons/
|-- src/
|   |-- app/
|   |   |-- (storefront)/
|   |   |   |-- page.tsx
|   |   |   |-- catalog/
|   |   |   |-- category/
|   |   |   |-- product/
|   |   |   |-- cart/
|   |   |   |-- checkout/
|   |   |   |-- account/
|   |   |   `-- (content-pages)/
|   |   |-- admin/
|   |   |   |-- page.tsx
|   |   |   |-- categories/
|   |   |   |-- subcategories/
|   |   |   |-- products/
|   |   |   |-- fields/
|   |   |   |-- orders/
|   |   |   |-- users/
|   |   |   |-- promo-codes/
|   |   |   `-- seo/
|   |   |-- api/
|   |   |   |-- auth/
|   |   |   |-- catalog/
|   |   |   |-- admin/
|   |   |   |-- cart/
|   |   |   |-- checkout/
|   |   |   `-- upload/
|   |   |-- sitemap.ts
|   |   |-- robots.ts
|   |   |-- layout.tsx
|   |   |-- not-found.tsx
|   |   `-- globals.css
|   |-- components/
|   |   |-- ui/
|   |   |-- layout/
|   |   |-- storefront/
|   |   |-- admin/
|   |   `-- shared/
|   |-- features/
|   |   |-- auth/
|   |   |-- categories/
|   |   |-- subcategories/
|   |   |-- products/
|   |   |-- product-fields/
|   |   |-- cart/
|   |   |-- checkout/
|   |   |-- orders/
|   |   |-- wishlist/
|   |   |-- promo-codes/
|   |   `-- seo/
|   |-- lib/
|   |   |-- auth/
|   |   |-- prisma/
|   |   |-- cloudinary/
|   |   |-- validations/
|   |   |-- utils/
|   |   `-- constants/
|   |-- server/
|   |   |-- db/
|   |   |-- repositories/
|   |   |-- services/
|   |   `-- queries/
|   |-- types/
|   `-- middleware.ts
|-- .env.example
|-- components.json
|-- next.config.ts
|-- package.json
|-- postcss.config.js
|-- tailwind.config.ts
|-- tsconfig.json
`-- README.md
```

## Folder responsibilities

### `src/app`

Contains route segments, layouts, metadata files, and route handlers.

- `(storefront)` groups all public pages without adding the group name to the URL.
- `admin` is the private admin route inside the same application.
- `api` contains route handlers for internal mutations and integrations.

### `src/components`

Contains reusable presentation components.

- `ui` stores generated and wrapped `shadcn/ui` primitives.
- `storefront` contains branded customer-facing components.
- `admin` contains dashboard-specific tables, forms, filters, and cards.
- `shared` contains cross-zone components used by both storefront and admin.

### `src/features`

Feature-first application logic for forms, actions, schemas, and view models.

This is the main place for business-oriented slices such as catalog, checkout, wishlist, and promo codes.

### `src/lib`

Cross-cutting technical modules:

- `auth` for Auth.js config and helpers
- `prisma` for the singleton client
- `cloudinary` for upload helpers
- `validations` for Zod schemas
- `constants` for stable enums and static config

### `src/server`

Server-only data and business logic.

- `repositories` talk to Prisma
- `services` implement business flows
- `queries` provide read-oriented compositions for pages and admin screens

Keeping repositories and services out of route files helps the codebase stay testable and scalable.

### `prisma`

Database schema, migrations, and seed logic.

## Architectural rules

1. Keep page files thin. Pages should compose queries, components, and feature modules rather than own business logic.
2. Put write-side business logic in `src/server/services`.
3. Put direct Prisma access in `src/server/repositories`.
4. Keep `shadcn/ui` primitives in `src/components/ui`, and wrap them when app-specific styling is needed.
5. Avoid mixing admin and storefront components in the same folders unless they are truly shared.
6. Treat `src/features` as the boundary for domain-focused code, not generic utilities.
