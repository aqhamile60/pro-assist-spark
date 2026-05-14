# CareerKick AI

**CareerKick AI** is a job seeker micro-assistant that automates workplace tasks using AI. Built with React, Tailwind CSS, and the OpenAI API for the CAPACITI AI Skills Acceleration Programme.

## What It Does
CareerKick AI helps job seekers save time on repetitive tasks with 3 core tools:

### 1. CV Bullet Rewriter
Turns boring job duties into strong, quantifiable CV bullets using action verbs.
- **Input**: Job duty text
- **Output**: 2 improved bullet points
- **Example**: 
    - Input: `Managed company Instagram and replied to customer messages`
    - Output: 
        1. Increased Instagram engagement by streamlining content scheduling and customer responses
        2. Managed social media communications, improving response time and customer satisfaction

### 2. Cover Letter Generator
Generates a 150-word, 3-paragraph cover letter tailored to a job title and 3 skills.
- **Input**: Job title and 3 skills
- **Output**: Ready-to-edit cover letter
- **Example**: 
    - Job Title: `Marketing Assistant`
    - Skills: `Social media, Data analysis, Communication`

### 3. Interview Prep
Creates 5 interview questions with STAR-method answers based on a job title and description.
- **Input**: Job title and job description
- **Output**: 5 Q&A pairs with Situation, Task, Action, Result structure
- **Example**: 
    - Job Title: `Junior Data Analyst`
    - Description: `Clean and analyze sales data in Excel, build dashboards, write weekly reports`

> **Note**: All AI outputs include this disclaimer:  
> *AI-generated draft. Review and edit before use. Do not add false information.*


## Tech Stack
- **Frontend**: React 18, TanStack Router, TanStack Query
- **Styling**: Tailwind CSS, shadcn/ui components
- **AI**: OpenAI GPT API
- **Deployment**: Lovable.dev
- **State**: React Query for API c## Project Structurealls

## Features
- 3-tab dashboard with sidebar navigation
- Mobile responsive, clean SaaS-style UI
- Loading states and copy-to-clipboard for all outputs
- Error and 404 handling
- SEO optimized with meta tags and Open Graph

## Project Structure

careerkick-ai/
│
├── public/
│   ├──favicon.ico
│   └──og-image.png
│
├── prompts/
│   ├── 1_cv_rewriter.txt          # Prompt for CV bullet rewriting
│   ├── 2_cover_letter.txt         # Prompt for cover letter generation
│   └── 3_interview_prep.txt       # Prompt for interview Q&A generation
│
├── src/
│   ├── components/
│   │   ├── AppSidebar.tsx
│   │   ├── ui/                    # shadcn/ui components
│   │   └──CvRewriter.tsx
│   │   ├──CoverLetter.tsx
│   │   └──InterviewPrep.tsx
│   │
│   ├── routes/
│   │   ├── __root.tsx             # Root route, layout, meta tags
│   │   ├──index.tsx              # Landing page
│   │   └──dashboard.tsx          # Main 3-tab interface
│   │
│   ├── lib/
│   │   ├──api.ts                 # OpenAI API calls
│   │   └──utils.ts               # Helper functions
│   │
│   ├──styles.css                 # Tailwind styles
│   └── main.tsx                   # App entry point
│
├── .env.example                   # Example env file
├── .gitignore
├──index.html
├──package.json
├──tailwind.config.js
├──tsconfig.json
└──README.md


