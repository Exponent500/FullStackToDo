using FullStackToDo.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace FullStackToDo.Data
{
    public class TodoDataContext : DbContext
    {
        //sets up the entity framework connection to the Todo database
        public TodoDataContext(): base("Todo")
        {

        }

        //public IDbSet<Todo>Todoes { get; set; }

        // sets up a Todoes table that has all the columsn specified within the Todo class
        public System.Data.Entity.DbSet<FullStackToDo.Models.Todo> Todoes { get; set; }
    }
}