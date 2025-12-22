-- Resume Builder Database Schema (PostgreSQL)

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resumes Table
CREATE TABLE resumes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL DEFAULT 'My Resume',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, title)
);

-- Personal Details Table
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

-- Education Table (Normalized for multiple education records)
CREATE TABLE education (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
    institution_name VARCHAR(255) NOT NULL,
    degree VARCHAR(100) NOT NULL,
    field_of_study VARCHAR(255),
    cgpa DECIMAL(3, 2),
    pass_out_year INTEGER,
    start_year INTEGER,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table (One-to-Many)
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

-- Skills Table (One-to-Many)
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL, -- e.g., 'Languages', 'Tools', 'Frameworks'
    skill_name VARCHAR(255) NOT NULL,
    proficiency_level VARCHAR(50), -- e.g., 'Beginner', 'Intermediate', 'Advanced'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(resume_id, category, skill_name)
);

-- Internships Table (Included for freshers)
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

-- Certifications Table (Included for completeness)
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

-- Indexes for Performance
CREATE INDEX idx_resumes_user_id ON resumes(user_id);
CREATE INDEX idx_education_resume_id ON education(resume_id);
CREATE INDEX idx_projects_resume_id ON projects(resume_id);
CREATE INDEX idx_skills_resume_id ON skills(resume_id);
CREATE INDEX idx_internships_resume_id ON internships(resume_id);
CREATE INDEX idx_certifications_resume_id ON certifications(resume_id);
CREATE INDEX idx_personal_details_resume_id ON personal_details(resume_id);
