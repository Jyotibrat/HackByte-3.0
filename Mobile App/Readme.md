# Mobile App - AI Floor Plan Generator

This directory contains the React Native mobile application for our AI-powered floor plan generation system. The app provides an intuitive mobile interface for users to generate, view, and manage architectural floor plans using various AI models.

## ✨ Features

- **Cross-Platform**: Runs on both iOS and Android devices
- **AI Model Selection**: Choose from multiple AI models for different generation styles
- **Real-time Generation**: Generate floor plans with live progress tracking
- **Prompt Validation**: AI-powered validation to ensure architecture-related prompts
- **Image Gallery**: View and manage generated floor plans
- **Offline Capability**: Cache generated images for offline viewing
- **Share Functionality**: Export and share floor plans with others
- **User-Friendly Interface**: Intuitive design optimized for mobile interaction

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile development framework
- **TypeScript** - Type-safe JavaScript for better development experience
- **Expo** - Development platform and tools for React Native
- **React Navigation** - Navigation library for screen transitions
- **React Native Image** - Enhanced image handling and caching
- **React Native Share** - Native sharing capabilities
- **Axios** - HTTP client for API communication

## 🚀 Installation and Running the Application

To know about the Installation and How to run the Application, [**Click Here**](https://github.com/Jyotibrat/HackByte-3.0/?tab=readme-ov-file#-for-mobile-application)

## 📁 Project Structure

```
Mobile App/
├───tsconfig.json
├───package.json
├───package-lock.json
├───app.json
├───.prettierrc
├───.gitignore
├───hooks/
│   └───useFrameworkReady.ts
│
├───backend/
│   ├───requirements.txt
│   └───app.py
│
├───assets/
│   └───images/
│       ├───icon.png
│       ├───favicon.png
│       ├───Results/
│       │   ├───Stable Diffusion/
│       │   │   └───Result 1 stable diffusion.png
│       │   │
│       │   ├───Multi Modal/
│       │   │   ├───Result 4 multi modal.png
│       │   │   ├───Result 3 multi modal.png
│       │   │   ├───Result 2 multi modal.png
│       │   │   └───Result 1 multi modal.png
│       │   │
│       │   └───Gemini/
│       │       └───Result 1 gemini.png
│       │
│       ├───Model Architectures/
│       │   ├───Stable Diffusion and ControlNet Architecture.jpg
│       │   ├───Multi Modal Architecture .jpg
│       │   └───Gemini with matplotlib model architecture.jpg
│       │
│       └───Contributors/
│           ├───Bindupautra Jyotibrat.jpg
│           ├───Avinash Kushwaha.jpeg
│           ├───Arunim Gogoi.png
│           └───Ansh Photo.jpg
│
└───app/
    ├───_layout.tsx
    ├───+not-found.tsx
    └───(tabs)/
        ├───results.tsx
        ├───models.tsx
        ├───index.tsx
        ├───contributors.tsx
        └───_layout.tsx
```

## 🎨 UI/UX Design

### Design Principles

- **Mobile-First**: Optimized for touch interactions
- **Clean Interface**: Minimalist design focusing on functionality
- **Accessibility**: Support for screen readers and accessibility features
- **Responsive**: Adapts to different screen sizes and orientations

### Typography

- System fonts for optimal readability
- Scalable text for accessibility
- Consistent font weights and sizes

## 🐛 Known Issues

### Current Limitations

- Image generation may take 30+ seconds for complex prompts
- Limited offline functionality for new generations
- iOS simulator may have performance issues with image processing

### Workarounds

- Progress indicators for long-running generations
- Cached results for offline viewing
- Optimized image formats for mobile displays

## 🚀 Future Enhancements

### Planned Features
- **3D Visualization**: Basic 3D view of generated floor plans
- **Augmented Reality**: AR preview of floor plans in real space
- **Collaborative Features**: Share and collaborate on floor plans
- **Template Library**: Pre-built templates for common layouts
- **Export Options**: PDF, CAD file exports
- **Voice Input**: Generate floor plans using voice commands

### Technical Improvements
- **Real-time Collaboration**: WebSocket integration
- **Advanced Caching**: Smarter image caching strategies
- **Push Notifications**: Generation completion notifications
- **Biometric Authentication**: Secure app access
- **Cloud Sync**: Cross-device synchronization

---

**Note**: This mobile app is currently in development and optimized for the hackathon demonstration. For production use, additional security measures, performance optimizations, and thorough testing are recommended.