export interface UserData {
  private: boolean;
  name: string;
  login: string;
  bio: string;
  application: boolean;
}

export interface PubData {
  id_post: number;
  date: string;
  text: string;
  likes_count: number;
  media: string;
  mediaType: string;
  id_comment: number;
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
  id_comment: number;
}
