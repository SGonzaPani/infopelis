import { useQuery, useQueryClient } from "@tanstack/react-query";

const STORAGE_VERSION = "v13"; // Aumentar la version +1 cuando se agreguen o modifiquen peliculas
const STORAGE_KEY = "customMovies_" + STORAGE_VERSION;

const DEFAULT_CUSTOM_MOVIES = [
  {
    id: 1001,
    title: "Interstellar",
    posterURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJHnx-WNPvrs5Ht6p3ZXI2_QY4eYWWikJKyg&s",
    trailerURL: "https://www.youtube.com/embed/zSWdZVtXT7E",
    year: "2014",
    genre: "Sci-Fi",
    description: "Un grupo de astronautas viaja en busca de un nuevo hogar."
  },
  {
    id: 1002,
    title: "The Dark Knight",
    posterURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ekE6Hhz9gvIbiFSUPxt-FyAh4zXTXX0bjQ&s",
    trailerURL: "https://www.youtube.com/embed/EXeTwQWrcwY",
    year: "2008",
    genre: "Acción",
    description: "Batman enfrenta al Joker."
  },
  {
    id: 1003,
    title: "Inception",
    posterURL: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SL1500_.jpg",
    trailerURL: "https://www.youtube.com/embed/8hP9D6kZseM",
    year: "2010",
    genre: "Sci-Fi",
    description: "Un ladrón se infiltra en los sueños para robar secretos."
  },
  {
    id: 1004,
    title: "Gladiator",
    posterURL: "https://images.justwatch.com/poster/257375550/s718/gladiator.jpg",
    trailerURL: "https://www.youtube.com/embed/owK1qxDselE",
    year: "2000",
    genre: "Acción",
    description: "Un general romano busca venganza tras perderlo todo."
  },
  {
    id: 1005,
    title: "Pulp Fiction",
    posterURL: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SL1500_.jpg",
    trailerURL: "https://www.youtube.com/embed/s7EdQ4FqbhY",
    year: "1994",
    genre: "Crimen",
    description: "Historias entrelazadas de crimen y humor negro."
  },
  {
    id: 1007,
    title: "The Avengers",
    posterURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5eFtAPePq9odaoJjeGZR-WJ02dmoUsTdH3Q&s",
    trailerURL: "https://www.youtube.com/embed/eOrNdBpGMv8",
    year: "2012",
    genre: "Acción",
    description: "Los héroes más poderosos de la Tierra se unen para detener a Loki y su ejército en una batalla épica por el futuro del planeta."
  },
  {
    id: 1008,
    title: "Boca Juniors 3D: La Película",
    posterURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxL5n89_98g-ioPurFp56ZoACZfvxgTVlmw&s",
    trailerURL: "https://www.youtube.com/watch?v=wB5uZhGPMoc",
    year: "2015",
    genre: "Documental / Deporte",
    description: "Un recorrido cinematográfico por la historia, la pasión y los momentos más emblemáticos del Club Atlético Boca Juniors."
  },
  {
  id: 1009,
  title: "Pobre 🐓RiBer👻🅱️",
  posterURL: "https://media.tycsports.com/files/2021/06/25/298742/tapas_416x555.jpg",
  trailerURL: "https://www.youtube.com/watch?v=DwtjDWlMBck",
  year: "2015",
  genre: "Documental / Deporte",
  description: "Un recorrido cinematográfico por la historia, la pasión y los momentos más emblemáticos del Club 🐓 RiBer 👻🅱️."
},
];

function loadCustomMovies() {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (stored && Array.isArray(stored)) return stored;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CUSTOM_MOVIES));
  return DEFAULT_CUSTOM_MOVIES;
}

export function useCustomMovies() {
  const queryClient = useQueryClient();

  const customQuery = useQuery({
    queryKey: ["customMovies"],
    queryFn: loadCustomMovies,
  });

  const addMovie = (movie) => {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const updated = [...current, movie];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    queryClient.invalidateQueries(["customMovies"]);
  };

  return {
    movies: customQuery.data || [],
    isLoading: customQuery.isLoading,
    addMovie,
  };
}
