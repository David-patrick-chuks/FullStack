import { Spinner } from "@material-tailwind/react";

export default function Loader() {
  return (
    <div className=" bg-white/30 bg-opacity-60 w-full h-full grid place-content-center">
      <Spinner color="blue" />
    </div>
  );
}
