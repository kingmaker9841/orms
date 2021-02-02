import { server } from "../../config/server";
import { toast } from "react-toastify";
const URL = "/mail-log";

async function mailLog() {
  try {
    const json = await server.get(`${URL}`);
    return json.data;
  } catch (ex) {
    toast.error("No response from server");
  }
}
async function mailStatus(id, data) {
  try {
    return await server.put(`${URL}/${id}`, data);
  } catch (ex) {
    toast.error("We experience some issues !");
  }
}
export { mailLog, mailStatus };
