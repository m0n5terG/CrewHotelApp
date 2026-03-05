import api from "./api";

export const AdminService = {
  getUsers() {
    return api.get("/admin/users");
  },

  getPendingUsers() {
    return api.get("/admin/users/pending");
  },

  approveUser(userId: number) {
    return api.patch(`/admin/users/${userId}/approve`);
  },

  makeAdmin(userId: number) {
    return api.post(`/admin/make_admin/${userId}`);
  },

  deleteUser(userId: number) {
    return api.delete(`/admin/users/${userId}`);
  },

  approveHotel(hotelId: number) {
    return api.patch(`/admin/hotels/${hotelId}/approve`);
  },
};
