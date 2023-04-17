namespace API.Repositories.Contracts;

public interface IGeneralRepository<TKey, TEntity>
    where TEntity : class
{
    Task<IEnumerable<TEntity>> GetAllAsync();
    Task<TEntity?> GetByIdAsync(TKey? key);
    Task InsertAsync(TEntity entity);
    Task UpdateAsync(TEntity entity);
    Task DeleteAsync(TKey key);
    Task<bool> IsDataExist(TKey key);
}
