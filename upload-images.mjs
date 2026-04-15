import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  'https://piazsirqdtidvkgryrxu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpYXpzaXJxZHRpZHZrZ3J5cnh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxODkwNzQsImV4cCI6MjA5MTc2NTA3NH0.lHxSXO52LYg0_B8HSHzukYT7s1nfpV2kpzHL82dT_NI'
);

const BUCKET = 'products';
const FOLDER = 'catalog';
const LOCAL_DIR = 'd:/Serenity shop/Gn perfumes';

async function main() {
  // 1. List all old files and delete them
  console.log('🗑️  Limpiando archivos antiguos del storage...');
  const { data: oldFiles, error: listErr } = await supabase.storage.from(BUCKET).list(FOLDER, { limit: 500 });
  if (listErr) { console.error('Error listando:', listErr.message); return; }
  
  if (oldFiles && oldFiles.length > 0) {
    const oldPaths = oldFiles.map(f => `${FOLDER}/${f.name}`);
    const { error: delErr } = await supabase.storage.from(BUCKET).remove(oldPaths);
    if (delErr) console.error('Error borrando archivos viejos:', delErr.message);
    else console.log(`  ✅ ${oldPaths.length} archivos antiguos eliminados.`);
  }

  // 2. Upload all new numbered images
  const files = fs.readdirSync(LOCAL_DIR)
    .filter(f => /\.(jpg|jpeg|jfif|png)$/i.test(f))
    .sort((a, b) => {
      const numA = parseInt(path.parse(a).name);
      const numB = parseInt(path.parse(b).name);
      return numA - numB;
    });

  console.log(`\n📤  Subiendo ${files.length} imágenes al storage...\n`);
  let ok = 0, fail = 0;

  for (const file of files) {
    const filePath = path.join(LOCAL_DIR, file);
    const fileBuffer = fs.readFileSync(filePath);
    
    // Always upload as .jpg name (even if source is .jfif or .jpeg)
    const baseName = path.parse(file).name;
    const storageName = `${baseName}.jpg`;
    const storagePath = `${FOLDER}/${storageName}`;
    
    const ext = path.extname(file).toLowerCase();
    const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';

    const { error } = await supabase.storage.from(BUCKET).upload(storagePath, fileBuffer, {
      contentType,
      upsert: true,
    });

    if (error) {
      console.error(`  ❌ ${file} → ${storageName}: ${error.message}`);
      fail++;
    } else {
      console.log(`  ✅ ${file} → ${storageName}`);
      ok++;
    }
  }

  console.log(`\n${'═'.repeat(50)}`);
  console.log(`🎉 Upload completo: ${ok} ✅  ${fail} ❌  (Total: ${files.length})`);
  console.log(`${'═'.repeat(50)}\n`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
