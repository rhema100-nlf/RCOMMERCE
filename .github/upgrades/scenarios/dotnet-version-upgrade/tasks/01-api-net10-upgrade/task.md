# 01-api-net10-upgrade: Upgrade HPlusSport.API to net10.0

Update `StudentStarter/api/HPlusSport.API/HPlusSport.API.csproj` from `net6.0` to `net10.0` and align its EF Core and Swashbuckle package references with stable versions compatible with .NET 10. Preserve the existing in-memory database, CORS policy, Swagger setup, controller routes, client-facing JSON contract, and launch profile on port 5271. Investigate and fix any source compatibility issues caused by the framework or package updates without changing the existing RCOMMERCE project.

## Research Findings
- The scoped project is `StudentStarter/api/HPlusSport.API/HPlusSport.API.csproj`, an SDK-style ASP.NET Core web project with a singular `TargetFramework` currently set to `net6.0`.
- Direct package references are defined in the project file (no central package management or shared `Directory.Build.*` files were found): `Microsoft.EntityFrameworkCore` 6.0.1, `Microsoft.EntityFrameworkCore.InMemory` 6.0.1, and `Swashbuckle.AspNetCore` 6.2.3.
- Supported stable versions resolved for `net10.0` are EF Core packages 10.0.15 and Swashbuckle.AspNetCore 11.0.0.
- `Program.cs` uses `UseInMemoryDatabase("Shop")`, the `StudentClient` CORS policy, `AddSwaggerGen`, and controller mapping. `ProductsController` preserves the `api/products` route and CRUD contract.
- `Properties/launchSettings.json` already defines the dedicated HTTP URL `http://localhost:5271`; `client/app.js` already targets `http://localhost:5271/api/products`.
- No `// STUB:` markers or test project were found. The parent `RCOMMERCE.slnx` does not include this nested project, so automated solution assessment/dependency queries returned no project data; direct inspection is authoritative for this scope.
- The installed .NET SDK is compatible with `net10.0`; no `global.json` constrains SDK selection.

**Done when**: The API project targets `net10.0`; dependencies restore; the project builds with zero errors and zero warnings; existing API/configuration files retain their required behavior; and no files in the parent RCOMMERCE project are modified.
