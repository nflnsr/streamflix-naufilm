interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
}

interface Crew extends Cast {}

type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

export { type Credits };
