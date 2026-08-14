import type { Product } from "../app/types/product";

export const WHATSAPP_GROUP_LINK = process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK ?? "";

export function buildProductMessage(product: Product): string {
  const intro = product.name
    ? `Je suis intéressé(e) par la tenue "${product.name}" 😍`
    : "Je suis intéressé(e) par cette tenue 😍";

  return `Bonjour ! ${intro}\nVoici la photo : ${product.imageUrl}`;
}