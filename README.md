NyayaBot — Indian Legal Assistant 🇮🇳
A purpose-built AI chatbot for Indian legal queries, built with React + Vite and powered by OpenRouter (GPT-4o mini).

What it does
NyayaBot helps users understand Indian laws, legal rights, and procedures in simple language. Ask it about FIR filing, bail rights, RTI, consumer complaints, property disputes, domestic violence protection, and more.

Features
AI-powered responses via OpenRouter API (GPT-4o mini) trained on Indian legal context
Hinglish support — responds in the same language the user writes in
Out-of-scope detection — politely refuses non-legal questions with a dedicated UI component
Quick suggestion chips — shown on first load to guide new users
Legal-themed loading state — animated Scales of Justice instead of a generic spinner
Error state with retry — handles API failures gracefully with a one-click retry
Message timestamps — every message shows time sent
Copy button — copy any bot response to clipboard
Scroll-to-bottom button — appears when user scrolls up in long conversations
Responsive design — disclaimer text collapses to an info icon tooltip on mobile

Design Details
Spinning Ashoka Chakra as background
Tricolor (saffron / white / green) bars at top and bottom
Scale of Justice icon in the navbar
Hindi subtitle: भारतीय कानूनी सहायक

Tech Stack
React 19
Vite 5
Tailwind CSS v4
Lucide React (icons)
OpenRouter API (GPT-4o mini)
Deployed on Vercel

Project Structure
src/
├── components/
│   ├── ChatUi.jsx          # Main chat layout
│   ├── ChatMessage.jsx     # Message bubble with timestamp + copy
│   ├── LegalLoader.jsx     # Animated scales of justice loader
│   ├── OutOfScopeMessage.jsx  # Shown for non-legal queries
│   ├── ErrorMessage.jsx    # API error state with retry
│   └── AshokaChakra.jsx    # SVG background element
├── services/
│   └── aiService.js        # OpenRouter API call
└── utils/
    └── prompt.js           # System prompt for the AI

