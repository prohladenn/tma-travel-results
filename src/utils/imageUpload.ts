/**
 * Uploads an image blob to imgbb (free image hosting)
 * @param blob - The image blob to upload
 * @returns The HTTPS URL of the uploaded image
 */
export async function uploadImageToCloudinary(blob: Blob): Promise<string> {
  console.log("[ImageUpload] Starting upload...", {
    size: blob.size,
    type: blob.type,
  });

  // Convert blob to base64
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Remove data:image/png;base64, prefix
      const base64Data = result.split(",")[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  console.log("[ImageUpload] Converted to base64, length:", base64.length);

  // Using imgbb API with expiration (images auto-delete after 1 hour)
  const formData = new FormData();
  formData.append("image", base64);
  formData.append("expiration", "60"); // 1 minute in seconds

  console.log("[ImageUpload] Sending request to imgbb API...");

  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

  if (!apiKey) {
    console.error("[ImageUpload] API key not configured");
    throw new Error(
      "Image upload is not configured. Please set VITE_IMGBB_API_KEY."
    );
  }

  const uploadResponse = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    {
      method: "POST",
      body: formData,
    }
  );

  console.log("[ImageUpload] Response status:", uploadResponse.status);

  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text();
    console.error("[ImageUpload] Upload failed:", {
      status: uploadResponse.status,
      statusText: uploadResponse.statusText,
      body: errorText,
    });
    throw new Error(`Failed to upload image: ${uploadResponse.statusText}`);
  }

  const uploadData = await uploadResponse.json();

  if (!uploadData.success) {
    console.error("[ImageUpload] API returned error:", uploadData);
    throw new Error(
      `Failed to upload image: ${uploadData.error?.message || "Unknown error"}`
    );
  }

  const imageUrl = uploadData.data.url;

  console.log("[ImageUpload] Upload successful!", {
    url: imageUrl,
    displayUrl: uploadData.data.display_url,
    deleteUrl: uploadData.data.delete_url,
    size: uploadData.data.size,
    expiration: uploadData.data.expiration,
  });

  return imageUrl;
}
