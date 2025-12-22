# 📊 Database Schema Documentation

## Overview
The Resume Builder uses PostgreSQL with a relational schema optimized for fresh engineering graduates. The data structure is normalized to support multiple resumes per user with many sections per resume.

---

## 🗄️ Database Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USERS                                   │
│  (id, email, password_hash, created_at, updated_at)            │
│                           │                                     │
│                           │ (1-to-Many)                         │
│                           ▼                                     │
│                      RESUMES                                    │
│  (id, user_id, title, created_at, updated_at)                  │
│         │          │          │          │          │          │
│         │          └──────────┼──────────┼──────────┤          │
│         │                     │          │          │          │
│    (1-1)│            (1-Many) │          │          │          │
│         │                     │          │          │          │
│         ▼                     ▼          ▼          ▼          │
│  PERSONAL_DETAILS    EDUCATION  PROJECTS  SKILLS  INTERNSHIPS │
│  CERTIFICATIONS                                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📋 Table Definitions

### 1. USERS Table
**Purpose**: Store user accounts for authentication (future feature)

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique user identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User's email address |
| password_hash | VARCHAR(255) | NOT NULL | Hashed password (bcrypt) |
| created_at | TIMESTAMP | DEFAULT NOW | Account creation time |
| updated_at | TIMESTAMP | DEFAULT NOW | Last update time |

**Indexes**: email (UNIQUE)

---

### 2. RESUMES Table
**Purpose**: Store multiple resumes per user

```sql
CREATE TABLE resumes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL DEFAULT 'My Resume',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, title)
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique resume identifier |
| user_id | INTEGER | FOREIGN KEY | Reference to user |
| title | VARCHAR(255) | NOT NULL | Resume title (e.g., "Software Dev Resume") |
| created_at | TIMESTAMP | DEFAULT NOW | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT NOW | Last update timestamp |

**Relationships**: 
- Foreign Key: `user_id` → `users.id` (ON DELETE CASCADE)

**Indexes**: 
- user_id
- UNIQUE(user_id, title)

---

### 3. PERSONAL_DETAILS Table
**Purpose**: Store contact info and professional summary (1:1 with resume)

```sql
CREATE TABLE personal_details (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER NOT NULL UNIQUE REFERENCES resumes(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    linkedin_url VARCHAR(500),
    github_url VARCHAR(500),
    location VARCHAR(255),
    professional_summary TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique identifier |
| resume_id | INTEGER | UNIQUE, FOREIGN KEY | Reference to resume |
| full_name | VARCHAR(255) | - | Candidate's full name |
| email | VARCHAR(255) | - | Contact email |
| phone | VARCHAR(20) | - | Contact phone number |
| linkedin_url | VARCHAR(500) | - | LinkedIn profile URL |
| github_url | VARCHAR(500) | - | GitHub profile URL |
| location | VARCHAR(255) | - | Current location |
| professional_summary | TEXT | - | Professional summary paragraph |
| updated_at | TIMESTAMP | DEFAULT NOW | Last update time |

**Relationships**: 
- Foreign Key: `resume_id` → `resumes.id` (ON DELETE CASCADE)

---

### 4. EDUCATION Table
**Purpose**: Store multiple education records (1:Many with resume)

```sql
CREATE TABLE education (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
    institution_name VARCHAR(255) NOT NULL,
    degree VARCHAR(100) NOT NULL,
    field_of_study VARCHAR(255),
    cgpa DECIMAL(3, 2),
    start_year INTEGER,
    pass_out_year INTEGER,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique education record ID |
| resume_id | INTEGER | FOREIGN KEY, NOT NULL | Reference to resume |
| institution_name | VARCHAR(255) | NOT NULL | College/University name |
| degree | VARCHAR(100) | NOT NULL | Degree (B.Tech, M.Tech, etc.) |
| field_of_study | VARCHAR(255) | - | Major/specialization |
| cgpa | DECIMAL(3,2) | - | CGPA (0.00-10.00) |
| start_year | INTEGER | - | Year of enrollment |
| pass_out_year | INTEGER | - | Year of graduation |
| description | TEXT | - | Additional details |
| created_at | TIMESTAMP | DEFAULT NOW | Creation time |
| updated_at | TIMESTAMP | DEFAULT NOW | Last update time |

**Relationships**: 
- Foreign Key: `resume_id` → `resumes.id` (ON DELETE CASCADE)

**Indexes**: resume_id

---

### 5. PROJECTS Table
**Purpose**: Store multiple academic/freelance projects (1:Many with resume)

```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    tech_stack VARCHAR(500),
    github_link VARCHAR(500),
    start_date DATE,
    end_date DATE,
    is_ongoing BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique project ID |
| resume_id | INTEGER | FOREIGN KEY, NOT NULL | Reference to resume |
| title | VARCHAR(255) | NOT NULL | Project name |
| description | TEXT | - | Project description |
| tech_stack | VARCHAR(500) | - | Technologies used (comma-separated) |
| github_link | VARCHAR(500) | - | GitHub repository URL |
| start_date | DATE | - | Project start date |
| end_date | DATE | - | Project end date |
| is_ongoing | BOOLEAN | DEFAULT FALSE | Whether project is ongoing |
| created_at | TIMESTAMP | DEFAULT NOW | Creation time |
| updated_at | TIMESTAMP | DEFAULT NOW | Last update time |

**Relationships**: 
- Foreign Key: `resume_id` → `resumes.id` (ON DELETE CASCADE)

**Indexes**: resume_id

---

### 6. SKILLS Table
**Purpose**: Store categorized skills (1:Many with resume)

```sql
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    skill_name VARCHAR(255) NOT NULL,
    proficiency_level VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(resume_id, category, skill_name)
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique skill ID |
| resume_id | INTEGER | FOREIGN KEY, NOT NULL | Reference to resume |
| category | VARCHAR(100) | NOT NULL | Category (Languages, Frameworks, Tools, Databases, Platforms) |
| skill_name | VARCHAR(255) | NOT NULL | Skill name (Python, React, etc.) |
| proficiency_level | VARCHAR(50) | - | Proficiency (Beginner, Intermediate, Advanced, Expert) |
| created_at | TIMESTAMP | DEFAULT NOW | Creation time |

**Relationships**: 
- Foreign Key: `resume_id` → `resumes.id` (ON DELETE CASCADE)

**Indexes**: 
- resume_id
- UNIQUE(resume_id, category, skill_name)

---

### 7. INTERNSHIPS Table
**Purpose**: Store internship experience (1:Many with resume)

```sql
CREATE TABLE internships (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    is_ongoing BOOLEAN DEFAULT FALSE,
    duration_months INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique internship ID |
| resume_id | INTEGER | FOREIGN KEY, NOT NULL | Reference to resume |
| company_name | VARCHAR(255) | NOT NULL | Company name |
| position | VARCHAR(255) | NOT NULL | Job position/title |
| description | TEXT | - | Job responsibilities & achievements |
| start_date | DATE | NOT NULL | Start date |
| end_date | DATE | - | End date |
| is_ongoing | BOOLEAN | DEFAULT FALSE | Whether internship is ongoing |
| duration_months | INTEGER | - | Duration in months |
| created_at | TIMESTAMP | DEFAULT NOW | Creation time |
| updated_at | TIMESTAMP | DEFAULT NOW | Last update time |

**Relationships**: 
- Foreign Key: `resume_id` → `resumes.id` (ON DELETE CASCADE)

**Indexes**: resume_id

---

### 8. CERTIFICATIONS Table
**Purpose**: Store certifications and online courses (1:Many with resume)

```sql
CREATE TABLE certifications (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
    certification_name VARCHAR(255) NOT NULL,
    issuing_organization VARCHAR(255) NOT NULL,
    issue_date DATE,
    expiry_date DATE,
    credential_url VARCHAR(500),
    credential_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique certification ID |
| resume_id | INTEGER | FOREIGN KEY, NOT NULL | Reference to resume |
| certification_name | VARCHAR(255) | NOT NULL | Name of certification |
| issuing_organization | VARCHAR(255) | NOT NULL | Organization that issued it |
| issue_date | DATE | - | Issue date |
| expiry_date | DATE | - | Expiry date (if applicable) |
| credential_url | VARCHAR(500) | - | URL to verify credential |
| credential_id | VARCHAR(255) | - | Credential ID/Number |
| created_at | TIMESTAMP | DEFAULT NOW | Creation time |
| updated_at | TIMESTAMP | DEFAULT NOW | Last update time |

**Relationships**: 
- Foreign Key: `resume_id` → `resumes.id` (ON DELETE CASCADE)

**Indexes**: resume_id

---

## 🔑 Relationships Summary

| Parent | Child | Type | Delete Behavior |
|--------|-------|------|-----------------|
| users | resumes | 1:Many | CASCADE |
| resumes | personal_details | 1:1 | CASCADE |
| resumes | education | 1:Many | CASCADE |
| resumes | projects | 1:Many | CASCADE |
| resumes | skills | 1:Many | CASCADE |
| resumes | internships | 1:Many | CASCADE |
| resumes | certifications | 1:Many | CASCADE |

---

## 📊 Data Examples

### User
```json
{
  "id": 1,
  "email": "john@example.com",
  "password_hash": "$2b$10$...",
  "created_at": "2025-01-15T10:30:00Z"
}
```

### Resume
```json
{
  "id": 1,
  "user_id": 1,
  "title": "Software Developer Resume",
  "created_at": "2025-01-15T10:30:00Z"
}
```

### Education
```json
{
  "id": 1,
  "resume_id": 1,
  "institution_name": "IIT Delhi",
  "degree": "B.Tech",
  "field_of_study": "Computer Science",
  "cgpa": "8.5",
  "pass_out_year": 2023
}
```

### Skill
```json
{
  "id": 1,
  "resume_id": 1,
  "category": "Languages",
  "skill_name": "Python",
  "proficiency_level": "Advanced"
}
```

---

## 🔒 Constraints & Data Integrity

1. **NOT NULL**: Required fields cannot be empty
2. **UNIQUE**: Email (users), (user_id + title) (resumes), (resume_id + category + skill_name) (skills)
3. **FOREIGN KEY**: All child records reference parent with CASCADE delete
4. **DECIMAL(3,2)**: CGPA stored with 2 decimal places (e.g., 8.50)
5. **BOOLEAN**: Flags default to FALSE

---

## 📈 Performance Optimization

1. **Indexes**:
   - Primary Keys on all tables
   - Foreign Keys indexed for JOIN operations
   - UNIQUE constraints indexed

2. **Query Optimization**:
   - Use prepared statements (parameterized queries)
   - Batch operations when possible
   - Use SELECT * only when necessary

3. **Scalability**:
   - Consider partitioning resumes table by user_id for very large datasets
   - Archive old resumes periodically

---

## 🔐 Data Privacy

- Passwords hashed with bcrypt (never store plain text)
- Email unique to prevent duplicates
- All timestamps recorded for audit trail
- Consider adding soft deletes (is_deleted flag) if needed

---

## 📝 SQL Tips

### Get Complete Resume Data:
```sql
SELECT r.*, pd.*, e.*, p.*, s.*, i.*, c.*
FROM resumes r
LEFT JOIN personal_details pd ON r.id = pd.resume_id
LEFT JOIN education e ON r.id = e.resume_id
LEFT JOIN projects p ON r.id = p.resume_id
LEFT JOIN skills s ON r.id = s.resume_id
LEFT JOIN internships i ON r.id = i.resume_id
LEFT JOIN certifications c ON r.id = c.resume_id
WHERE r.id = $1;
```

### Get All Resumes for a User:
```sql
SELECT * FROM resumes WHERE user_id = $1 ORDER BY created_at DESC;
```

### Get Skills by Category:
```sql
SELECT category, array_agg(skill_name) as skills
FROM skills
WHERE resume_id = $1
GROUP BY category;
```

---

## 🎯 Design Principles

1. **Normalization**: Each table has a single purpose
2. **Relationships**: Clear parent-child relationships
3. **Cascade Delete**: Prevents orphaned records
4. **Timestamps**: Track creation and modification times
5. **Unique Constraints**: Prevent duplicate entries where appropriate

---

**Last Updated**: January 2025
**Version**: 1.0
