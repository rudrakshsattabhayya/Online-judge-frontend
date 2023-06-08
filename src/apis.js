import axios from "axios";

const get = async (route) => {
  try {
    const url =
      "http://localhost:8000/Apis/";
    const res = await axios({
      method: "get",
      url: `${url + route}`,
      withCredentials: true,
    });

    const response = {
      ...res,
      error: false,
    };
    
    return response;
  } catch (error) {
      console.log(error);
      const response = {
        data: error.response.data,
        error: true,
      };
    return response;
  }
};

const post = async (route, obj) => {
  try {
    const url =
    "http://localhost:8000/Apis/";
    const res = await axios({
      method: "post",
      url: `${url + route}`,
      withCredentials: true,
      data: obj,
    });

    const response = {
      ...res,
      error: false,
    };
    return response;
  } catch (error) {
    console.log(error);
    const response = {
      data: error.response.data,
      error: true,
    };
    return response;
  }
};

const deleteApi = async (route, obj) => {
  try {
    const url =
    "http://localhost:8000/Apis/";
    const res = await axios({
      method: "delete",
      url: `${url + route}`,
      withCredentials: true,
    });

    const response = {
      ...res,
      error: false,
    };
    return response;
  } catch (error) {
    console.log(error);
    const response = {
      data: error.response.data,
      error: true,
    };
    return response;
  }
};

export { get, post, deleteApi };