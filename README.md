# CareerKick AI

**CareerKick AI** is a job seeker micro-assistant that automates workplace tasks using AI. Built with React, Tailwind CSS, and the OpenAI API for the CAPACITI AI Skills Acceleration Programme.
## What It Does
CareerKick AI helps job seekers save time on repetitive tasks with 3 core tools:

### 1. CV Bullet Rewriter
Turns boring job duties into strong, quantifiable CV bullets using action verbs.
Input: `Managed company Instagram and replied to customer messages`
Output: 2 improved bullet points.

### 2. Cover Letter Generator
Generates a 150-word, 3-paragraph cover letter tailored to a job title and 3 skills.
Input: Job Title + Skills
Output: Ready-to-edit cover letter.

### 3. Interview Prep
Creates 5 interview questions with STAR-method answers based on a job title and description.
Input: Job Title + Job Description
Output: 5 Q&A pairs.

All outputs include a responsible AI disclaimer:
> AI-generated draft. Review and edit before use. Do not add false information.

## Tech Stack
- **Frontend**: React 18, TanStack Router, TanStack Query
- **Styling**: Tailwind CSS, shadcn/ui components
- **AI**: OpenAI GPT API
- **Deployment**: Lovable.dev
- **State**: React Query for API calls

## Features
- 3-tab dashboard with sidebar navigation
- Mobile responsive, clean SaaS-style UI
- Loading states and copy-to-clipboard for all outputs
- Error and 404 handling
- SEO optimized with meta tags and Open Graph

## Project Structure
