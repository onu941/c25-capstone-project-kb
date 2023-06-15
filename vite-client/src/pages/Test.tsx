import { useAppSelector } from "../app/hook";
import PricingBlock from "../components/minicomponents/PricingBlock";
import { RootState } from "../redux/store";

export default function Test() {
  const username = useAppSelector((state: RootState) => state.user.name);
  return (
    <>
      <div className="p-24">
        <div className="mb-12">test</div>
        <div>{username}</div>
        <PricingBlock />
      </div>
    </>
  );
}
