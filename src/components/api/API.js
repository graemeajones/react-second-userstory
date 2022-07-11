import { API_URL, API_KEY } from './apiConfig';


const API = {}; 
API.get = (endpoint) => apiCall(endpoint, 'GET', null);
API.post = (endpoint, data) => apiCall(endpoint, 'POST', data);
API.put = (endpoint, data) => apiCall(endpoint, 'PUT', data);
API.delete = (endpoint) => apiCall(endpoint, 'DELETE', null);

export const apiCall = async (endpoint, method, body) => {

  // Build request object
  let requestObj = { method: method }; // *GET, POST, PUT, DELETE, etc.
  if (body) requestObj = {
    ...requestObj,
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(body)
  };

  // Call API and return response object
  try {
    const endpointAddress = API_URL + endpoint + API_KEY;
    const response = await fetch(endpointAddress, requestObj);
    if ((response.status >= 200) && (response.status <= 299))
      return { success: true, response: await response.json() };
    else return { success: false, response: response };
  }
  catch (error) {
    return { success: false, response: error };
  }
}

export default API;
