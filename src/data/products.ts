import perfume1 from "@/assets/perfume-1.jpg";
import perfume2 from "@/assets/perfume-2.jpg";
import perfume3 from "@/assets/perfume-3.jpg";
import perfume4 from "@/assets/perfume-4.jpg";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  badge?: "sale" | "new";
  description: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  concentration: string;
  volume: string;
  category: "Hombre" | "Mujer" | "Unisex";
}

const baseProducts: Product[] = [
  {
    id: "amber-dore",
    name: "Amber Doré",
    brand: "Maison Lumière",
    price: 180.0,
    originalPrice: 250.0,
    images: [perfume1, perfume2, perfume3],
    badge: "sale",
    description: "Una fragancia cálida y envolvente que evoca los atardeceres dorados del Mediterráneo.",
    notes: { top: ["Bergamota"], heart: ["Ámbar"], base: ["Sándalo"] },
    concentration: "Eau de Parfum",
    volume: "100 ml",
    category: "Unisex",
  },
  {
    id: "rose-eternelle",
    name: "Rose Éternelle",
    brand: "Fleur de Paris",
    price: 220.0,
    images: [perfume2, perfume1, perfume4],
    badge: "new",
    description: "La quintaesencia de la rosa, capturada en su máxima expresión.",
    notes: { top: ["Rosa de mayo"], heart: ["Rosa centifolia"], base: ["Pachulí"] },
    concentration: "Eau de Parfum Intense",
    volume: "75 ml",
    category: "Mujer",
  },
  {
    id: "bois-mystique",
    name: "Bois Mystique",
    brand: "Atelier Noir",
    price: 195.0,
    images: [perfume3, perfume4, perfume1],
    description: "Un viaje olfativo a los bosques más profundos y enigmáticos.",
    notes: { top: ["Incienso"], heart: ["Oud"], base: ["Benjuí"] },
    concentration: "Eau de Parfum",
    volume: "100 ml",
    category: "Hombre",
  },
  {
    id: "oud-royal",
    name: "Oud Royal",
    brand: "Casa Oriental",
    price: 295.0,
    images: [perfume4, perfume3, perfume2],
    badge: "new",
    description: "La nobleza del oud en su forma más pura y lujosa.",
    notes: { top: ["Azafrán"], heart: ["Oud"], base: ["Sándalo"] },
    concentration: "Extrait de Parfum",
    volume: "50 ml",
    category: "Unisex",
  },
];

const generatePlaceholders = () => {
  const categories: ("Hombre" | "Mujer" | "Unisex")[] = ["Hombre", "Mujer", "Unisex"];
  const brands = ["Aura Luxe", "Essence Co.", "Niche Divine", "Vogue Scent", "Royal Aroma"];
  const concentrations = ["Eau de Parfum", "Eau de Toilette", "Extrait de Parfum", "Parfum"];
  const volumes = ["50 ml", "75 ml", "100 ml", "125 ml"];
  const images = [perfume1, perfume2, perfume3, perfume4];

  const placeholders: Product[] = [];

  const adjectivesMale = ["Deep", "Legendary", "Wild", "Midnight", "Urban", "Royal", "Dark", "Chrome", "Silver", "Ocean"];
  const nounsMale = ["Oud", "Leather", "Night", "Shadow", "Storm", "Peak", "Vibe", "Classic", "Cedar", "Chrome"];

  const adjectivesFemale = ["Velvet", "Sweet", "Blossom", "Crystal", "Luminous", "Golden", "Majestic", "Silky", "Pure", "Soft"];
  const nounsFemale = ["Rose", "Orchid", "Love", "Garden", "Petal", "Diamond", "Peony", "Jasmine", "Glow", "Satin"];

  const adjectivesUnisex = ["Abstract", "Parallel", "Zen", "Infinity", "Neutral", "Earth", "Solar", "Lunar", "Ozone", "Static"];
  const nounsUnisex = ["Spirit", "Essence", "Soul", "Vision", "Aura", "Moment", "Harmony", "Flow", "Balance", "Edge"];

  for (let i = 0; i < 50; i++) {
    // Male
    placeholders.push({
      id: `male-p-${i}`,
      name: `${adjectivesMale[i % 10]} ${nounsMale[(i + 1) % 10]}`,
      brand: brands[i % brands.length],
      price: 80 + (i * 3.5) % 150,
      images: [images[i % 4], images[(i + 1) % 4]],
      description: "Una fragancia sofisticada diseñada para el hombre moderno que busca distinción.",
      notes: { top: ["Cítricos"], heart: ["Especias"], base: ["Madera"] },
      concentration: concentrations[i % concentrations.length],
      volume: volumes[i % volumes.length],
      category: "Hombre",
    });

    // Female
    placeholders.push({
      id: `female-p-${i}`,
      name: `${adjectivesFemale[i % 10]} ${nounsFemale[(i + 2) % 10]}`,
      brand: brands[(i + 1) % brands.length],
      price: 90 + (i * 4) % 180,
      images: [images[(i + 1) % 4], images[(i + 2) % 4]],
      description: "Un aroma delicado y envolvente que resalta la elegancia femenina.",
      notes: { top: ["Frutas"], heart: ["Flores"], base: ["Vainilla"] },
      concentration: concentrations[(i + 1) % concentrations.length],
      volume: volumes[(i + 1) % volumes.length],
      category: "Mujer",
    });

    // Unisex
    placeholders.push({
      id: `unisex-p-${i}`,
      name: `${adjectivesUnisex[i % 10]} ${nounsUnisex[(i + 3) % 10]}`,
      brand: brands[(i + 2) % brands.length],
      price: 110 + (i * 5) % 200,
      images: [images[(i + 2) % 4], images[(i + 3) % 4]],
      description: "Una composición versátil y equilibrada perfecta para cualquier ocasión y persona.",
      notes: { top: ["Aire fresco"], heart: ["Té verde"], base: ["Ámbar gris"] },
      concentration: concentrations[(i + 2) % concentrations.length],
      volume: volumes[(i + 2) % volumes.length],
      category: "Unisex",
    });
  }

  return placeholders;
};

export const products: Product[] = [...baseProducts, ...generatePlaceholders()];

export const getProductById = (id: string) => products.find((p) => p.id === id);
