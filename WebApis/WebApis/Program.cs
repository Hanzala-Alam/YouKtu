using WebApis.Apis;
using WebApis.JsonSerializers;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Add(MoviesSerializer.Default);
});

builder.Services.AddCors(cors => cors.AddPolicy("MyCors", bul =>
{
    bul.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

var moviesList = await new MoviesApi().MoviesList();

var movies = app.MapGroup("/movies");
movies.MapGet("/", () => moviesList);
movies.MapGet("/{id}", (int id) => moviesList.FirstOrDefault(x => x.Id == id) is { } movie ? Results.Ok(movie) : Results.NotFound());

app.UseCors("MyCors");
app.Run();