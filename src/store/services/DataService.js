import { HTTP } from '../services/http-common';

// import { adress } from "@/constants";
class DataService {

    postService(URL,Parameter){
        return HTTP.post(URL, Parameter);
    }
  }
  export default new DataService();

