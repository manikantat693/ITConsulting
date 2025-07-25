const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Load configuration from .local file if it exists
let config = {
  LOCAL_PORT: 8000,
  LOCAL_HOST: 'localhost'
};

try {
  if (fs.existsSync('.local')) {
    const localConfig = fs.readFileSync('.local', 'utf8');
    localConfig.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        config[key.trim()] = value.trim();
      }
    });
    console.log('✓ Configuration loaded from .local file');
  }
} catch (error) {
  console.log('⚠ Using default configuration');
}

const PORT = process.env.PORT || config.LOCAL_PORT || 8000;
const HOST = config.LOCAL_HOST || 'localhost';

// Serve static files
app.use(express.static('.'));

// Handle all routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Create necessary directories
const dirs = ['uploads/resumes', 'logs', 'backups'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

app.listen(PORT, HOST, () => {
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║                    CloudFlex IT Solutions                    ║');
  console.log('║                  Local Development Server                    ║');
  console.log('║                        Running!                             ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');
  
  console.log('🌐 Local URL: http://' + HOST + ':' + PORT);
  console.log('🚀 AI Assistant: Enabled');
  console.log('🎨 Glassmorphism UI: Active');
  console.log('🎙️ Voice Recognition: Available');
  console.log('📱 Mobile Responsive: Yes');
  console.log('🔧 Development Mode: On\n');
  
  console.log('📋 Features to test:');
  console.log('   • Click the AI assistant brain icon (bottom-right)');
  console.log('   • Test voice input with the microphone button');
  console.log('   • Try capability cards (Immigration, Jobs, Consulting)');
  console.log('   • Test suggestion chips and quick actions');
  console.log('   • Check mobile responsiveness\n');
  
  // Log startup
  const logMessage = new Date().toISOString() + ': CloudFlex IT server started on port ' + PORT + '\n';
  fs.appendFileSync('logs/startup.log', logMessage);
});