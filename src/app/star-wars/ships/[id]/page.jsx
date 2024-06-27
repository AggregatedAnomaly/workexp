import RawJSON from "./raw-json";
import { getSpacecraft } from "@/lib/api/star-wars";

export async function generateMetadata({ params: { id } }) {
  const shipInfo = await getSpacecraft(id);

  return {
    title: `Star Wars - ${shipInfo.name}`,
  };
}

export async function StarWarsShip({ params: { id } }) {
  const shipInfo = await getSpacecraft(id);

  return (
    <main className="flex flex-col w-full m-auto h-full">
      <h2 className="text-center p-2 font-bold text-3xl">
        Ship Registration Details
      </h2>
      <div className="py-2"></div>
      <div className="py-2">
        {/** Bug inserting accordion on server-component - moved down layer to remedy */}
        <RawJSON info={shipInfo} />
      </div>
    </main>
  );
}

export default StarWarsShip;
