import type { MetadataRoute } from "next";

import { prisma } from "@/lib/prisma/client";
import { absoluteSiteUrl } from "@/lib/site-url";
import {
  listActiveSystemPageLinks,
  listActiveContentPageSitemapEntries,
  listPublishedBlogPostSitemapEntries,
} from "@/server/repositories/content.repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, brands, contentPages, systemPages, blogPosts] = await Promise.all([
    prisma.product.findMany({
      where: {
        isActive: true,
        category: { isActive: true },
        subcategory: { isActive: true },
        OR: [{ brandId: null }, { brand: { isActive: true } }],
      },
      select: {
        slug: true,
        updatedAt: true,
        options: {
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
          take: 1,
          select: {
            values: {
              where: {
                slug: {
                  not: null,
                },
              },
              orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
              select: {
                slug: true,
              },
            },
          },
        },
      },
    }),
    prisma.brand.findMany({
      where: {
        isActive: true,
        products: {
          some: {
            isActive: true,
            category: { isActive: true },
            subcategory: { isActive: true },
          },
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    }),
    listActiveContentPageSitemapEntries(),
    listActiveSystemPageLinks(),
    listPublishedBlogPostSitemapEntries(),
  ]);

  const productEntries = products.flatMap((product) => [
    {
      lastModified: product.updatedAt,
      url: absoluteSiteUrl(`/product/${product.slug}`),
    },
    ...product.options.flatMap((option) =>
      option.values.flatMap((value) =>
        value.slug
          ? [
              {
                lastModified: product.updatedAt,
                url: absoluteSiteUrl(`/product/${value.slug}`),
              },
            ]
          : [],
      ),
    ),
  ]);

  const contentEntries = contentPages.map((page) => ({
    lastModified: page.updatedAt,
    url: absoluteSiteUrl(`/${page.slug}`),
  }));

  const isBlogActive = systemPages.some((page) => page.href === "/blog");
  const blogEntries = isBlogActive
    ? blogPosts.map((post) => ({
        lastModified: post.updatedAt,
        url: absoluteSiteUrl(`/blog/${post.slug}`),
      }))
    : [];

  const brandEntries = brands.map((brand) => ({
    lastModified: brand.updatedAt,
    url: absoluteSiteUrl(`/brand/${brand.slug}`),
  }));

  const systemEntries = systemPages.map((page) => ({
    url: absoluteSiteUrl(page.href),
  }));

  return [
    ...productEntries,
    ...brandEntries,
    ...contentEntries,
    ...systemEntries,
    ...blogEntries,
  ];
}
