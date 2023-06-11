import { useAppSelector } from "../app/hook";
import { RootState } from "../redux/store";

export default function Test() {
  const username = useAppSelector((state: RootState) => state.user.name);
  return (
    <>
      <div>test</div>
      <div>{username}</div>
    </>
  );
}
