import axios from "axios";

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;

const get = async (route) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const res = await axios({
      method: "get",
      url: `${url + route}`,
      // withCredentials: true,
    });

    const response = {
      ...res,
      error: false,
    };

    if(res.status !==200){
      response.error = true;
    }
    
    return response;
  } catch (error) {
      console.log(error);
      if(!error?.response?.data?.message){
        error.response.data.message = error.message || "Something went wrong!";
      }
      
      const response = {
        data: error.response.data,
        error: true,
      };
    return response;
  }
};

const post = async (route, obj) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const res = await axios({
      method: "post",
      url: `${url + route}`,
      // withCredentials: true,
      data: obj,
    });

    const response = {
      ...res,
      error: false,
    };

    if(res.status !==200){
      response.error = true;
    }
    return response;
  } catch (error) {
    console.log(error);
    if(!error?.response?.data?.message){
      error.response.data.message = error.message || "Something went wrong!";
    }

    const response = {
      data: error.response.data,
      error: true,
    };
    return response;
  }
};

const deleteApi = async (route, obj) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const res = await axios({
      method: "delete",
      url: `${url + route}`,
      // withCredentials: true,
    });

    const response = {
      ...res,
      error: false,
    };
    return response;
  } catch (error) {
    console.log(error);
    if(!error?.response?.data?.message){
      error.response.data.message = error.message || "Something went wrong!";
    }
    const response = {
      data: error.response.data,
      error: true,
    };
    return response;
  }
};

export { get, post, deleteApi };