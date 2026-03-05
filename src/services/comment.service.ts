import api from "./api";

export const CommentService = {
  addComment(hotelId: number, comment: string) {
    return api.post(`/comments/${hotelId}`, {
      comment,
    });
  },
};
