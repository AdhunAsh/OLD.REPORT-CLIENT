# OLD.REPORT - Dress Shopping Website

A modern, production-ready e-commerce website for dress shopping built with React, Vite, and Tailwind CSS.

## 🚀 Production Ready Features

- **Fast Performance** - Optimized bundle size and loading times
- **Smooth User Experience** - CSS transitions instead of heavy animations
- **Mobile Responsive** - Works perfectly on all devices
- **User Authentication** - Powered by Clerk
- **Shopping Cart** - Full cart functionality with quantity management
- **Search & Filter** - Advanced product filtering and search
- **Payment Integration** - Ready for payment processing

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Authentication**: Clerk
- **Routing**: React Router DOM
- **State Management**: Context API
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Icons**: Lucide React

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd OLD.REPORT-CLIENT

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Environment Setup

Create a `.env` file in the root directory:

```env
VITE_BACKEND_URL=your_backend_url
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run build:prod` - Build with production optimizations
- `npm run lint` - Run ESLint

## 🚀 Production Deployment

See [PRODUCTION_GUIDE.md](./PRODUCTION_GUIDE.md) for detailed deployment instructions.

## 📱 Features

### User Features
- Browse dress collections
- Search and filter products
- Add items to cart
- Manage cart quantities
- User authentication (sign up/login)
- Order management
- Responsive design

### Performance Optimizations
- Removed heavy animations (GSAP)
- Optimized bundle splitting
- Lazy loading components
- CSS transitions for smooth interactions
- Minimized re-renders

## 🔍 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── context/       # React Context providers
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── assets/        # Static assets
└── App.jsx        # Main application component
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
