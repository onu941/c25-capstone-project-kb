import { ArrowPathIcon } from "@heroicons/react/20/solid";

export default function Loading() {
  return (
    <>
      <div className="mt-24 w-full h-full text-center text-xl flex flex-col place-items-center place-content-center text-slate-300">
        <ArrowPathIcon className="w-14 h-14 animate-spin" />
        <div className="mt-8 mb-24">Loading...</div>
      </div>
    </>
  );
}
