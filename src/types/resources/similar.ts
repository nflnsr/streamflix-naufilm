interface Result {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

enum OriginalLanguage {
  CN = "cn",
  En = "en",
  It = "it",
  Zh = "zh",
}

type Similar = {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
};

export { type Similar, OriginalLanguage };
