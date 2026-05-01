import {
  BadgePercentIcon,
  CircleHelpIcon,
  CreditCardIcon,
  HeadphonesIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "lucide-react";

export const storefrontCategories = [
  {
    href: "/category/electronic-cigarettes",
    label: "Електронні сигарети",
    links: [
      { href: "/category/electronic-cigarettes/pod-systems", label: "POD-системи" },
      { href: "/category/electronic-cigarettes/pod-mods", label: "POD-моди" },
      { href: "/category/electronic-cigarettes/starter-kits", label: "Стартові набори" },
    ],
  },
  {
    href: "/category/liquids",
    label: "Рідини для вейпа",
    links: [
      { href: "/category/liquids/salt-nicotine", label: "Сольові рідини" },
      { href: "/category/liquids/organic", label: "Органічні рідини" },
      { href: "/category/liquids/diy", label: "Самозаміс" },
    ],
  },
  {
    href: "/category/components",
    label: "Комплектуючі",
    links: [
      { href: "/category/components/cartridges", label: "Картриджі" },
      { href: "/category/components/coils", label: "Випарники" },
      { href: "/category/components/accessories", label: "Аксесуари" },
    ],
  },
  {
    href: "/category/hookahs",
    label: "Кальяни",
    links: [
      { href: "/category/hookahs/devices", label: "Кальяни" },
      { href: "/category/hookahs/tobacco", label: "Тютюн" },
      { href: "/category/hookahs/coal", label: "Вугілля" },
    ],
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
    icon: TruckIcon,
    title: "Швидка доставка",
    description: "Нова Пошта та кур'єрські сценарії для майбутнього checkout.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Оригінальна продукція",
    description: "Каталог будується навколо перевірених брендів і товарів.",
  },
  {
    icon: CreditCardIcon,
    title: "Зручна оплата",
    description: "Готівка, карта або інші способи на наступних етапах.",
  },
  {
    icon: BadgePercentIcon,
    title: "Акції та бонуси",
    description: "Місце для промокодів, кешбеку і персональних пропозицій.",
  },
];

export const storefrontServiceLinks = [
  { href: "/contacts", label: "Підтримка", icon: HeadphonesIcon },
  { href: "/faq", label: "Питання", icon: CircleHelpIcon },
];
