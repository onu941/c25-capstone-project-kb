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
  disabled?: boolean;
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
  year?: string | number;
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

export interface Option {
  value: string;
  label: string;
}

export interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  register?: UseFormRegisterReturn;
  onChange?: (arg: any) => void;
  name?: string;
  onDelete?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
  className?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isGoodForEditing?: boolean;
  handleEditClick?: () => void;
  handleSaveClick?: () => void;
  handleReviewDetailInputChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  options?: Option[];
  step?: number | string;
  max?: number | string;
  min?: number | string;
}

export interface HeaderProps {
  title?: string;
  isOpen?: boolean;
  toggleSidebar?: () => void;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rating?: string;
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
  bookingsTabIsSelected?: string;
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

export interface FormProps {
  register: UseFormRegister<SubmitRoomFormState>;
  handleNameInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dropdownOptions?: any[];
  priceLists?: number[];
  addPriceList?: () => void;
  removePriceList?: (index: number) => void;
}

export interface FormCategoryEquipmentProps extends FormProps {
  activeIconButtons: { [key: string]: boolean };
  handleFormIconButton: (iconType: string) => void;
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
  booking_date: string;
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
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSignupSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  initialName: string;
  initialEmail: string;
  initialPhone: string;
  initialPassword: string;
}

// export interface SignupProps {
//   register: UseFormRegister<HandleUserFormState>;
//   handleSubmit: UseFormHandleSubmit<HandleUserFormState, any>;
//   onSignupSubmit: (data: HandleUserFormState) => void;
//   setPage: React.Dispatch<React.SetStateAction<string>>;
// }

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

export interface SubmitRoomFormState {
  name: string;
  room_size: number;
  capacity: number;
  address: string;
  district: string;
  equipment: EquipmentField[];
  category: CategoryField[];
  description: string;
  image: PartyroomImage[];
  price_list: PriceList[];
}

export interface PriceList {
  base_room_fee: number;
  headcount: number;
  start_time: string;
  total_hours: number;
  is_holiday: boolean;
}

export interface ReviewFormData {
  detail: string;
  rating: string;
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
  image_filename: string;
}

export interface Booking {
  id: number;
  name: string;
  person_id: number;
  person_name: string;
  phone: string;
  address: string;
  headcount: number;
  start_time: string;
  booking_date: string;
  status: string;
  special_request: string;
  partyroom_id: number;
  image_filename: string;
}

export interface BookingCard {
  id: number;
  person_id: number;
  headcount: number;
  booking_date: string;
  start_time: string;
  name: string;
  address: string;
  image_filename: string;
}

export interface Category {
  name: string;
}

export interface Equipment {
  name: string;
}

export interface PartyroomImage {
  filename: string;
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
