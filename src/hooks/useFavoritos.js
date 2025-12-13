import { useMutation, useQuery } from "@tanstack/react-query";

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favs) {
  localStorage.setItem("favorites", JSON.stringify(favs));
}

export function useFavorites() {

  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: () => getFavorites(),
  });

  const addFavorite = useMutation({
    mutationFn: (movie) => {
      const current = getFavorites();
      const exists = current.some((m) => m.id === movie.id);

      if (!exists) {
        saveFavorites([...current, movie]);
      }
    },
    onSuccess: () => {
      favoritesQuery.refetch();
    },
  });

  const removeFavorite = useMutation({
    mutationFn: (movieId) => {
      const current = getFavorites();
      const updated = current.filter((m) => m.id !== movieId);
      saveFavorites(updated);
    },
    onSuccess: () => {
      favoritesQuery.refetch();
    },
  });

  return {
    favorites: favoritesQuery.data || [],
    addFavorite: addFavorite.mutate,
    removeFavorite: removeFavorite.mutate,
    isLoading: favoritesQuery.isLoading,
  };
}
