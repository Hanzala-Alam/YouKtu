using System.Text.Json;
using WebApis.JsonSerializers;
using WebApis.Models;

namespace WebApis.Apis
{
    public class MoviesApi
    {
        string filePath = "C:\\Users\\HA-HanzalaAlam\\Desktop\\movies.json";
        public MoviesApi() { }

        public async Task<List<Movies>> MoviesList()
        {
            try
            {
                //var r = JsonSerializer.Serialize(l, MoviesSerializer.Default.ListMovies);
                var moviesList = new List<Movies>();
                using (var stream = new FileStream(filePath, FileMode.Open, FileAccess.ReadWrite))
                {
                    using var reader = new StreamReader(stream);
                    string read = await reader.ReadToEndAsync();
                    moviesList = JsonSerializer.Deserialize<List<Movies>>(read, MoviesSerializer.Default.ListMovies);
                }

                return moviesList;
            }
            catch (Exception ex) 
            {
                return new List<Movies>();
            }
        }
    }
}
