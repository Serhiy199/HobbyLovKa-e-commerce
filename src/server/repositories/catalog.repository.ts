import { prisma } from "@/lib/prisma/client";

export async function listFixedAdminCategories() {
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

export async function getFixedAdminCategoryById(categoryId: string) {
  return prisma.category.findFirst({
    where: {
      id: categoryId,
      isFixed: true,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      sortOrder: true,
      isActive: true,
      isFixed: true,
      seoTitle: true,
      seoDescription: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          products: true,
          subcategories: true,
        },
      },
      subcategories: {
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        select: {
          id: true,
          name: true,
          slug: true,
          sortOrder: true,
          isActive: true,
        },
      },
    },
  });
}

export async function listAdminSubcategories() {
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

export async function getAdminSubcategoryById(subcategoryId: string) {
  return prisma.subcategory.findUnique({
    where: {
      id: subcategoryId,
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
      createdAt: true,
      updatedAt: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
          isFixed: true,
        },
      },
      _count: {
        select: {
          fields: true,
          products: true,
        },
      },
      fields: {
        orderBy: [{ sortOrder: "asc" }, { label: "asc" }],
        select: {
          id: true,
          label: true,
          key: true,
          type: true,
          sortOrder: true,
          isRequired: true,
          isFilterable: true,
        },
      },
    },
  });
}

export async function listAdminBrands() {
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

export async function getAdminBrandById(brandId: string) {
  return prisma.brand.findUnique({
    where: {
      id: brandId,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      sortOrder: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          products: true,
        },
      },
      products: {
        where: {
          isActive: true,
        },
        orderBy: [{ createdAt: "desc" }],
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });
}
