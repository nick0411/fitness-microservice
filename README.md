# 🏋️‍♂️ Fitness Microservices Platform

A production-style Spring Boot Microservices Architecture featuring
secure OAuth2 authentication (Keycloak), event-driven AI recommendations
(Google Gemini), and polyglot persistence with PostgreSQL and MongoDB.

------------------------------------------------------------------------

## 🚀 Project Overview

This system demonstrates a real-world distributed backend architecture
using modern Spring Cloud components. It is designed to simulate an
enterprise-grade fitness tracking platform where users can log
activities and receive AI-generated workout recommendations.

The project emphasizes:

-   Secure authentication using OAuth2 + PKCE
-   Centralized API Gateway security
-   Service discovery with Eureka
-   Event-driven communication using RabbitMQ
-   AI integration using Gemini API
-   Polyglot persistence (PostgreSQL + MongoDB)
-   Clean microservices separation

------------------------------------------------------------------------

# 🏗️ Architecture Overview

Frontend (React + Vite :5173) │ ▼ Keycloak (OAuth2 Server :8181) │ ▼ API
Gateway (:8080) -- JWT Validation │ ▼ Eureka Discovery (:8761) │
├───────────────┬────────────────┬──────────────── ▼ ▼ ▼ User Service
Activity Service AI Service (:8081) (:8082) (:8083) (PostgreSQL)
(MongoDB) (MongoDB) │ ▼ RabbitMQ (:5672) │ ▼ AI Service (Consumer) │ ▼
Gemini API

------------------------------------------------------------------------

# 🔐 Authentication -- Keycloak (OAuth2 + PKCE)

-   Realm: fitness-oauth2
-   Client: oauth2-pkce-client
-   Keycloak URL: http://localhost:8181
-   Redirect URI: http://localhost:5173

Flow: 1. User logs in via Keycloak. 2. Frontend receives access token.
3. Requests are sent to API Gateway. 4. Gateway validates JWT before
forwarding requests.

------------------------------------------------------------------------

# 📦 Microservices & Ports

  Service            Port    Responsibility
  ------------------ ------- ------------------------------
  Config Server      8888    Centralized configuration
  Eureka Server      8761    Service discovery
  API Gateway        8080    Routing + JWT validation
  User Service       8081    User management
  Activity Service   8082    Activity tracking
  AI Service         8083    AI recommendations
  Keycloak           8181    OAuth2 authentication
  RabbitMQ           5672    Event broker
  PostgreSQL         5432    User database
  MongoDB            27017   Activity & Recommendation DB
  Frontend           5173    React UI

------------------------------------------------------------------------

# 🐘 Databases

## PostgreSQL (User Service)

Database: fitness_user_db\
Port: 5432

## MongoDB

-   fitnessactivity (Activity Service)
-   fitnessrecommendation (AI Service)

Port: 27017

------------------------------------------------------------------------

# 🐇 Event-Driven AI Pipeline

1.  Activity Service saves activity in MongoDB.
2.  Activity Service publishes event to RabbitMQ.
3.  RabbitMQ delivers message to AI Service.
4.  AI Service processes activity data.
5.  AI Service calls Gemini API.
6.  Recommendation is generated and stored.
7.  User retrieves recommendation via API Gateway.

------------------------------------------------------------------------

# 🤖 Gemini Integration

AI Service integrates with Gemini using environment variables:

export GEMINI_API_URL=your_endpoint\
export GEMINI_API_KEY=your_api_key

The service sends structured prompts to Gemini and stores the generated
workout recommendations.

------------------------------------------------------------------------

# ⚙️ Config Server

-   Runs on port 8888
-   Uses native profile
-   Configuration stored under classpath:/config
-   Services import configuration using spring.config.import

------------------------------------------------------------------------

# 🔎 Eureka Dashboard

http://localhost:8761

All services automatically register with Eureka.

------------------------------------------------------------------------

# 🚀 How To Run

1.  Start infrastructure:
    -   PostgreSQL
    -   MongoDB
    -   RabbitMQ
    -   Keycloak
2.  Start services in order:
    -   Config Server
    -   Eureka Server
    -   User / Activity / AI Services
    -   API Gateway
    -   Frontend

------------------------------------------------------------------------

# 🧠 Technologies Used

-   Java 17
-   Spring Boot
-   Spring Cloud
-   Spring Security OAuth2 Resource Server
-   Keycloak
-   PostgreSQL
-   MongoDB
-   RabbitMQ
-   Google Gemini API
-   React + Vite
-   Maven

------------------------------------------------------------------------

# 🎯 Key Architecture Patterns

-   Microservices Architecture
-   API Gateway Pattern
-   Service Discovery Pattern
-   Event-Driven Architecture
-   OAuth2 + PKCE Authentication
-   Centralized Configuration
-   Polyglot Persistence
-   AI Integration

------------------------------------------------------------------------

# 📌 Why This Project Stands Out

✔ Real OAuth2 PKCE authentication\
✔ Gateway-level JWT security\
✔ Event-driven AI recommendation pipeline\
✔ External AI (LLM) integration\
✔ Clean service separation\
✔ Production-style architecture

This project is ideal for showcasing backend system design, distributed
systems knowledge, and modern cloud-native development practices.
