
import { getFirstCall } from './network';


export async function getCallReq(params: any){    
  const url = getFirstCall(params).list;
  try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      return error;
    }
}
