using CompanyService.Interfaces;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using ServicesUnitTests.Mocks;
using System.Web.Http.Results;
using WebAPI.Controllers;
using Xunit;

namespace ServicesUnitTests
{
    public class DepartmentControllerTests
    {
        private readonly Mock<IDepartmentService> _departmentService;
        public DepartmentControllerTests()
        {
            _departmentService = MockDepartmentService.GetDepartmentService();
        }

        [Fact]
        public async Task Get_Returns_Ok()
        {
            //Arange
            var controller = new DepartmentController(_departmentService.Object);

            //Act
            var result = controller.Get(2);
            var contentResult = result as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            Assert.Equal(200, contentResult.StatusCode);
        }

        [Fact]
        public async Task Get_Returns_ListOfDepartmentType()
        {
            //Arange
            var controller = new DepartmentController(_departmentService.Object);

            //Act
            var result = await controller.Get();

            //Assert
            Assert.IsType<List<Department>>(result);
        }

        [Fact]
        public async Task GetAll_ReturnsExactCount_OfDepartmentList()
        {
            //Arange
            var controller = new DepartmentController(_departmentService.Object);

            //Act
            var result = await controller.Get();

            //Assert
            Assert.Equal(2, result.Count());
        }
    }
}