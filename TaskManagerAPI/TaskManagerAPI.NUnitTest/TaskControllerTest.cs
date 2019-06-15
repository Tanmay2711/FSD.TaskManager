using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TaskManagerAPI.Controllers;
using TaskManagerAPI.Models;

namespace Tests
{
    [TestFixture]
    public class TaskControllerTest
    {
        private TaskManagerContext context;
        private TasksController controller;

        [OneTimeSetUp]
        public async Task SetupAsync()
        {
            var options = new DbContextOptionsBuilder<TaskManagerContext>()
                       .UseInMemoryDatabase(databaseName: "InMemoryTaskManagerDatabase")
                       .Options;

            this.context = new TaskManagerContext(options);
            this.context.Tasks.AddRange(new Tasks[]
            {
                new Tasks
                {
                    Name = "Task 1",
                    TasksID = 1,
                    ParentID = 0,
                    EndDate = DateTime.Now.AddDays(7),
                    Priority = 1,
                    StartDate = DateTime.Now
                },
                new Tasks
                {
                    Name = "Task 2",
                    TasksID = 2,
                    ParentID = 1,
                    EndDate = DateTime.Now.AddDays(5),
                    Priority = 1,
                    StartDate = DateTime.Now
                },
                new Tasks
                {
                    Name = "Task 3",
                    TasksID = 3,
                    ParentID = 2,
                    EndDate = DateTime.Now,
                    Priority = 1,
                    StartDate = DateTime.Now.AddDays(-5)
                }
            });

            await this.context.SaveChangesAsync();

            //setup controller object;
            this.controller = new TasksController(this.context);
        }

        [Test]
        public async Task TestTasksGetTasksApi()
        {
            var lst = await context.Tasks.ToListAsync();
            var res = await this.controller.GetTasks();
            Assert.IsInstanceOf<ActionResult<IEnumerable<Tasks>>>(res,"Return type must be ActionResult");
            Assert.IsNotNull(res.Value, "Action result value must not be null");
            Assert.AreEqual(lst.Count, res.Value.Count(), "Tasks count should match with the count from Tasks table");
        }
    }
}