export const SITE_NAME = "HobbyLovKa";
export const SITE_DESCRIPTION =
  "Інтернет-магазин товарів для рукоділля, вишивання, творчості та handmade-проєктів.";
export const SITE_TAGLINE = "Товари для рукоділля та творчості";
export const SITE_LOGO_PATH = "/images/site-logo.png";
export const SITE_SUPPORT_EMAIL = "support@hobbylovka.local";

export function buildDefaultSeoTitle(name: string) {
  return `${name}: купити в інтернет-магазині ${SITE_NAME}`;
}

export function buildDefaultSeoDescription(name: string) {
  return `${name}: замовити за вигідною ціною в Україні у ${SITE_NAME}. Швидке оформлення, зручна доставка по Україні та актуальний асортимент.`;
}
