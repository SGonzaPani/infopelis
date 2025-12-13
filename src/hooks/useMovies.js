import { useQuery } from "@tanstack/react-query";
import { getMoviesByCategory } from "../services/Services";

export function useMovies(category) {
  return useQuery({
    queryKey: ["movies", category],
    queryFn: () => getMoviesByCategory(category),
  });
}
