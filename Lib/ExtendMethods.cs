using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lib
{
    public static class ExtendMethods
    {
        public static object ValueOrDbNull(this DateTime? value)
        {
            if (value == null)
                return DBNull.Value;
            else
                return value;
        }
        public static object ValueOrDbNull(this bool? value)
        {
            if (value == null)
                return false;
            else
                return value;
        }
        public static object ValueOrDbNull(this int? value)
        {
            if (value == null)
                return DBNull.Value;
            else
                return value;
        }
        public static object ValueOrDbNull(this string value)
        {
            if (value == null)
                return "";
            else
                return value;
        }

        public static string DateTimeToSqlFormat(this DateTime value)
        {
            return value.ToString("yyyy-MM-dd HH:mm:ss.fff");
        }
    }
}
