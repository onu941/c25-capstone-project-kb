import { Combobox } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  type?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  onChange?: (arg: any) => void;
  name?: string;
  onDelete?: () => void;
};

export function StandardInput(props: InputProps) {
  return (
    <input
      placeholder={props.placeholder}
      type={props.type}
      className="dark:text-black dark:bg-slate-200 p-2 rounded-lg mb-5 text-center w-full"
      {...props.register}
      onChange={props.onChange}
    ></input>
  );
}

export function MiniInput(props: InputProps) {
  return (
    <input
      placeholder={props.placeholder}
      type={props.type}
      className="dark:text-black dark:bg-slate-200 p-2 rounded-lg mb-5 text-center w-32"
      {...props.register}
      onChange={props.onChange}
    ></input>
  );
}

export function StandardInputDeleteDisabled(props: InputProps) {
  return (
    <div className="flex flex-row columns-2 gap-4">
      <div className="w-full">
        <input
          placeholder={props.placeholder}
          type={props.type}
          className="dark:text-black dark:bg-slate-200 p-2 rounded-lg mb-5 text-center w-full"
          {...props.register}
        ></input>
      </div>
      <div className="w-fit">
        <button disabled>
          <TrashIcon className="h-9 w-9 text-slate-600" />
        </button>
      </div>
    </div>
  );
}

export function StandardInputDeleteEnabled(props: InputProps) {
  return (
    <div className="flex flex-row columns-2 gap-4">
      <div className="w-full">
        <input
          placeholder={props.placeholder}
          type={props.type}
          className="dark:text-black dark:bg-slate-200 p-2 rounded-lg mb-5 text-center w-full"
          {...props.register}
        ></input>
      </div>
      <div className="w-fit">
        <button onClick={props.onDelete}>
          <TrashIcon className="h-9 w-9 text-slate-300" />
        </button>
      </div>
    </div>
  );
}

export function TextArea(props: InputProps) {
  return (
    <textarea
      className="dark:bg-slate-200 dark:text-black rounded-lg h-32 "
      placeholder={props.placeholder}
      maxLength={150}
    ></textarea>
  );
}

function AddressLine2() {
  const addressLine2 = [
    "Kennedy Town",
    "Shek Tong Tsui",
    "Sai Ying Pun",
    "Sheung Wan",
    "Central",
    "Admiralty",
    "Mid-levels",
    "Peak",
    "Wan Chai",
    "Causeway Bay",
    "Happy Valley",
    "Tai Hang",
    "So Kon Po",
    "Jardine's Lookout",
    "Tin Hau",
    "Braemar Hill",
    "North Point",
    "Quarry Bay",
    "Sai Wan Ho",
    "Shau Kei Wan",
    "Chai Wan",
    "Siu Sai Wan",
    "Pokfulam",
    "Aberdeen",
    "Ap Lei Chau",
    "Wong Chuk Hang",
    "Shouson Hill",
    "Repulse Bay",
    "Chung Hom Kok",
    "Stanley",
    "Tai Tam",
    "Shek O",
    "Tsim Sha Tsui",
    "Yau Ma Tei",
    "King's Park",
    "Mong Kok",
    "Tai Kok Tsui",
    "Mei Foo",
    "Lai Chi Kok",
    "Cheung Sha Wan",
    "Sham Shui Po",
    "Shek Kip Mei",
    "Yau Yat Tsuen",
    "Tai Wo Ping",
    "Stonecutters Island",
    "Hung Hom",
    "To Kwa Wan",
    "Ma Tau Kok",
    "Ma Tau Wai",
    "Kai Tak",
    "Kowloon City",
    "Ho Man Tin",
    "Kowloon Tong",
    "Beacon Hill",
    "San Po Kong",
    "Wong Tai Sin",
    "Lok Fu",
    "Diamond Hill",
    "Tsz Wan Shan",
    "Ngau Chi Wan",
    "Ping Shek",
    "Kowloon Bay",
    "Ngau Tau Kok",
    "Kwun Tong",
    "Sau Mau Ping",
    "Lam Tin",
    "Yau Tong",
    "Lei Yue Mun",
    "Kwai Chung",
    "Tsing Yi",
    "Tsuen Wan",
    "Sham Tseng",
    "Ma Wan",
    "Sunny Bay",
    "Tuen Mun",
    "Tin Shui Wai",
    "Yuen Long",
    "Kam Tin",
    "Tai Po",
    "Tai Wai",
    "Sha Tin",
    "Fo Tan",
    "Wu Kai Sha",
    "Ma On Shan",
    "Clearwater Bay",
    "Sai Kung",
    "Tsueng Kwan O",
    "Hang Hau",
    "Tiu Keng Leng",
    "Cheung Chau",
    "Peng Chau",
    "Tung Chung",
    "Lamma Island",
  ];

  const [selectedLine2, setSelectedLine2] = useState(addressLine2[0]);
  const [query, setQuery] = useState("");

  const filteredLine2 =
    query === ""
      ? addressLine2
      : addressLine2.filter((line) => {
          return line.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selectedLine2} onChange={setSelectedLine2}>
      <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
      <Combobox.Options className="text-black">
        {filteredLine2.map((line) => (
          <Combobox.Option className="text-black" key={line} value={line}>
            {line}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
