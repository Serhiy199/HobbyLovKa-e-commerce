import {
  getBrandById,
  getFixedCategoryById,
  getSubcategoryById,
  listBrands,
  listFixedCategories,
  listSubcategories,
} from "@/server/repositories/catalog-core.repository";

function resolveSelectedId<T extends { id: string }>(
  items: T[],
  selectedId?: string,
) {
  if (!items.length) {
    return null;
  }

  if (selectedId) {
    const matched = items.find((item) => item.id === selectedId);

    if (matched) {
      return matched.id;
    }
  }

  return items[0].id;
}

export async function getAdminCategoriesPageData(selectedId?: string) {
  const categories = await listFixedCategories();
  const resolvedSelectedId = resolveSelectedId(categories, selectedId);
  const selectedCategory = resolvedSelectedId
    ? await getFixedCategoryById(resolvedSelectedId)
    : null;

  return {
    categories,
    selectedCategory,
  };
}

export async function getAdminSubcategoriesPageData(selectedId?: string) {
  const subcategories = await listSubcategories();
  const resolvedSelectedId = resolveSelectedId(subcategories, selectedId);
  const selectedSubcategory = resolvedSelectedId
    ? await getSubcategoryById(resolvedSelectedId)
    : null;

  return {
    subcategories,
    selectedSubcategory,
  };
}

export async function getAdminBrandsPageData(selectedId?: string) {
  const brands = await listBrands();
  const resolvedSelectedId = resolveSelectedId(brands, selectedId);
  const selectedBrand = resolvedSelectedId
    ? await getBrandById(resolvedSelectedId)
    : null;

  return {
    brands,
    selectedBrand,
  };
}
