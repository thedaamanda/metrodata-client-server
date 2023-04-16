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

    public async Task<int> InsertAsync(TEntity entity)
    {
        await _context.Set<TEntity>().AddAsync(entity);
        return await _context.SaveChangesAsync();
    }

    public async Task<int> UpdateAsync(TEntity entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        return await _context.SaveChangesAsync();
    }

    public async Task<int> DeleteAsync(TKey key)
    {
        var entity = await GetByIdAsync(key);
        if (entity == null)
        {
            return 0;
        }

        _context.Set<TEntity>().Remove(entity);
        return await _context.SaveChangesAsync();
    }
}
