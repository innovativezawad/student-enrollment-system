# Setup Guide - Student Enrollment Management System

## Prerequisites

- Node.js 16+ and npm
- Git
- Supabase account (free at supabase.com)
- GitHub account for hosting frontend

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/innovativezawad/student-enrollment-system.git
cd student-enrollment-system
```

---

## Step 2: Setup Supabase

### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up or login
3. Create a new project
4. Wait for the project to initialize

### Create Database Tables

Go to **SQL Editor** in Supabase and run these queries:

```sql
-- Create Students Table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  phone VARCHAR NOT NULL,
  email VARCHAR,
  course_name VARCHAR NOT NULL,
  batch VARCHAR NOT NULL,
  admission_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create Student Payment Info Table
CREATE TABLE student_payment_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_fee DECIMAL NOT NULL,
  discount DECIMAL DEFAULT 0,
  payment_type VARCHAR NOT NULL CHECK (payment_type IN ('full', 'installment')),
  paid_amount DECIMAL DEFAULT 0,
  first_payment DECIMAL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create Payments Table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  amount DECIMAL NOT NULL,
  payment_date DATE NOT NULL,
  note VARCHAR,
  created_at TIMESTAMP DEFAULT now()
);

-- Enable RLS (Row Level Security)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_payment_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policies (Allow authenticated users)
CREATE POLICY "Allow authenticated users" ON students
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users insert" ON students
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users update" ON students
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users delete" ON students
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users" ON student_payment_info
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users insert" ON student_payment_info
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users update" ON student_payment_info
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users" ON payments
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users insert" ON payments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

### Get Your Credentials

1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL** (VITE_SUPABASE_URL)
   - **Anon Key** (VITE_SUPABASE_ANON_KEY)

### Create Admin User

1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Enter email and password
4. Click **Create user**

---

## Step 3: Configure Local Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Step 4: Install Dependencies

```bash
npm install
```

---

## Step 5: Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Login
- Use the admin credentials you created in Supabase
- You'll be redirected to the dashboard

---

## Step 6: Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

---

## Deployment

### Deploy Frontend to GitHub Pages

1. **Update vite.config.ts** (if deploying to subdirectory):
   ```ts
   export default defineConfig({
     // ...
     base: '/student-enrollment-system/' // Change if needed
   })
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy using GitHub Actions** (recommended):
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: '18'
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

4. **Enable GitHub Pages**:
   - Go to **Settings** → **Pages**
   - Select **Deploy from a branch**
   - Choose `gh-pages` branch
   - Save

### Backend (Supabase)

No additional deployment needed! Supabase handles:
- Database hosting
- Authentication
- API endpoints
- Real-time updates

---

## Troubleshooting

### Authentication Not Working
- Verify Supabase credentials in `.env.local`
- Check that admin user exists in Supabase
- Ensure RLS policies are enabled

### Database Connection Issues
- Verify database tables exist
- Check Supabase project status
- Confirm VITE_SUPABASE_URL is correct

### Build Errors
- Delete `node_modules` and run `npm install`
- Clear `.vite` cache: `rm -rf .vite`
- Check Node.js version (16+)

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| VITE_SUPABASE_URL | Supabase project URL | Yes |
| VITE_SUPABASE_ANON_KEY | Supabase anonymous key | Yes |

---

## Production Checklist

- [ ] Supabase project created
- [ ] Database tables created
- [ ] RLS policies configured
- [ ] Admin user created
- [ ] Environment variables set
- [ ] Application tested locally
- [ ] Build successful (`npm run build`)
- [ ] GitHub Pages enabled
- [ ] Frontend deployed
- [ ] Test login in production
- [ ] Test CRUD operations

---

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review Supabase documentation
3. Check GitHub issues

Happy deploying! 🚀
