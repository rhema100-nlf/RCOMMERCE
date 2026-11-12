# 02-runtime-validation: Validate API build and local endpoint

Run the upgraded API using the `HPlusSport.API` launch profile and verify that `http://localhost:5271/api/products` responds successfully with the existing `product` payload shape. Report any warnings, runtime limitations, unavailable tests, or environment constraints.

## Research Findings
- `Properties/launchSettings.json` defines the `HPlusSport.API` profile with `applicationUrl` set to `http://localhost:5271`.
- `ProductsController` maps GET `/api/products` and returns the EF Core InMemory `Products` collection as JSON.
- The project builds to `bin/Debug/net10.0/HPlusSport.API.dll` with zero warnings and zero errors after restore.
- No automated test project exists in the StudentStarter repository, so live HTTP verification is the applicable runtime test.

**Done when**: A live API process starts on port 5271 and the products endpoint returns a successful HTTP response; the process is stopped after validation; and validation results are recorded.
