import axios from "axios";
export const ApiHandle = (apiLink, apiData, method) => {
  const baseUrl = "http://localhost:8000";
  return axios({
    method: method,
    url: `${baseUrl}${apiLink}`,
    data: apiData,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};