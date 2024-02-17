using System.Text.Json.Serialization;
using WebApis.Models;

namespace WebApis.JsonSerializers
{
    [JsonSerializable(typeof(Movies[]))]
    public partial class HomeSerializer : JsonSerializerContext
    {
    }
}
