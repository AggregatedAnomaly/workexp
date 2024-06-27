import axios from "axios";

const createClient = () =>
  axios.create({
    baseURL: "https://stapi.co/api/v2/rest/",
  });

export const getSpacecrafts = async () => {
  try {
    const client = createClient();
    const response = await client.get(`spacecraft/search`);

    if (response.status !== 200)
      return {
        count: 0,
        page: 0,
        spacecrafts: [],
      };

    const { page, spacecrafts } = response.data;

    return {
      count: spacecrafts.length,
      page: page,
      spacecrafts,
    };
  } catch (error) {
    console.error(error);
    return { page: 0, count: 0, spacecrafts: [] };
  }
};

export const getSpacecraft = async (uid) => {
  try {
    const client = createClient();
    const response = await client.get(`spacecraft?uid=${uid}`);

    if (response.status !== 200)
      return {
        spacecraft: null,
      };

    const { spacecraft } = response.data;

    return {
      ...spacecraft,
    };
  } catch (error) {
    console.error(error);
    return error;
  }
};
