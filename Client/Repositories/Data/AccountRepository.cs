using Client.Models;
using Client.Repositories.Contracts;
using Client.ViewModels;
using Newtonsoft.Json;
using System.Text;

namespace Client.Repositories.Data;

public class AccountRepository : GeneralRepository<Account,string>, IAccountRepository
{
    private readonly HttpClient httpClient;
    private readonly string request;

    public AccountRepository(string request = "Accounts/") : base(request)
    {
        httpClient = new HttpClient
        {
            BaseAddress = new Uri("https://localhost:7169/api/")
        };
        this.request = request;
    }

    public async Task<ResponseVM<string>> Login(LoginVM entity)
    {
        ResponseVM<string> entityVM = null;
        StringContent content = new StringContent(JsonConvert.SerializeObject(entity), Encoding.UTF8, "application/json");
        using (var response = httpClient.PostAsync(request + "Login", content).Result)
        {
            string apiResponse = await response.Content.ReadAsStringAsync();
            entityVM = JsonConvert.DeserializeObject<ResponseVM<string>>(apiResponse);
        }
        return entityVM;
    }
}
