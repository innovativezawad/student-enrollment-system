# Student Enrollment Management System

A lightweight, clean, and fast student enrollment management system built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### Authentication
- Admin login with Supabase authentication
- Protected dashboard with automatic redirects
- Logout functionality

### Dashboard
- Total Students count
- Total Revenue tracking
- Total Due amount
- Full Payment vs Installment statistics
- Quick stats with collection rates

### Student Management (CRUD)
- Add new students
- View student details
- Edit existing student information
- Delete students with confirmation

### Student Information
- Student Name
- Phone Number
- Email (Optional)
- Course Name
- Batch
- Admission Date

### Payment Management
- **Full Payment**: Single payment option
- **Installment**: Multiple payment tracking
- Payment history per student
- Automatic due calculation
- Add additional payments

### Student List
- Search by name or phone
- Filter by course
- Sort and view student information
- Quick actions (View, Edit, Delete)

### UI/UX
- Responsive design (Mobile, Tablet, Desktop)
- Clean admin dashboard interface
- Modal forms for add/edit operations
- Confirmation dialogs for destructive actions
- Toast notifications for user feedback
- Modern table layouts

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Routing**: React Router

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Modal.tsx
│   ├── ProtectedRoute.tsx
│   ├── Sidebar.tsx
│   ├── Toast.tsx
│   └── ToastContainer.tsx
├── config/           # Configuration files
│   └── supabase.ts
├── context/          # React contexts
│   ├── AuthContext.tsx
│   └── ToastContext.tsx
├── pages/            # Page components
│   ├── Dashboard.tsx
│   ├── Layout.tsx
│   ├── Login.tsx
│   └── Students/
│       ├── StudentForm.tsx
│       ├── StudentTable.tsx
│       └── index.tsx
├── types/            # TypeScript types
│   └── index.ts
├── App.tsx           # Main app component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/innovativezawad/student-enrollment-system.git
   cd student-enrollment-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Supabase**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Create the necessary tables (see database schema below)
   - Get your credentials from project settings

4. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

### Students Table
```sql
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
```

### Student Payment Info Table
```sql
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
```

### Payments Table
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  amount DECIMAL NOT NULL,
  payment_date DATE NOT NULL,
  note VARCHAR,
  created_at TIMESTAMP DEFAULT now()
);
```

## Deployment

### Deploy Frontend to GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

### Deploy Backend (Supabase)
- Supabase automatically handles database and authentication
- No additional backend deployment needed

## Usage

1. **Login**: Use your Supabase credentials to login
2. **Dashboard**: View overall statistics
3. **Students**: Add, edit, search, and manage students
4. **Payments**: Track full payments and installments

## API Integration

All data is managed through Supabase REST API:
- No custom backend needed
- Real-time updates available
- Row-level security can be configured

## Code Quality

- ✅ TypeScript for type safety
- ✅ Reusable components
- ✅ Clean folder structure
- ✅ Error handling
- ✅ Loading states
- ✅ Toast notifications
- ✅ Responsive design

## Future Enhancements

- [ ] Student details page with payment history
- [ ] Payment management modal
- [ ] Excel export functionality
- [ ] Batch operations
- [ ] Email notifications
- [ ] SMS reminders for due payments
- [ ] Advanced reporting
- [ ] Role-based access control
- [ ] Audit logs

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For support, open an issue on the GitHub repository.
