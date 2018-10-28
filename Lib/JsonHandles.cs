using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace Lib
{
    public class JsonHandles
    {
        public JsonHandles()
        {

        }
        public IDictionary<string, object> Deserialize(string linkJson)
        {
            try
            {
                IDictionary<string, object> obj = new Dictionary<string, object>();
                WebClient myWebClient = new WebClient();
                string getValueJson = Encoding.UTF8.GetString(myWebClient.DownloadData(linkJson));
                return (IDictionary < string, object> )new JavaScriptSerializer().Deserialize(getValueJson, typeof(IDictionary<string, object>));
            }
            catch (Exception)
            {
                return null;
            }

        }
    }
    public class JsonHandles<T> where T : class, new()
    {
        public JsonHandles()
        {

        }
        public T Deserialize(string linkJson)
        {
            try
            {
                WebClient myWebClient = new WebClient();
                string getValueJson = Encoding.UTF8.GetString(myWebClient.DownloadData(linkJson));
                return new JavaScriptSerializer().Deserialize<T>(getValueJson);
            }
            catch (Exception)
            {
                return null;
            }
           
        }
        public T DeserializeToObject(string strData)
        {
            try
            {                
                return new JavaScriptSerializer().Deserialize<T>(strData);
            }
            catch (Exception)
            {
                return null;
            }

        }
    }
}
