namespace API.ViewModels;

public class TokenVM
{
    public string? AccessToken { get; set; }
    public string? RefreshToken { get; set; }
    public string? TokenType { get; set; }
}
