using MySales.Areas.Admin.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MySales.Areas.Admin.Models.EntityBusiness
{
    public class ProductModel
    {
        public MySaleDbContext context;
        public ProductModel()
        {
            context = new MySaleDbContext();
        }
        public object LoadDataPagination(DataTablesParam param, out int totalCount)
        {
            List<Product> lstSource = new List<Product>();
            int pageNo = 1;
            if (param.iDisplayStart >= param.iDisplayLength)
            {
                pageNo = (param.iDisplayStart / param.iDisplayLength) + 1;
            }
            if (param.sSearch != null)
            {                
                lstSource = context.Products
                    .Where(o => o.Name.Contains(param.sSearch) || o.KeyWord.Contains(param.sSearch))
                    .OrderBy(x => x.Name)
                    .Skip((pageNo - 1) * param.iDisplayLength)
                    .Take(param.iDisplayLength).ToList();
                totalCount = lstSource.Count();
            }
            else
            {
                lstSource = context.Products
                    .OrderBy(x => x.Name)
                    .Skip((pageNo - 1) * param.iDisplayLength)
                    .Take(param.iDisplayLength).ToList();
                totalCount = lstSource.Count();

            }
            var indexDefault = (pageNo - 1) * param.iDisplayLength;
            var data = lstSource.AsEnumerable()
                 .Select((ob, index) => new
                 {                     
                     STT = indexDefault + index + 1,
                     KeyWord = ob.KeyWord,
                     Name = ob.Name,
                     Describe = ob.Describe,
                     Active = ob.Active
                 });
            return data;
        }

        public int InsertData(Product ob)
        {
            var data = context.Products.Add(ob);
            return context.SaveChanges();
        }
    }
}