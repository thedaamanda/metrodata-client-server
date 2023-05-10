namespace Client.ViewModels;

public class ResponseVM<Entity>
{
    public string Code { get; set; }
    public string Message { get; set; }
    public Entity? Data { get; set; }
}
