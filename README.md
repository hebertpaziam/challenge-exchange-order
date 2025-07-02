
# 💱 Challenge Exchange Order

**A technical challenge app for managing foreign currency orders, built with Angular.**

[![License](https://img.shields.io/github/license/hebertpaziam/challenge-exchange-order?logo=open-source-initiative&logoColor=white)](https://github.com/hebertpaziam/challenge-exchange-order/blob/main/LICENSE)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen?logo=git&logoColor=white)](http://commitizen.github.io/cz-cli/)
![Last commit](https://img.shields.io/github/last-commit/hebertpaziam/challenge-exchange-order?logo=git&logoColor=white)
[![Angular](https://img.shields.io/badge/made%20with-Angular-DD0031?logo=angular&logoColor=white)](https://v20.angular.dev/)

![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen?logo=dependabot&logoColor=white)
[![Code Size](https://img.shields.io/github/languages/code-size/hebertpaziam/challenge-exchange-order?label=Code%20Size&logo=github&logoColor=white)](https://github.com/hebertpaziam/challenge-exchange-order)
[![ESLint](https://github.com/hebertpaziam/challenge-exchange-order/actions/workflows/eslint.yml/badge.svg)](https://github.com/hebertpaziam/challenge-exchange-order/actions/workflows/eslint.yml)
[![CodeQL](https://github.com/hebertpaziam/challenge-exchange-order/actions/workflows/codeql.yml/badge.svg)](https://github.com/hebertpaziam/challenge-exchange-order/actions/workflows/codeql.yml)
[![Test](https://github.com/hebertpaziam/challenge-exchange-order/actions/workflows/test.yml/badge.svg)](https://github.com/hebertpaziam/challenge-exchange-order/actions/workflows/test.yml)
[![Coverage Status](https://img.shields.io/coveralls/github/hebertpaziam/challenge-exchange-order/main?logo=coveralls&logoColor=white)](https://coveralls.io/github/hebertpaziam/challenge-exchange-order?branch=main)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 24
- Npm 11
- Angular CLI 20

### Installation

```bash
git clone https://github.com/your-username/foreign-currency-order-app.git

cd foreign-currency-order-app

npm install
```

### Running the App

```bash
npm start
```

The application will be available at `http://localhost:4200`.

---

## 🧾 Project Overview

This application allows a user to:

1. Start a new currency exchange order.
2. Choose quantities of various denominations for different currencies.
3. Enter personal information.
4. Review the order.
5. Finalize the process.

### Functional Requirements

#### RF1 – Home Screen
![image](https://github.com/user-attachments/assets/0132ec1a-35f9-4ed5-82d5-77f8fcc78130)

- Displays the title **"Casa de câmbio"**
- Contains an image (retrieved from the internet)
- Has a button **"Iniciar Pedido"** which navigates to the order creation/editing screen

#### RF2 – Order Creation/Editing
![image](https://github.com/user-attachments/assets/9bddb678-ec4a-40ab-a95d-3826dbf0cf2c)

- Allows users to toggle between different currencies and update the number of notes per denomination
- Total value updates dynamically after quantity changes
- Order must have a minimum value of **R$ 100,00**
- Requires user data: **Name, CPF, Email, Phone Number**
- Currency and denomination data fetched from:
  - **URL**: `https://qugkx0grkb.execute-api.sa-east-1.amazonaws.com/api/moedas`
  - **Method**: `GET`
  - **Header**: `x-api-key: cmobRsEsmKaH8OoGLjRPg3zPGtlpqZvdR4Vsf3j5`

#### RF3 – Order Review
![image](https://github.com/user-attachments/assets/955810ef-8f36-4ab4-8c8d-4eb553cd67a9)

- Displays a single read-only table grouped by currency and denomination
  - Only shows denominations with quantity ≥ 1
- Shows entered personal information
- Includes:
  - **Voltar** button to return to the order screen (preserves data)
  - **Finalizar Pedido** button to show a success message and redirect to the home screen

---

### 🛠 Technical Requirements

- **Angular 20**
- Uses a UI component library (e.g., Angular Material)
- API calls include `x-api-key` header
- HTTP loading indicators
- Error handling and API resilience (due to potential instability)
- Unit tests implemented

---

### 📦 Features

- Reactive forms for robust form management
- Modular architecture with reusable components
- Responsive layout
- API integration with proper error handling and UX feedback
- Unit tested with Jasmine and Karma (or Jest, if configured)

---

### 🌐 Deployment

> ⚠️ Deployment is optional, but hosting the app (e.g., AWS S3, Azure, Heroku) is a bonus.

---

### 📎 Notes

- The UI does not need to strictly follow any wireframes; improvements are allowed as long as the core flow and features are preserved.
- The project was built with clean code principles, aiming for readability, scalability, and performance.
