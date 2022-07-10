import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_SESAME_BASE_URL;
axios.defaults.headers.common['Authorization'] = import.meta.env.VITE_SESAME_KEY;

export default {
workEntries: () => {
  return axios("/work-entries");
},
clockIn: () => {
    return axios.post("/work-entries/clock-in", {
      "employeeId": import.meta.env.VITE_SESAME_EMPLOYEE_ID,
      "workEntryIn": {
        "coordinates": {
        "latitude": null,
        "longitude": null
        }
      },
        });
},
clockOut: () => {
  return axios.post("/work-entries/clock-out", {
    "employeeId": import.meta.env.VITE_SESAME_EMPLOYEE_ID,
    "workEntryOut": {
      "coordinates": {
      "latitude": null,
      "longitude": null
      }
    },
  });
}
};