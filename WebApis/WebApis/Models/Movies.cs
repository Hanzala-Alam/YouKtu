using System.Text.Json.Serialization;

namespace WebApis.Models
{
    public class Movies
    {
        public int Id { get; set; }
        public string? Name {  get; set; }
        public string? Title {  get; set; }
        public string? PostedDate {  get; set; }
        public string? ReleaseDate {  get; set; }
        public int Downloaded { get; set; }
        public int Watched { get; set; }
        public string? MoviePath { get; set; }
        public string? PosterPath { get; set; }
    }
}
