import { create } from "zustand";

type OwnedFilmStore = {
  film: number[];
  setFilm: (newFilm: number) => void;
};

export const useOwnedFilmStore = create<OwnedFilmStore>((set, get) => ({
  film: [],
  setFilm: (newFilm: number) => {
    if (!get().film.includes(newFilm)) {
      set((state) => ({
        film: [...state.film, newFilm],
      }));
    }
    // else {
    //   const index = get().film.indexOf(newFilm);
    //   if (index !== -1) {
    //     const newArray = [...get().film];
    //     newArray.splice(index, 1);
    //     set({ film: newArray });
    //   }
    // }
  },
}));
