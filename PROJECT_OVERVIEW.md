# Smart Financial Tracker — Project Overview

This document describes what the **smartFinancialTracker** project is, how it is structured, what it depends on, and what is implemented versus still in progress.

---

## 1. Purpose

**Smart Financial Tracker** is a **Spring Boot REST API** for personal finance:

- **User registration and login** with **JWT** bearer tokens.
- **Transactions** (income and expense) per user: add and list with optional filter by type.
- **Summaries** (planned): overall totals, date-based totals, monthly and category breakdowns.

The codebase targets **Java 17**, **Gradle**, **PostgreSQL**, and **Spring Boot 3.5.x** (snapshot).

---

## 2. Technology Stack

| Area | Choice |
|------|--------|
| Language | Java 17 |
| Build | Gradle (`build.gradle`, `settings.gradle`) |
| Framework | Spring Boot (web, data JPA, security) |
| Database | PostgreSQL (`runtimeOnly`) |
| ORM | Hibernate / JPA (`ddl-auto=update`) |
| Security | Spring Security, stateless sessions, **JWT** (jjwt 0.11.5) |
| Boilerplate | Lombok |

---

## 3. Prerequisites to Run

1. **JDK 17** installed and on `PATH`.
2. **PostgreSQL** running locally with:
   - Database name: **`smart_financial_tracker`** (see `application.properties`).
   - User/password as configured (defaults in repo: `postgres` / `postgres`).
3. From the project root:

   ```text
   .\gradlew.bat bootRun
   ```

   The app listens on **port 8081** (`server.port=8081`).

---

## 4. Configuration (`src/main/resources/application.properties`)

| Setting | Role |
|---------|------|
| `spring.datasource.*` | JDBC URL, username, password for PostgreSQL |
| `spring.jpa.hibernate.ddl-auto=update` | Schema created/updated from entities at startup |
| `spring.jpa.show-sql=true` | SQL logged to console (useful for dev) |
| `server.port=8081` | HTTP port |
| `debug=true` | Extra Spring Boot diagnostic logging |

**Security note:** Database credentials are plain text in the repo; for production, use environment variables or a secrets manager.

---

## 5. Package Layout

```text
com.finance.smartFinancialTracker
├── SmartFinancialTrackerApplication.java   # Entry point
├── config/          # Security (JWT filter chain, password encoder)
├── controller/      # REST endpoints (auth, transactions, summaries)
├── dto/             # Request/response records and classes
├── entity/          # JPA entities (User, Account, Transaction)
├── enums/           # TransactionType (INCOME, EXPENSE)
├── repository/      # Spring Data JPA repositories
├── security/        # JwtUtil, JwtAuthenticationFilter
├── service/         # Business logic
└── utility/         # Helpers (e.g. GetCurrentEmail)
```

---

## 6. Domain Model (What “Should” Exist)

### 6.1 `User`

- `id`, `fullName`, `email` (unique), `password` (hashed).
- One-to-many **`Account`** (list of accounts per user).

### 6.2 `Account`

- `id`, `balance`, many-to-one **`User`**.
- Represents a financial account; **not heavily used** in the current transaction flows (transactions tie to **User** directly).

### 6.3 `Transaction`

- `id`, `amount`, `type` (`INCOME` / `EXPENSE`), `category`, `description`, `transactionDate`.
- Many-to-one **`User`**.

### 6.4 DTOs prepared for future summaries

- **`TransactionSummaryResponse`** — total income, total expense, balance.
- **`CategorySummaryResponse`** — category + amount.
- **`MonthlySummaryResponse`** — year, month, income, expense, balance.

These align with a typical “dashboard” API; wiring may be incomplete (see section 9).

---

## 7. REST API (Intended Behavior)

Base URL: `http://localhost:8081`

### 7.1 Authentication (`/api/auth`)

| Method | Path | Body | Response |
|--------|------|------|------------|
| POST | `/api/auth/signUp` | `SignUpRequest` (fullName, email, password) | `SignUpResponse` (id, fullName, email) |
| POST | `/api/auth/login` | `LoginRequest` (email, password) | `LoginResponse` with **JWT** string |

**Login usage:** Send subsequent requests with header:

`Authorization: Bearer <token>`

### 7.2 Transactions (`/api/transactions`)

| Method | Path | Notes |
|--------|------|--------|
| POST | `/api/transactions/addTrans` | Body: `TransactionRequest` — amount, category, description, date, type |
| GET | `/api/transactions` | Optional `?type=INCOME` or `EXPENSE` |

`TransactionRequest` uses `java.time.LocalDate` for the transaction day; it is stored with time at start-of-day.

### 7.3 Summaries (`/api/transactions/summary`)

**Target design** (from controllers and services):

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/transactions/summary` | Overall totals for the logged-in user |
| GET | `/api/transactions/summary/overall?date=...` | Summary for a specific date |
| GET | `/api/transactions/summary/monthly` | Monthly aggregation (intended) |

See **section 9** for current implementation status.

---

## 8. Security Model

- **JWT** generated on login; validated in **`JwtAuthenticationFilter`** (reads `Authorization: Bearer ...`, sets `SecurityContext` with email as principal).
- **`SecurityConfig`** disables CSRF, uses **stateless** sessions, and registers the JWT filter before username/password authentication.
- **Important:** `SecurityConfig` currently allows **unauthenticated** access to `/api/auth/**` and `/api/transactions/**`. Services still read **`SecurityContextHolder`** for the current user email. Clients should send the JWT on protected operations so the filter can set the user; if no token is sent, behavior may not match “logged-in user” semantics.

---

## 9. Current Gaps and Work in Progress

The following match **incomplete or broken** code in the repository as of this overview:

1. **`TransactionSummaryController`** — The `/monthly` mapping is **unfinished** (missing method body / invalid class structure), so the project **may not compile** until this is fixed.
2. **`TransactionSummaryServiceImpl.getSummary(LocalDate date)`** — **Empty** implementation; must return a `TransactionSummaryResponse` (or throw) for the `/overall` endpoint to work correctly.
3. **`TransactionSummaryRepository`** — JPQL references like `t.userId` do not match the **`Transaction`** entity (which uses a **`user`** association). Queries should use paths such as **`t.user.id`**. The category-grouping query return type may also need to be a projection or `List<Object[]>` instead of `double`.
4. **DTOs** `CategorySummaryResponse` and `MonthlySummaryResponse` exist but **may not be exposed** by controllers yet.
5. **`Account`** entity is modeled but **not integrated** into transaction APIs in the current services.

Use this section as a **checklist** when continuing development.

---

## 10. Tests

- `src/test/java/.../SmartFinancialTrackerApplicationTests.java` — Spring Boot context load test.
- Broader API or security tests are minimal; expanding tests is recommended as features stabilize.

---

## 11. Related Files

| File | Notes |
|------|--------|
| `HELP.md` | Spring Boot template links (Gradle, web, security, JPA) |
| `.gitignore` | Standard ignores for Gradle/Java/IDE |
| `build/` | Generated on build; not source of truth |

---

## 12. Summary

**What is there:** A **JWT-backed** Spring Boot app with **signup/login**, **CRUD-style transaction add/list**, PostgreSQL persistence, and **summary-related** layers started (repository, DTOs, partial service/controller).

**What should be there for a “complete” tracker:** Finished **summary** endpoints (including monthly and by category), consistent **security rules** (which routes require JWT), validated **repository queries** aligned with entities, optional use of **Account** in business rules, and **tests** for critical paths.

This document lives at the project root as **`PROJECT_OVERVIEW.md`** and can be updated as the codebase evolves.
