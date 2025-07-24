# 🚀 CloudFlex IT Local Development Guide

This guide explains how to run your CloudFlex IT website locally using the provided configuration files.

## 📋 Quick Start

### Option 1: Using Startup Scripts (Recommended)

#### For Linux/Mac/WSL:
```bash
./start-local.sh
```

#### For Windows:
```cmd
start-local.bat
```

### Option 2: Manual Start
```bash
python3 -m http.server 8000
```

Then open: **http://localhost:8000**

---

## 📁 Configuration Files

### `.local` File
Contains all environment variables and configuration settings for local development:

- **Server Settings**: Host, port, URLs
- **Company Information**: Contact details, social media
- **AI Assistant Config**: Voice settings, response delays
- **Feature Flags**: Enable/disable specific features
- **Development Tools**: Debugging, logging, monitoring

### Startup Scripts
- **`start-local.sh`**: Unix/Linux/Mac startup script
- **`start-local.bat`**: Windows startup script

Both scripts:
- Load configuration from `.local` file
- Check port availability
- Create necessary directories
- Display helpful information
- Start the development server

---

## 🎯 Features to Test

### 🤖 AI Assistant
- **Location**: Bottom-right corner (brain icon)
- **Voice Input**: Click microphone button
- **Capabilities**: Immigration, Jobs, Consulting, Career
- **Features**: Typing indicators, suggestions, rich responses

### 💼 Job Portal
- **Browse Jobs**: Various IT positions
- **Apply**: Upload resume, fill application
- **Filter**: By location, skills, visa status
- **Sponsorship**: H1B sponsorship available

### 🏛️ Immigration Services
- **H1B Information**: Process, timeline, costs
- **Green Card**: EB-2/EB-3 guidance
- **Documentation**: Required papers checklist
- **Consultation**: Schedule expert meetings

### 🚀 Consulting Services
- **Cloud Migration**: AWS, Azure, GCP
- **DevOps**: CI/CD, automation
- **Development**: Custom applications
- **Analytics**: Data science, AI/ML

---

## 🔧 Development Configuration

### Port Configuration
Default port: `8000`
To change port, edit `.local` file:
```
LOCAL_PORT=3000
```

### Enable/Disable Features
Edit `.local` file:
```
AI_ASSISTANT_ENABLED=true
VOICE_RECOGNITION_ENABLED=true
ENABLE_PWA=true
```

### Company Information
Update in `.local` file:
```
COMPANY_NAME=CloudFlex IT Solutions, Inc.
COMPANY_PHONE=336-281-2871
CONTACT_EMAIL=admin@cloudflexit.com
```

---

## 🌐 Access URLs

### Local Development
- **Main Site**: http://localhost:8000
- **AI Assistant**: Available on all pages
- **Job Portal**: http://localhost:8000#jobs
- **Contact**: http://localhost:8000#contact

### Mobile Testing
- **Desktop Browser**: Press F12 → Device Toolbar
- **Real Device**: Use computer's IP address
  ```
  http://[YOUR_IP]:8000
  ```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Check what's using the port
lsof -i :8000

# Kill the process
sudo kill -9 $(lsof -ti:8000)

# Or use a different port in .local file
LOCAL_PORT=3000
```

### Python Not Found
Install Python 3:
- **Ubuntu/Debian**: `sudo apt install python3`
- **macOS**: `brew install python3`
- **Windows**: Download from python.org

### AI Assistant Not Working
1. Check browser console (F12)
2. Ensure JavaScript is enabled
3. Try different browser
4. Check microphone permissions for voice

### File Upload Issues
Ensure directories exist:
```bash
mkdir -p uploads/resumes
mkdir -p logs
mkdir -p backups
```

---

## 📱 Mobile Testing

### Browser DevTools
1. Open browser (Chrome/Firefox)
2. Press F12 for Developer Tools
3. Click device toggle icon
4. Select device type (iPhone, Android)
5. Test touch interactions

### Real Device Testing
1. Find your computer's IP address:
   - **Windows**: `ipconfig`
   - **Mac/Linux**: `ifconfig`
2. Open `http://[YOUR_IP]:8000` on mobile
3. Test all features on actual device

---

## 🔍 Testing Checklist

### ✅ Basic Functionality
- [ ] Website loads successfully
- [ ] All pages accessible
- [ ] Images and logos display
- [ ] Navigation works smoothly

### ✅ AI Assistant
- [ ] Chat widget appears (bottom-right)
- [ ] Can open and close chat
- [ ] Messages send and receive
- [ ] Voice input works (if supported)
- [ ] Capability cards clickable
- [ ] Suggestion chips functional

### ✅ Job Portal
- [ ] Job listings display
- [ ] Filters work correctly
- [ ] Application modal opens
- [ ] Resume upload functions
- [ ] Form validation works

### ✅ Mobile Responsiveness
- [ ] Layout adapts to screen size
- [ ] Touch interactions work
- [ ] Text is readable
- [ ] Buttons are touchable
- [ ] Chat widget is accessible

### ✅ Performance
- [ ] Pages load quickly
- [ ] Animations are smooth
- [ ] No console errors
- [ ] Images optimize correctly

---

## 📊 Monitoring

### Logs
- **Startup Log**: `logs/startup.log`
- **Access Log**: Browser developer console
- **Error Log**: Browser console errors tab

### Performance
- **Network Tab**: Check resource loading
- **Lighthouse**: Run audit for performance
- **Mobile Test**: Test on actual devices

---

## 🚀 Deployment

### GitHub Pages
1. Push to `main` branch
2. Enable GitHub Pages in repository settings
3. Site will be available at: `https://manikantat693.github.io/ITConsulting`

### Custom Domain
1. Add CNAME record pointing to GitHub Pages
2. Update repository settings
3. Enable HTTPS

### Other Platforms
- **Netlify**: Connect GitHub repository
- **Vercel**: Auto-deploy from Git
- **Firebase**: Use Firebase hosting

---

## 💡 Tips

### Development
- Use browser developer tools for debugging
- Check console for JavaScript errors
- Test on multiple browsers
- Verify mobile responsiveness

### Performance
- Optimize images for web
- Minimize HTTP requests
- Use browser caching
- Enable compression

### SEO
- Update meta descriptions
- Add alt text to images
- Use semantic HTML
- Submit sitemap to search engines

---

## 📞 Support

For technical issues or questions:
- **Email**: admin@cloudflexit.com
- **Phone**: 336-281-2871
- **GitHub**: Check repository issues

---

## 🎉 Enjoy Your CloudFlex IT Website!

Your innovative AI assistant and modern website are ready to impress visitors and generate leads! 🚀