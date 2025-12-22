# Resume Builder for Fresh Engineering Graduates

A full-stack PERN (PostgreSQL, Express, React, Node.js) application designed specifically for fresh engineering graduates to create professional resumes with real-time preview and PDF export functionality.

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS, Axios, react-to-print
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **State Management**: React Context API

### Key Features
✅ Multi-section resume builder optimized for freshers  
✅ Real-time preview as you type  
✅ PDF download functionality  
✅ Responsive design (mobile & desktop)  
✅ RESTful API for CRUD operations  
✅ Relational database with normalized schema  

### Data Hierarchy (By Importance for Freshers)
1. **Education** (College, Degree, CGPA, Graduation Year)
2. **Technical Skills** (Languages, Frameworks, Tools, Databases)
3. **Projects** (Academic/Freelance Projects)
4. **Internships** (Internship Experience)
5. **Certifications** (Online Certifications & Courses)

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**

### 1️⃣ Database Setup

#### Step 1: Create PostgreSQL Database
```bash
# Open PostgreSQL terminal
psql -U postgres

# Create database
CREATE DATABASE resume_builder;

# Connect to the database
\c resume_builder
```

#### Step 2: Run SQL Schema
```bash
# From the project root, run the schema script
psql -U postgres -d resume_builder -f database/schema.sql
```

This will create all necessary tables:
- `users` - User accounts
- `resumes` - Resume records
- `personal_details` - Contact info & professional summary
- `education` - Education records (one-to-many)
- `projects` - Academic projects (one-to-many)
- `skills` - Technical skills (one-to-many)
- `internships` - Internship experience (one-to-many)
- `certifications` - Certifications (one-to-many)

---

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your PostgreSQL credentials
# DB_USER=postgres
# DB_PASSWORD=your_password
# DB_HOST=localhost
# DB_NAME=resume_builder
# PORT=5000

# Start the server
npm run dev
```

**Backend Server**: http://localhost:5000

---

### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file (already present)
# VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

**Frontend Application**: http://localhost:5173

---

## 🚀 Usage

### Starting the Application

**Terminal 1 - Backend**:
```bash
cd Backend
npm run dev
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev
```

Then open: **http://localhost:5173** in your browser

### Building for Production

**Frontend Build**:
```bash
cd frontend
npm run build
npm run preview
```

**Backend**: Ensure `.env` is properly configured and run with `npm start`

---

## 📋 API Documentation

### Base URL: `http://localhost:5000/api`

### Endpoints

#### **Resumes**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/resumes` | Create new resume |
| GET | `/resumes/user/:user_id` | Get all resumes for user |
| GET | `/resumes/:id` | Get resume with all details |
| PUT | `/resumes/:id` | Update resume title |
| DELETE | `/resumes/:id` | Delete resume |

#### **Personal Details**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/personal-details` | Create personal details |
| GET | `/personal-details/resume/:resume_id` | Get personal details |
| PUT | `/personal-details/:id` | Update personal details |
| DELETE | `/personal-details/:id` | Delete personal details |

#### **Education**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/education` | Add education record |
| GET | `/education/resume/:resume_id` | Get all education records |
| PUT | `/education/:id` | Update education record |
| DELETE | `/education/:id` | Delete education record |

#### **Projects**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/projects` | Add project |
| GET | `/projects/resume/:resume_id` | Get all projects |
| PUT | `/projects/:id` | Update project |
| DELETE | `/projects/:id` | Delete project |

#### **Skills**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/skills` | Add skill |
| GET | `/skills/resume/:resume_id` | Get all skills |
| PUT | `/skills/:id` | Update skill |
| DELETE | `/skills/:id` | Delete skill |

#### **Internships**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/internships` | Add internship |
| GET | `/internships/resume/:resume_id` | Get all internships |
| PUT | `/internships/:id` | Update internship |
| DELETE | `/internships/:id` | Delete internship |

#### **Certifications**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/certifications` | Add certification |
| GET | `/certifications/resume/:resume_id` | Get all certifications |
| PUT | `/certifications/:id` | Update certification |
| DELETE | `/certifications/:id` | Delete certification |

---

## 📁 Project Structure

```
Resume_Builder/
├── Backend/
│   ├── server.js                 # Express server entry point
│   ├── db.js                     # PostgreSQL connection
│   ├── package.json
│   ├── .env.example              # Environment variables template
│   └── routes/
│       ├── users.js
│       ├── resumes.js
│       ├── personalDetails.js
│       ├── education.js
│       ├── projects.js
│       ├── skills.js
│       ├── internships.js
│       └── certifications.js
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # React entry point
│   │   ├── index.css             # Global styles + Tailwind
│   │   ├── App.css               # App styles
│   │   ├── context/
│   │   │   └── ResumeContext.jsx # Global state management
│   │   ├── services/
│   │   │   └── api.js            # API integration
│   │   ├── components/
│   │   │   ├── ResumeBuilder.jsx      # Main container
│   │   │   ├── ResumePreview.jsx      # Live preview
│   │   │   ├── PersonalDetailsForm.jsx
│   │   │   ├── EducationForm.jsx
│   │   │   ├── ProjectsForm.jsx
│   │   │   ├── SkillsForm.jsx
│   │   │   ├── InternshipsForm.jsx
│   │   │   └── CertificationsForm.jsx
│   │   └── hooks/
│   │       └── useResumePersistence.js # API hooks
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env                      # Environment variables
│
└── database/
    └── schema.sql                # PostgreSQL schema
```

---

## 💡 Key Implementation Details

### 1. State Management (React Context)
The `ResumeContext` manages all resume data globally, allowing real-time updates across components without prop drilling.

```jsx
const { resumeData, updatePersonalDetails, addEducation } = useResume();
```

### 2. Real-Time Preview
The `ResumePreview` component is referenced in `ResumeBuilder.jsx` and updates automatically as data changes.

### 3. PDF Export
Uses `react-to-print` library to capture the resume preview DOM and generate a PDF.

```jsx
const handlePrint = useReactToPrint({
  content: () => resumePreviewRef.current,
  documentTitle: `${resumeData.personal_details.full_name}.pdf`,
});
```

### 4. Database Schema
The schema follows relational database best practices:
- Foreign keys for data integrity
- ON DELETE CASCADE for automatic cleanup
- Indexes on frequently queried columns
- Unique constraints to prevent duplicates

---

## 🎨 UI/UX Features

- **Tab Navigation**: Switch between different resume sections
- **Form Validation**: Required fields marked with asterisks
- **Real-time Preview**: Right-side panel shows live resume
- **Responsive Design**: Works on tablets and mobile devices
- **A4 Paper Style**: Preview matches printed resume appearance
- **Professional Color Scheme**: Dark gray (#1f2937) and blue (#3b82f6)

---

## 🔧 Troubleshooting

### Issue: Backend can't connect to PostgreSQL
**Solution**: 
- Ensure PostgreSQL is running
- Check DB credentials in `.env`
- Verify database exists: `psql -l`

### Issue: CORS errors in frontend
**Solution**:
- Backend CORS is already configured in `server.js`
- Ensure `VITE_API_URL` in frontend `.env` matches backend port

### Issue: PDF export not working
**Solution**:
- Ensure `react-to-print` is installed
- Check browser console for errors
- Try printing to PDF from browser directly (Ctrl+P)

---

## 📚 Learning Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

---

## 🚀 Future Enhancements

- [ ] User authentication & authorization
- [ ] Multiple resume templates
- [ ] Cloud storage integration
- [ ] Export to other formats (DOCX, TXT)
- [ ] AI-powered resume suggestions
- [ ] Sharing & collaboration features
- [ ] Version control for resumes

---

## 📄 License

MIT License - Feel free to use this project for educational and commercial purposes.

---

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

---

## ❓ Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ for Fresh Engineering Graduates**
