# Online Corporate Insurance Management System

A comprehensive full-stack web application for managing corporate insurance services with React frontend and Spring Boot backend.

## 🚀 Features Implemented

### ✅ Milestone 1: User Authentication and Registration
- **Responsive Registration and Login pages** using React with form validation
- **Email verification flow** with token-based verification
- **Password reset functionality** with secure token generation
- **Spring Security + JWT** authentication
- **Role-based access control** (Admin, Agent, Customer)
- **Protected Routes** with role-based redirection

### ✅ Milestone 2: Agent Availability Management
- **Agent dashboard** with availability management interface
- **CRUD operations** for availability slots
- **Date & time slot selection** with conflict prevention
- **Overlapping time slot prevention**
- **Backend validation** and MySQL integration

### ✅ Milestone 3: Appointment Scheduling Interface
- **Interactive appointment booking UI** with step-by-step wizard
- **Agent selection dropdown** with filtering
- **Dynamic time-slot picker** based on agent availability
- **Double booking prevention**
- **Confirmation messages** and email notifications

### ✅ Milestone 4: Appointment Management
- **Appointment listing** for Customers and Agents
- **Filtering options** (date, status)
- **Status management** (Scheduled/Completed/Cancelled)
- **Update and cancel** appointment functionality
- **Clean responsive dashboard UI**

### ✅ Additional Features
- **Plan Information Management** with CRUD operations
- **Notification System** with email integration
- **Comprehensive Admin Dashboard** with full system management
- **Real-time statistics** and analytics

## 🛠 Tech Stack

### Frontend
- **React 19.2.0** with modern hooks
- **React Router 7.13.0** for navigation
- **TailwindCSS** for responsive design
- **React Hook Form** for form management
- **React Hot Toast** for notifications
- **Lucide React** for icons
- **Axios** for API communication

### Backend
- **Spring Boot 3.2.0** with Java 17
- **Spring Security** with JWT authentication
- **Spring Data JPA** for database operations
- **MySQL 8.0** database
- **JavaMailSender** for email services
- **Maven** for dependency management

## 📁 Project Structure

```
InsureAi2/
├── corporate-insurance-frontend/          # React Frontend
│   ├── src/
│   │   ├── components/                  # Reusable components
│   │   │   ├── admin/                  # Admin components
│   │   │   ├── AvailabilityForm.jsx
│   │   │   ├── AvailabilityList.jsx
│   │   │   ├── AppointmentList.jsx
│   │   │   ├── AppointmentScheduler.jsx
│   │   │   ├── InsurancePlanList.jsx
│   │   │   ├── NotificationList.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/                     # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/                       # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AgentDashboard.jsx
│   │   │   └── CustomerDashboard.jsx
│   │   ├── services/                    # API services
│   │   └── api.jsx                      # Axios configuration
│   └── package.json
├── corporate-insurance-backend/           # Spring Boot Backend
│   ├── src/main/java/com/insurance/
│   │   ├── config/                      # Security configuration
│   │   ├── controller/                 # REST controllers
│   │   ├── dto/                        # Data Transfer Objects
│   │   ├── entity/                     # JPA entities
│   │   ├── repository/                 # JPA repositories
│   │   ├── security/                   # Security components
│   │   └── service/                    # Business logic
│   └── pom.xml
└── database-schema.sql                  # MySQL database schema
```

## 🗄 Database Schema

### Core Tables
- **users** - User authentication and roles
- **email_verification_tokens** - Email verification
- **password_reset_tokens** - Password reset tokens
- **insurance_plans** - Insurance plan information
- **agent_availability** - Agent time slots
- **appointments** - Appointment bookings
- **customer_plans** - Customer insurance plans
- **notifications** - System notifications

## 🔧 Setup Instructions

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8.0+
- Maven 3.6+

### Backend Setup
1. **Create MySQL Database:**
   ```sql
   CREATE DATABASE corporate_insurance;
   ```

2. **Import Schema:**
   ```bash
   mysql -u root -p corporate_insurance < database-schema.sql
   ```

3. **Configure Application:**
   - Update `src/main/resources/application.properties`
   - Set your MySQL credentials
   - Configure email settings for notifications

4. **Run Backend:**
   ```bash
   cd corporate-insurance-backend
   mvn spring-boot:run
   ```

### Frontend Setup
1. **Install Dependencies:**
   ```bash
   cd corporate-insurance-frontend
   npm install
   ```

2. **Run Frontend:**
   ```bash
   npm run dev
   ```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh-token` - Refresh JWT token
- `GET /api/auth/verify-email` - Email verification
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password

### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/customer` - Get customer appointments
- `GET /api/appointments/agent` - Get agent appointments
- `PUT /api/appointments/{id}/status` - Update appointment status
- `DELETE /api/appointments/{id}` - Delete appointment

### Availability
- `POST /api/availability` - Create availability
- `GET /api/availability/agent/{id}` - Get agent availability
- `GET /api/availability/available` - Get all available slots
- `PUT /api/availability/{id}` - Update availability
- `DELETE /api/availability/{id}` - Delete availability

### Insurance Plans
- `GET /api/plans` - Get all active plans
- `POST /api/plans` - Create plan (Admin)
- `PUT /api/plans/{id}` - Update plan (Admin)
- `DELETE /api/plans/{id}` - Delete plan (Admin)

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/users` - User management
- `GET /api/admin/appointments` - Appointment management
- `GET /api/admin/plans` - Plan management

## 🔐 Security Features

- **JWT Authentication** with refresh tokens
- **Role-based access control** (Admin/Agent/Customer)
- **Password encryption** with BCrypt
- **Email verification** for account activation
- **Secure password reset** with time-limited tokens
- **CORS configuration** for cross-origin requests
- **Input validation** on both frontend and backend

## 📧 Email Integration

- **Appointment confirmations** and cancellations
- **Email verification** for new registrations
- **Password reset** functionality
- **Appointment reminders** (scheduled)
- **Plan expiry notifications**

## 🎯 User Roles & Permissions

### Admin
- Full system management
- User management (CRUD)
- Plan management (CRUD)
- View all appointments and availability
- System statistics and analytics

### Agent
- Manage personal availability
- View and manage appointments
- Access customer information
- Receive appointment notifications

### Customer
- Book appointments
- View personal appointments
- Browse insurance plans
- Manage profile information

## 🚀 Deployment Notes

### Backend
- Configure production database settings
- Set up production email credentials
- Enable HTTPS in production
- Configure CORS for production domain

### Frontend
- Build for production: `npm run build`
- Configure API base URL for production
- Set up proper routing for SPA
- Enable HTTPS

## 🧪 Testing

### Backend Tests
```bash
cd corporate-insurance-backend
mvn test
```

### Frontend Tests
```bash
cd corporate-insurance-frontend
npm test
```

## 📊 System Architecture

The system follows **clean MVC architecture** with:
- **Separation of concerns** between layers
- **RESTful API design** principles
- **Responsive UI** with mobile-first approach
- **Scalable database** design with proper indexing
- **Secure authentication** flow

## 🔄 Future Enhancements

- Real-time notifications with WebSockets
- Advanced analytics and reporting
- Mobile application development
- Integration with payment gateways
- AI-powered recommendation system
- Multi-language support


