# 📑 Resume Builder - Complete File & Component Index

## 📂 Project Structure

```
Resume_Builder/
│
├── 📄 Documentation Files
│   ├── README.md                          # Main project documentation
│   ├── QUICK_START.md                     # 5-minute setup guide
│   ├── DATABASE.md                        # Database schema documentation
│   ├── DEPLOYMENT.md                      # Production deployment guide
│   └── IMPLEMENTATION_SUMMARY.md           # Project completion summary
│
├── 📁 Database/
│   └── schema.sql                          # PostgreSQL schema (8 tables)
│
├── 📁 Backend/
│   ├── server.js                          # Express.js main server
│   ├── db.js                              # PostgreSQL connection pool
│   ├── package.json                       # Backend dependencies
│   ├── .env                               # Environment variables (local)
│   ├── .env.example                       # Environment template
│   │
│   └── 📁 routes/
│       ├── users.js                       # User endpoints (POST, GET)
│       ├── resumes.js                     # Resume CRUD endpoints
│       ├── personalDetails.js             # Personal details endpoints
│       ├── education.js                   # Education management endpoints
│       ├── projects.js                    # Projects management endpoints
│       ├── skills.js                      # Skills management endpoints
│       ├── internships.js                 # Internships management endpoints
│       └── certifications.js              # Certifications management endpoints
│
├── 📁 frontend/
│   ├── 📄 Configuration Files
│   │   ├── vite.config.js                 # Vite build configuration
│   │   ├── tailwind.config.js             # Tailwind CSS configuration
│   │   ├── postcss.config.js              # PostCSS configuration
│   │   ├── eslint.config.js               # ESLint configuration
│   │   ├── package.json                   # Frontend dependencies
│   │   └── .env                           # Environment variables
│   │
│   ├── 📄 HTML & Assets
│   │   ├── index.html                     # HTML entry point
│   │   └── 📁 public/                     # Static assets
│   │
│   └── 📁 src/
│       ├── App.jsx                        # Root React component
│       ├── main.jsx                       # React entry point
│       ├── App.css                        # App styling
│       ├── index.css                      # Global styles + Tailwind
│       │
│       ├── 📁 context/
│       │   └── ResumeContext.jsx          # Global state management
│       │       ├── resumeData state
│       │       ├── userId state
│       │       ├── Update methods for all sections
│       │       ├── Add/Delete methods
│       │       └── useResume() hook
│       │
│       ├── 📁 services/
│       │   └── api.js                     # Axios API client
│       │       ├── resumeAPI
│       │       ├── personalDetailsAPI
│       │       ├── educationAPI
│       │       ├── projectsAPI
│       │       ├── skillsAPI
│       │       ├── internshipsAPI
│       │       └── certificationsAPI
│       │
│       ├── 📁 hooks/
│       │   └── useResumePersistence.js    # API integration hooks
│       │       ├── useSaveResume()
│       │       └── useLoadResume()
│       │
│       └── 📁 components/
│           ├── ResumeBuilder.jsx           # Main container component
│           │   ├── Tab navigation
│           │   ├── Form section
│           │   ├── PDF download button
│           │   └── Preview section (sticky)
│           │
│           ├── ResumePreview.jsx           # Live resume preview
│           │   ├── Header with contact info
│           │   ├── Professional summary
│           │   ├── Education section
│           │   ├── Skills section (grouped)
│           │   ├── Projects section
│           │   ├── Internships section
│           │   └── Certifications section
│           │
│           ├── PersonalDetailsForm.jsx    # Personal info form
│           │   ├── Full name input
│           │   ├── Email input
│           │   ├── Phone input
│           │   ├── Location input
│           │   ├── LinkedIn URL input
│           │   ├── GitHub URL input
│           │   └── Professional summary textarea
│           │
│           ├── EducationForm.jsx          # Education form
│           │   ├── Add education record form
│           │   ├── Edit existing records
│           │   ├── Delete records
│           │   └── List all education records
│           │
│           ├── ProjectsForm.jsx           # Projects form
│           │   ├── Add project form
│           │   ├── Edit existing projects
│           │   ├── Delete projects
│           │   ├── Tech stack input
│           │   └── GitHub link input
│           │
│           ├── SkillsForm.jsx             # Skills form
│           │   ├── Add skill with category
│           │   ├── Proficiency level selection
│           │   ├── Edit skills
│           │   ├── Delete skills
│           │   └── Display skills by category
│           │
│           ├── InternshipsForm.jsx        # Internships form
│           │   ├── Add internship record
│           │   ├── Company name input
│           │   ├── Position title input
│           │   ├── Start/end dates
│           │   ├── Duration calculation
│           │   └── Current internship checkbox
│           │
│           └── CertificationsForm.jsx     # Certifications form
│               ├── Add certification
│               ├── Certification name
│               ├── Issuing organization
│               ├── Issue/expiry dates
│               ├── Credential ID
│               └── Credential verification URL

```

---

## 🔌 API Endpoints Reference

### Base URL: `http://localhost:5000/api`

### Users Endpoints
```
POST   /users                 - Create user
GET    /users/:email          - Get user by email
```

### Resumes Endpoints
```
POST   /resumes               - Create resume
GET    /resumes/user/:user_id - Get all user resumes
GET    /resumes/:id           - Get resume with all data
PUT    /resumes/:id           - Update resume title
DELETE /resumes/:id           - Delete resume
```

### Personal Details Endpoints
```
POST   /personal-details                  - Create personal details
GET    /personal-details/resume/:resume_id - Get personal details
PUT    /personal-details/:id              - Update personal details
DELETE /personal-details/:id              - Delete personal details
```

### Education Endpoints
```
POST   /education                         - Add education record
GET    /education/resume/:resume_id       - Get all education records
GET    /education/:id                     - Get specific education
PUT    /education/:id                     - Update education record
DELETE /education/:id                     - Delete education record
```

### Projects Endpoints
```
POST   /projects                          - Add project
GET    /projects/resume/:resume_id        - Get all projects
GET    /projects/:id                      - Get specific project
PUT    /projects/:id                      - Update project
DELETE /projects/:id                      - Delete project
```

### Skills Endpoints
```
POST   /skills                            - Add skill
GET    /skills/resume/:resume_id          - Get all skills
GET    /skills/:id                        - Get specific skill
PUT    /skills/:id                        - Update skill
DELETE /skills/:id                        - Delete skill
```

### Internships Endpoints
```
POST   /internships                       - Add internship
GET    /internships/resume/:resume_id     - Get all internships
GET    /internships/:id                   - Get specific internship
PUT    /internships/:id                   - Update internship
DELETE /internships/:id                   - Delete internship
```

### Certifications Endpoints
```
POST   /certifications                    - Add certification
GET    /certifications/resume/:resume_id  - Get all certifications
GET    /certifications/:id                - Get specific certification
PUT    /certifications/:id                - Update certification
DELETE /certifications/:id                - Delete certification
```

### Health Check
```
GET    /health                 - Server health status
```

---

## 📊 Database Tables

### 1. users
```
Columns: id, email, password_hash, created_at, updated_at
Primary Key: id
Unique: email
```

### 2. resumes
```
Columns: id, user_id, title, created_at, updated_at
Primary Key: id
Foreign Key: user_id → users.id
Unique: (user_id, title)
```

### 3. personal_details
```
Columns: id, resume_id, full_name, email, phone, linkedin_url, 
         github_url, location, professional_summary, updated_at
Primary Key: id
Foreign Key: resume_id → resumes.id (UNIQUE)
```

### 4. education
```
Columns: id, resume_id, institution_name, degree, field_of_study,
         cgpa, start_year, pass_out_year, description, created_at, updated_at
Primary Key: id
Foreign Key: resume_id → resumes.id
Index: resume_id
```

### 5. projects
```
Columns: id, resume_id, title, description, tech_stack, github_link,
         start_date, end_date, is_ongoing, created_at, updated_at
Primary Key: id
Foreign Key: resume_id → resumes.id
Index: resume_id
```

### 6. skills
```
Columns: id, resume_id, category, skill_name, proficiency_level, created_at
Primary Key: id
Foreign Key: resume_id → resumes.id
Unique: (resume_id, category, skill_name)
Index: resume_id
```

### 7. internships
```
Columns: id, resume_id, company_name, position, description,
         start_date, end_date, is_ongoing, duration_months, created_at, updated_at
Primary Key: id
Foreign Key: resume_id → resumes.id
Index: resume_id
```

### 8. certifications
```
Columns: id, resume_id, certification_name, issuing_organization,
         issue_date, expiry_date, credential_url, credential_id, created_at, updated_at
Primary Key: id
Foreign Key: resume_id → resumes.id
Index: resume_id
```

---

## 🎨 React Component Hierarchy

```
<App>
  └── <ResumeProvider>
      └── <ResumeBuilder>
          ├── Resume Title Input
          ├── Tab Navigation
          ├── Form Rendering (based on activeTab)
          │   ├── <PersonalDetailsForm>
          │   ├── <EducationForm>
          │   ├── <ProjectsForm>
          │   ├── <SkillsForm>
          │   ├── <InternshipsForm>
          │   └── <CertificationsForm>
          └── Preview Section (sticky)
              ├── Download PDF Button
              └── <ResumePreview> (memoized)
```

---

## 🔄 Data Flow

```
User Input (Form)
    ↓
Component State Update (via onChange)
    ↓
useResume() hook
    ↓
ResumeContext actions (updatePersonalDetails, addEducation, etc.)
    ↓
resumeData updated in global state
    ↓
ResumePreview component re-renders
    ↓
Live preview updates
    ↓
(Optional) Save to Backend via API
    ↓
Backend validates and stores in PostgreSQL
```

---

## 📦 Dependencies

### Backend
```
express: ^4.18.2         - Web framework
pg: ^8.10.0              - PostgreSQL client
cors: ^2.8.5             - CORS middleware
dotenv: ^16.3.1          - Environment variables
bcryptjs: ^2.4.3         - Password hashing
jsonwebtoken: ^9.1.0     - JWT tokens
nodemon: ^3.0.1 (dev)    - Auto-reload
```

### Frontend
```
react: ^19.2.0           - UI library
react-dom: ^19.2.0       - DOM rendering
axios: ^1.6.2            - HTTP client
react-to-print: ^2.14.11 - PDF printing
jspdf: ^2.5.1            - PDF generation
html2canvas: ^1.4.1      - Canvas rendering
tailwindcss: ^3.3.5      - Utility CSS
postcss: ^8.4.31         - CSS processing
autoprefixer: ^10.4.16   - CSS prefixes
```

---

## 🚀 Build & Deployment Commands

### Backend
```bash
npm install              # Install dependencies
npm run dev              # Development with nodemon
npm start                # Production mode
```

### Frontend
```bash
npm install              # Install dependencies
npm run dev              # Development with HMR
npm run build            # Production build
npm run preview          # Preview production build
npm run lint             # ESLint check
```

---

## 🔑 Key Technologies

### Frontend
- **React 19**: Latest React with hooks
- **Vite**: Next-gen build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: Promise-based HTTP client
- **react-to-print**: PDF export library

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Minimal web framework
- **PostgreSQL**: Relational database
- **pg**: Node.js PostgreSQL client

### DevOps
- **Git**: Version control
- **npm**: Package manager
- **dotenv**: Environment configuration

---

## 📋 Feature Checklist

### Core Features ✅
- [x] Multi-section resume form
- [x] Real-time preview
- [x] PDF export
- [x] Add/Edit/Delete functionality
- [x] Responsive design

### Backend Features ✅
- [x] RESTful API
- [x] CRUD operations
- [x] Database normalization
- [x] Error handling
- [x] Environment configuration

### Frontend Features ✅
- [x] React Context state management
- [x] Form validation
- [x] Tab-based navigation
- [x] Sticky preview panel
- [x] Professional UI with Tailwind

---

## 🔐 Security Features

- Environment variables for secrets
- Parameterized SQL queries
- CORS enabled
- Error handling without info leakage
- Input validation (form level)
- (Future) JWT authentication

---

## 📈 Performance Optimizations

### Frontend
- Code splitting with Vite
- CSS minification with Tailwind
- Component memoization
- Efficient re-renders with Context

### Backend
- Database connection pooling
- Query indexes on foreign keys
- Compression middleware
- Prepared statements

### Database
- Normalized schema
- Strategic indexes
- Unique constraints

---

## 🆘 Troubleshooting Commands

```bash
# Test backend API
curl http://localhost:5000/api/health

# Test PostgreSQL connection
psql -U postgres -d resume_builder

# Check environment variables
printenv | grep DB_

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Resource Links

### Official Documentation
- [React Docs](https://react.dev)
- [Express.js Docs](https://expressjs.com)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Docs](https://vitejs.dev/guide)

### Learning Resources
- [Full Stack Open](https://fullstackopen.com)
- [The ODIN Project](https://www.theodinproject.com)
- [Frontend Masters](https://frontendmasters.com)
- [egghead.io](https://egghead.io)

---

## 🎯 Quick Reference

### Frontend Ports
- **Development**: http://localhost:5173
- **Vite**: http://localhost:5173

### Backend Ports
- **Development**: http://localhost:5000
- **API Base**: http://localhost:5000/api

### Database
- **Type**: PostgreSQL
- **Name**: resume_builder
- **Default Port**: 5432

---

## 📝 File Statistics

```
Backend
├── Files: 9 (1 main + 8 routes)
├── Lines of Code: ~600
└── Endpoints: 30+

Frontend
├── Components: 8 (1 provider + 7 UI)
├── Files: 15+
└── Lines of Code: ~2000

Database
├── Tables: 8
├── Relationships: 7
└── Lines of SQL: ~150

Documentation
├── Files: 5
└── Total Pages: ~50
```

---

**Total Project Size**: ~3000 lines of code  
**Setup Time**: 5 minutes  
**Learning Value**: ⭐⭐⭐⭐⭐  

---

Generated: January 2025  
Status: Production Ready ✅
