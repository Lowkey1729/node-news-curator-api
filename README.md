# **Node.js Express API Task**

### **Author:**

📌 **Olarewaju Mojeed**  
🔗 [GitHub Profile](https://github.com/Lowkey1729)

---

## **📌 Table of Contents**

- [Clone Repository](#clone-repository)
- [Install Dependencies](#install-dependencies)
- [Environment Setup](#environment-setup)
- [Run Code Locally](#run-code-locally)
- [Manage Migrations](#manage-migrations)
- [Run Linter](#run-linter)
- [Run Test Cases](#run-test-cases)

---

## **🔹 Clone Repository**

Clone the repository into your local environment:

```bash
git clone https://github.com/Lowkey1729/node-news-curator-api
cd node-news-curator-api
```

---

## **🔹 Install Dependencies**

Run the following command to install required dependencies:

```bash
npm install
```

---

## **🔹 Environment Setup**

### **1️⃣ Create `.env` File**

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Copy `.env.example` to `.env.test`:

```bash
cp .env.example .env.test
```

### **2️⃣ Update Environment Variables**

Ensure the following configurations are properly set:

- Database credentials (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
- Application port (`PORT`).

---

## **🔹 Manage Migrations**

Run migrations for the **local environment**:

```bash
npm run migrate:local
```

Run migrations for the **test environment**:

```bash
npm run migrate:testing
```

---

## **🔹 Run Code Locally**

Start the development server:

```bash
npm run dev
```

---

## **🔹 Run Linter**

Check code formatting and linting:

```bash
npm run lint
```

---

## **🔹 Run Test Cases**

Execute the test suite using Jest:

```bash
npm test
```

---

✅ **Now you’re all set!** 🚀
