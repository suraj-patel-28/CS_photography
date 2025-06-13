# Photography Portfolio Website

A modern, full-stack MERN photography portfolio website with stunning visuals, smooth animations, and a robust contact form system.

## Features

- 🎨 **Modern Design**: Sleek, dark theme with purple accents and glassmorphism effects
- 📱 **Fully Responsive**: Optimized for all devices from mobile to desktop
- ⚡ **High Performance**: Lazy loading, code splitting, and optimized images
- 🎬 **Media Gallery**: Support for both photos and videos with modal viewer
- 📧 **Contact System**: Full contact form with email notifications
- 🔒 **Secure**: Input validation, rate limiting, and security headers
- 🎯 **SEO Optimized**: Meta tags and structured data ready

## Tech Stack

### Frontend

- React 18 with Hooks
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API calls
- React Lazy Load for performance

### Backend

- Node.js & Express
- MongoDB with Mongoose
- Multer & Cloudinary for media uploads
- Nodemailer for emails
- Express Validator for input validation
- Helmet for security

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd photography-website
   ```

2. **Install dependencies**

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Configuration**

   ```bash
   # In the server directory, create .env file
   cd ../server
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:

   - MongoDB connection string
   - Email configuration
   - Cloudinary credentials (optional)

4. **Run the application**
   ```bash
   # From the server directory
   npm run dev-all
   ```
   This will start both the backend (port 5000) and frontend (port 3000)

## Project Structure

```
photography-website/
├── client/                # React frontend
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── hooks/        # Custom hooks
│   │   └── utils/        # Utility functions
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── utils/            # Helper functions
```

## API Endpoints

### Contact Routes

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (Admin)
- `PUT /api/contact/:id` - Update contact status (Admin)
- `DELETE /api/contact/:id` - Delete contact (Admin)

### Media Routes

- `GET /api/media` - Get all media items
- `POST /api/media` - Upload new media (Admin)
- `DELETE /api/media/:id` - Delete media (Admin)

## Customization

### Changing Colors

Edit the Tailwind config file (`client/tailwind.config.js`) to customize the color scheme:

```javascript
colors: {
  primary: {
    // Your custom primary colors
  }
}
```

### Adding New Pages

1. Create a new component in `client/src/pages/`
2. Add the route in `client/src/App.jsx`
3. Update navigation in `client/src/components/common/Navbar.jsx`

### Email Configuration

Update the email templates in `server/utils/emailService.js` to match your brand.

## Deployment

### Frontend (Vercel/Netlify)

1. Build the React app:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `build` folder to your hosting service

### Backend (Heroku/Railway)

1. Set environment variables on your hosting platform
2. Deploy the server directory
3. Update the `CLIENT_URL` in production

## Performance Optimization

- Images are lazy-loaded with blur placeholders
- Routes are code-split for faster initial load
- Compression middleware reduces payload size
- Browser caching headers for static assets

## Security Features

- Input validation on all forms
- Rate limiting to prevent abuse
- Helmet.js for security headers
- CORS properly configured
- Environment variables for sensitive data

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@yourphotography.com or create an issue in the repository.
