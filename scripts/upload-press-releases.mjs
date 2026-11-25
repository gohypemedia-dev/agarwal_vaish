import { config } from "dotenv";
config();
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucket = process.env.R2_BUCKET || "avvs";
const R2_BASE = (process.env.R2_PUBLIC_URL || "https://pub-659514a4eb6748e39c2166cb4b7fee09.r2.dev").replace(/\/+$/, "");

if (!accountId || !accessKeyId || !secretAccessKey) {
  console.error("Missing R2 credentials in environment!");
  process.exit(1);
}

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
});

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

function parseDate(filename) {
  if (filename.includes("20261115")) return "15 November 2026";
  if (filename.includes("20261116")) return "16 November 2026";
  if (filename.includes("20261117")) return "17 November 2026";
  if (filename.includes("20261119") || filename.includes("2026-11-19")) return "19 November 2026";
  if (filename.includes("20261120")) return "20 November 2026";
  if (filename.includes("20261124")) return "24 November 2026";
  if (filename.includes("20261125") || filename.includes("2026-11-25")) return "25 November 2026";
  return "November 2026";
}

async function uploadFile(key, buffer, contentType) {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
  return `${R2_BASE}/${key}`;
}

async function main() {
  const dir = "press release";
  if (!fs.existsSync(dir)) {
    console.error(`Folder "${dir}" not found!`);
    process.exit(1);
  }

  const allFiles = fs.readdirSync(dir).filter((f) => !f.endsWith(".zip") && !f.startsWith("."));

  // Deduplicate using MD5
  const hashes = new Set();
  const uniqueItems = [];

  for (const file of allFiles) {
    const filePath = path.join(dir, file);
    if (!fs.statSync(filePath).isFile()) continue;
    const buf = fs.readFileSync(filePath);
    const hash = crypto.createHash("md5").update(buf).digest("hex");
    if (hashes.has(hash)) continue;
    hashes.add(hash);

    // Clean filename for R2
    const ext = path.extname(file) || ".jpg";
    const baseName = path
      .basename(file, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .replace(/_+/g, "_")
      .substring(0, 40);
    const cleanKeyName = `${baseName}_${hash.substring(0, 8)}${ext.toLowerCase().includes("png") ? ".png" : ".jpg"}`;

    uniqueItems.push({
      originalFile: file,
      filePath,
      buffer: buf,
      hash,
      r2Key: `gallery/press-release/${cleanKeyName}`,
      date: parseDate(file),
      size: buf.length,
    });
  }

  console.log(`Found ${allFiles.length} files in folder.`);
  console.log(`Found ${uniqueItems.length} unique press release items to upload.`);

  // Upload to R2 and insert into Database
  let index = 1;
  const total = uniqueItems.length;

  for (const item of uniqueItems) {
    console.log(`[${index}/${total}] Uploading to R2: ${item.r2Key} (${(item.size / 1024).toFixed(1)} KB)...`);
    const r2Url = await uploadFile(item.r2Key, item.buffer, item.r2Key.endsWith(".png") ? "image/png" : "image/jpeg");

    const itemId = `pr-${item.hash.substring(0, 16)}`;
    const title = `प्रेस विज्ञप्ति एवं समाचार कवरेज #${index}`;
    const titleEn = `Press Release & Media Coverage #${index}`;

    await prisma.galleryItem.upsert({
      where: { id: itemId },
      create: {
        id: itemId,
        type: "PHOTO",
        section: "press-release",
        title: titleEn,
        titleHi: title,
        event: "Press Release",
        eventHi: "प्रेस विज्ञप्ति",
        src: r2Url,
        thumbnail: r2Url,
        alt: "अग्रवाल वैश्य विकास संगठन - प्रेस विज्ञप्ति",
        focalPoint: "center",
        displayOrder: index,
        date: item.date,
        isActive: true,
      },
      update: {
        type: "PHOTO",
        section: "press-release",
        title: titleEn,
        titleHi: title,
        event: "Press Release",
        eventHi: "प्रेस विज्ञप्ति",
        src: r2Url,
        thumbnail: r2Url,
        alt: "अग्रवाल वैश्य विकास संगठन - प्रेस विज्ञप्ति",
        displayOrder: index,
        date: item.date,
        isActive: true,
      },
    });

    index++;
  }

  const finalCount = await prisma.galleryItem.count({ where: { section: "press-release" } });
  console.log(`\n🎉 SUCCESS! All press releases uploaded! Total in DB under 'press-release': ${finalCount}`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});
