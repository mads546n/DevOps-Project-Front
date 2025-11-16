import { useState } from "react";

interface AuctionFields {
  title: string;
  description: string;
  startingPrice: string;
  file: File | null;
}

export function useAuctionValidation() {
  const [errors, setErrors] = useState<string[]>([]);

  const validate = ({ title, description, startingPrice, file }: AuctionFields): boolean => {
    const newErrors: string[] = [];

    if (!title.trim()) {
      newErrors.push("Title is required.");
    } else if (title.length < 1 || title.length > 25) {
      newErrors.push("Title must be between 1 and 25 characters.");
    }

    if (!description.trim()) {
      newErrors.push("Description is required.");
    }

    if (!startingPrice.trim()) {
      newErrors.push("Starting price is required.");
    } else if (isNaN(Number(startingPrice)) || Number(startingPrice) <= 0) {
      newErrors.push("Starting price must be a positive number.");
    }

    //might need to include jpeg and other formats
    if (!file) {
      newErrors.push("A PNG file is required.");
    } else if (file.type !== "image/png") {
      newErrors.push("File must be a PNG image.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  return {
    errors,
    validate
  };
}
