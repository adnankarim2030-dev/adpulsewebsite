# AdPulse Media Agency Website

A high-converting, modern, and professional website built for **AdPulse IMC**, a premier 360 media agency in Karachi.

## 🚀 Features

- **Dynamic Services Showcase**: Explore TVC production, Digital Marketing, PR, and more.
- **Portfolio / Case Studies**: View successful projects with detailed results.
- **Lead Generation System**: Integrated contact and inquiry forms with server-side validation.
- **Admin Dashboard**: Secure panel to view leads and manage site content.
- **Blog / Insights**: Latest marketing trends and agency news.
- **Fully Responsive**: Optimized for all devices from mobile to ultra-wide desktops.
- **Premium Design**: White gradient backgrounds with high-end red and teal accents matching the AdPulse logo.

## 🛠️ Technology Stack

- **Frontend**: Next.js 15+ (App Router)
- **Styling**: Vanilla CSS (Global Variables & Design System)
- **Database**: SQLite with Prisma ORM
- **Icons**: React Icons (Fa, Md, etc.)
- **Fonts**: Google Fonts (Inter & Outfit)

## 💻 Local Setup Instructions

Follow these steps to get the project running on your local machine:

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (Version 18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### 2. Clone the Repository
```bash
git clone <repository-url>
cd adpulse-website
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Initialize Database
Generate the Prisma client and push the schema to your local SQLite database:
```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Development Server
```bash
npm run dev
```

### 6. View the Site
Open [http://localhost:3000](http://localhost:3000) in your browser.
To access the Admin Panel, visit [http://localhost:3000/admin](http://localhost:3000/admin).

## 📁 Folder Structure

- `src/app`: Page components and routing.
- `src/components`: Reusable UI elements (Navbar, Footer, etc.).
- `src/actions`: Server actions for form handling.
- `src/lib`: Shared utilities (Prisma client).
- `prisma`: Database schema and migrations.
- `public`: Static assets (Logo, images).

## 📄 License
© 2024 AdPulse IMC (Pvt) Ltd. All Rights Reserved.
