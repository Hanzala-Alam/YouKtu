using System.Text.Json.Serialization;
using WebApis.Models;

namespace WebApis.JsonSerializers
{
    [JsonSourceGenerationOptions(GenerationMode = JsonSourceGenerationMode.Default)]
    [JsonSerializable(typeof(List<Movies>))]
    public partial class MoviesSerializer : JsonSerializerContext
    {
    }
}
