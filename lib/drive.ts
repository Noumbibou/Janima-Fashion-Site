import type { Product } from "../app/types/product";

function humanize(fileName: string) {
  return fileName.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ");
}

export function driveImageUrl(fileId: string, width = 900) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${width}`;
}

export async function getDriveProducts(): Promise<Product[]> {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!apiKey || !folderId) {
    console.error("Google Drive API key or folder ID is missing.");
    return [];
  }

  const params = new URLSearchParams({
    key: apiKey,
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
    orderBy: "name",
    fields: "files(id,name,mimeType)",
    pageSize: "100",
  });

  const url = `https://www.googleapis.com/drive/v3/files?${params}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Google Drive API request failed:", response.status, text);
      return [];
    }

    const data = await response.json();

    if (!data.files || !Array.isArray(data.files)) {
      console.error("Google Drive API returned invalid data.", data);
      return [];
    }

    return data.files.map((file: { id: string; name: string }, index: number) => {
      const name = humanize(file.name);
      return {
        id: String(index + 1).padStart(2, "0"),
        name,
        imageUrl: driveImageUrl(file.id),
        imageAlt: name,
      };
    });
  } catch (error) {
    console.error("Google Drive API request error:", error);
    return [];
  }
}
