import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "01",
    name: "Aube safran",
    category: "Robe signature",
    description: "Une silhouette lumineuse aux lignes fluides.",
    imageUrl:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Robe élégante dans des tons safran",
  },
  {
    id: "02",
    name: "Terre rouge",
    category: "Ensemble cérémonie",
    description: "Le volume juste, ponctué d'une couleur profonde.",
    imageUrl:
      "https://images.unsplash.com/photo-1585488435969-4b7c4f7e7e5a?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Ensemble de cérémonie aux tons terre cuite",
  },
  {
    id: "03",
    name: "Ligne baobab",
    category: "Ensemble quotidien",
    description: "Une coupe précise pour les jours qui comptent.",
    imageUrl:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Silhouette contemporaine dans des tons naturels",
  },
  {
    id: "04",
    name: "Nuit indigo",
    category: "Pièce d'exception",
    description: "Une présence forte, dessinée pour la soirée.",
    imageUrl:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Robe de soirée aux tons foncés",
  },
];
