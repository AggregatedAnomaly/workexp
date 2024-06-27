import { getSpacecraft } from "@/lib/api/star-trek";
import RawJSON from "./raw-json";

export async function generateMetadata({ params: { uid } }) {
  const shipInfo = await getSpacecraft(uid);

  return {
    title: `Star Trek - ${shipInfo.name}`,
  };
}

export async function StarTrekShip({ params: { uid } }) {
  const shipInfo = await getSpacecraft(uid);

  return (
    <main className="flex flex-col w-full m-auto">
      <h2 text-center p-2 font-bold text-3xl>
        Ship Registration Details
      </h2>
      <div className="py-2"></div>
      <div className="py-2">
        {" "}
        <RawJSON info={shipInfo} />
      </div>
    </main>
  );
}
export default StarTrekShip;
