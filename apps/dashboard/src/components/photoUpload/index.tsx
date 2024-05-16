import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { convertToBase64 } from "~/utils/imageUtils";

interface PhotoUploadProps {
  name: string;
  multiple?: boolean;
  allowSelectMainImage?: boolean;
  onMainImageIndexChange?: (index: number | null) => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  name,
  multiple = true,
  allowSelectMainImage = false,
  onMainImageIndexChange,
}) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);
  const [inputKey, setInputKey] = useState<number>(Date.now());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const images = watch(name) || [];
    const loadPreviewImages = async () => {
      const previewArray = await Promise.all(
        images.map((file: File) => convertToBase64(file)),
      );
      setPreviewImages(previewArray);
    };
    if (images.length > 0) {
      loadPreviewImages();
    }
    setInputKey(Date.now());
  }, [watch(name)]);

  useEffect(() => {
    if (onMainImageIndexChange) {
      onMainImageIndexChange(mainImageIndex);
    }
  }, [mainImageIndex, onMainImageIndexChange]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter((file) => {
        if (!file.type.startsWith("image/")) {
          setError("Niewłaściwy typ pliku. Można dodawać tylko obrazki");
          return false;
        }
        if (file.size > 5 * 1024 * 1024) {
          setError("Zbyt duży plik. Maksymalny rozmiar pliku 5 mb.");
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) {
        return;
      }

      const existingFiles = watch(name) || [];
      const updatedFiles = multiple
        ? [...existingFiles, ...validFiles]
        : validFiles;
      setValue(name, updatedFiles);
      setError(null);

      const previewArray = await Promise.all(
        updatedFiles.map(async (file) => convertToBase64(file)),
      );

      setPreviewImages(previewArray);
      setInputKey(Date.now());
    }
  };

  const handleRemoveImage = (index: number) => {
    const existingFiles = watch(name) || [];
    const updatedFiles = existingFiles.filter(
      (_: any, i: number) => i !== index,
    );
    setValue(name, updatedFiles);
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    if (mainImageIndex === index) {
      setMainImageIndex(null);
    } else if (mainImageIndex && mainImageIndex > index) {
      setMainImageIndex(mainImageIndex - 1);
    }
  };

  const handleMainImageClick = (index: number) => {
    setMainImageIndex(mainImageIndex === index ? null : index);
  };

  return (
    <div>
      {allowSelectMainImage && (
        <p className="mb-2 text-gray-700">
          Kliknij zdjęcie, aby zaznaczyć je jako główne (miniatura).
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {previewImages.map((src, index) => (
          <div key={index} className="relative h-24 w-24">
            <div
              className={cn(
                "relative h-full w-full cursor-pointer border border-gray-300",
                {
                  "border-2 border-blue-500":
                    allowSelectMainImage && mainImageIndex === index,
                },
              )}
              onClick={() =>
                allowSelectMainImage && handleMainImageClick(index)
              }
              title="Kliknij, aby zaznaczyć jako główne zdjęcie"
            >
              <img
                src={src}
                alt={`Preview ${index}`}
                className="h-full w-full object-cover"
              />
            </div>
            <button
              type="button"
              className="bg-destructive/70 absolute right-0 top-0 p-1 text-white"
              onClick={() => handleRemoveImage(index)}
              title="Usuń zdjęcie"
            >
              &times;
            </button>
            {allowSelectMainImage && mainImageIndex === index && (
              <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-center text-xs text-white">
                Główne zdjęcie
              </div>
            )}
          </div>
        ))}
        {multiple || previewImages.length === 0 ? (
          <label
            htmlFor={`file-upload-${inputKey}`}
            className="flex h-24 w-24 cursor-pointer items-center justify-center border-2 border-dashed border-gray-300"
          >
            <span className="text-gray-500">+</span>
            <input
              id={`file-upload-${inputKey}`}
              type="file"
              accept="image/*"
              multiple={multiple}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        ) : null}
      </div>
      <FormMessage>{error}</FormMessage>
      <FormMessage>{errors[name]?.message}</FormMessage>
    </div>
  );
};

export default PhotoUpload;
