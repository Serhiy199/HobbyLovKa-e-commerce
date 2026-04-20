import { prisma } from "@/lib/prisma/client";

export function listFixedCategories() {
  return prisma.category.findMany({
    where: {
      isFixed: true,
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      sortOrder: true,
      isActive: true,
      seoTitle: true,
      seoDescription: true,
      _count: {
        select: {
          products: true,
          subcategories: true,
        },
      },
    },
  });
}

export function getFixedCategoryById(id: string) {
  return prisma.category.findFirst({
    where: {
      id,
      isFixed: true,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      sortOrder: true,
      isActive: true,
      seoTitle: true,
      seoDescription: true,
      subcategories: {
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        select: {
          id: true,
          name: true,
          slug: true,
          sortOrder: true,
          isActive: true,
          _count: {
            select: {
              products: true,
            },
          },
        },
      },
      _count: {
        select: {
          products: true,
          subcategories: true,
        },
      },
    },
  });
}

export function listSubcategories() {
  return prisma.subcategory.findMany({
    orderBy: [
      { category: { sortOrder: "asc" } },
      { sortOrder: "asc" },
      { name: "asc" },
    ],
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      sortOrder: true,
      isActive: true,
      seoTitle: true,
      seoDescription: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      _count: {
        select: {
          fields: true,
          products: true,
        },
      },
    },
  });
}

export function getSubcategoryById(id: string) {
  return prisma.subcategory.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      sortOrder: true,
      isActive: true,
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
        orderBy: [{ sortOrder: "asc" }, { label: "asc" }],
        select: {
          id: true,
          label: true,
          key: true,
          sortOrder: true,
          isRequired: true,
          isFilterable: true,
          type: true,
        },
      },
      _count: {
        select: {
          fields: true,
          products: true,
        },
      },
    },
  });
}

export function listBrands() {
  return prisma.brand.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      sortOrder: true,
      isActive: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
}

export function getBrandById(id: string) {
  return prisma.brand.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      sortOrder: true,
      isActive: true,
      products: {
        where: {
          isActive: true,
        },
        orderBy: [{ updatedAt: "desc" }],
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
}
