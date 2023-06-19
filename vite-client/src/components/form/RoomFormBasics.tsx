import { FormProps } from "../../app/interface";
import {
  DropdownInput,
  MiniInput,
  StandardInput,
} from "../minicomponents/Inputs";

export default function RoomFormBasics(props: FormProps) {
  return (
    <>
      <div id="basics" className="mb-8">
        <StandardInput
          name="name"
          type="text"
          placeholder="name your partyroom"
          register={props.register("name")}
          onChange={props.handleNameInputChange}
        />
        <div className="flex flex-row w-full justify-between">
          <MiniInput
            name="room_size"
            type="text"
            placeholder="area (ft²)"
            register={props.register("room_size")}
          />
          <MiniInput
            name="capacity"
            type="text"
            placeholder="capacity"
            register={props.register("capacity")}
          />
        </div>
        <div className="mb-12">
          <StandardInput
            name="address"
            placeholder="address line 1 (room, building, street)"
            type="text"
            register={props.register("address")}
          />
          <DropdownInput
            name="district"
            options={props.dropdownOptions}
            register={props.register("district")}
            placeholder="Select your district"
          />
        </div>
      </div>
    </>
  );
}
