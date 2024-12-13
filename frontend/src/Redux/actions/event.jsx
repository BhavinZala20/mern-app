import axios from "axios";
import { server } from "../../server";

// create event
export const createEvent = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });

    const { d } = await axios.post(`${server}/event/create-event`, data);
    dispatch({
      type: "eventCreateSuccess",
      payload: d.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// Get All Shop events
export const getAllShopEvents = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsShopRequest ",
    });
    const { data } = await axios.get(
      `${server}/event/get-all-shop-events/${id}`
    );
    dispatch({
      type: "getAlleventsShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// Get All Shop Products
export const deleteShopEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteShopEventRequest",
    });
    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "deleteShopEventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteShopEventFailed",
      payload: error.response.data.message,
    });
  }
};

// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events`);
    dispatch({
      type: "getAllEventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsFailed",
      payload: error.response.data.message,
    });
  }
};
