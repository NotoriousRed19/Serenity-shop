import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://piazsirqdtidvkgryrxu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpYXpzaXJxZHRpZHZrZ3J5cnh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxODkwNzQsImV4cCI6MjA5MTc2NTA3NH0.lHxSXO52LYg0_B8HSHzukYT7s1nfpV2kpzHL82dT_NI'
);

const BASE = 'https://piazsirqdtidvkgryrxu.supabase.co/storage/v1/object/public/products/catalog/';
function img(n) { return BASE + n + '.jpg'; }

/* ══════════════════════════════════════════════════════════════════════
   CATÁLOGO COMPLETO — Mapeado 1:1 con "Precios y nombres.txt"
   Imagen N.jpg  →  Producto N del archivo de texto
   ══════════════════════════════════════════════════════════════════════ */
const products = [
  // ─── LATTAFA BADEE AL OUD (1-5) ───
  { id:'lattafa-amethyst',     name:'Lattafa Amethyst',             brand:'Lattafa', price:95000, images:[img(1)],  category:'Unisex', badge:'new', concentration:'Eau de Parfum', volume:'100 ml', description:'Fragancia oriental amaderada con un toque misterioso. Combina notas cálidas de oud, vainilla y especias.', notes_top:['Azafrán','Canela'], notes_heart:['Oud','Rosa'], notes_base:['Vainilla','Sándalo','Ámbar'] },
  { id:'lattafa-honor-glory',  name:'Lattafa Honor y Gloria',       brand:'Lattafa', price:95000, images:[img(2)],  category:'Unisex', concentration:'Eau de Parfum', volume:'100 ml', description:'Luminosa y elegante. Oud con notas florales amaderadas de gran nobleza.', notes_top:['Bergamota','Pimienta rosa'], notes_heart:['Jazmín','Rosa','Oud'], notes_base:['Almizcle blanco','Sándalo','Vainilla'] },
  { id:'lattafa-sublime',      name:'Lattafa Sublime',              brand:'Lattafa', price:95000, images:[img(3)],  category:'Unisex', concentration:'Eau de Parfum', volume:'100 ml', description:'Experiencia olfativa lujosa con carácter intenso y notas orientales profundas.', notes_top:['Canela','Azafrán'], notes_heart:['Oud','Incienso'], notes_base:['Ámbar','Benjuí','Vainilla'] },
  { id:'lattafa-oud-for-glory',name:'Lattafa Oud for Glory',        brand:'Lattafa', price:95000, images:[img(4)],  category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Captura la esencia del oud pura y majestuosa. Audaz y sofisticada.', notes_top:['Lavanda','Anís'], notes_heart:['Oud','Praline'], notes_base:['Vainilla','Ámbar gris','Cedro'] },
  { id:'lattafa-noble-blush',  name:'Lattafa Noble Blush',          brand:'Lattafa', price:95000, images:[img(5)],  category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Femenina y delicada con un toque rosado seductor.', notes_top:['Pera','Litchi'], notes_heart:['Rosa','Peonía','Jazmín'], notes_base:['Almizcle','Ámbar','Cedro'] },

  // ─── GIVE ME GOURMAND / LATTAFA (6-10) ───
  { id:'cookie-crave',     name:'Cookie Crave',       brand:'Lattafa Give Me Gourmand', price:120000, images:[img(6)],  category:'Mujer', badge:'new', concentration:'Eau de Parfum', volume:'75 ml', description:'Galletas recién horneadas. Dulce, cálido y adictivo.', notes_top:['Mantequilla','Avellana'], notes_heart:['Galleta','Caramelo'], notes_base:['Vainilla','Chocolate','Almizcle'] },
  { id:'berry-on-top',     name:'Berry On Top',       brand:'Lattafa Give Me Gourmand', price:120000, images:[img(7)],  category:'Mujer', badge:'new', concentration:'Eau de Parfum', volume:'75 ml', description:'Explosión frutal con fresas y crema batida. Dulce y vibrante.', notes_top:['Fresa','Frambuesa'], notes_heart:['Crema batida','Algodón de azúcar'], notes_base:['Vainilla','Almizcle','Caramelo'] },
  { id:'vanilla-freak',    name:'Vanilla Freak',      brand:'Lattafa Give Me Gourmand', price:120000, images:[img(8)],  category:'Mujer', concentration:'Eau de Parfum', volume:'75 ml', description:'La vainilla en su máxima expresión. Envolvente y adictiva.', notes_top:['Vainilla fresca','Coco'], notes_heart:['Orquídea','Helado de vainilla'], notes_base:['Almizcle','Sándalo','Caramelo'] },
  { id:'whipped-pleasure', name:'Whipped Pleasure',   brand:'Lattafa Give Me Gourmand', price:120000, images:[img(9)],  category:'Mujer', concentration:'Eau de Parfum', volume:'75 ml', description:'Suave como crema batida, dulce y reconfortante.', notes_top:['Nata','Leche'], notes_heart:['Caramelo','Praline'], notes_base:['Vainilla','Almizcle blanco'] },
  { id:'mallow-madness',   name:'Mallow Madness',     brand:'Lattafa Give Me Gourmand', price:120000, images:[img(10)], category:'Mujer', concentration:'Eau de Parfum', volume:'75 ml', description:'Nostalgia de malvaviscos con un toque sofisticado.', notes_top:['Malvavisco','Algodón de azúcar'], notes_heart:['Flores blancas','Praline'], notes_base:['Vainilla','Almizcle','Sándalo'] },

  // ─── ARMAF ODYSSEY (11-23) ───
  { id:'odyssey-tyrant',       name:'Odyssey Tyrant',              brand:'Armaf', price:85000, images:[img(11)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Fuerza y carácter con notas amaderadas y especiadas.', notes_top:['Manzana verde','Menta'], notes_heart:['Geranio','Salvia'], notes_base:['Vetiver','Cedro','Ámbar'] },
  { id:'odyssey-wild-one',     name:'Odyssey Wild One',            brand:'Armaf', price:85000, images:[img(12)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Salvaje y magnético con ámbar y maderas orientales.', notes_top:['Cardamomo','Pimienta negra'], notes_heart:['Oud','Cuero'], notes_base:['Ámbar','Sándalo','Almizcle'] },
  { id:'odyssey-marshmallow',  name:'Odyssey Marshmallow',         brand:'Armaf', price:85000, images:[img(13)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Malvavisco con notas acuáticas frescas. Dulce y envolvente.', notes_top:['Malvavisco','Cítricos'], notes_heart:['Caramelo','Jazmín'], notes_base:['Vainilla','Almizcle','Cedro'] },
  { id:'odyssey-bahamas',      name:'Odyssey Bahamas',             brand:'Armaf', price:85000, images:[img(14)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Playas del Caribe con notas vibrantes y tropicales.', notes_top:['Piña','Mango'], notes_heart:['Coco','Jazmín'], notes_base:['Almizcle','Madera de teca','Vainilla'] },
  { id:'odyssey-artisto',      name:'Odyssey Artisto',             brand:'Armaf', price:85000, images:[img(15)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Audaz y carismático con notas especiadas y cuero.', notes_top:['Pimienta roja','Bergamota'], notes_heart:['Cuero','Tabaco'], notes_base:['Oud','Ámbar','Pachulí'] },
  { id:'odyssey-homme',        name:'Odyssey Homme',               brand:'Armaf', price:85000, images:[img(16)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Oscuro y magnético. La versión clásica del Homme.', notes_top:['Incienso','Azafrán'], notes_heart:['Oud','Rosa damascena'], notes_base:['Ámbar','Almizcle','Sándalo'] },
  { id:'odyssey-homme-white',  name:'Odyssey Homme White Edition', brand:'Armaf', price:85000, images:[img(17)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Fresco y elegante. La versión blanca del clásico Homme.', notes_top:['Bergamota','Limón'], notes_heart:['Lavanda','Geranio'], notes_base:['Cedro','Vetiver','Almizcle'] },
  { id:'odyssey-aqua',         name:'Odyssey Aqua',                brand:'Armaf', price:85000, images:[img(18)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Brisa marina refrescante con notas acuáticas puras.', notes_top:['Notas acuáticas','Limón'], notes_heart:['Menta marina','Lavanda'], notes_base:['Almizcle','Ámbar','Cedro'] },
  { id:'odyssey-mega',         name:'Odyssey Mega',                brand:'Armaf', price:85000, images:[img(19)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Potente y envolvente con notas intensas y especiadas.', notes_top:['Pimienta negra','Bergamota'], notes_heart:['Iris','Cedro'], notes_base:['Ámbar','Almizcle','Pachulí'] },
  { id:'odyssey-candy',        name:'Odyssey Candy',               brand:'Armaf', price:85000, images:[img(20)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Dulce, vibrante y juguetona con frutas y algodón de azúcar.', notes_top:['Caramelo','Frutas rojas'], notes_heart:['Algodón de azúcar','Rosa'], notes_base:['Vainilla','Almizcle','Sándalo'] },
  { id:'odyssey-dubai',        name:'Odyssey Dubai',               brand:'Armaf', price:85000, images:[img(21)], category:'Unisex', concentration:'Eau de Parfum', volume:'100 ml', description:'Chocolate con especias orientales de Dubái.', notes_top:['Cacao','Naranja'], notes_heart:['Chocolate','Praline'], notes_base:['Vainilla','Sándalo','Almizcle'] },
  { id:'odyssey-aoud',         name:'Odyssey AOUD',                brand:'Armaf', price:85000, images:[img(22)], category:'Unisex', concentration:'Eau de Parfum', volume:'100 ml', description:'Riqueza del oud con especias orientales. Cálida y aterciopelada.', notes_top:['Azafrán','Nuez moscada'], notes_heart:['Oud','Rosa'], notes_base:['Sándalo','Almizcle','Ámbar'] },
  { id:'odyssey-spectre',      name:'Odyssey Spectre',             brand:'Armaf', price:85000, images:[img(23)], category:'Unisex', concentration:'Eau de Parfum', volume:'100 ml', description:'Vibrante y único. Explosión multicolor de aromas frescos.', notes_top:['Cítricos','Especias'], notes_heart:['Lavanda','Geranio'], notes_base:['Vetiver','Ámbar','Almizcle'] },

  // ─── AFNAN 9PM / 9AM (24-28) ───
  { id:'9pm-rebel',        name:'9PM Rebel (Caja Lujo)',   brand:'Afnan', price:90000,  images:[img(24)], category:'Hombre', badge:'sale', concentration:'Eau de Parfum', volume:'100 ml', description:'Versión audaz y rebelde del icónico 9PM en caja de lujo.', notes_top:['Canela','Manzana'], notes_heart:['Lavanda','Geranio'], notes_base:['Vainilla','Ámbar','Tonka'] },
  { id:'9am-dive',         name:'9AM Dive',                brand:'Afnan', price:85000,  images:[img(25)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Fresco y acuático, perfecto para el día.', notes_top:['Notas acuáticas','Bergamota'], notes_heart:['Geranio','Lavanda marina'], notes_base:['Almizcle','Cedro','Ámbar'] },
  { id:'9pm-morada',       name:'9PM Morada',              brand:'Afnan', price:85000,  images:[img(26)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Misteriosa y envolvente en su icónica presentación púrpura.', notes_top:['Ciruela','Canela'], notes_heart:['Lavanda','Iris'], notes_base:['Vainilla','Tonka','Ámbar'] },
  { id:'9am-pour-femme',   name:'9AM Pour Femme Rosa',     brand:'Afnan', price:85000,  images:[img(27)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Femenina y fresca para mañanas radiantes. Floral y llena de vida.', notes_top:['Pera','Mandarina'], notes_heart:['Rosa','Peonía','Jazmín'], notes_base:['Almizcle','Cedro','Ámbar'] },
  { id:'9pm-negra',        name:'9PM Negra',               brand:'Afnan', price:85000,  images:[img(28)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'La icónica presentación negra. Seductora para la noche.', notes_top:['Canela','Manzana','Lavanda'], notes_heart:['Geranio','Narguile'], notes_base:['Vainilla','Tonka','Cedro'] },

  // ─── MOSCHINO (29-32) ───
  { id:'moschino-toy-2',       name:'Moschino Toy 2',            brand:'Moschino', price:85000, images:[img(29)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Fresca y adorable con flores blancas. Divertida y femenina.', notes_top:['Magnolia','Manzana verde'], notes_heart:['Peonía','Jazmín'], notes_base:['Almizcle blanco','Sándalo','Ámbar'] },
  { id:'moschino-bubblegum',   name:'Moschino Toy 2 Bubble Gum', brand:'Moschino', price:85000, images:[img(30)], category:'Mujer', concentration:'Eau de Toilette', volume:'100 ml', description:'Juguetona y dulce como un chicle. Con toques frutales.', notes_top:['Pomelo','Mandarina'], notes_heart:['Peonía','Chicle'], notes_base:['Almizcle','Cedro'] },
  { id:'moschino-toy-boy',     name:'Moschino Toy Boy',          brand:'Moschino', price:85000, images:[img(31)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Atrevido y magnético. Especiada y floral para el hombre que rompe reglas.', notes_top:['Pimienta','Elemi'], notes_heart:['Rosa','Clavo'], notes_base:['Cashmeran','Sándalo','Ámbar'] },
  { id:'moschino-pearl',       name:'Moschino Pearl',            brand:'Moschino', price:85000, images:[img(32)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Brilla con la luminosidad de una perla. Delicada y sofisticada.', notes_top:['Mandarina','Pimienta rosa'], notes_heart:['Peonía','Jazmín'], notes_base:['Almizcle','Sándalo','Ámbar'] },

  // ─── SHAHEEN / LATTAFA (33-34) ───
  { id:'shaheen-silver', name:'Shaheen Silver', brand:'Lattafa', price:95000, images:[img(33)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Elegante y poderoso con el halcón plateado como símbolo de nobleza.', notes_top:['Bergamota','Limón'], notes_heart:['Iris','Lavanda'], notes_base:['Almizcle','Cedro','Ámbar gris'] },
  { id:'shaheen-gold',   name:'Shaheen Gold',   brand:'Lattafa', price:95000, images:[img(34)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Opulento y lujoso con el halcón dorado representando poder.', notes_top:['Azafrán','Mandarina'], notes_heart:['Oud','Rosa'], notes_base:['Ámbar','Almizcle dorado','Sándalo'] },

  // ─── KHAMRAH / LATTAFA (35-37) ───
  { id:'khamrah-dukhan',   name:'Khamrah Dukhan',   brand:'Lattafa', price:95000, images:[img(35)], category:'Unisex', concentration:'Eau de Parfum', volume:'100 ml', description:'Ahumada y especiada. La versión más intensa de la línea Khamrah.', notes_top:['Incienso','Canela'], notes_heart:['Praline','Dátil'], notes_base:['Vainilla','Benjuí','Ámbar'] },
  { id:'khamrah-qahwa',    name:'Khamrah QAHWA',    brand:'Lattafa', price:95000, images:[img(36)], category:'Unisex', badge:'sale', concentration:'Eau de Parfum', volume:'100 ml', description:'La esencia del café árabe tradicional. Cálida, especiada y envolvente.', notes_top:['Café','Cardamomo'], notes_heart:['Dátil','Canela'], notes_base:['Vainilla','Ámbar','Sándalo'] },
  { id:'khamrah-original', name:'Khamrah Original',  brand:'Lattafa', price:95000, images:[img(37)], category:'Unisex', concentration:'Eau de Parfum', volume:'100 ml', description:'Explosión gourmand oriental que evoca las noches árabes.', notes_top:['Canela','Bergamota','Nuez moscada'], notes_heart:['Praline','Café','Dátil'], notes_base:['Vainilla','Tonka','Benjuí','Ámbar'] },

  // ─── EMEER / LATTAFA (38) ───
  { id:'emeer-lattafa', name:'Emeer', brand:'Lattafa', price:120000, images:[img(38)], category:'Unisex', badge:'new', concentration:'Eau de Parfum', volume:'100 ml', description:'Creación premium con frasco dorado ornamentado. Oriental sofisticada.', notes_top:['Azafrán','Cardamomo'], notes_heart:['Oud','Iris','Rosa'], notes_base:['Ámbar','Vainilla','Sándalo'] },

  // ─── JEAN PAUL GAULTIER (39-46) ───
  { id:'jpg-scandal-homme',       name:'Scandal Pour Homme',          brand:'Jean Paul Gaultier', price:85000, images:[img(39)], category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'Escandalosamente seductor con notas especiadas y amaderadas.', notes_top:['Bergamota','Mandarina'], notes_heart:['Canela','Cardamomo'], notes_base:['Tonka','Vetiver','Caramelo'] },
  { id:'jpg-scandal-parfum',      name:'Scandal Le Parfum Homme',     brand:'Jean Paul Gaultier', price:85000, images:[img(40)], category:'Hombre', concentration:'Eau de Parfum Intense', volume:'100 ml', description:'Intenso y provocador. La versión más concentrada del icónico Scandal.', notes_top:['Caramelo','Mandarina'], notes_heart:['Canela','Cuero'], notes_base:['Tonka','Vetiver','Vainilla'] },
  { id:'jpg-scandal-woman',       name:'Scandal Pour Femme',          brand:'Jean Paul Gaultier', price:70000, images:[img(41)], category:'Mujer', concentration:'Eau de Parfum', volume:'80 ml', description:'Atrevida y femenina. Un cóctel de flores y dulzura.', notes_top:['Pera','Frambuesa'], notes_heart:['Jazmín','Gardenia'], notes_base:['Caramelo','Sándalo','Almizcle'] },
  { id:'jpg-le-beau-paradise',    name:'Le Beau Paradise Garden',     brand:'Jean Paul Gaultier', price:95000, images:[img(42)], category:'Hombre', concentration:'Eau de Parfum', volume:'125 ml', description:'Tropical y exótico. Notas verdes y frescas como un jardín del edén.', notes_top:['Coco','Bergamota'], notes_heart:['Tonka','Almendra'], notes_base:['Sándalo','Almizcle'] },
  { id:'jpg-divine',              name:'Gaultier Divine',             brand:'Jean Paul Gaultier', price:95000, images:[img(43)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Celestial y femenina. Reinterpretación luminosa del ícono JPG.', notes_top:['Flor de azahar','Bergamota'], notes_heart:['Jazmín','Rosa'], notes_base:['Vainilla','Almizcle','Sándalo'] },
  { id:'jpg-le-male',             name:'Le Male',                     brand:'Jean Paul Gaultier', price:95000, images:[img(44)], category:'Hombre', concentration:'Eau de Toilette', volume:'125 ml', description:'El clásico marinero. Lavanda y vainilla en perfecto equilibrio.', notes_top:['Menta','Lavanda','Bergamota','Cardamomo'], notes_heart:['Canela','Comino','Flor de naranjo'], notes_base:['Vainilla','Tonka','Ámbar','Sándalo'] },
  { id:'jpg-le-beau',             name:'Le Beau Le Parfum',           brand:'Jean Paul Gaultier', price:95000, images:[img(45)], category:'Hombre', concentration:'Eau de Parfum', volume:'125 ml', description:'Fresco, seductor y tropical. Coco y maderas sensuales.', notes_top:['Coco','Bergamota'], notes_heart:['Tonka','Almendra'], notes_base:['Sándalo','Almizcle'] },
  { id:'jpg-la-belle',            name:'La Belle Le Parfum',          brand:'Jean Paul Gaultier', price:95000, images:[img(46)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Sensual y adictiva. Flores, vainilla y un acorde de miel.', notes_top:['Bergamota','Pera'], notes_heart:['Jazmín','Rosa'], notes_base:['Vainilla','Sándalo','Vetiver'] },

  // ─── LACOSTE (47-52) ───
  { id:'lacoste-rouge',     name:'Lacoste L.12.12 Rouge Energetic', brand:'Lacoste', price:75000, images:[img(47)], category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'Energético y apasionado. El rojo vibrante de la elegancia deportiva.', notes_top:['Pimienta negra','Jengibre'], notes_heart:['Cedro','Geranio'], notes_base:['Almizcle','Sándalo'] },
  { id:'lacoste-jaune',     name:'Lacoste L.12.12 Yellow (Jaune)',  brand:'Lacoste', price:75000, images:[img(48)], category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'Alegre y luminoso. Notas cítricas frescas para días soleados.', notes_top:['Pomelo','Mandarina'], notes_heart:['Jengibre','Albahaca'], notes_base:['Cedro','Vetiver'] },
  { id:'lacoste-noir',      name:'Lacoste L.12.12 Noir',            brand:'Lacoste', price:75000, images:[img(49)], category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'Oscuro y sofisticado. Elegancia nocturna francesa.', notes_top:['Lavanda oscura','Pimienta negra'], notes_heart:['Chocolate negro','Cuero'], notes_base:['Ámbar','Almizcle'] },
  { id:'lacoste-essential', name:'Lacoste Essential',                brand:'Lacoste', price:75000, images:[img(50)], category:'Hombre', concentration:'Eau de Toilette', volume:'125 ml', description:'Fresco y natural. La esencia fundamental del estilo Lacoste.', notes_top:['Mandarina','Tomate verde'], notes_heart:['Pimienta negra','Rosa'], notes_base:['Sándalo','Pachulí'] },
  { id:'lacoste-blanc',     name:'Lacoste L.12.12 White',           brand:'Lacoste', price:75000, images:[img(51)], category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'Pura elegancia deportiva. Fresca y luminosa.', notes_top:['Pomelo','Romero'], notes_heart:['Cardamomo','Nardo'], notes_base:['Cedro','Gamuza'] },
  { id:'lacoste-style',     name:'Lacoste Style in Play',           brand:'Lacoste', price:75000, images:[img(52)], category:'Hombre', concentration:'Eau de Toilette', volume:'125 ml', description:'Dinámico y atrevido. Energía pura en cada aplicación.', notes_top:['Lima','Eucalipto'], notes_heart:['Jazmín','Pimienta verde'], notes_base:['Madera de guayaco','Almizcle'] },

  // ─── PARIS HILTON (53-54) ───
  { id:'paris-hilton-cancan',  name:'Can Can Paris Hilton',     brand:'Paris Hilton', price:70000, images:[img(53)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Coqueta y efervescente. Frutal y floral con glamour hollywoodense.', notes_top:['Grosella negra','Nectarina','Clementina'], notes_heart:['Lirio silvestre','Orquídea'], notes_base:['Almizcle','Caramelo','Ámbar'] },
  { id:'paris-hilton-classic', name:'Classic Purple Paris Hilton',brand:'Paris Hilton', price:70000, images:[img(54)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'La esencia del glamour californiano. Fresca, floral y frutal.', notes_top:['Manzana','Melocotón','Melón'], notes_heart:['Jazmín','Mimosa','Gardenia'], notes_base:['Almizcle','Sándalo','Ylang-ylang'] },

  // ─── CAROLINA HERRERA 212 (55-60) ───
  { id:'212-heroes-nyc',       name:'212 Men Heroes NYC',              brand:'Carolina Herrera', price:70000, images:[img(55)], category:'Hombre', concentration:'Eau de Toilette', volume:'90 ml', description:'Espíritu urbano de Manhattan. Fresco y moderno.', notes_top:['Jengibre','Salvia'], notes_heart:['Menta','Notas acuáticas'], notes_base:['Almizcle','Ámbar','Cedro'] },
  { id:'212-heroes-forever',   name:'212 Men Heroes Forever Young',    brand:'Carolina Herrera', price:70000, images:[img(56)], category:'Hombre', concentration:'Eau de Toilette', volume:'90 ml', description:'Juventud eterna de NYC. Fresco y urbano.', notes_top:['Limón','Salvia'], notes_heart:['Cedro','Notas acuáticas'], notes_base:['Almizcle','Madera'] },
  { id:'212-heroes-femme',     name:'212 Women Heroes Forever Young',  brand:'Carolina Herrera', price:70000, images:[img(57)], category:'Mujer', concentration:'Eau de Parfum', volume:'80 ml', description:'Versión femenina de Heroes. Rosa y vibrante.', notes_top:['Pomelo rosa','Frambuesa'], notes_heart:['Rosa','Jazmín'], notes_base:['Almizcle','Sándalo'] },
  { id:'212-vip-rose',         name:'212 VIP Rosé',                    brand:'Carolina Herrera', price:70000, images:[img(58)], category:'Mujer', concentration:'Eau de Parfum', volume:'80 ml', description:'Champagne rosado y la fiesta VIP de Nueva York.', notes_top:['Champagne rosé','Pimienta rosa'], notes_heart:['Rosa','Durazno'], notes_base:['Almizcle blanco','Madera'] },
  { id:'212-men-nyc',          name:'212 Men NYC',                     brand:'Carolina Herrera', price:70000, images:[img(59)], category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'El clásico de Manhattan. Fresco y sofisticado.', notes_top:['Toronja','Especias'], notes_heart:['Gardenia','Salvia'], notes_base:['Sándalo','Almizcle','Incienso'] },
  { id:'212-vip-black',        name:'212 VIP Black',                   brand:'Carolina Herrera', price:70000, images:[img(60)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Own The Party NYC. Oscuro y magnético.', notes_top:['Anís estrellado','Lavanda'], notes_heart:['Cuero','Canela'], notes_base:['Vainilla','Tonka','Ámbar'] },

  // ─── PACO RABANNE INVICTUS (61-63) ───
  { id:'invictus-onyx',    name:'Invictus Onyx',    brand:'Paco Rabanne', price:70000, images:[img(61)], category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'Edición Onyx. Oscuro y poderoso con mármol negro.', notes_top:['Pomelo','Menta'], notes_heart:['Laurel','Salvia'], notes_base:['Cachemira','Ámbar','Almizcle'] },
  { id:'invictus-classic', name:'Invictus Classic',  brand:'Paco Rabanne', price:70000, images:[img(62)], category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'Acuático, fresco y victorioso. Un clásico masculino.', notes_top:['Pomelo','Notas marinas'], notes_heart:['Laurel','Jazmín'], notes_base:['Guayaco','Ámbar gris','Pachulí'] },
  { id:'invictus-parfum',  name:'Invictus Parfum',   brand:'Paco Rabanne', price:75000, images:[img(63)], category:'Hombre', concentration:'Parfum', volume:'100 ml', description:'Versión Parfum. Más intenso y duradero que el original.', notes_top:['Pomelo','Pimienta negra'], notes_heart:['Vetiver','Jacinto'], notes_base:['Ámbar','Almizcle','Madera de agar'] },

  // ─── VERSACE (64-65) ───
  { id:'versace-eros',       name:'Versace Eros',       brand:'Versace', price:70000, images:[img(64)], category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'Frescura mediterránea y sensualidad oriental. Icónico de Versace.', notes_top:['Menta','Manzana verde','Limón'], notes_heart:['Tonka','Ámbar gris','Geranio'], notes_base:['Vainilla','Vetiver','Cedro'] },
  { id:'versace-eros-flame', name:'Versace Eros Flame', brand:'Versace', price:70000, images:[img(65)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Versión ardiente de Eros. Madera, especias y pasión pura.', notes_top:['Mandarina','Limón negro','Pimienta'], notes_heart:['Romero','Geranio'], notes_base:['Sándalo','Vainilla'] },

  // ─── NAUTICA (66) ───
  { id:'nautica-voyage', name:'Nautica Voyage', brand:'Nautica', price:65000, images:[img(66)], category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'Brisa oceánica fresca y aventurera. Un clásico refrescante.', notes_top:['Manzana verde','Hoja verde'], notes_heart:['Mimosa','Loto'], notes_base:['Cedro','Almizcle','Ámbar'] },

  // ─── CREED (67-68) ───
  { id:'creed-aventus',         name:'Creed Aventus',               brand:'Creed', price:75000, images:[img(67)], category:'Hombre', badge:'new', concentration:'Eau de Parfum', volume:'100 ml', description:'El rey de las fragancias. Piña ahumada y elegancia absoluta.', notes_top:['Piña','Bergamota','Manzana'], notes_heart:['Abedul','Pachulí','Jazmín'], notes_base:['Almizcle','Roble','Vainilla'] },
  { id:'creed-silver-mountain', name:'Creed Aventus Silver',        brand:'Creed', price:75000, images:[img(68)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Frescura alpina. Notas verdes y acuáticas inspiradas en los Alpes suizos.', notes_top:['Bergamota','Mandarina','Neroli'], notes_heart:['Té verde','Grosellas'], notes_base:['Almizcle','Sándalo','Gálbano'] },

  // ─── RALPH LAUREN POLO (69-70) ───
  { id:'polo-red',  name:'Polo Red',  brand:'Ralph Lauren', price:80000, images:[img(69)], category:'Hombre', concentration:'Eau de Toilette', volume:'125 ml', description:'Energía y adrenalina. Rojo intenso del estilo Polo.', notes_top:['Pomelo','Arándano rojo'], notes_heart:['Salvia','Azafrán'], notes_base:['Ámbar','Café','Madera roja'] },
  { id:'polo-blue', name:'Polo Blue', brand:'Ralph Lauren', price:80000, images:[img(70)], category:'Hombre', concentration:'Eau de Toilette', volume:'125 ml', description:'Libertad y frescura del mar. Azul profundo y deportivo.', notes_top:['Melón','Pepino','Mandarina'], notes_heart:['Salvia','Geranio','Albahaca'], notes_base:['Gamuza','Pachulí','Almizcle'] },

  // ─── PACO RABANNE PHANTOM (71-72) ───
  { id:'phantom',        name:'Phantom',        brand:'Paco Rabanne', price:70000, images:[img(71)], category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'Futurista y magnético. El robot icónico de Paco Rabanne.', notes_top:['Limón','Lavanda'], notes_heart:['Manzana ahumada','Pachulí'], notes_base:['Vainilla','Cashmeran','Styrax'] },
  { id:'phantom-parfum', name:'Phantom Parfum', brand:'Paco Rabanne', price:80000, images:[img(72)], category:'Hombre', concentration:'Parfum', volume:'100 ml', description:'Versión Parfum del icónico robot. Más intenso y oscuro.', notes_top:['Limón','Lavanda oscura'], notes_heart:['Manzana ahumada','Cuero'], notes_base:['Vainilla','Sándalo','Almizcle'] },

  // ─── ISSEY MIYAKE (73) ───
  { id:'issey-miyake', name:"L'Eau d'Issey Pour Homme", brand:'Issey Miyake', price:70000, images:[img(73)], category:'Hombre', concentration:'Eau de Toilette', volume:'125 ml', description:'Pureza acuática minimalista. El clásico japonés.', notes_top:['Yuzu','Bergamota','Limón'], notes_heart:['Nuez moscada','Canela','Loto'], notes_base:['Sándalo','Vetiver','Almizcle'] },

  // ─── BVLGARI (74-76) ───
  { id:'bvlgari-coral',     name:'Bvlgari Omnia Coral',      brand:'Bvlgari', price:70000, images:[img(74)], category:'Mujer', concentration:'Eau de Toilette', volume:'100 ml', description:'Coral vibrante y exótico. Frutal y floral con energía solar.', notes_top:['Bergamota','Pomelo'], notes_heart:['Hibisco','Jazmín'], notes_base:['Cedro','Almizcle'] },
  { id:'bvlgari-amethyste', name:'Bvlgari Omnia Amethyste',  brand:'Bvlgari', price:70000, images:[img(75)], category:'Mujer', concentration:'Eau de Toilette', volume:'65 ml', description:'Iris y rosa búlgara. Femenina y elegante como una joya.', notes_top:['Pomelo rosa','Iris'], notes_heart:['Rosa búlgara','Lirio'], notes_base:['Madera de nagarmotha','Almizcle'] },
  { id:'bvlgari-man-black', name:'Bvlgari Man In Black',     brand:'Bvlgari', price:75000, images:[img(76)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Oscuro y seductor. Ámbar oriental con un corazón especiado.', notes_top:['Ron','Pimienta'], notes_heart:['Tuberosa','Cuero','Iris'], notes_base:['Guayaco','Benzoin','Tonka'] },

  // ─── VALENTINO (77-80) ───
  { id:'valentino-donna',          name:'Valentino Donna Born in Roma',         brand:'Valentino', price:85000, images:[img(77)],  category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Amor romano en cada gota. Elegante y femenina.', notes_top:['Grosella negra','Pimienta rosa'], notes_heart:['Jazmín','Rosa de Damasco'], notes_base:['Cashmeran','Guayaco','Cedro'] },
  { id:'valentino-green',          name:'Valentino Green Stravaganza',          brand:'Valentino', price:85000, images:[img(78)],  category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'Versión verde fresca. Roma moderna y vibrante.', notes_top:['Vetiver','Bergamota'], notes_heart:['Salvia','Geranio'], notes_base:['Cedro','Almizcle'] },
  { id:'valentino-donna-intense',  name:'Valentino Donna Intense',             brand:'Valentino', price:85000, images:[img(79)],  category:'Mujer', concentration:'Eau de Parfum Intense', volume:'100 ml', description:'Versión intensa. Más profunda y magnética.', notes_top:['Grosella negra','Iris'], notes_heart:['Rosa','Jazmín'], notes_base:['Vainilla','Tonka','Cashmeran'] },
  { id:'valentino-kit',            name:'Kit Valentino',                        brand:'Valentino', price:120000, images:[img(80)], category:'Unisex', badge:'new', concentration:'Variado', volume:'Set', description:'Set exclusivo de Valentino con múltiples fragancias icónicas.', notes_top:['Variado'], notes_heart:['Variado'], notes_base:['Variado'] },

  // ─── CHANEL (81-82) ───
  { id:'bleu-de-chanel',     name:'Bleu de Chanel',         brand:'Chanel', price:70000, images:[img(81)], category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'Libertad y determinación. El azul profundo de Chanel.', notes_top:['Menta','Pomelo','Limón'], notes_heart:['Jengibre','Nuez moscada','Jazmín'], notes_base:['Incienso','Cedro','Sándalo'] },
  { id:'allure-homme-sport', name:'Chanel Allure Homme Sport', brand:'Chanel', price:70000, images:[img(82)], category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'Dinamismo deportivo. Fresco y energético para el hombre activo.', notes_top:['Naranja','Aldehídos'], notes_heart:['Pimienta negra','Cedro'], notes_base:['Tonka','Almizcle blanco','Vetiver'] },

  // ─── MONTALE (83-84) ───
  { id:'montale-roses-musk',     name:'Montale Roses Musk',       brand:'Montale', price:75000, images:[img(83)], category:'Mujer', concentration:'Extrait de Parfum', volume:'100 ml', description:'Rosas intensas envueltas en almizcle. Hipnótica y femenina.', notes_top:['Ámbar'], notes_heart:['Rosa','Rosa turca'], notes_base:['Almizcle blanco','Sándalo'] },
  { id:'montale-arabians-tonka', name:'Montale Arabians Tonka',   brand:'Montale', price:75000, images:[img(84)], category:'Unisex', concentration:'Eau de Parfum', volume:'100 ml', description:'Arabia y tonka en una fusión oriental exquisita.', notes_top:['Cardamomo','Azafrán'], notes_heart:['Rosa','Geranio'], notes_base:['Tonka','Sándalo','Almizcle'] },

  // ─── PERRY ELLIS 360° (85-87) ───
  { id:'perry-ellis-360-men',   name:'360° Perry Ellis For Men',    brand:'Perry Ellis', price:70000, images:[img(85)], category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'Fresco y acuático 360°. Un clásico casual y versátil.', notes_top:['Mandarina','Lavanda','Bergamota'], notes_heart:['Salvia','Cardamomo','Enebro'], notes_base:['Almizcle','Ámbar','Vetiver'] },
  { id:'perry-ellis-360-white', name:'360° Perry Ellis White Men',  brand:'Perry Ellis', price:70000, images:[img(86)], category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'Versión blanca fresca y luminosa.', notes_top:['Bergamota','Notas acuáticas'], notes_heart:['Lavanda','Cardamomo'], notes_base:['Almizcle','Ámbar','Cedro'] },
  { id:'perry-ellis-360-coral', name:'360° Perry Ellis Coral',      brand:'Perry Ellis', price:70000, images:[img(87)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Coral vibrante y juguetón. Frutal y veraniego.', notes_top:['Mandarina','Grosella roja'], notes_heart:['Peonía','Jazmín'], notes_base:['Almizcle','Cedro'] },

  // ─── ART OF UNIVERSE / LATTAFA (88) ───
  { id:'art-of-universe', name:'Art of Universe Deluxe Box', brand:'Lattafa', price:120000, images:[img(88)], category:'Unisex', badge:'new', concentration:'Eau de Parfum', volume:'100 ml', description:'El universo del oud. Un viaje olfativo cósmico en presentación deluxe.', notes_top:['Bergamota','Azafrán'], notes_heart:['Oud','Rosa','Iris'], notes_base:['Sándalo','Ámbar','Almizcle'] },

  // ─── ARIANA GRANDE (89-94) ───
  { id:'ariana-mod-blush',       name:'Mod Blush',          brand:'Ariana Grande', price:90000, images:[img(89)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Rosa suave y moderno. Femenina con un toque de rubor.', notes_top:['Pera','Frambuesa'], notes_heart:['Peonía','Flor de cerezo'], notes_base:['Almizcle','Cashmere'] },
  { id:'ariana-mod-vanilla',     name:'Mod Vanilla',        brand:'Ariana Grande', price:90000, images:[img(90)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Vainilla moderna y aterciopelada. Sweet y sofisticada.', notes_top:['Vainilla fresca','Bergamota'], notes_heart:['Orquídea','Jazmín'], notes_base:['Almizcle','Sándalo','Caramelo'] },
  { id:'ariana-cloud-pink',      name:'Cloud Pink',         brand:'Ariana Grande', price:90000, images:[img(91)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Una nube rosa de dulzura. La versión rosada del icónico Cloud.', notes_top:['Grosella','Bergamota'], notes_heart:['Coco','Vainilla'], notes_base:['Cachemira','Almizcle rubio'] },
  { id:'ariana-thank-u-next',    name:'Thank U, Next',      brand:'Ariana Grande', price:90000, images:[img(92)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Dulce, fuerte y femenina. Avanzar con estilo.', notes_top:['Frambuesa','Pera','Coco'], notes_heart:['Rosa','Muguet'], notes_base:['Almizcle','Crema de coco'] },
  { id:'ariana-sweet-like-candy',name:'Sweet Like Candy',   brand:'Ariana Grande', price:90000, images:[img(93)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Dulce como un caramelo. Frutal y juguetona.', notes_top:['Mora','Manzana','Pera'], notes_heart:['Rosa de Damasco','Jazmín'], notes_base:['Vainilla','Malvavisco','Caramelo'] },
  { id:'ariana-cloud',           name:'Cloud',              brand:'Ariana Grande', price:90000, images:[img(94)], category:'Mujer', badge:'sale', concentration:'Eau de Parfum', volume:'100 ml', description:'Soñadora y envolvente. La nube original de Ariana Grande.', notes_top:['Lavanda','Pera','Bergamota'], notes_heart:['Coco','Praline','Vainilla'], notes_base:['Créme de musk','Cashmere','Pachulí'] },

  // ─── PACO RABANNE MILLION (95-96) ───
  { id:'lady-million', name:'Lady Million', brand:'Paco Rabanne', price:70000, images:[img(95)], category:'Mujer', concentration:'Eau de Parfum', volume:'80 ml', description:'Diamante y oro líquido. Lujo y feminidad absoluta.', notes_top:['Frambuesa','Neroli','Limón'], notes_heart:['Jazmín','Gardenia','Flor de naranjo'], notes_base:['Pachulí','Miel','Ámbar'] },
  { id:'1-million',    name:'One Million',  brand:'Paco Rabanne', price:70000, images:[img(96)], category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'El lingote de oro más seductor. Dulce y especiado.', notes_top:['Pomelo','Menta','Naranja sanguina'], notes_heart:['Rosa','Canela','Especias'], notes_base:['Cuero','Ámbar','Madera blanca'] },

  // ─── LATTAFA HAYA (97) ───
  { id:'lattafa-haya', name:'Haya Deluxe Box', brand:'Lattafa', price:100000, images:[img(97)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Elegancia rosada con detalles dorados. Oriental femenina y sofisticada en presentación deluxe.', notes_top:['Rosa','Bergamota'], notes_heart:['Jazmín','Lirio'], notes_base:['Ámbar','Almizcle','Sándalo'] },

  // ─── DUMONT NITRO (98) ───
  { id:'nitro-red', name:'Nitro Red', brand:'Dumont', price:75000, images:[img(98)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Rojo ardiente y poderoso. Especiado con cuero y ámbar.', notes_top:['Pimienta roja','Bergamota'], notes_heart:['Cuero','Oud'], notes_base:['Ámbar','Almizcle','Sándalo'] },

  // ─── DOLCE & GABBANA LIGHT BLUE (99-100) ───
  { id:'dg-light-blue-women', name:'Light Blue For Woman', brand:'Dolce & Gabbana', price:70000, images:[img(99)],  category:'Mujer', concentration:'Eau de Toilette', volume:'100 ml', description:'El Mediterráneo en un frasco. Frescura siciliana pura.', notes_top:['Cedra siciliana','Manzana verde','Campanilla'], notes_heart:['Jazmín','Bambú','Rosa'], notes_base:['Cedro','Ámbar','Almizcle'] },
  { id:'dg-light-blue-men',   name:'Light Blue For Man',   brand:'Dolce & Gabbana', price:70000, images:[img(100)], category:'Hombre', concentration:'Eau de Toilette', volume:'125 ml', description:'Frescura mediterránea masculina. Sol y mar italiano.', notes_top:['Mandarina siciliana','Enebro','Pomelo'], notes_heart:['Pimienta rosa','Romero','Madera de rosa'], notes_base:['Almizcle','Roble','Incienso'] },

  // ─── HUGO BOSS (101-103) ───
  { id:'boss-unlimited',   name:'Hugo Boss Unlimited',    brand:'Hugo Boss', price:70000, images:[img(101)], category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'Sin límites. Fresco y vibrante con menta y piña.', notes_top:['Menta','Lima','Piña'], notes_heart:['Freesia','Madera flotante'], notes_base:['Almizcle','Sándalo'] },
  { id:'hugo-red',         name:'Hugo Boss Red',          brand:'Hugo Boss', price:70000, images:[img(102)], category:'Hombre', concentration:'Eau de Toilette', volume:'150 ml', description:'Rojo intenso y atrevido. Energía pura y rebeldía.', notes_top:['Piña','Pomelo rojo'], notes_heart:['Pimienta roja','Abedul'], notes_base:['Madera de roble','Vetiver'] },
  { id:'boss-bottled-night', name:'Hugo Boss Bottled Night', brand:'Hugo Boss', price:70000, images:[img(103)], category:'Hombre', concentration:'Eau de Toilette', volume:'200 ml', description:'Seductor nocturno. Elegancia oscura para la noche.', notes_top:['Lavanda','Abedul'], notes_heart:['Violeta','Cardamomo'], notes_base:['Almizcle oscuro','Sándalo'] },

  // ─── LATTAFA MAYAR (104-105) ───
  { id:'mayar-natural-intense', name:'Mayar Natural Intense', brand:'Lattafa', price:95000, images:[img(104)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Intensidad natural con notas florales orientales. Envolvente.', notes_top:['Bergamota','Mandarina'], notes_heart:['Jazmín','Rosa','Nardo'], notes_base:['Almizcle','Ámbar','Sándalo'] },
  { id:'mayar-clasica',         name:'Mayar Classic',         brand:'Lattafa', price:95000, images:[img(105)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Elegancia rosada. Floral sofisticada en su presentación clásica.', notes_top:['Rosa','Bergamota'], notes_heart:['Lirio','Jazmín'], notes_base:['Vainilla','Almizcle','Sándalo'] },

  // ─── RAVE NOW WOMAN (106) ───
  { id:'rave-now-women', name:'Now Woman', brand:'Rave', price:90000, images:[img(106)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Ahora. Femenina y moderna con un diseño geométrico único.', notes_top:['Pera','Bergamota'], notes_heart:['Rosa','Jazmín'], notes_base:['Almizcle','Vainilla','Sándalo'] },

  // ─── DIOR SAUVAGE (107-108) ───
  { id:'dior-sauvage-elixir', name:'Sauvage Elixir',       brand:'Dior', price:80000, images:[img(107)], category:'Hombre', badge:'new', concentration:'Parfum', volume:'60 ml', description:'La versión más concentrada de Sauvage. Puro poder olfativo.', notes_top:['Canela','Cardamomo','Nuez moscada'], notes_heart:['Lavanda','Pimienta negra'], notes_base:['Sándalo','Pachulí','Ámbar'] },
  { id:'dior-sauvage-classic', name:'Sauvage Classic',      brand:'Dior', price:70000, images:[img(108)], category:'Hombre', concentration:'Eau de Toilette', volume:'100 ml', description:'Salvaje y refinado. El clásico atemporal de Dior.', notes_top:['Bergamota','Pimienta'], notes_heart:['Estrella de anís','Nuez moscada','Lavanda'], notes_base:['Ambroxan','Cedro de Virginia'] },

  // ─── PACO RABANNE FAME (109) ───
  { id:'fame-rabanne', name:'Fame', brand:'Paco Rabanne', price:70000, images:[img(109)], category:'Mujer', concentration:'Eau de Parfum', volume:'80 ml', description:'Fama y glamour. El nuevo ícono femenino de Paco Rabanne.', notes_top:['Mango','Mandarina'], notes_heart:['Jazmín','Incienso'], notes_base:['Sándalo','Cashmeran','Cedro'] },

  // ─── PARFUMS DE MARLY LAYTON (110) ───
  { id:'layton', name:'Layton', brand:'Parfums de Marly', price:85000, images:[img(110)], category:'Hombre', badge:'new', concentration:'Eau de Parfum', volume:'125 ml', description:'La exclusividad absoluta. Especias y oud con nobleza francesa.', notes_top:['Pimienta rosa','Cardamomo','Manzana'], notes_heart:['Lavanda','Geranio','Violeta'], notes_base:['Vainilla','Sándalo','Guayaco'] },

  // ─── VERSACE BRIGHT CRYSTAL (111) ───
  { id:'versace-bright-crystal', name:'Versace Bright Crystal', brand:'Versace', price:70000, images:[img(111)], category:'Mujer', concentration:'Eau de Toilette', volume:'90 ml', description:'Cristal brillante. Femenina, fresca y luminosa.', notes_top:['Granada','Yuzu','Loto congelado'], notes_heart:['Magnolia','Peonía','Loto'], notes_base:['Ámbar','Almizcle','Caoba'] },

  // ─── PARFUMS DE MARLY DELINA (112) ───
  { id:'delina-exclusif', name:'Delina Exclusive', brand:'Parfums de Marly', price:75000, images:[img(112)], category:'Mujer', concentration:'Parfum', volume:'75 ml', description:'Rosa turca y litchi. La quintaesencia de la feminidad francesa.', notes_top:['Litchi','Pera','Bergamota'], notes_heart:['Rosa turca','Peonía','Iris'], notes_base:['Vetiver','Elicriso','Almizcle'] },

  // ─── LATTAFA AJWAD (113) ───
  { id:'lattafa-ajwad', name:'AJWAD', brand:'Lattafa', price:110000, images:[img(113)], category:'Unisex', concentration:'Eau de Parfum', volume:'60 ml', description:'Joya oriental con motivos geométricos. Cálida y especiada.', notes_top:['Azafrán','Canela'], notes_heart:['Oud','Rosa','Incienso'], notes_base:['Vainilla','Ámbar','Sándalo'] },

  // ─── DIOR MISS DIOR (114) ───
  { id:'miss-dior', name:'Miss Dior', brand:'Dior', price:80000, images:[img(114)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Romance parisino. Rosa centifolia y peonía en un lazo icónico.', notes_top:['Iris','Lirio de los valles'], notes_heart:['Rosa centifolia','Peonía'], notes_base:['Almizcle','Sándalo','Pachulí'] },

  // ─── BRITNEY SPEARS FANTASY (115) ───
  { id:'fantasy-britney', name:'Fantasy Britney Spears', brand:'Britney Spears', price:70000, images:[img(115)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Dulce, sensual y misteriosa. El icónico frasco morado.', notes_top:['Litchi','Kiwi','Membrillo'], notes_heart:['Jazmín','Chocolate blanco','Orquídea'], notes_base:['Almizcle','Madera de cedro','Caramelo'] },

  // ─── LATTAFA KIT YARA (116) ───
  { id:'kit-yara', name:'Kit Yara', brand:'Lattafa', price:105000, images:[img(116)], category:'Mujer', badge:'new', concentration:'Eau de Parfum', volume:'Set', description:'Set exclusivo de la línea Yara con varias fragancias.', notes_top:['Variado'], notes_heart:['Variado'], notes_base:['Variado'] },

  // ─── BHARARA (117-121) ───
  { id:'bharara-bleu',      name:'Bharara Bleu',      brand:'Bharara', price:105000, images:[img(117)], category:'Unisex', concentration:'Eau de Parfum', volume:'100 ml', description:'Azul profundo con notas orientales y amaderadas.', notes_top:['Bergamota','Pimienta negra'], notes_heart:['Iris','Oud'], notes_base:['Ámbar','Almizcle','Sándalo'] },
  { id:'bharara-chocolate', name:'Bharara Chocolate',  brand:'Bharara', price:105000, images:[img(118)], category:'Unisex', concentration:'Eau de Parfum', volume:'100 ml', description:'Indulgencia chocolatosa con maderas orientales.', notes_top:['Chocolate','Café'], notes_heart:['Praline','Cacao'], notes_base:['Vainilla','Almizcle','Sándalo'] },
  { id:'bharara-niche',     name:'Bharara Niche',      brand:'Bharara', price:105000, images:[img(119)], category:'Unisex', concentration:'Eau de Parfum', volume:'100 ml', description:'La expresión más sofisticada de Bharara. Exclusiva y compleja.', notes_top:['Azafrán','Cardamomo'], notes_heart:['Oud','Rosa búlgara'], notes_base:['Ámbar','Almizcle','Vainilla'] },
  { id:'bharara-rose',      name:'Bharara Rose',       brand:'Bharara', price:105000, images:[img(120)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Rosa aterciopelada con calidez oriental.', notes_top:['Rosa','Bergamota'], notes_heart:['Flor de naranjo','Jazmín'], notes_base:['Almizcle','Ámbar','Sándalo'] },
  { id:'bharara-king',      name:'Bharara King',       brand:'Bharara', price:105000, images:[img(121)], category:'Hombre', badge:'new', concentration:'Eau de Parfum', volume:'100 ml', description:'Majestad y poder. El rey de la colección Bharara.', notes_top:['Pimienta negra','Bergamota'], notes_heart:['Cuero','Oud'], notes_base:['Ámbar','Vainilla','Almizcle'] },

  // ─── YUM YUM / LATTAFA (122-125) ───
  { id:'yumyum-kit-3x50',     name:'Kit Yum Yum 3x50 ML',      brand:'Lattafa', price:130000, images:[img(122)], category:'Mujer', badge:'new', concentration:'Eau de Parfum', volume:'3x50 ml', description:'Set de tres fragancias Yum Yum de 50ml cada una. Dulzura triple.', notes_top:['Variado'], notes_heart:['Variado'], notes_base:['Variado'] },
  { id:'yumyum-classic-box',  name:'Classic Box Yum Yum',       brand:'Lattafa', price:100000, images:[img(123)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'La versión clásica de Yum Yum. Dulce y envolvente.', notes_top:['Malvavisco','Algodón de azúcar'], notes_heart:['Crema batida','Praline'], notes_base:['Vainilla','Almizcle','Sándalo'] },
  { id:'yumyum-deluxe-box',   name:'Deluxe Box Yum Yum',        brand:'Lattafa', price:120000, images:[img(124)], category:'Mujer', badge:'new', concentration:'Eau de Parfum', volume:'100 ml', description:'Presentación de lujo de Yum Yum. Gourmand premium.', notes_top:['Caramelo','Frutas rojas'], notes_heart:['Algodón de azúcar','Rosa'], notes_base:['Vainilla','Almizcle','Sándalo'] },
  { id:'yumyum-island-bliss', name:'Yum Yum Island Bliss',      brand:'Lattafa', price:120000, images:[img(125)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Yum Yum con notas tropicales. Paraíso dulce y vibrante.', notes_top:['Frutas tropicales','Coco'], notes_heart:['Vainilla','Jazmín'], notes_base:['Almizcle','Sándalo','Caramelo'] },

  // ─── YARA / LATTAFA (126-133) ───
  { id:'yara-asad-black',    name:'Yara ASAD Black',       brand:'Lattafa', price:85000, images:[img(126)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Oscuro y misterioso. La versión más intensa de la línea ASAD.', notes_top:['Pimienta negra','Bergamota'], notes_heart:['Oud','Cuero'], notes_base:['Ámbar','Almizcle','Sándalo'] },
  { id:'yara-tous',          name:'Yara Tous',              brand:'Lattafa', price:85000, images:[img(127)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Delicada y femenina. Floral gourmand con un toque moderno.', notes_top:['Mandarina','Grosellas'], notes_heart:['Jazmín','Rosa'], notes_base:['Vainilla','Almizcle','Sándalo'] },
  { id:'yara-moi',           name:'Yara Moi',               brand:'Lattafa', price:85000, images:[img(128)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Personal y envolvente. La esencia de Yara para ti.', notes_top:['Pera','Bergamota'], notes_heart:['Peonía','Jazmín'], notes_base:['Vainilla','Almizcle','Sándalo'] },
  { id:'yara-candy',         name:'Yara Candy',             brand:'Lattafa', price:85000, images:[img(129)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Dulce como un caramelo. La versión más golosa de Yara.', notes_top:['Caramelo','Frutas rojas'], notes_heart:['Algodón de azúcar','Rosa'], notes_base:['Vainilla','Almizcle'] },
  { id:'yara-pink',          name:'Yara Pink',              brand:'Lattafa', price:85000, images:[img(130)], category:'Mujer', concentration:'Eau de Parfum', volume:'100 ml', description:'Rosa y femenina. La versión rosa clásica de Yara.', notes_top:['Rosa','Frambuesa'], notes_heart:['Peonía','Jazmín'], notes_base:['Vainilla','Almizcle','Sándalo'] },
  { id:'yara-asad-bourbon',  name:'Yara ASAD Bourbon',      brand:'Lattafa', price:85000, images:[img(131)], category:'Hombre', concentration:'Eau de Parfum', volume:'100 ml', description:'Riqueza del bourbon con maderas nobles y especias.', notes_top:['Canela','Cardamomo'], notes_heart:['Oud','Tabaco'], notes_base:['Vainilla','Ámbar','Sándalo'] },
  { id:'yara-black-gold',    name:'Yara Black & Gold',      brand:'Lattafa', price:85000, images:[img(132)], category:'Unisex', concentration:'Eau de Parfum', volume:'100 ml', description:'Elegancia oscura con detalles dorados. Oud y especias.', notes_top:['Azafrán','Pimienta negra'], notes_heart:['Oud','Rosa'], notes_base:['Ámbar','Almizcle','Sándalo'] },
  { id:'yara-zanzibar',      name:'Yara Zanzibar',          brand:'Lattafa', price:85000, images:[img(133)], category:'Unisex', concentration:'Eau de Parfum', volume:'100 ml', description:'Exótica y vibrante. Inspirada en las especias de Zanzíbar.', notes_top:['Canela','Clavo','Jengibre'], notes_heart:['Oud','Rosa','Azafrán'], notes_base:['Vainilla','Sándalo','Almizcle'] },
];

// ── Main ────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🗑️  Borrando TODOS los productos anteriores...');
  const { error: delErr } = await supabase.from('products').delete().neq('id','___none___');
  if (delErr) { console.error('Error borrando:', delErr.message); return; }
  console.log('✅ Productos eliminados.\n');

  console.log(`📦 Insertando ${products.length} productos con mapeo corregido...\n`);
  let ok = 0, fail = 0;

  for (const p of products) {
    const row = {
      id: p.id, name: p.name, brand: p.brand, price: p.price,
      original_price: p.originalPrice || null,
      images: p.images, badge: p.badge || null,
      description: p.description,
      notes_top: p.notes_top, notes_heart: p.notes_heart, notes_base: p.notes_base,
      concentration: p.concentration, volume: p.volume, category: p.category,
    };
    const { error } = await supabase.from('products').upsert([row], { onConflict:'id' });
    if (error) { console.error(`  ❌ ${p.name}: ${error.message}`); fail++; }
    else { console.log(`  ✅ ${p.name} → ${p.images[0].split('/').pop()}`); ok++; }
  }

  console.log(`\n${'═'.repeat(50)}`);
  console.log(`🎉 Listo: ${ok} ✅  ${fail} ❌  (Total: ${products.length})`);
  console.log(`${'═'.repeat(50)}\n`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
