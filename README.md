# AnythingAI Assignment – Scalable Backend + Frontend

This project is built as part of the **Backend Developer Intern Assignment**.  
The objective was to create a **secure, scalable REST API** with authentication, role-based access, CRUD operations, API documentation, and a minimal frontend to interact with the backend.

---

## 🚀 Tech Stack

### **Backend**
- Node.js + Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Joi Validation  
- Docker + Docker Compose  
- Swagger API Documentation  

### **Frontend**
- React (Vite)
- TypeScript
- shadcn/ui components
- Axios
- React Router

---

## 📌 Features

### ✅ **Authentication**
- User Registration  
- User Login  
- Password Hashing (bcrypt)  
- JWT Access Token (stored client-side)

### ✅ **Role-Based Access**
- `user` → Can manage only their tasks  
- `admin` → Can view/update/delete all tasks  

### ✅ **Task CRUD APIs**
- Create Task  
- List Tasks  
- Update Task  
- Delete Task  

### ✅ **Security**
- Input validation using Joi  
- Protected routes using JWT middleware  
- CORS handling  
- Sanitized API responses  

### ✅ **Frontend**
- Register User  
- Login User  
- Protected Dashboard  
- Create Task  
- View Tasks  
- Update Task  
- Delete Task  

---

## 🗂 Folder Structure


---

# 🐳 Running the Backend (Docker)

Make sure Docker Desktop is running.

### **Start backend + MongoDB**
cd backend
docker-compose up --build

yaml
Copy code

Backend runs at:  
➡ **http://localhost:5000**

MongoDB runs at:  
➡ **localhost:27017 (inside container: mongodb://mongo:27017/assign_db)**

### **Swagger Docs**
➡ **http://localhost:5000/api/v1/docs**

---

# ▶ Running Backend Without Docker (Local)

Environment variables required in `.env`:

PORT=5000
MONGO_URI=mongodb://localhost:27017/assign_db
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLIENT_ORIGIN=http://localhost:3000

yaml
Copy code

Install dependencies:

npm install
npm start

yaml
Copy code

---

# 💻 Running the Frontend

cd front-end
npm install
npm run dev

yaml
Copy code

Frontend runs at:  
➡ **http://localhost:5173**

---

# 📡 API Endpoints

### **Auth**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register user |
| POST | `/api/v1/auth/login` | Login user |

### **Tasks (Protected)**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/tasks` | Get tasks |
| POST | `/api/v1/tasks` | Create task |
| GET | `/api/v1/tasks/:id` | Get single task |
| PUT | `/api/v1/tasks/:id` | Update task |
| DELETE | `/api/v1/tasks/:id` | Delete task |

---

# 🔒 Authentication Flow

1. User logs in → receives **JWT accessToken**  
2. Frontend saves token in `localStorage`  
3. Each protected request sends:  
Authorization: Bearer <token>

yaml
Copy code
4. Backend verifies token in middleware  
5. Access granted  

---

# 📘 Deployment Options

### **Backend**
You can deploy using:
- Render.com  
- Railway.app  
- Docker container on any VPS  

### **Frontend**
Deploy to:
- Netlify  
- Vercel  
- GitHub Pages  

For assignment, you may provide:
✔ GitHub repository link  
✔ Optional deployed link  

Both are acceptable.

---

# 📈 Scalability Notes (Required for Assignment)

This architecture is designed to scale:

### **🔹 Horizontal Scalability**
- Backend can run multiple instances behind a load balancer  
- Stateless JWT authentication allows easy scaling  

### **🔹 Database Scalability**
- MongoDB supports sharding & replica sets  
- Mongoose schema can evolve without downtime  

### **🔹 Caching (Optional Enhancement)**
- Redis could store frequently accessed tasks  
- Or used for rate limiting  

### **🔹 Microservices Ready**
- Auth and Tasks can be separated into services  
- API gateway for routing  

### **🔹 Dockerized Environment**
- Same environment across machines  
- Easy CI/CD deployment  

---

# 🎯 Final Deliverables

✔ Backend hosted on GitHub  
✔ Frontend hosted on GitHub  
✔ README.md (this file)  
✔ Optional live demo (Netlify / Render)  
✔ Postman collection or Swagger docs  

---

# 📬 Contact

For any questions regarding the assignment, feel free to reach out.

---
rajputashish2001@gmail.com
