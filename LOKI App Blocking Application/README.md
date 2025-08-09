# LOKI - Focus & App Blocking 📱

Block distracting apps using NFC tags to stay focused and productive.

## 🚀 Quick Start for Testing

### Option 1: Deploy to Vercel (Recommended)

1. **Create GitHub Repository**
   - Go to [GitHub.com](https://github.com) and create a new repository
   - Upload all your project files to this repository

2. **Deploy to Vercel**
   - Go to [Vercel.com](https://vercel.com) and sign up with your GitHub account (free)
   - Click "New Project" and select your LOKI repository
   - Vercel will automatically detect it's a React app and deploy it
   - You'll get a URL like `https://loki-app-yourname.vercel.app`

3. **Generate Icons** (temporary step)
   - Open `/public/create-icons.html` in your browser
   - Right-click each canvas and save as `icon-192.png` and `icon-512.png`
   - Upload these to your `/public` folder in GitHub

4. **Test on Phone**
   - Open the Vercel URL on your phone
   - You should see an "Install" or "Add to Home Screen" option
   - The app will install like a native app!

### Option 2: Deploy to Netlify

1. Create account at [Netlify.com](https://netlify.com) (free)
2. Connect your GitHub repository
3. Deploy with build command: `npm run build`
4. Output directory: `build`

### Option 3: GitHub Pages

1. In your repository, go to Settings → Pages
2. Select source: "Deploy from a branch"
3. Choose `main` branch and `/` folder
4. Your app will be at `https://yourusername.github.io/repository-name`

## 📱 Installing on Phones

### Android
- Open the URL in Chrome
- Tap the "Add to Home Screen" banner
- Or tap menu (⋮) → "Add to Home screen"

### iOS (iPhone/iPad)  
- Open the URL in Safari
- Tap the Share button (□↗)
- Select "Add to Home Screen"
- Tap "Add"

## 🧪 Testing Features

The app includes:
- ✅ Full Icelandic interface
- ✅ Onboarding flow (Welcome → Why → How → What is NFC → Registration → Profiles)
- ✅ Profile management (Vinna, Heima, Einbeiting, Venjulegt)
- ✅ Simulated NFC scanning
- ✅ App selection and blocking interface
- ✅ Persistent data storage
- ✅ Offline functionality (PWA)
- ✅ Mobile-optimized design

### Testing Flow
1. Go through onboarding screens
2. "Register" an NFC tag (simulated)
3. Set up profiles with blocked apps
4. Test the NFC scan simulation
5. Try the app selection screens

## 🔄 Making Updates

1. Make changes to your code
2. Push to GitHub
3. Vercel/Netlify will automatically redeploy
4. Changes appear on your live URL in ~1 minute

## 🤝 Sharing for Testing

Send testers:
1. **Your app URL** (from Vercel/Netlify)
2. **Installation instructions** above
3. **Testing checklist** of features to try

## ⚠️ Current Limitations

- NFC scanning is simulated (web browsers have limited NFC support)
- App blocking is simulated (requires native functionality)
- Real NFC would need a native app or special browser permissions

## 🎯 Next Steps

- Test user flow on different devices
- Collect feedback from Icelandic users
- Consider React Native for real NFC functionality
- Add analytics to track usage patterns