import axios from "axios";

export const API_ADDRESS = "http://wvms-back.herokuapp.com/api"
// export const API_ADDRESS = 'http://localhost:3011/api';

export const getProfile = async (token: string) => {
    try{
      const response = await axios({
        url: `${API_ADDRESS}/auth/profile`,
        method: 'get',
        headers: { Authorization: `Bearer ${token}` },
    })
    console.log('getProfile : ', response);
    return response;
  
    // return response;

    }catch(e) {
      console.log('getProfile Error :', e)
      return e.response;
    }
}