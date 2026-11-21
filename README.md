# Fitness Microservices Platform

> Enterprise-style Spring Boot Microservices Architecture featuring OAuth2 Security, Event-Driven AI Recommendations, Polyglot Persistence, and full containerization via Docker & Docker Compose.

---

## Overview

This project is a production-style distributed system built using **Spring Boot**, **Spring Cloud**, and **React**, fully containerized for seamless deployment. It simulates a real-world fitness tracking platform where:

- Users authenticate securely using **OAuth2 (PKCE flow)** via Keycloak.
- Activities are logged and persisted in **MongoDB**.
- Events are published asynchronously via **RabbitMQ**.
- AI-powered workout recommendations are generated using the **Google Gemini API**.
- All microservices are dynamically discovered via **Eureka**, centrally configured via **Config Server** and routed through a secure **API Gateway**.

---

## System Architecture

<img width="1408" height="768" alt="Fitness_Microservice" src="https://github.com/user-attachments/assets/7efa3744-74a2-4341-90ef-5a827a4ab62b" />

---

## Services, Ports & Runtime Versions

| Service | Host Port | Container Port | Tech / Java Version | Responsibility |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend** | `5173` | `80` | React + Vite (Nginx) | User Interface |
| **API Gateway** | `8080` | `8080` | Java 23 / Spring Cloud | Routing & JWT Validation |
| **User Service** | `8081` | `8081` | Java 23 / Spring Boot | User Management (PostgreSQL) |
| **Activity Service** | `8082` | `8082` | Java 23 / Spring Boot | Activity Tracking (MongoDB) |
| **AI Service** | `8083` | `8083` | Java 23 / Spring Boot | AI Recommendations (MongoDB + Gemini) |
| **Eureka Server** | `8761` | `8761` | Java 17 / Spring Cloud | Service Discovery Registry |
| **Config Server** | `8888` | `8888` | Java 17 / Spring Cloud | Centralized Configuration |
| **Keycloak** | `8181` | `8080` | Keycloak 24.0.1 | OAuth2 Identity Provider |
| **RabbitMQ** | `5672` / `15672` | `5672` / `15672` | RabbitMQ 3 Alpine | Asynchronous Message Broker & UI |
| **PostgreSQL** | `5432` | `5432` | Postgres 15 Alpine | Relational User Database |
| **MongoDB** | `27017` | `27017` | Mongo 7.0 | Activity & Recommendation Document Store |

---

## Prerequisites

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) installed on your machine.
- A valid **Google Gemini API Key**.

---

## Environment Configuration

Before starting the containers, create a `.env` file in the root directory (alongside `docker-compose.yml`) and add your Gemini API credentials:

```env
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

> **Note:** Ensure `.env` is listed in your `.gitignore` so your API keys are never committed to version control.

---

## How to Run (Docker Compose)

The project uses a parameterized multi-stage `Dockerfile` and Docker Compose health checks (`service_healthy`) to automatically build and boot all 11 containers in the proper dependency order.

### 1. Build and Start the Entire Stack
Run the following command from the project root directory:
```bash
docker compose up --build -d
```

### 2. Monitor Container Status
Verify that Eureka, Config Server and all dependent microservices are healthy and running:
```bash
docker compose ps
```

### 3. Access Dashboards & UIs
- **Frontend Application:** [http://localhost:5173](http://localhost:5173)
- **Eureka Service Registry:** [http://localhost:8761](http://localhost:8761)
- **Keycloak Admin Console:** [http://localhost:8181](http://localhost:8181) *(Login: `admin` / `admin`)*
- **RabbitMQ Management UI:** [http://localhost:15672](http://localhost:15672) *(Login: `guest` / `guest`)*

### 4. Stop and Clean Up
To stop all running containers:
```bash
docker compose down
```
To stop containers and delete persistent database volumes (`postgres_data` and `mongo_data`):
```bash
docker compose down -v
```

---

## Authentication — OAuth2 + PKCE

Authentication is managed centrally by **Keycloak** and enforced at the **API Gateway**:

- **Realm:** `fitness-oauth2`
- **Client:** `oauth2-pkce-client`
- **Keycloak URL:** `http://localhost:8181`
- **Frontend Redirect URI:** `http://localhost:5173`

### Flow
1. User authenticates via Keycloak in the React frontend.
2. Frontend attaches the JWT access token to API requests.
3. API Gateway validates the JWT before routing traffic over the internal `fitness-net` Docker bridge network.

---

## Event-Driven AI Pipeline

1. **Activity Service** persists a new workout activity into MongoDB (`fitnessactivity`).
2. **Activity Service** publishes an activity event to **RabbitMQ**.
3. **AI Service** consumes the event asynchronously from the queue.
4. **AI Service** sends a structured prompt to the **Google Gemini API**.
5. Gemini returns personalized workout insights, which **AI Service** stores in MongoDB (`fitnessrecommendation`).
6. The client fetches recommendations seamlessly through the **API Gateway**.

---

## Technologies Used

- **Backend:** Java 17 & Java 23, Spring Boot, Spring Cloud (Gateway, Netflix Eureka, Config Server), Spring Security OAuth2 Resource Server
- **Frontend:** React, Vite
- **Security:** Keycloak (OAuth2 + PKCE)
- **Databases & Messaging:** PostgreSQL 15, MongoDB 7, RabbitMQ 3
- **AI Integration:** Google Gemini API
- **DevOps & Containerization:** Docker (Multi-stage builds), Docker Compose