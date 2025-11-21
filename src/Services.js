export async function getMoviesByCategory(category) {
    const url = `https://api.sampleapis.com/movies/${category}`;
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error("Error al cargar películas");
    }
  
    const data = await response.json();
  
    if (Array.isArray(data)) {
      return data;
    }
  
    return data.movies || data.results || [];
  }
  
