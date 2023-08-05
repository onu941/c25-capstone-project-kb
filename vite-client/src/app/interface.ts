import { UseFormRegister } from "react-hook-form";
import { SubmitRoomFormState } from "../pages/SubmitRoom";

export interface FormProps {
  register: UseFormRegister<SubmitRoomFormState>;
  handleNameInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dropdownOptions?: any[];
  priceListIndex?: any[];
  addPriceList?: () => void;
}

export interface FormCategoryEquipmentProps extends FormProps {
  activeIconButtons: number[];
  handleFormIconButton: (iconType: string) => void;
  selectedCategory: number[];
  setSelectedCategory(selected: number[]): void;
  selectedEquipment: number[];
  setSelectedEquipment(selected: number[]): void;
}

export interface FormImageProps extends FormProps {
  multiple?: boolean;
  selectedImages: File[];
  imagePreviews: string[];
  handleImageUpload: () => void;
  handleImageFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteImage: (index: number) => void;
}

export interface JWT {
  id: number;
}
