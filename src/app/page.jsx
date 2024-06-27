"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getSpacecrafts as getStarTrekSpaceships } from "@/lib/api/star-trek";
import { getSpacecrafts as getStarWarsSpaceships } from "@/lib/api/star-wars";
import { Spinner } from "@/components/icons";

export default function Home() {
  const [starTrekShips, setStarTrekShips] = useState([]);
  const [starWarsShips, setStarWarsShips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const [starTrekData, starWarsData] = await Promise.all([
        getStarTrekSpaceships(),
        getStarWarsSpaceships(),
      ]);

      setStarTrekShips(starTrekData.spacecrafts);
      setStarWarsShips(starWarsData.spacecrafts);
      setIsLoading(false);
    };

    getData();
  }, []);

  return (
    <main className="flex flex-col w-full m-auto h-full">
      <div className="">
        <h2 className="text-center p-2 font-bold text-3xl">
          Spacecraft registry
        </h2>
        <p>
          Welcome to the Spacecraft regisstry, here you can browse the various
          speciffications of spacecraft from both Star Wras and Star Trekk.
        </p>
      </div>

      <div className="h-full">
        <h2 className="text-center p-2 font-bold">Spaceships</h2>
        {isLoading ? (
          <div className="h-full w-full justify-evenly flex m-auto">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-row gap-3">
            <table className="mx-auto w-full rounded-lg border-2 border-teal-400 border-separate border-tools-table-outline bg-teal-700 bg-opacity-30 table-auto">
              <thead>
                <tr>
                  <th className="p-4 text-4xl">Star Trek</th>
                </tr>
              </thead>
              <tbody>
                {starTrekShips.map((ship) => (
                  <tr
                    className="px-2 flex flex-col hover:bg-teal-600 hover:bg-opacity-30 cursor-pointer"
                    href={`/star-trek/ships/${ship.uid}`}
                    key={ship?.uid ?? ship.name}
                    onClick={() => router.push(`/star-trek/ships/${ship.uid}`)}
                  >
                    <td className="w-full">{ship.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="mx-auto w-full rounded-lg border-2 border-teal-400 border-separate border-tools-table-outline bg-teal-700 bg-opacity-30 table-auto">
              <thead>
                <tr>
                  <th className="p-4 text-4xl">Star Wars</th>
                </tr>
              </thead>
              <tbody>
                {starWarsShips.map((ship) => (
                  <tr
                    className="px-2 flex flex-col hover:bg-teal-600 hover:bg-opacity-30 cursor-pointer"
                    href={`/star-wars/ships/${ship.id}`}
                    key={ship?.id ?? ship.name}
                    onClick={() => router.push(`/star-wars/ships/${ship.id}`)}
                  >
                    <td className="w-full">{ship.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
