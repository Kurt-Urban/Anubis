import axios from "axios";

const getServerData = async (ip: string) => {
  try {
    const serverData = new Promise((resolve, _) =>
      resolve(axios.get(`https://api.mcsrvstat.us/2/${ip}`))
    );
    return await serverData
      .then((res: any) => res?.data)
      .catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
};

export default getServerData;
