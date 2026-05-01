import { ProductAvailability, type Prisma } from "@prisma/client";

import type {
  StorefrontProductBadge,
  StorefrontProductCardItem,
} from "@/components/storefront/product-types";
import type { StorefrontCategory } from "@/components/storefront/storefront-config";
import { storefrontCategories } from "@/components/storefront/storefront-config";
import { prisma } from "@/lib/prisma/client";

const storefrontCategorySelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  seoTitle: true,
  seoDescription: true,
  subcategories: {
    where: {
      isActive: true,
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      seoTitle: true,
      seoDescription: true,
      _count: {
        select: {
          products: {
            where: {
              isActive: true,
            },
          },
        },
      },
    },
  },
  _count: {
    select: {
      products: {
        where: {
          isActive: true,
        },
      },
      subcategories: {
        where: {
          isActive: true,
        },
      },
    },
  },
} satisfies Prisma.CategorySelect;

const storefrontProductListSelect = {
  id: true,
  title: true,
  slug: true,
  price: true,
  availability: true,
  isFeaturedNew: true,
  isFeaturedSale: true,
  isFeaturedHit: true,
  category: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
  subcategory: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
  brand: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
  images: {
    orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
    take: 1,
    select: {
      id: true,
      url: true,
      alt: true,
      isPrimary: true,
    },
  },
  _count: {
    select: {
      orderItems: true,
      wishlistItems: true,
    },
  },
} satisfies Prisma.ProductSelect;

const storefrontProductDetailSelect = {
  ...storefrontProductListSelect,
  description: true,
  seoTitle: true,
  seoDescription: true,
  images: {
    orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      url: true,
      alt: true,
      isPrimary: true,
      sortOrder: true,
    },
  },
  fieldValues: {
    orderBy: {
      field: {
        sortOrder: "asc",
      },
    },
    select: {
      id: true,
      valueText: true,
      valueNumber: true,
      valueBoolean: true,
      field: {
        select: {
          id: true,
          label: true,
          key: true,
          type: true,
          sortOrder: true,
        },
      },
      option: {
        select: {
          id: true,
          label: true,
          value: true,
        },
      },
    },
  },
} satisfies Prisma.ProductSelect;

type StorefrontCategoryRecord = Prisma.CategoryGetPayload<{
  select: typeof storefrontCategorySelect;
}>;

type StorefrontProductListRecord = Prisma.ProductGetPayload<{
  select: typeof storefrontProductListSelect;
}>;

const fallbackCategoryIcons = storefrontCategories.map((category) => ({
  icon: category.icon,
  tone: category.tone,
}));

function resolveCategoryVisual(slug: string, index: number) {
  const configuredCategory = storefrontCategories.find(
    (category) => category.href.endsWith(`/${slug}`) || category.href.includes(slug),
  );

  if (configuredCategory) {
    return {
      icon: configuredCategory.icon,
      tone: configuredCategory.tone,
    };
  }

  return fallbackCategoryIcons[index % fallbackCategoryIcons.length];
}

function mapCategoryToCard(
  category: StorefrontCategoryRecord,
  index: number,
): StorefrontCategory {
  const visual = resolveCategoryVisual(category.slug, index);

  return {
    description:
      category.description ??
      "Добірка активних товарів і підкатегорій, якими керує адмін-панель.",
    href: `/category/${category.slug}`,
    icon: visual.icon,
    label: category.name,
    links: category.subcategories.slice(0, 3).map((subcategory) => ({
      href: `/category/${category.slug}/${subcategory.slug}`,
      label: subcategory.name,
    })),
    stat: `${category._count.products} товарів`,
    tone: visual.tone,
  };
}

function mapProductBadges(
  product: Pick<
    StorefrontProductListRecord,
    "isFeaturedHit" | "isFeaturedNew" | "isFeaturedSale"
  >,
): StorefrontProductBadge[] {
  return [
    product.isFeaturedHit ? "hit" : null,
    product.isFeaturedNew ? "new" : null,
    product.isFeaturedSale ? "sale" : null,
  ].filter((badge): badge is StorefrontProductBadge => Boolean(badge));
}

function mapProductToCard(product: StorefrontProductListRecord): StorefrontProductCardItem {
  const primaryImage = product.images[0];

  return {
    availability:
      product.availability === ProductAvailability.IN_STOCK
        ? "in_stock"
        : "out_of_stock",
    badges: mapProductBadges(product),
    brand: product.brand?.name,
    href: `/product/${product.slug}`,
    imageAlt: primaryImage?.alt ?? product.title,
    imageSrc: primaryImage?.url,
    price: Number(product.price),
    rating: 5,
    reviewCount: product._count.orderItems + product._count.wishlistItems,
    slug: product.slug,
    title: product.title,
  };
}

function productBaseWhere(input?: {
  brandSlug?: string;
  categorySlug?: string;
  search?: string;
  subcategorySlug?: string;
}): Prisma.ProductWhereInput {
  const search = input?.search?.trim();

  return {
    isActive: true,
    category: {
      isActive: true,
      slug: input?.categorySlug,
    },
    subcategory: {
      isActive: true,
      slug: input?.subcategorySlug,
    },
    brand: input?.brandSlug
      ? {
          isActive: true,
          slug: input.brandSlug,
        }
      : undefined,
    ...(search
      ? {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              slug: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              brand: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          ],
        }
      : {}),
  };
}

export async function listActiveStorefrontCategories() {
  const categories = await prisma.category.findMany({
    where: {
      isActive: true,
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: storefrontCategorySelect,
  });

  return categories.map(mapCategoryToCard);
}

export async function getActiveStorefrontCategoryBySlug(slug: string) {
  const category = await prisma.category.findFirst({
    where: {
      isActive: true,
      slug,
    },
    select: storefrontCategorySelect,
  });

  return category ? mapCategoryToCard(category, 0) : null;
}

export async function getActiveStorefrontSubcategoryBySlug(input: {
  categorySlug: string;
  subcategorySlug: string;
}) {
  return prisma.subcategory.findFirst({
    where: {
      isActive: true,
      slug: input.subcategorySlug,
      category: {
        isActive: true,
        slug: input.categorySlug,
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      seoTitle: true,
      seoDescription: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      fields: {
        where: {
          isFilterable: true,
        },
        orderBy: [{ sortOrder: "asc" }, { label: "asc" }],
        select: {
          id: true,
          label: true,
          key: true,
          type: true,
          options: {
            orderBy: [{ sortOrder: "asc" }, { label: "asc" }],
            select: {
              id: true,
              label: true,
              value: true,
            },
          },
        },
      },
    },
  });
}

export async function listActiveStorefrontProducts(input?: {
  brandSlug?: string;
  categorySlug?: string;
  limit?: number;
  search?: string;
  subcategorySlug?: string;
}) {
  const products = await prisma.product.findMany({
    where: productBaseWhere(input),
    orderBy: [{ createdAt: "desc" }, { title: "asc" }],
    take: input?.limit,
    select: storefrontProductListSelect,
  });

  return products.map(mapProductToCard);
}

export async function getStorefrontFeaturedProducts(limit = 10) {
  const products = await prisma.product.findMany({
    where: {
      ...productBaseWhere(),
      OR: [
        { isFeaturedHit: true },
        { isFeaturedNew: true },
        { isFeaturedSale: true },
      ],
    },
    orderBy: [
      { isFeaturedHit: "desc" },
      { isFeaturedNew: "desc" },
      { isFeaturedSale: "desc" },
      { createdAt: "desc" },
    ],
    take: limit,
    select: storefrontProductListSelect,
  });

  if (products.length > 0) {
    return products.map(mapProductToCard);
  }

  return listActiveStorefrontProducts({ limit });
}

export async function getActiveStorefrontProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: {
      isActive: true,
      slug,
      category: {
        isActive: true,
      },
      subcategory: {
        isActive: true,
      },
    },
    select: storefrontProductDetailSelect,
  });

  if (!product) {
    return null;
  }

  return {
    ...product,
    card: mapProductToCard(product),
    price: Number(product.price),
    fieldValues: product.fieldValues.map((fieldValue) => ({
      id: fieldValue.id,
      key: fieldValue.field.key,
      label: fieldValue.field.label,
      value:
        fieldValue.option?.label ??
        fieldValue.valueText ??
        fieldValue.valueNumber?.toString() ??
        (typeof fieldValue.valueBoolean === "boolean"
          ? fieldValue.valueBoolean
            ? "Так"
            : "Ні"
          : ""),
    })),
  };
}

export async function getStorefrontHomePageData() {
  const [categories, featuredProducts] = await Promise.all([
    listActiveStorefrontCategories(),
    getStorefrontFeaturedProducts(10),
  ]);

  return {
    categories,
    featuredProducts,
  };
}
