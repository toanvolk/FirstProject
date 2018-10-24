namespace MySales.Areas.Admin.Models.Entity
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class MySaleDbContext : DbContext
    {
        public MySaleDbContext()
            : base("name=MySaleDbContext")
        {
        }

        public virtual DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .Property(e => e.KeyWord)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.Img)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.CreateBy)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.UpdateBy)
                .IsUnicode(false);
        }
    }
}
