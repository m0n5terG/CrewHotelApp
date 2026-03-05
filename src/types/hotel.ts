export interface Hotel {
  id: number;
  country_code: string;
  hotel_name: string;
  address: string;
  thumbnail?: string;
  comment_count: number;
}

export interface HotelDetail extends Hotel {
  amenities?: string;
  nearby_amenities?: string;
  fb_discount?: string;
  photos: string[];
  comments: HotelComment[];
}

export interface HotelComment {
  comment_id: number;
  crew: string;
  comment: string;
  created_at: string;
}
