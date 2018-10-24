using MySales.Areas.Admin.Models.EntityBusiness;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MySales.Areas.Admin.Controllers
{
    public class ProductController : Controller
    {
        ProductModel model = new ProductModel();
        // GET: Admin/Product
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult LoadData(DataTablesParam param)
        {
            int totalCount = 0;
            var data = model.LoadDataPagination(param, out totalCount);
            return Json(new
            {
                data = data,
                iTotalDisplayRecords = totalCount,
                iTotalRecords = totalCount
            }, JsonRequestBehavior.AllowGet);
        }
    }
}