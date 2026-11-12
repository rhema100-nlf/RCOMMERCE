# .NET Version Upgrade

## Strategy
**Selected**: All-at-once
**Rationale**: Single independent ASP.NET Core API project with a contained framework/package upgrade.

### Execution Constraints
- Upgrade the StudentStarter API project as one atomic change.
- Preserve the in-memory EF Core database, CORS policy, Swagger setup, routes, and client contract.
- Preserve the dedicated local HTTP port 5271.
- Validate with a warning-free build and a live HTTP request to `/api/products`.

## Preferences
- **Flow Mode**: Automatic
- **Target Framework**: net10.0
- **Commit Strategy**: Manual
- **Scope**: StudentStarter only; do not modify the existing RCOMMERCE project
- **Runtime Contract**: Preserve in-memory database, CORS, Swagger, routes, client contract, and port 5271
- **Package Updates**: Latest stable compatible versions
- **Test Coverage**: Skip; no test project is present

## Upgrade Options
- **Target Framework**: net10.0
- **Upgrade Strategy**: all-at-once
- **Package Updates**: latest stable compatible versions (EF Core 10.0.15; Swashbuckle.AspNetCore 11.0.0)
- **Test Coverage**: skip

## Source Control
- **Source Branch**: main
- **Working Branch**: main
- **Commit Strategy**: Manual
- **Branch Sync**: Disabled
