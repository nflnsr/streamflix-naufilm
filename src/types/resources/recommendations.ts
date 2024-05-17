interface Result {
  backdrop_path: null | string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: null | string;
  media_type: MediaType;
  adult: boolean;
  title: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: Date;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

enum MediaType {
  Movie = "movie",
}

type Recommendations = {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export { type Recommendations, MediaType };