# Voodoo Vape API And Route Handlers Design

This document defines the initial write-side API surface for the MVP. Public read pages should prefer server-side queries in page loaders and server components. Route handlers are mainly used for mutations, auth, uploads, cart sync, and asynchronous client interactions.

## Design principles

1. Use server-rendered reads where possible.
2. Keep route handlers thin and delegate business logic to `src/server/services`.
3. Validate all input with Zod before service execution.
4. Protect admin endpoints by role.
5. Return predictable JSON payloads for all client-triggered mutations.

## Response shape

Recommended JSON shape for mutable endpoints:

```json
{
  "success": true,
  "data": {},
  "message": "Human-readable message"
}
```

Validation or business errors:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid payload"
  }
}
```

## Auth routes

### `GET|POST /api/auth/[...nextauth]`

Handled by Auth.js.

Responsibilities:

- login
- logout
- session management

### `POST /api/auth/register`

Registers a new client account.

Payload:

```json
{
  "email": "user@example.com",
  "password": "strong-password",
  "firstName": "Ivan",
  "lastName": "Petrenko",
  "phone": "+380..."
}
```

Rules:

- email must be unique
- password is hashed before save
- created user gets `CLIENT` role

## Storefront routes

### `GET /api/catalog/search`

Client-triggered search by product title.

Query params:

- `q`

### `POST /api/cart/items`

Adds product to cart.

Payload:

```json
{
  "productId": "cuid",
  "quantity": 1
}
```

Notes:

- MVP cart can be session or cookie based
- authenticated user cart merge can be implemented later

### `PATCH /api/cart/items/:itemId`

Updates quantity in cart.

### `DELETE /api/cart/items/:itemId`

Removes product from cart.

### `POST /api/checkout`

Creates order from current checkout payload.

Payload:

```json
{
  "email": "guest@example.com",
  "firstName": "Ivan",
  "lastName": "Petrenko",
  "phone": "+380...",
  "city": "Kyiv",
  "addressLine1": "Street, building",
  "addressLine2": "Apartment",
  "paymentMethod": "COD",
  "customerNote": "Call before shipping",
  "promoCode": "WELCOME10",
  "items": [
    {
      "productId": "cuid",
      "quantity": 2
    }
  ]
}
```

Rules:

- guest checkout allowed
- if authenticated, `userId` is attached automatically
- promo code is optional
- all totals are recalculated on server

### `POST /api/wishlist/:productId`

Adds product to authenticated user's wishlist.

### `DELETE /api/wishlist/:productId`

Removes product from wishlist.

Rules:

- auth required

### `POST /api/account/addresses`

Creates saved address for authenticated user.

### `PATCH /api/account/addresses/:addressId`

Updates saved address.

### `DELETE /api/account/addresses/:addressId`

Deletes saved address.

### `POST /api/account/change-password`

Changes password for authenticated user.

### `POST /api/account/reorder/:orderId`

Adds previous order items back to cart.

## Upload routes

### `POST /api/upload/product-images`

Uploads one or more product images to Cloudinary.

Rules:

- admin only
- max 10 gallery images per product
- validate file type and size before upload

Response:

```json
{
  "success": true,
  "data": {
    "files": [
      {
        "url": "https://...",
        "publicId": "products/abc"
      }
    ]
  }
}
```

## Admin routes

All admin routes require authenticated `ADMIN` role.

### Categories

#### `GET /api/admin/categories`

Returns fixed categories for admin management.

#### `PATCH /api/admin/categories/:categoryId`

Updates:

- `name`
- `slug`
- `sortOrder`
- `seoTitle`
- `seoDescription`

Notes:

- creation and deletion of top-level categories is disabled in MVP

### Subcategories

#### `GET /api/admin/subcategories`

Supports filters:

- `categoryId`

#### `POST /api/admin/subcategories`

Creates subcategory under fixed category.

#### `PATCH /api/admin/subcategories/:subcategoryId`

Updates subcategory.

#### `DELETE /api/admin/subcategories/:subcategoryId`

Deletes subcategory if allowed by business rules.

### Field constructor

#### `GET /api/admin/subcategories/:subcategoryId/fields`

Returns field constructor config.

#### `POST /api/admin/subcategories/:subcategoryId/fields`

Creates field.

Payload:

```json
{
  "label": "Resistance",
  "key": "resistance",
  "type": "SELECT",
  "isRequired": true,
  "sortOrder": 1,
  "options": [
    { "label": "0.6 Ohm", "value": "0_6" },
    { "label": "0.8 Ohm", "value": "0_8" }
  ]
}
```

#### `PATCH /api/admin/fields/:fieldId`

Updates field metadata.

#### `DELETE /api/admin/fields/:fieldId`

Deletes field.

### Brands

#### `GET /api/admin/brands`

Returns available brands.

#### `POST /api/admin/brands`

Creates brand.

#### `PATCH /api/admin/brands/:brandId`

Updates brand.

#### `DELETE /api/admin/brands/:brandId`

Deletes brand if safe.

### Products

#### `GET /api/admin/products`

Supports filters:

- `categoryId`
- `subcategoryId`
- `brandId`
- `search`

#### `POST /api/admin/products`

Creates product with base data, images, and dynamic field values.

#### `GET /api/admin/products/:productId`

Returns full admin edit payload.

#### `PATCH /api/admin/products/:productId`

Updates product.

#### `DELETE /api/admin/products/:productId`

Soft delete by setting `isActive = false`.

### Orders

#### `GET /api/admin/orders`

Supports filters:

- `status`
- `dateFrom`
- `dateTo`
- `search`

#### `GET /api/admin/orders/:orderId`

Returns order detail.

#### `PATCH /api/admin/orders/:orderId/status`

Updates status.

Payload:

```json
{
  "status": "SHIPPED"
}
```

### Users

#### `GET /api/admin/users`

Returns customer list with summary data.

#### `GET /api/admin/users/:userId`

Returns customer detail, addresses, orders, and assigned promo codes.

#### `PATCH /api/admin/users/:userId`

Updates allowed admin-editable customer fields.

### Promo codes

#### `GET /api/admin/promo-codes`

Returns promo code list.

#### `POST /api/admin/promo-codes`

Creates promo code.

Payload:

```json
{
  "code": "WELCOME10",
  "type": "GENERAL",
  "percentValue": 10,
  "minOrderAmount": 500,
  "startsAt": null,
  "expiresAt": null,
  "assignedUserId": null
}
```

#### `PATCH /api/admin/promo-codes/:promoCodeId`

Updates promo code.

#### `DELETE /api/admin/promo-codes/:promoCodeId`

Disables or archives promo code.

## Suggested file mapping

```text
src/app/api/auth/[...nextauth]/route.ts
src/app/api/auth/register/route.ts
src/app/api/catalog/search/route.ts
src/app/api/cart/items/route.ts
src/app/api/cart/items/[itemId]/route.ts
src/app/api/checkout/route.ts
src/app/api/wishlist/[productId]/route.ts
src/app/api/account/addresses/route.ts
src/app/api/account/addresses/[addressId]/route.ts
src/app/api/account/change-password/route.ts
src/app/api/account/reorder/[orderId]/route.ts
src/app/api/upload/product-images/route.ts
src/app/api/admin/categories/route.ts
src/app/api/admin/categories/[categoryId]/route.ts
src/app/api/admin/subcategories/route.ts
src/app/api/admin/subcategories/[subcategoryId]/route.ts
src/app/api/admin/subcategories/[subcategoryId]/fields/route.ts
src/app/api/admin/fields/[fieldId]/route.ts
src/app/api/admin/brands/route.ts
src/app/api/admin/brands/[brandId]/route.ts
src/app/api/admin/products/route.ts
src/app/api/admin/products/[productId]/route.ts
src/app/api/admin/orders/route.ts
src/app/api/admin/orders/[orderId]/route.ts
src/app/api/admin/orders/[orderId]/status/route.ts
src/app/api/admin/users/route.ts
src/app/api/admin/users/[userId]/route.ts
src/app/api/admin/promo-codes/route.ts
src/app/api/admin/promo-codes/[promoCodeId]/route.ts
```

## Implementation notes

1. Use route handlers for writes and interactive client-side actions.
2. Prefer server-side reads for public catalog and product pages.
3. Admin list screens may use server-side rendering first, and progressively enhance with filters.
4. Keep all Prisma logic behind repository and service layers.
