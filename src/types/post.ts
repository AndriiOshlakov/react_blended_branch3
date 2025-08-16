export interface Post {
  id: number;
  title: string;
  body: string;
}
export interface CreatePost {
  title: string;
  body: string;
}

export interface EditPost {
  title?: string;
  body?: string;
}
