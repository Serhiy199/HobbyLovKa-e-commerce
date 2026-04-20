"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/permissions";
import {
  createAdminBrand,
  createAdminProduct,
  createAdminSubcategoryField,
  createAdminSubcategory,
  deleteAdminBrand,
  deleteAdminProduct,
  deleteAdminSubcategoryField,
  deleteAdminSubcategory,
  updateAdminBrand,
  updateAdminProduct,
  updateAdminSubcategoryField,
  updateAdminSubcategory,
  updateCategory,
  type MutationResult,
} from "@/server/services/admin-catalog.service";

function revalidateCatalogAdminPaths() {
  revalidatePath("/admin/categories");
  revalidatePath("/admin/subcategories");
  revalidatePath("/admin/fields");
  revalidatePath("/admin/brands");
  revalidatePath("/admin/products");
}

async function withAdminAccess<TData>(
  action: () => Promise<MutationResult<TData>>,
) {
  await requireAdmin();
  return action();
}

export async function updateCategoryAction(input: unknown) {
  return withAdminAccess(async () => {
    const result = await updateCategory(input);

    if (result.ok) {
      revalidateCatalogAdminPaths();
    }

    return result;
  });
}

export async function createSubcategoryAction(input: unknown) {
  return withAdminAccess(async () => {
    const result = await createAdminSubcategory(input);

    if (result.ok) {
      revalidateCatalogAdminPaths();
    }

    return result;
  });
}

export async function updateSubcategoryAction(input: unknown) {
  return withAdminAccess(async () => {
    const result = await updateAdminSubcategory(input);

    if (result.ok) {
      revalidateCatalogAdminPaths();
    }

    return result;
  });
}

export async function deleteSubcategoryAction(input: unknown) {
  return withAdminAccess(async () => {
    const result = await deleteAdminSubcategory(input);

    if (result.ok) {
      revalidateCatalogAdminPaths();
    }

    return result;
  });
}

export async function createSubcategoryFieldAction(input: unknown) {
  return withAdminAccess(async () => {
    const result = await createAdminSubcategoryField(input);

    if (result.ok) {
      revalidateCatalogAdminPaths();
    }

    return result;
  });
}

export async function updateSubcategoryFieldAction(input: unknown) {
  return withAdminAccess(async () => {
    const result = await updateAdminSubcategoryField(input);

    if (result.ok) {
      revalidateCatalogAdminPaths();
    }

    return result;
  });
}

export async function deleteSubcategoryFieldAction(input: unknown) {
  return withAdminAccess(async () => {
    const result = await deleteAdminSubcategoryField(input);

    if (result.ok) {
      revalidateCatalogAdminPaths();
    }

    return result;
  });
}

export async function createBrandAction(input: unknown) {
  return withAdminAccess(async () => {
    const result = await createAdminBrand(input);

    if (result.ok) {
      revalidateCatalogAdminPaths();
    }

    return result;
  });
}

export async function updateBrandAction(input: unknown) {
  return withAdminAccess(async () => {
    const result = await updateAdminBrand(input);

    if (result.ok) {
      revalidateCatalogAdminPaths();
    }

    return result;
  });
}

export async function deleteBrandAction(input: unknown) {
  return withAdminAccess(async () => {
    const result = await deleteAdminBrand(input);

    if (result.ok) {
      revalidateCatalogAdminPaths();
    }

    return result;
  });
}

export async function createProductAction(input: unknown) {
  return withAdminAccess(async () => {
    const result = await createAdminProduct(input);

    if (result.ok) {
      revalidateCatalogAdminPaths();
    }

    return result;
  });
}

export async function updateProductAction(input: unknown) {
  return withAdminAccess(async () => {
    const result = await updateAdminProduct(input);

    if (result.ok) {
      revalidateCatalogAdminPaths();
    }

    return result;
  });
}

export async function deleteProductAction(input: unknown) {
  return withAdminAccess(async () => {
    const result = await deleteAdminProduct(input);

    if (result.ok) {
      revalidateCatalogAdminPaths();
    }

    return result;
  });
}
