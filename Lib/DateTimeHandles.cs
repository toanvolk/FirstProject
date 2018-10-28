using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lib
{
    public class DateTimeHandles
    {
        public string ToStringFormatDate(DateTime? dtStart, DateTime dtEnd)
        {            
            DateTime dtn = dtStart == null ? DateTime.Now : dtStart.Value;
            TimeSpan dur = dtEnd - dtn;
            DateTime dtformat = new DateTime(dur.Ticks);

            string f = "";
            if (dtformat.Year > 0) f += dtformat.Year + " năm ";
            if (dtformat.Month > 0) f += dtformat.Month + " tháng ";
            if (dtformat.Day > 0) f += dtformat.Day + " ngày";
            //return new DateTime(dur.Ticks).ToString("y năm MM tháng dd ngày HH giờ mm phút ss giây");
            //string s = new DateTime(dur.Ticks).ToString("y {0} MM {1} dd {2}");
            return f;
        }
        //private string Tó
    }
}
