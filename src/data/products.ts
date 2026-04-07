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
}

export const products: Product[] = [
  {
    id: "amber-dore",
    name: "Amber Doré",
    brand: "Maison Lumière",
    price: 180.0,
    originalPrice: 250.0,
    images: [perfume1, perfume2, perfume3],
    badge: "sale",
    description:
      "Una fragancia cálida y envolvente que evoca los atardeceres dorados del Mediterráneo. Amber Doré combina la riqueza del ámbar con matices especiados y un fondo amaderado que perdura durante horas.",
    notes: {
      top: ["Bergamota", "Cardamomo", "Pimienta rosa"],
      heart: ["Ámbar", "Jazmín", "Iris"],
      base: ["Sándalo", "Vainilla", "Almizcle"],
    },
    concentration: "Eau de Parfum",
    volume: "100 ml",
  },
  {
    id: "rose-eternelle",
    name: "Rose Éternelle",
    brand: "Fleur de Paris",
    price: 220.0,
    images: [perfume2, perfume1, perfume4],
    badge: "new",
    description:
      "La quintaesencia de la rosa, capturada en su máxima expresión. Rose Éternelle es un homenaje a los jardines parisinos en plena floración, con una composición sofisticada que celebra la feminidad atemporal.",
    notes: {
      top: ["Rosa de mayo", "Pera", "Lichi"],
      heart: ["Rosa centifolia", "Peonía", "Magnolia"],
      base: ["Pachulí", "Almizcle blanco", "Cedro"],
    },
    concentration: "Eau de Parfum Intense",
    volume: "75 ml",
  },
  {
    id: "bois-mystique",
    name: "Bois Mystique",
    brand: "Atelier Noir",
    price: 195.0,
    images: [perfume3, perfume4, perfume1],
    description:
      "Un viaje olfativo a los bosques más profundos y enigmáticos. Bois Mystique fusiona maderas nobles con resinas preciosas, creando una estela misteriosa y magnética.",
    notes: {
      top: ["Incienso", "Elemi", "Pimienta negra"],
      heart: ["Oud", "Guayaco", "Vetiver"],
      base: ["Benjuí", "Ámbar gris", "Musgo de roble"],
    },
    concentration: "Eau de Parfum",
    volume: "100 ml",
  },
  {
    id: "oud-royal",
    name: "Oud Royal",
    brand: "Casa Oriental",
    price: 295.0,
    images: [perfume4, perfume3, perfume2],
    badge: "new",
    description:
      "La nobleza del oud en su forma más pura y lujosa. Oud Royal es una fragancia majestuosa que rinde tributo a la tradición perfumística oriental con ingredientes de la más alta calidad.",
    notes: {
      top: ["Azafrán", "Canela", "Nuez moscada"],
      heart: ["Oud", "Rosa damascena", "Labdanum"],
      base: ["Sándalo", "Ámbar", "Civeta"],
    },
    concentration: "Extrait de Parfum",
    volume: "50 ml",
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);
