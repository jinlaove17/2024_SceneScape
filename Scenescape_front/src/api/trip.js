import { localAxios } from "@/utils/http-commons";

const tripAPI = localAxios();

const getTrip = (tripNo, success, fail) => {
  tripAPI.get(`/trips/${tripNo}`).then(success).catch(fail);
};

const getTrips = (success, fail) => {
  tripAPI.get("/trips").then(success).catch(fail);
};

const createTrip = (trip, success, fail) => {
  tripAPI.post("/trips", trip).then(success).catch(fail);
};

const modifyTrip = (trip, success, fail) => {
  tripAPI.put(`/trips/${trip.no}`, trip).then(success).catch(fail);
};

const deleteTrip = (tripNo, success, fail) => {
  tripAPI.delete(`/trips/${tripNo}`).then(success).catch(fail);
};

export default {
  getTrip,
  getTrips,
  createTrip,
  modifyTrip,
  deleteTrip,
};
