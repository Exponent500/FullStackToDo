using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FullStackToDo.Models
{
    // Todo table
    public class Todo
    {
        // Primary key
        public int ToDoID { get; set; }

        // additional columns
        public string Description { get; set; }
        public int Priority { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}