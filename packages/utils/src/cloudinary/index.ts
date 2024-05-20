import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true // Use HTTPS for URL and images
});


export async function uploadToCloudinary(fileStr: string, folder?: string) {
  return cloudinary.uploader.upload(fileStr, {
    ...(folder && { folder }),
    format: 'avif',
    secure: true,
  });
}

export default cloudinary;