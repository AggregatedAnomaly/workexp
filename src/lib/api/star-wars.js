import axios from "axios";

const createClient = () =>
  axios.create({
    baseURL: "https://swapi.dev/api/",
  });

export const getSpacecrafts = async (page = 1) => {
  try {
    const client = createClient();
    const response = await client.get(`starships/?page=${page}`);

    if (response.status !== 200)
      return {
        count: 0,
        page: 0,
        spacecrafts: [],
      };

    const { count, results } = response.data;

    return {
      count,
      page: 0,
      spacecrafts: results.map((ship) => ({
        ...ship,
        id: ship.url
          .substring("https://swapi.dev/api/starships/".length)
          .replace("/", ""),
      })),
    };
  } catch (error) {
    console.error("could not get spacecrafts", { page }, error);
    return { page: 0, count: 0, spacecrafts: [] };
  }
};

export const getSpacecraft = async (id) => {
  try {
    const client = createClient();
    const response = await client.get(`starships/${id}`);

    if (response.status !== 200) return {};

    return {
      ...response.data,
    };
  } catch (error) {
    console.error("could not get spacecraft details for", { id }, error);
    return {};
  }
};
