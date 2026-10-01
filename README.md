# 💼 Job Portal — Full-Stack MERN Application

<div align="center">

<img src="https://raw.githubusercontent.com/duttasirius/jobportal/jobportal-development/frontend/src/assets/hero.png" alt="Job Portal" width="760"/>

### 🚀 Search. Apply. Hire.

A modern full-stack job portal built with the MERN stack, designed to connect job seekers with recruiters through a clean, responsive and interactive experience.

<p>
  <a href="https://github.com/duttasirius/jobportal/tree/jobportal-development"><img src="https://img.shields.io/badge/Branch-jobportal--development-7c3aed?style=for-the-badge&logo=git&logoColor=white" alt="Branch"/></a>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
</p>

<p>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Redux_Toolkit-State-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit"/>
  <img src="https://img.shields.io/badge/Framer_Motion-Animations-EF008F?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion"/>
  <img src="https://img.shields.io/badge/shadcn%2Fui-Components-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui"/>
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Axios-API_Client-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
</p>

</div>

---

## ✨ About The Project

**Job Portal** is a full-stack recruitment platform where users can discover jobs, search and filter opportunities, maintain profiles, apply for positions, and track applications.

Recruiters get their own management workflow to create companies, publish jobs, edit listings, search posted jobs, view applicants, and update application status.

The project focuses on real-world full-stack development patterns: REST APIs, MongoDB relationships, authentication, protected routes, Redux state management, file uploads, responsive UI, and recruiter/job-seeker workflows.

---

## 🎯 Core Features

### 👨‍💼 For Job Seekers

- 🔎 Search jobs by keywords
- 🧰 Filter jobs by relevant criteria
- 📄 View complete job details
- ⚡ Apply to jobs from the job details page
- ✅ Detect whether a user has already applied
- 👤 Create and update profile information
- 📎 Upload and manage resume/profile information
- 📋 View applied jobs
- 🔐 Secure authentication with protected access

### 🏢 For Recruiters

- 🏗️ Create and manage companies
- ➕ Add new job listings
- ✏️ Edit existing job posts
- 🗂️ View all recruiter-owned jobs
- 🔍 Search posted jobs
- 👥 View applicants for individual jobs
- 📄 Open applicant resumes
- ✅ Accept applications
- ❌ Reject applications

### 🎨 UI / UX

- 📱 Responsive layout
- ✨ Framer Motion interactions
- 🧩 Reusable shadcn/ui components
- 🎯 Modern card-based job browsing
- 🔔 Toast notifications
- 🧭 Client-side routing with React Router
- 🌈 Tailwind CSS utility-first styling

---

## 🖼️ Project Preview

<div align="center">

<img src="https://raw.githubusercontent.com/duttasirius/jobportal/jobportal-development/frontend/src/assets/hero.png" alt="Job Portal Hero Preview" width="820"/>

</div>

> The repository currently contains a project hero asset that is used above. Additional real application screenshots can be added to the `frontend/src/assets` folder and linked here later.

---

## 🧰 Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| ⚛️ React 19 | Component-based UI |
| ⚡ Vite 8 | Frontend tooling and development server |
| 🎨 Tailwind CSS 4 | Styling and responsive layouts |
| 🔄 Redux Toolkit | Global application state |
| 🛣️ React Router DOM | Client-side navigation |
| ✨ Framer Motion | UI animations and transitions |
| 🧩 shadcn/ui | Reusable interface components |
| 🔗 Axios | HTTP requests |
| 🔥 React Hot Toast | User feedback notifications |
| 🎯 Lucide / React Icons | Interface icons |
| 📅 date-fns | Date formatting and relative time |

### Backend

| Technology | Purpose |
|---|---|
| 🟢 Node.js | JavaScript runtime |
| 🚂 Express 5 | REST API framework |
| 🍃 MongoDB | NoSQL database |
| 🧬 Mongoose | MongoDB ODM |
| 🔐 JWT | Authentication tokens |
| 🔒 bcryptjs | Password hashing |
| 🍪 Cookie Parser | Cookie handling |
| 🖼️ Multer | File upload handling |
| ☁️ Cloudinary | Media/file storage integration |
| 🌐 CORS | Cross-origin request configuration |
| ⚙️ dotenv | Environment configuration |

### Architecture

**Frontend → REST API → Express Controllers → Mongoose Models → MongoDB**

The application separates the client and server into dedicated `frontend/` and `backend/` workspaces, with Redux handling client-side state and Express routes exposing the server-side API.

---

## 🏗️ Project Structure

```text
jobportal/
├── backend/
│   ├── controllers/
│   │   ├── applicationController.js
│   │   ├── companyController.js
│   │   ├── jobController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── isAuthenticated.js
│   │   └── multer.js
│   ├── models/
│   │   ├── appliCationModel.js
│   │   ├── companyModel.js
│   │   ├── jobModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── applicationRoutes.js
│   │   ├── companyRoutes.js
│   │   ├── jobRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   ├── cloudinary.js
│   │   ├── dataUri.js
│   │   └── db.js
│   └── index.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── adminPage/
│       │   ├── auth/
│       │   ├── hooks/
│       │   ├── redux/
│       │   └── ui/
│       ├── lib/
│       ├── utils/
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
│
├── .gitignore
└── package.json
```

---

## 🔌 API Overview

The backend exposes versioned REST endpoints:

| Route | Responsibility |
|---|---|
| `/api/v1/user` | User and profile operations |
| `/api/v1/company` | Company creation and management |
| `/api/v1/job` | Job creation, retrieval, update and management |
| `/api/v1/application` | Job applications and application status |

### Typical workflow

```text
Job Seeker
   │
   ├── Sign Up / Login
   ├── Browse Jobs
   ├── Search / Filter
   ├── Open Job
   └── Apply
          │
          ▼
     Application
          │
          ▼
      Recruiter
          │
          ├── View Applicants
          ├── Open Resume
          └── Accept / Reject
```

---

## 🔐 Authentication & Access

The application includes authenticated workflows for both regular users and recruiters.

- Cookie-based authentication support
- JWT token handling
- Password hashing with bcryptjs
- Protected recruiter routes
- Authenticated API requests using credentials
- Role-aware frontend navigation

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/duttasirius/jobportal.git
cd jobportal
git checkout jobportal-development
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment variables

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Add any additional variables required by your local configuration.

### 4. Start the backend

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:8000
```

### 5. Install frontend dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

### 6. Start the frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 📜 Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Backend

```bash
npm run dev
```

---

## 💡 What This Project Demonstrates

This project is built around practical full-stack development concepts:

- REST API design
- MVC-style backend organization
- MongoDB data modeling and references
- Authentication and authorization
- Redux state management
- Protected frontend routes
- Search and filtering logic
- File upload workflows
- Recruiter/admin dashboards
- Applicant management
- Responsive UI development
- API integration with Axios
- Component-based React architecture
- Modern frontend animations

---

## 🔒 Security Notes

Never commit secrets to GitHub.

The repository ignores environment files such as:

```text
.env
.env.*
```

Keep production credentials, database URLs, JWT secrets and Cloudinary credentials in environment variables.

---

## 📌 Development Branch

The main project code is maintained on:

**`jobportal-development`**

🔗 [Open the development branch](https://github.com/duttasirius/jobportal/tree/jobportal-development)

---

## 👨‍💻 Author

**Sagnik Dutta**

🌐 Portfolio: [sagnik-swart.vercel.app](https://sagnik-swart.vercel.app/)  
💼 LinkedIn: [linkedin.com/in/sagnikkdev](https://www.linkedin.com/in/sagnikkdev/)  
🐙 GitHub: [github.com/duttasirius](https://github.com/duttasirius)

---

## ⭐ Support

If this project helped you understand full-stack recruitment applications, feel free to ⭐ the repository and explore the code.

<div align="center">

### Built with ❤️ using the MERN stack

**Search • Apply • Hire • Manage**

</div>
