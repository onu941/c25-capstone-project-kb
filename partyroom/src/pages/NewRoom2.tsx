import { useForm, SubmitHandler } from "react-hook-form";
import { FullScreen } from "../components/Containers";
import { AppHeader, FormHeader } from "../components/Header";
import { useCallback, useState } from "react";
import {
  AddressLine2,
  AddressLine3,
  MiniInput,
  StandardInput,
  StandardInputDeleteDisabled,
  StandardInputDeleteEnabled,
  TextArea,
} from "../components/Inputs";
import { PrimaryButton } from "../components/Buttons";
import { Tab } from "../components/Tab";
import { Sidebar } from "../components/Sidebar";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { FormCarousel, LandingCarousel } from "../components/Carousels";
import { Switch } from "@headlessui/react";

type EquipmentField = {
  id: number;
  name: string;
};

type FormState = {
  name: string;
  area: number;
  capacity: number;
  address_1: string;
  address_2: string;
  address_3: string;
  equipment: EquipmentField[];
};

export default function NewRoom2() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [partyroomName, setPartyroomName] = useState("Continue Submitting");
  const [equipmentFields, setEquipmentFields] = useState<EquipmentField[]>([
    { id: 1, name: "Equipment 1" },
    { id: 2, name: "Equipment 2" },
    { id: 3, name: "Equipment 3" },
  ]);

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  const { register, handleSubmit } = useForm<FormState>();

  const onSubmit: SubmitHandler<FormState> = (data) => {
    console.log(data);
  };

  const onDrop = useCallback((_acceptedFiles: any) => {}, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <FullScreen>
        <AppHeader
          title={partyroomName}
          toggleSidebar={toggleSidebar}
          isOpen={sidebarIsOpen}
        ></AppHeader>
        <Sidebar isOpen={sidebarIsOpen} toggleSidebar={toggleSidebar}></Sidebar>
        <form
          className="flex mt-6 flex-col w-full px-8 mb-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className="px-10 py-16 rounded-xl border-dashed border-2 border-slate-500 text-lg text-justify mb-8"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here</p>
            ) : (
              <p className="text-slate-300">
                Drag and drop some files here, or press to select files to
                upload
              </p>
            )}
          </div>
          <p className="text-center mb-8 text-xl">Image Preview here</p>
          <FormCarousel />
          <div className="columns-2 flex place-content-center place-items-center gap-5 mb-8">
            <div>
              <p className="text-slate-300 text-md">I'm done uploading!</p>
            </div>
            <div>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${enabled ? " bg-pink-500" : "bg-pink-800"}
              relative inline-flex h-[29px] w-[52px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${enabled ? "translate-x-6" : "translate-x-0"}
                pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
          </div>
          <div className={!enabled ? "hidden" : ""}>
            <hr className=" mb-5 border-slate-500" />
            <FormHeader title="Confirm your partyroom:" />
            <Link to="/new_room">
              <PrimaryButton type="button" label="Reset Progress" />
              <PrimaryButton type="submit" label="Submit Your Room!" />
            </Link>
          </div>
        </form>
      </FullScreen>
      <Tab />
    </>
  );
}
