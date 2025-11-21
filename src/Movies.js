import { useQuery } from "@tanstack/react-query";
import { getMoviesByCategory } from "./Services.js";

export function useMovies(category) {
  return useQuery({
    queryKey: ["movies", category],
    queryFn: () => getMoviesByCategory(category),
  });
}
