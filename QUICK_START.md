# 🚀 Quick Start Guide - Resume Builder

Follow these steps to get the Resume Builder running on your machine.

## ⚙️ Prerequisites
- **Node.js** v16+ ([Download](https://nodejs.org/))
- **PostgreSQL** 12+ ([Download](https://www.postgresql.org/download/))
- **Git** (optional, for cloning)

---

## 📋 Step 1: Database Setup (5 minutes)

### Windows Users:
```cmd
# Open Command Prompt and connect to PostgreSQL
psql -U postgres

# Inside PostgreSQL terminal, create the database
CREATE DATABASE resume_builder;

# Connect to the new database
\c resume_builder

# Exit PostgreSQL
\q
```

### Mac/Linux Users:
```bash
# Open terminal and connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE resume_builder;

# Connect to the new database
\c resume_builder

# Exit
\q
```

### Load the Schema:
```bash
# From the project root directory
psql -U postgres -d resume_builder -f database/schema.sql
```

✅ **Database ready!**

---

## 🔌 Step 2: Backend Setup (3 minutes)

```bash
# Navigate to backend
cd Backend

# Install dependencies
npm install

# Create/Update .env file with your PostgreSQL credentials
# Change DB_PASSWORD to your PostgreSQL password in the .env file

# Start the backend server
npm run dev
```

**Expected output:**
```
Resume Builder API running on port 5000
```

✅ **Backend ready at http://localhost:5000**

---

## ⚛️ Step 3: Frontend Setup (3 minutes)

**Open a NEW terminal window** and:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in 100 ms
➜  Local:   http://localhost:5173/
```

✅ **Frontend ready at http://localhost:5173**

---

## 🎉 You're All Set!

1. **Open your browser** and go to: http://localhost:5173
2. **Start building your resume!**
3. **Fill in your details** in the form sections
4. **See live preview** on the right side
5. **Download PDF** with the green button

---

## 🎯 First Time Setup Checklist

- [ ] PostgreSQL installed and running
- [ ] Database `resume_builder` created
- [ ] Schema loaded from `database/schema.sql`
- [ ] `.env` file in Backend folder with your PostgreSQL password
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Browser shows the Resume Builder interface

---

## 🐛 Common Issues & Fixes

### Issue: "psql: command not found"
**Solution**: PostgreSQL is not in your PATH. Add PostgreSQL bin folder to system PATH or use full path.

### Issue: "FATAL: Ident authentication failed"
**Solution**: Try connecting with: `psql -U postgres -h localhost`

### Issue: "Database resume_builder does not exist"
**Solution**: Make sure you ran the `CREATE DATABASE` command in PostgreSQL.

### Issue: Backend showing "connect ECONNREFUSED"
**Solution**: 
- Check if PostgreSQL is running
- Verify database credentials in `.env`
- Try connecting manually: `psql -U postgres -d resume_builder`

### Issue: Frontend shows "Cannot connect to localhost:5000"
**Solution**:
- Ensure backend is running on port 5000
- Check if `.env` in frontend has `VITE_API_URL=http://localhost:5000/api`

---

## 📝 Default Configuration

If you used default PostgreSQL installation:

**Backend `.env`:**
```env
PORT=5000
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_NAME=resume_builder
DB_PORT=5432
```

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 Test the Setup

### Test Backend API:
```bash
# Open browser or terminal and test
curl http://localhost:5000/api/health

# Expected response:
# {"status":"OK","message":"Resume Builder API is running"}
```

### Test Frontend:
- Visit http://localhost:5173
- You should see the Resume Builder interface
- Try filling in personal details
- Check if the preview updates in real-time

---

## 📚 Next Steps

1. **Understand the structure**: Read `README.md` for detailed documentation
2. **Explore the code**: Check the component structure in `frontend/src/components/`
3. **Customize**: Modify colors, fonts, or add new sections
4. **Deploy**: See README.md for deployment instructions

---

## 💻 Development Commands

**Backend:**
```bash
cd Backend
npm run dev      # Start with auto-reload (requires nodemon)
npm start        # Start normally
```

**Frontend:**
```bash
cd frontend
npm run dev      # Development mode with hot reload
npm run build    # Build for production
npm run preview  # Preview production build locally
```

---

## 🎓 Architecture Overview

```
USER FILLS RESUME
        ↓
REACT FORM COMPONENTS
        ↓
REACT CONTEXT (State Management)
        ↓
LIVE PREVIEW (Right Side)
        ↓
PDF DOWNLOAD (Button Click)
        ↓
[OPTIONAL] SAVE TO DATABASE (Backend API)
```

---

## ✨ Features at a Glance

✅ Real-time resume preview  
✅ Multi-section forms (Education, Skills, Projects, etc.)  
✅ PDF download  
✅ Responsive design  
✅ Optimized for fresh graduates  
✅ Professional resume template  

---

## 📞 Need Help?

1. Check the main `README.md` for detailed documentation
2. Review API endpoints in the docs
3. Check browser console for errors (F12)
4. Check backend logs in the terminal

---

**Happy Resume Building! 🚀**
