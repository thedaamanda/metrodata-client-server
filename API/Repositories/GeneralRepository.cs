using Microsoft.EntityFrameworkCore;
using API.Contexts;
using API.Repositories.Contracts;

namespace API.Repositories;

public class GeneralRepository<TKey, TEntity, TContext> : IGeneralRepository<TKey, TEntity>
    where TEntity : class
    where TContext : MyContext
{
    protected readonly TContext _context;

    public GeneralRepository(TContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TEntity>> GetAllAsync()
    {
        return await _context.Set<TEntity>().ToListAsync();
    }

    public async Task<TEntity?> GetByIdAsync(TKey? key)
    {
        return await _context.Set<TEntity>().FindAsync(key);
    }

    public virtual async Task<TEntity?> InsertAsync(TEntity entity)
    {
        _context.Set<TEntity>().Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(TEntity entity)
    {
        _context.Set<TEntity>().Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(TKey key)
    {
        var entity = await GetByIdAsync(key);
        _context.Set<TEntity>().Remove(entity!);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> IsDataExist(TKey key)
    {
        bool result = await GetByIdAsync(key) is not null;
        _context.ChangeTracker.Clear();
        return result;
    }
}
