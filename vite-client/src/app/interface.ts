import { FormEvent } from "react";
import { DropzoneRootProps, DropzoneInputProps } from "react-dropzone";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";

// ************************ //
// minicomponents interface //
// ************************ //

export interface ButtonProps {
  label?: string;
  type?: "button" | "submit";
  onClick?: (arg: any) => void;
  isCentered?: boolean;
  color?: string;
  spanClassName?: string;
  icon?: string;
}

export interface SettingsTabButtonProps {
  name?: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export type District = {
  id: number;
  name: string;
};

export interface CardProps {
  id?: number;
  date?: string | number;
  month?: string;
  year?: number;
  name?: string;
  time?: string;
  pax?: number;
  address?: string;
  content?: string;
  score?: string;
  onClick?: () => void;
  image?: string;
  alt?: string;
  review_text?: string;
  phone?: number | string;
  whatsAppUrl?: any;
}

export interface CarouselProps {
  image: string;
}

export type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  register?: UseFormRegisterReturn;
  onChange?: (arg: any) => void;
  name?: string;
  onDelete?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
  className?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isEditing?: boolean;
  handleEditClick?: () => void;
  handleSaveClick?: () => void;
};

export interface HeaderProps {
  title?: string;
  isOpen?: boolean;
  toggleSidebar?: () => void;
}

export interface BookingModalProps {
  toggleModal: () => void;
}

export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export interface SettingTabProps {
  handleClick: (string: string) => void;
  isSelected?: string;
}

// ******************** //
// components interface //
// ******************** //

export interface InitialLandingProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

export interface LoginProps {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onLoginSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  initialEmail: string;
  initialPassword: string;
}

export interface Form1Props {
  register: UseFormRegister<NewRoomFormState>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  equipmentFields: EquipmentField[];
  categoryFields: CategoryField[];
  handleDelete: (id: number) => void;
  handleAddMoreEquipment: () => void;
  handleAddMoreCategories: () => void;
  handleDeleteCategories: (id: number) => void;
  activeIconButtons: { [key: string]: boolean };
  handleFormIconButton: (iconType: string) => void;
  color?: string;
}

export interface Form2Props {
  isSelected?: string;
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  isDragActive?: boolean;
  switchEnabled?: boolean;
  setSwitchEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

// export type JWT = {
//   id: number;
//   name: string;
//   phone: string;
//   email: string;
//   is_admin: boolean;
//   image_id: number;
//   iat: number;
//   exp: number;
// };

export type PartyroomInSettings = {
  id: number;
  name: string;
  host_id: number;
  address: string;
  is_hidden: boolean;
};

export type HandleUserFormState = {
  name: string;
  phoneNo: any;
  password: string;
};

export interface SignupProps {
  register: UseFormRegister<HandleUserFormState>;
  handleSubmit: UseFormHandleSubmit<HandleUserFormState, any>;
  onSignupSubmit: (data: HandleUserFormState) => void;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

// ************** //
// form interface //
// ************** //

export type EquipmentField = {
  id: number;
  name: string;
};

export type CategoryField = {
  id: number;
  name: string;
};

export interface ActiveIconButtons {
  [key: string]: boolean;
}

export type NewRoomFormState = {
  name: string;
  room_size: number;
  capacity: number;
  address: string;
  district: string;
  equipment: EquipmentField[];
  category: CategoryField[];
  description: string;
};

// **************** //
// other interfaces //
// **************** //

export type Partyroom = {
  id: number;
  name: string;
  host_id: number;
  host_name: string;
  district: string;
  room_size: number;
  capacity: number;
  phone: string;
  address: string;
  description: string;
  category: string[];
  equipment: string[];
};

export type Review = {
  id: number;
  rating: number;
  name: string;
  detail: string;
};
