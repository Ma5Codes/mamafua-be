# 🧺 Laundry Management System - Frontend

A modern, responsive React frontend for the Laundry Management System. Built with React, Tailwind CSS, and Lucide React icons.

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** or **yarn**

### Installation & Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file if needed:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_NAME=Laundry Management System
   REACT_APP_VERSION=1.0.0
   ```

4. **Start the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 What You'll See

### Registration Screen
- Clean, modern registration form
- Form validation
- Responsive design
- Professional branding

### Dashboard Screen
- Overview statistics (Weight, Revenue, Transactions, Customers)
- Interactive charts and graphs
- Recent activity feed
- Quick action buttons
- Sidebar navigation

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (⚠️ irreversible)

## 🎨 Technology Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   └── LaundryApp.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS with custom configuration:
- Custom color palette
- Extended font family (Inter)
- Custom component classes

### API Integration
The frontend is configured to work with your backend API:
- Base URL: `http://localhost:5000/api`
- Proxy configuration in package.json
- Environment-based configuration

## 🎯 Next Steps

1. **Connect to Backend API** - Integrate with your existing laundry API
2. **Add Authentication** - Implement JWT token management
3. **Build Transaction Management** - Create forms and tables for transactions
4. **Add Customer Management** - Build customer CRUD operations
5. **Implement Reports** - Add charts and analytics

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel** - Recommended for React apps
- **Netlify** - Great for static sites
- **AWS S3 + CloudFront** - Scalable option
- **Your own server** - Serve the build folder

## 🤝 Development Tips

1. **Hot Reload** - Changes automatically refresh the browser
2. **Component Structure** - Keep components small and focused
3. **Styling** - Use Tailwind utility classes
4. **State Management** - Consider Redux or Zustand for complex state
5. **Testing** - Write tests for critical components

## 📞 Support

If you encounter any issues:
1. Check the console for errors
2. Verify all dependencies are installed
3. Ensure the backend API is running
4. Check network connectivity

Happy coding! 🎉
