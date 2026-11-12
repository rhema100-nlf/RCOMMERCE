# .NET Version Upgrade Plan

## Overview

**Target**: `StudentStarter/api/HPlusSport.API`, upgraded from `net6.0` to `net10.0`.
**Scope**: One small SDK-style ASP.NET Core API project with EF Core InMemory and Swagger dependencies.

## Upgrade Options

| Option | Selected | Why |
|--------|----------|-----|
| Target Framework | net10.0 | Matches the installed runtime and provides the current LTS target. |
| Upgrade Strategy | All-at-once | The project is independent and the change is contained. |
| Package Updates | Latest stable compatible versions | Aligns EF Core and Swagger dependencies with net10.0. |
| Test Coverage | Skip | No test project is present; runtime endpoint verification is required instead. |

### Selected Strategy
**All-At-Once** — All projects upgraded simultaneously in a single operation.
**Rationale**: One independent net6.0 ASP.NET Core project with a straightforward framework and package update.

## Tasks

### 01-api-net10-upgrade: Upgrade HPlusSport.API to net10.0

Update `StudentStarter/api/HPlusSport.API/HPlusSport.API.csproj` from `net6.0` to `net10.0` and align its EF Core and Swashbuckle package references with stable versions compatible with .NET 10. Preserve the existing in-memory database, CORS policy, Swagger setup, controller routes, client-facing JSON contract, and launch profile on port 5271. Investigate and fix any source compatibility issues caused by the framework or package updates without changing the existing RCOMMERCE project.

**Done when**: The API project targets `net10.0`; dependencies restore; the project builds with zero errors and zero warnings; existing API/configuration files retain their required behavior; and no files in the parent RCOMMERCE project are modified.

---

### 02-runtime-validation: Validate API build and local endpoint

Run the upgraded API using the `HPlusSport.API` launch profile and verify that `http://localhost:5271/api/products` responds successfully with the existing product payload shape. Report any warnings, runtime limitations, unavailable tests, or environment constraints.

**Done when**: A live API process starts on port 5271 and the products endpoint returns a successful HTTP response; the process is stopped after validation; and validation results are recorded.
