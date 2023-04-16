namespace API.Repositories.Contracts;

public interface IGeneralRepository<TKey, TEntity>
    where TEntity : class
{
    Task<IEnumerable<TEntity>> GetAllAsync();
    Task<TEntity?> GetByIdAsync(TKey? key);
    Task<int> InsertAsync(TEntity entity);
    Task<int> UpdateAsync(TEntity entity);
    Task<int> DeleteAsync(TKey key);
}
