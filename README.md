# 🏋️‍♂️ Fitness Microservices Platform

> Enterprise-style Spring Boot Microservices Architecture with OAuth2
> Security, Event-Driven AI Recommendations, and Polyglot Persistence.

------------------------------------------------------------------------

## ✨ Overview

This project is a production-style distributed backend system built
using Spring Boot and Spring Cloud.\
It simulates a real-world fitness tracking platform where:

-   Users authenticate securely using OAuth2 (PKCE flow).
-   Activities are logged and stored.
-   Events are published asynchronously via RabbitMQ.
-   AI-powered workout recommendations are generated using Gemini API.
-   All services are routed through a secure API Gateway.

The system demonstrates clean microservices separation, centralized
security, service discovery, and event-driven architecture.

------------------------------------------------------------------------

# 🏗️ System Architecture

                                       ┌─────────────────────────┐
                                       │        Keycloak         │
                                       │    OAuth2 Server        │
                                       │          :8181          │
                                       └─────────────▲───────────┘
                                                     │
                                                     │ JWT (PKCE)
                                                     │
    ┌──────────────────┐                   ┌────────┴─────────┐
    │  React Frontend  │──────────────────▶│   API Gateway    │
    │     (Vite)       │                   │       :8080      │
    │     :5173        │                   │  JWT Validation  │
    └──────────────────┘                   └────────┬─────────┘
                                                     │
                                                     ▼
                                             ┌──────────────┐
                                             │   Eureka     │
                                             │    :8761     │
                                             └──────┬───────┘
                                                    │
            ┌──────────────┬──────────────┬──────────────┐
            ▼              ▼              ▼              ▼
     ┌────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
     │ User Svc   │ │ Activity Svc │ │  AI Service  │ │ ConfigServer │
     │   :8081    │ │    :8082     │ │    :8083     │ │    :8888     │
     └────────────┘ └───────┬──────┘ └───────▲──────┘ └──────────────┘
            │                │                │
            ▼                │                │
       PostgreSQL            │                │
         :5432               │                │
                             │ Publish Event  │ Consume Event
                             ▼                │
                       ┌──────────────┐       │
                       │  RabbitMQ    │───────┘
                       │    :5672     │
                       └──────────────┘
                              │
                              ▼
                       ┌──────────────┐
                       │  AI Service  │
                       │  (Consumer)  │
                       └───────┬──────┘
                               │
                               ▼
                       ┌──────────────┐
                       │  Gemini API  │
                       └──────────────┘

------------------------------------------------------------------------

# 🔐 Authentication -- OAuth2 + PKCE

Authentication is handled by Keycloak.

### Configuration

-   Realm: `fitness-oauth2`
-   Client: `oauth2-pkce-client`
-   Keycloak URL: http://localhost:8181
-   Redirect URI: http://localhost:5173

### Authentication Flow

1.  User logs in via Keycloak.
2.  Frontend receives access token.
3.  Token is sent to API Gateway.
4.  Gateway validates JWT.
5.  Request forwarded to internal services.

Security is centralized at the Gateway level.

------------------------------------------------------------------------

## 📦 Services & Ports

| Service            | Port  | Responsibility                          |
|--------------------|-------|------------------------------------------|
| Config Server      | 8888  | Centralized configuration               |
| Eureka Server      | 8761  | Service discovery                       |
| API Gateway        | 8080  | Routing + JWT validation                |
| User Service       | 8081  | User management (PostgreSQL)            |
| Activity Service   | 8082  | Activity tracking (MongoDB)             |
| AI Service         | 8083  | AI recommendations (MongoDB)            |
| Keycloak           | 8181  | OAuth2 authentication                   |
| RabbitMQ           | 5672  | Event broker                            |
| PostgreSQL         | 5432  | User database                           |
| MongoDB            | 27017 | Activity & Recommendation database      |
| Frontend           | 5173  | React UI                                |

------------------------------------------------------------------------

# 🗄️ Databases

## PostgreSQL (User Service)

-   Database: `fitness_user_db`
-   Port: 5432

Used for structured relational user data.

## MongoDB

-   `fitnessactivity` → Activity Service
-   `fitnessrecommendation` → AI Service
-   Port: 27017

Used for flexible document-based storage.

------------------------------------------------------------------------

# 🐇 Event-Driven AI Pipeline

1.  Activity Service stores activity in MongoDB.
2.  Activity Service publishes event to RabbitMQ.
3.  RabbitMQ delivers message to AI Service.
4.  AI Service consumes the event.
5.  AI Service sends structured prompt to Gemini API.
6.  Gemini generates workout recommendation.
7.  AI Service stores recommendation in MongoDB.
8.  Client retrieves recommendation via API Gateway.

This ensures loose coupling and asynchronous processing.

------------------------------------------------------------------------

# 🤖 Gemini Integration

AI Service integrates with Gemini using environment variables:

    export GEMINI_API_URL=your_endpoint
    export GEMINI_API_KEY=your_api_key

Gemini generates personalized workout recommendations based on activity
data.

------------------------------------------------------------------------

# ⚙️ Config Server

-   Port: 8888
-   Profile: native
-   Configuration directory: classpath:/config
-   Services import config using:
    spring.config.import=optional:configserver:http://localhost:8888

------------------------------------------------------------------------

# 🔎 Eureka Dashboard

Access service registry:

http://localhost:8761

All microservices automatically register here.

------------------------------------------------------------------------

# 🚀 How To Run

### 1️⃣ Start Infrastructure

-   PostgreSQL
-   MongoDB
-   RabbitMQ
-   Keycloak

### 2️⃣ Start Services (Order Matters)

1.  Config Server
2.  Eureka Server
3.  User Service
4.  Activity Service
5.  AI Service
6.  API Gateway
7.  Frontend

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

# 🎯 Architectural Patterns

-   Microservices Architecture
-   API Gateway Pattern
-   Service Discovery Pattern
-   Event-Driven Architecture
-   OAuth2 + PKCE Authentication
-   Centralized Configuration
-   Polyglot Persistence
-   AI Integration Service

------------------------------------------------------------------------

# 📌 Why This Project Is Strong

✔ Secure OAuth2 PKCE authentication\
✔ Gateway-level JWT validation\
✔ Event-driven AI recommendation pipeline\
✔ External LLM integration\
✔ Clean separation of concerns\
✔ Production-style scalable design

This project demonstrates strong backend architecture skills suitable
for enterprise environments and system design interviews.
