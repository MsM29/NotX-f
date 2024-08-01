export interface UserData {
  name: string;
  login: string;
  bio: string;
}

export interface PubData {
  id_post: number;
  date: string;
  text: string;
}

export interface MediaData {
  type: string;
  media_name: string;
}

export interface FeedData {
  name: string;
  login: string;
  bio: string;
  id_post: number;
  date: string;
  text: string;
}
