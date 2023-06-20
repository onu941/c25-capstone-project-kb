import { useState } from "react";
import { FormImageProps } from "../../app/interface";
import { PrimaryButton } from "../minicomponents/Buttons";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { BodyHeader } from "../minicomponents/Headers";

export default function RoomFormImages(props: FormImageProps) {
  return (
    <>
      <BodyHeader title="Upload some photos:" />
      <div className="flex flex-col place-content-center place-items-center px-10 py-12 frounded-xl border-dashed border-2 border-slate-500 rounded-lg mb-8 mt-8">
        <div className="mb-12 text-lg text-slate-300 text-center">
          <input
            className="text-center"
            type="file"
            multiple={props.multiple}
            onChange={props.handleImageFileChange}
            name="images"
          ></input>
        </div>
        <PrimaryButton
          label="Upload Images"
          type="button"
          onClick={() => props.handleImageUpload()}
        />
      </div>
      <div
        className={`flex place-content-center place-items-center mb-8 bg-slate-800 bg-opacity-50 rounded-md w-full ${
          props.imagePreviews.length === 0 ? " h-24" : "h-44"
        } border-solid border-2 border-slate-700 border-opacity-30`}
      >
        {props.imagePreviews.length == 0 && (
          <span className="text-slate-500 text-xl">
            Preview Your Images Here
          </span>
        )}
        {props.imagePreviews.map((preview, index) => (
          <div className="relative" key={index}>
            <img
              key={index}
              src={preview}
              alt={`Preview ${index}`}
              className="mx-2 h-40 object-cover rounded-md"
            />
            <div className="h-7 w-7 bg-slate-800 bg-opacity-70 absolute right-2 top-0 rounded-sm">
              <button
                type="button"
                onClick={() => props.handleDeleteImage(index)}
              >
                <XMarkIcon className="h-7 w-7  drop-shadow-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
