/**
 * Uploads an image blob to Cloudinary's free demo cloud
 * @param blob - The image blob to upload
 * @returns The secure HTTPS URL of the uploaded image
 */
export async function uploadImageToCloudinary(blob: Blob): Promise<string> {
  console.log("[Cloudinary] Starting upload...", {
    size: blob.size,
    type: blob.type,
  });

  const formData = new FormData();
  formData.append("file", blob, "travel-recap.png");
  formData.append("upload_preset", "ml_default");

  console.log("[Cloudinary] Sending request to API...");

  const uploadResponse = await fetch(
    "https://api.cloudinary.com/v1_1/demo/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  console.log("[Cloudinary] Response status:", uploadResponse.status);

  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text();
    console.error("[Cloudinary] Upload failed:", {
      status: uploadResponse.status,
      statusText: uploadResponse.statusText,
      body: errorText,
    });
    throw new Error(`Failed to upload image: ${uploadResponse.statusText}`);
  }

  const uploadData = await uploadResponse.json();
  const imageUrl = uploadData.secure_url;

  console.log("[Cloudinary] Upload successful!", {
    url: imageUrl,
    publicId: uploadData.public_id,
    format: uploadData.format,
    width: uploadData.width,
    height: uploadData.height,
  });

  return imageUrl;
}
