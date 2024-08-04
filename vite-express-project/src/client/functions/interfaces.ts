export interface UserData {
  name: string;
  login: string;
  bio: string;
}

export interface PubData {
  id_post: number;
  date: string;
  text: string;
  likes_count: number;
  media: string;
  mediaType: string;
}

export interface MediaData {
  type: string;
  media_name: string;
}

export interface FeedData {
  media: string;
  mediaType: string;
  name: string;
  login: string;
  bio: string;
  id_post: number;
  date: string;
  text: string;
  likes_count: number;
}
