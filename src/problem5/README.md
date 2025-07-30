# Problem 5: A Crude Server

A RESTful API server built with Express.js, TypeScript, TypeORM, and PostgreSQL with comprehensive Swagger documentation.

## Project Structure

```
src/problem5/
├── src/                          # Source code directory
│   ├── index.ts                  # Application entry point
│   ├── swagger.ts                # Swagger/OpenAPI configuration
│   │
│   ├── configs/                  # Configuration files
│   │   ├── configs.ts            # Main application configuration
│   │   ├── dbConfigs.ts          # Database configuration
│   │   └── metadata.ts           # Server metadata configuration
│   │
│   ├── controllers/              # Request handlers (business logic)
│   │   ├── about.ts              # About endpoint controller
│   │   ├── healthcheck.ts        # Health check controller
│   │   └── resource.ts           # Resource CRUD operations
│   │
│   ├── routes/                   # Express route definitions
│   │   ├── general.ts            # General routes (health, about)
│   │   └── resource.ts           # Resource CRUD routes with Swagger docs
│   │
│   ├── entities/                 # TypeORM entity definitions
│   │   └── resource.ts           # Resource entity with database schema
│   │
│   ├── validators/               # Request validation middleware
│   │   └── resource.ts           # Resource validation schemas
│   │
│   ├── enums/                    # TypeScript enums
│   │   └── status.ts             # Resource status enum
│   │
│   └── db/                       # Database configuration
│       └── datasource.ts         # TypeORM data source configuration
│
├── docker-compose.yaml           # Docker compose for development
├── package.json                  # Node.js dependencies and scripts
├── package-lock.json             # Dependency lock file
├── tsconfig.json                 # TypeScript configuration
├── env.env                       # Environment variables
└── README.md                     # This file
```

### Key Components

#### Application Entry Point
- **`src/index.ts`**: Main application file that sets up Express server, middleware, routes, and database connection

### Database Layer
- **`src/entities/resource.ts`**: TypeORM entity defining the Resource table structure
- **`src/db/datasource.ts`**: TypeORM data source configuration for PostgreSQL
- **`src/enums/status.ts`**: Enum defining resource statuses (Active, Deleted, Disabled)

### API Routes
- **`src/routes/general.router.ts`**: Health check and about endpoints
- **`src/routes/resource.router.ts`**: Complete CRUD operations for resources with detailed Swagger documentation

### Controllers
- **`src/controllers/about.controller.ts`**: Returns server metadata
- **`src/controllers/healthcheck.controller.ts`**: Health check endpoint
- **`src/controllers/resource.controller.ts`**: Handles all resource operations (CRUD)

### Validation
- **`src/validators/resource.validator.ts`**: Request validation using express-validator

### Configuration
- **`src/configs/configs.ts`**: Main application settings
- **`src/configs/dbConfigs.ts`**: Database connection settings
- **`src/configs/metadata.ts`**: Server metadata configuration

### Documentation
- **`src/swagger.ts`**: Swagger/OpenAPI 3.0 configuration
- Comprehensive JSDoc comments in route files for auto-generated API documentation

## API Endpoints

### General Endpoints
- `GET /health` - Health check
- `GET /about` - Server metadata

### Resource Endpoints
- `GET /resource/{id}` - Get resource by ID
- `POST /resource` - Create new resource
- `PUT /resource/{id}` - Update resource
- `DELETE /resource/{id}` - Delete resource
- `GET /resources` - List resources with pagination and filtering

## Technology Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with TypeORM
- **Validation**: express-validator
- **Documentation**: Swagger/OpenAPI 3.0
- **Containerization**: Docker Compose
- **Environment**: dotenv for configuration

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables in `env.env`
3. Start PostgreSQL: `docker-compose up -d`
4. Run the application: `npx ts-node ./src/index.ts`
5. Access API documentation: `http://localhost:3000/docs`

If you want to build the project, run these steps

1. Perform steps from 1 to 3 above
2. Build the project: `npm run build`
3. Run the project: `npm run start`
4. Access API documentation: `http://localhost:3000/docs`