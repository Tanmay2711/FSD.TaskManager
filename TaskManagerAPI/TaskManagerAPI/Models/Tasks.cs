using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagerAPI.Models
{
    public class Tasks
    {
        public int TasksID { get; set; }
        public int ParentID { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int Priority { get; set; }
    }

 //   {
	//'ParentID':0,
	//'Name':'Task 1',
	//'StartDate':'06-30-2019',
	//'EndDate':'07-30-2019',
	//'Priority':10
 //   }
}
