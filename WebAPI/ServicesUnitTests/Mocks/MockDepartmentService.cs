using CompanyService.Interfaces;
using DataAccess.Models;
using Moq;

namespace ServicesUnitTests.Mocks
{
    public static class MockDepartmentService
    {
        public static Mock<IDepartmentService> GetDepartmentService()
        {
            var departments = new List<Department>
            {
                new Department()
                {
                    DepartmentId = 1,
                    DepartmentName = "Sales"
                },
                new Department()
                {
                    DepartmentId = 2,
                    DepartmentName = "HR"
                },
            };

            var mockService = new Mock<IDepartmentService>();

            mockService.Setup(x => x.GetAllDepartments()).ReturnsAsync(departments);
            mockService.Setup(x => x.GetDepartment(2)).ReturnsAsync(departments[1]);
            mockService.Setup(x => x.AddDepartment(It.IsAny<Department>()));

            return mockService;
        }
    }
}