import { FormProps } from "../../app/interface";
import { FormHeader } from "../minicomponents/Headers";
import { TextArea } from "../minicomponents/Inputs";

export default function RoomFormDescription(props: FormProps) {
  return (
    <>
      <div className="mb-4">
        {" "}
        <FormHeader title="Add any other features that weren't previously mentioned:" />
        <TextArea
          placeholder="Max 150 characters"
          // {...props.register("description")}
          register={props.register("description")}
        />
      </div>
    </>
  );
}
