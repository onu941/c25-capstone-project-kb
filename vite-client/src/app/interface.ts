import { FormEvent } from "react";
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

export interface District {
  id: number;
  name: string;
}

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

export interface InputProps {
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
}

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
  isDragActive?: boolean;
  switchEnabled?: boolean;
  setSwitchEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PartyroomInSettings {
  id: number;
  name: string;
  host_id: number;
  address: string;
  is_hidden: boolean;
}

export interface BookingInSettings {
  id: number; // have
  name: string; // need to join table (partyroom_price_list, partyroom)
  date: number; // have
  month: number; // have
  year: number; // have
  start_time: string; // join table (partyroom_price_list)
  headcount: number; // have
  address: string; // join table (partyroom_price_list, partyroom)
}

export interface HandleUserFormState {
  name: string;
  phoneNo: any;
  password: string;
}

export interface SignupProps {
  register: UseFormRegister<HandleUserFormState>;
  handleSubmit: UseFormHandleSubmit<HandleUserFormState, any>;
  onSignupSubmit: (data: HandleUserFormState) => void;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

// ************** //
// form interface //
// ************** //

export interface EquipmentField {
  id: number;
  name: string;
}

export interface CategoryField {
  id: number;
  name: string;
}

export interface ActiveIconButtons {
  [key: string]: boolean;
}

export interface NewRoomFormState {
  name: string;
  room_size: number;
  capacity: number;
  address: string;
  district: string;
  equipment: EquipmentField[];
  category: CategoryField[];
  description: string;
}

// **************** //
// other interfaces //
// **************** //

export interface Partyroom {
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
  category: Category[];
  equipment: Equipment[];
}

export interface Category {
  name: string;
}

export interface Equipment {
  name: string;
}

export interface Review {
  id: number;
  rating: number;
  name: string;
  detail: string;
}

export interface JWT {
  id: number;
}
