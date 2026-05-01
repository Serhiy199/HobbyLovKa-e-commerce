import {
  BadgePercentIcon,
  BatteryChargingIcon,
  CircleHelpIcon,
  CreditCardIcon,
  DropletsIcon,
  FlameIcon,
  HeadphonesIcon,
  PackageIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TruckIcon,
  WrenchIcon,
  type LucideIcon,
} from "lucide-react";

export const storefrontBrand = {
  name: "Voodoo Vape",
  legalAgeNotice: "Сайт призначений виключно для осіб віком 18+",
  tagline: "vape shop та аксесуари",
  logoSrc: "/images/mr-logo.png",
};

export const storefrontMainNavigation = [
  { href: "/", label: "Головна" },
  { href: "/catalog", label: "Каталог" },
  { href: "/category", label: "Категорії" },
  { href: "/account", label: "Акаунт" },
];

export type StorefrontCategoryLink = {
  href: string;
  label: string;
};

export type StorefrontCategory = {
  description: string;
  href: string;
  icon: LucideIcon;
  label: string;
  links: StorefrontCategoryLink[];
  stat: string;
  tone: "amber" | "green" | "rose" | "slate";
};

export const storefrontCategories: StorefrontCategory[] = [
  {
    description: "POD-системи, pod-моди, стартові набори та пристрої для щоденного використання.",
    href: "/category/electronic-cigarettes",
    icon: BatteryChargingIcon,
    label: "Електронні сигарети",
    links: [
      { href: "/category/electronic-cigarettes/pod-systems", label: "POD-системи" },
      { href: "/category/electronic-cigarettes/pod-mods", label: "POD-моди" },
      { href: "/category/electronic-cigarettes/starter-kits", label: "Стартові набори" },
    ],
    stat: "Пристрої",
    tone: "amber",
  },
  {
    description: "Сольові, органічні та базові рідини з фільтрами під міцність, смак і об'єм.",
    href: "/category/liquids",
    icon: DropletsIcon,
    label: "Рідини для вейпа",
    links: [
      { href: "/category/liquids/salt-nicotine", label: "Сольові рідини" },
      { href: "/category/liquids/organic", label: "Органічні рідини" },
      { href: "/category/liquids/diy", label: "Самозаміс" },
    ],
    stat: "Смаки",
    tone: "green",
  },
  {
    description: "Картриджі, випарники, койли та аксесуари для сумісності з популярними моделями.",
    href: "/category/components",
    icon: WrenchIcon,
    label: "Комплектуючі",
    links: [
      { href: "/category/components/cartridges", label: "Картриджі" },
      { href: "/category/components/coils", label: "Випарники" },
      { href: "/category/components/accessories", label: "Аксесуари" },
    ],
    stat: "Сумісність",
    tone: "slate",
  },
  {
    description: "Кальяни, тютюн, вугілля та комплектуючі для домашнього або закладного формату.",
    href: "/category/hookahs",
    icon: FlameIcon,
    label: "Кальяни",
    links: [
      { href: "/category/hookahs/devices", label: "Кальяни" },
      { href: "/category/hookahs/tobacco", label: "Тютюн" },
      { href: "/category/hookahs/coal", label: "Вугілля" },
    ],
    stat: "Hookah",
    tone: "rose",
  },
];

export const storefrontInfoLinks = [
  { href: "/delivery", label: "Доставка та оплата" },
  { href: "/about", label: "Про нас" },
  { href: "/contacts", label: "Контакти" },
  { href: "/blog", label: "Блог" },
  { href: "/cashback", label: "Кешбек" },
  { href: "/sale", label: "Акції" },
];

export const storefrontTrustItems = [
  {
    description: "Доставка по Україні з прозорими умовами для кожного замовлення.",
    icon: TruckIcon,
    title: "Швидка доставка",
  },
  {
    description: "Каталог будується навколо перевірених брендів і товарів.",
    icon: ShieldCheckIcon,
    title: "Оригінальна продукція",
  },
  {
    description: "Готівка, карта або інші способи оплати на етапі checkout.",
    icon: CreditCardIcon,
    title: "Зручна оплата",
  },
  {
    description: "Місце для промокодів, кешбеку і персональних пропозицій.",
    icon: BadgePercentIcon,
    title: "Акції та бонуси",
  },
];

export const storefrontServiceLinks = [
  { href: "/contacts", label: "Підтримка", icon: HeadphonesIcon },
  { href: "/faq", label: "Питання", icon: CircleHelpIcon },
];

export const storefrontHomePromos = [
  {
    description: "Підбірки для тих, хто хоче швидко знайти популярні пристрої та стартові комплекти.",
    href: "/catalog?collection=starter",
    icon: PackageIcon,
    label: "Стартові набори",
  },
  {
    description: "Добірка для товарів з прапорцями new, sale та hit з адмін-панелі.",
    href: "/catalog?collection=featured",
    icon: SparklesIcon,
    label: "Топ добірки",
  },
];
