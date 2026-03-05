import { Hotel, HotelDetail } from "../types/hotel";
import api from "./api";

export const HotelService = {
  getHotels() {
    return api.get<Hotel[]>("/hotels");
  },

  getHotelDetail(hotelId: number) {
    return api.get<HotelDetail>(`/hotels/${hotelId}`);
  },

  createHotel(formData: FormData) {
    return api.post("/hotels", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  addPhoto(hotelId: number, formData: FormData) {
    return api.post(`/hotels/${hotelId}/photos`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
