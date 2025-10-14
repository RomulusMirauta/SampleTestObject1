<h1 align="center">
Sample Healthcare Platform
</h1>

A sample healthcare platform with user authentication, role-based access, and management of patients and drugs. Built with Node.js, Express, MS SQL Server, and a modern HTML/CSS/JS frontend.

<h2 align="left">
Table of Contents
</h2>

- [I. Purposes](#i-purposes)
- [II. Main Features](#ii-main-features)
  - [User Authentication](#user-authentication)
  - [Role-Based Dashboard](#role-based-dashboard)
  - [Patients Management](#patients-management)
  - [Drugs Management](#drugs-management)
  - [Navigation](#navigation)
  - [API Endpoints](#api-endpoints)
  - [UI/UX](#uiux)
  - [Security](#security)
- [III. Getting Started](#iii-getting-started)
- [IV. AI Info](#iv-ai-info)
- [V. Main Technologies Used](#v-main-technologies-used)
- [VI. SW Info](#vi-sw-info)
- [VII. Screenshots](#vii-screenshots)
  - [Login Page](#login-page)
  - [Dashboard](#dashboard)
  - [Patients Page](#patients-page)
  - [Drugs Page](#drugs-page)

## I. Purposes

This project demonstrates a sample healthcare platform with the following goals:

- Showcase a full-stack web application with user authentication and role-based access.
- Provide a clean, modern UI for managing patients and drugs.
- Serve as a template for similar CRUD-based business applications.
- Serve as Test Object for [SampleTestsPlaywright1](https://github.com/RomulusMirauta/SampleTestsPlaywright1).

## II. Main Features

### User Authentication

- Login form with username and password
- Role-based access (admin, patients, drugs)

### Role-Based Dashboard

- Dashboard shows only the tabs/buttons allowed for the logged-in user's role
- Username displayed in the top-right corner when logged in

### Patients Management

- View all patients (admin, patients roles)
- Add new patients (admin, patients roles)
- Remove patients (admin, patients roles)
- Patients displayed in modern, styled cards

### Drugs Management

- View all drugs (admin, drugs roles)
- Add new drugs (admin, drugs roles)
- Remove drugs (admin, drugs roles)
- Drugs displayed in modern, styled cards

### Navigation

- Back button on Patients and Drugs pages to return to dashboard
- Logout button clears session and returns to login

### API Endpoints

- `POST /api/login` — Authenticate user
- `GET /api/patients` — List patients (admin, user_patients)
- `POST /api/patients` — Add patient (admin, user_patients)
- `PUT /api/patients/:id` — Update patient (admin, user_patients)
- `DELETE /api/patients/:id` — Remove patient (admin, user_patients)
- `GET /api/drugs` — List drugs (users: admin, user_drugs)
- `POST /api/drugs` — Add drug (admin, user_drugs)
- `PUT /api/drugs/:id` — Update drug (admin, user_drugs)
- `DELETE /api/drugs/:id` — Remove drug (admin, user_drugs)

### UI/UX

- Responsive, modern design with CSS
- Clean, user-friendly forms and lists
- Dashboard and navigation adapt to user role
- Quick-fill 'Today' button for patient DOB

### Security

- Backend enforces role-based access for all sensitive endpoints

## III. Getting Started

Start the backend server from the `backend` directory with:

```
node index.js
```

The platform will then be available at:

[http://localhost:3001/](http://localhost:3001/)

## IV. AI Info

- This project was scaffolded and iteratively developed with the help of GitHub Copilot (model GPT-4.1) and AI-powered code suggestions.
- AI was used for code generation, UI/UX suggestions and troubleshooting.

## V. Main Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** Microsoft SQL Server
- **Frontend:** HTML, CSS, JavaScript
- **Other:** Body-parser, CORS, mssql (Node.js SQL Server client)

## VI. SW Info

- Platform runs locally on Windows (tested with PowerShell and Node.js)
- Database: MS SQL Server, SQL Server 2022 Configuration Manager, SQL Server Management Studio 21, Azure Data Studio
- Code editor: Visual Studio Code
- Browsers: Google Chrome (chromium), Mozilla Firefox, Safari (webkit)

## VII. Screenshots

### Login Page

![Login Page](screenshots/login.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Patients Page

![Patients Page](screenshots/patients.png)

### Drugs Page

![Drugs Page](screenshots/drugs.png)

---
