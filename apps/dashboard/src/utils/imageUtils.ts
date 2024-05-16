export const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  
export const convertArrayToFileList = (fileArray: File[]) => {
    const dataTransfer = new DataTransfer();
    fileArray.forEach((file) => dataTransfer.items.add(file));
    return dataTransfer.files;
};