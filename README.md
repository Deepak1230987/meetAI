# 🤖 Meet AI - Intelligent Meeting Assistant

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=for-the-badge&logo=openai)](https://openai.com/)

**Meet AI** is a revolutionary real-time meeting platform that enables you to have live video conversations with custom AI agents. Schedule face-to-face meetings, engage in real-time discussions, and interact with AI personalities as if you're meeting with real people - all powered by cutting-edge AI technology and high-quality video streaming.

## ✨ Features

### 🎯 Core Features

- **🎥 Real-time AI Meetings** - Have live video conversations with AI agents in real-time
- **🤖 Custom AI Personalities** - Create AI agents with unique personalities, expertise, and conversation styles
- **📹 High-Quality Video Calls** - Crystal-clear video streaming powered by Stream API
- **�️ Natural Voice Conversations** - AI agents respond with realistic speech and natural conversation flow
- **⚡ Instant Responses** - Real-time AI processing for seamless conversation experience
- **� Meeting Scheduling** - Book and manage appointments with your AI agents
- **🎭 Visual AI Avatars** - Each AI agent has a unique visual representation during video calls
- **� Multi-modal Interaction** - Combine video, voice, and text communication in real-time

### 🎨 Real-time Experience

- **🌙 Immersive Meeting UI** - Beautiful, distraction-free video call interface
- **⚡ Live Status Updates** - Real-time meeting status, connection quality, and participant info
- **📱 Cross-Platform Meetings** - Join AI meetings from desktop, tablet, or mobile devices
- **🎭 Dynamic AI Avatars** - AI agents appear with realistic avatars and expressions
- **✨ Smooth Video Transitions** - Seamless video quality adjustments and smooth animations
- **🔄 Real-time Sync** - Perfect synchronization between video, audio, and AI responses

### 🔐 Authentication & Security

- **📧 Email/Password Authentication** - Traditional email-based registration
- **🔗 Social Login** - Google and GitHub OAuth integration
- **🛡️ Secure Sessions** - JWT-based session management with Better Auth
- **🔒 Protected Routes** - Role-based access control

## 🏗️ Tech Stack

### Frontend

- **[Next.js 14+](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern React component library
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Backend & Database

- **[tRPC](https://trpc.io/)** - End-to-end typesafe APIs
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Reliable relational database
- **[TanStack Query](https://tanstack.com/query/)** - Powerful data synchronization

### AI & Real-time Communication

- **[OpenAI API](https://openai.com/api/)** - GPT-4 for intelligent real-time conversations
- **[Stream Video API](https://getstream.io/video/)** - Enterprise-grade real-time video streaming
- **[WebRTC](https://webrtc.org/)** - Peer-to-peer real-time communication
- **[WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)** - Real-time bidirectional communication
- **[Better Auth](https://www.better-auth.com/)** - Secure session management for video calls

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API key
- Stream API credentials
- Google/GitHub OAuth credentials (optional)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/meet-ai.git
   cd meet-ai
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables**

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/meetai"

   # OpenAI
   OPENAI_API_KEY="sk-your-openai-api-key"

   # Stream
   STREAM_API_KEY="your-stream-api-key"
   STREAM_API_SECRET="your-stream-api-secret"

   # Authentication
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"

   # OAuth (Optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   ```

5. **Database Setup**

   ```bash
   # Generate and run migrations
   npm run db:generate
   npm run db:migrate

   # Seed the database (optional)
   npm run db:seed
   ```

6. **Start Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   │   ├── sign-in/       # Sign in page
│   │   └── sign-up/       # Sign up page
│   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── agents/        # AI agents management
│   │   └── meetings/      # Meetings management
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/                # shadcn/ui components
│   ├── command-select.tsx # Custom select component
│   └── generated-avatar.tsx # Avatar generator
├── db/                    # Database configuration
│   ├── index.ts           # Database connection
│   └── schema.ts          # Drizzle schema
├── lib/                   # Utility libraries
│   ├── auth.ts            # Authentication config
│   ├── auth-client.ts     # Client-side auth
│   └── utils.ts           # Helper functions
├── modules/               # Feature modules
│   ├── agents/            # AI agents module
│   │   ├── schema.ts      # Agent validation schemas
│   │   ├── types.ts       # TypeScript types
│   │   └── ui/            # Agent UI components
│   ├── auth/              # Authentication module
│   └── meetings/          # Meetings module
└── trpc/                  # tRPC configuration
    ├── client.ts          # Client-side tRPC
    └── server.ts          # Server-side tRPC
```

## 🎯 Key Features Implementation

### Real-time AI Meeting

```typescript
// Join a real-time video meeting with an AI agent
const meeting = await trpc.meetings.create.mutate({
  name: "AI Consultation Session",
  agentId: agent.id,
  type: "video-call",
  scheduledAt: new Date(),
});

// Initialize real-time video call
const streamClient = new StreamVideoClient({
  apiKey: process.env.STREAM_API_KEY!,
  user: currentUser,
  token: userToken,
});

const call = streamClient.call("default", meeting.id);
await call.join({
  create: true,
  data: {
    members: [{ user_id: currentUser.id }, { user_id: `ai-${agent.id}` }],
  },
});
```

### AI Agent Conversation

```typescript
// Real-time AI conversation processing
const handleUserMessage = async (message: string) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: agent.instructions },
      ...conversationHistory,
      { role: "user", content: message },
    ],
    stream: true, // Enable streaming for real-time responses
  });

  // Stream AI response in real-time
  for await (const chunk of completion) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      await streamToVideoCall(content);
    }
  }
};
```

### Live Video Stream Management

```typescript
// Manage real-time video stream quality
const optimizeVideoQuality = async () => {
  await call.updateCallSettings({
    video: {
      camera_default_on: true,
      camera_facing: "user",
      enabled: true,
    },
    audio: {
      mic_default_on: true,
      noise_cancellation: true,
      echo_cancellation: true,
    },
  });
};
```

## 🔧 Configuration

### Database Schema

The application uses Drizzle ORM with PostgreSQL. Key tables include:

- **users** - User authentication and video call profiles
- **agents** - AI agent configurations and personalities
- **meetings** - Real-time meeting sessions and video call records
- **call_sessions** - Active video call tracking and analytics
- **conversation_history** - AI conversation logs during meetings

### API Routes

- `/api/auth/*` - Authentication endpoints
- `/api/trpc/*` - tRPC API endpoints
- `/api/stream/*` - Video streaming webhooks and real-time events
- `/api/ai/*` - AI conversation processing endpoints
- `/api/meetings/*` - Real-time meeting management

## 🎨 UI Components

### Custom Components

- **VideoCallInterface** - Real-time video meeting UI with AI agents
- **AIAgentAvatar** - Dynamic AI agent visual representation
- **MeetingControls** - Video call controls (mute, camera, screen share)
- **ConversationPanel** - Real-time chat during video meetings
- **CallQualityIndicator** - Live video/audio quality monitoring
- **AgentPersonalityEditor** - Create/edit AI agent personalities
- **MeetingScheduler** - Schedule video meetings with AI agents

### Animation System

```css
/* Custom animations for enhanced UX */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE_URL="your-production-database-url"
OPENAI_API_KEY="your-openai-api-key"
STREAM_API_KEY="your-stream-api-key"
STREAM_API_SECRET="your-stream-api-secret"
BETTER_AUTH_SECRET="your-production-secret"
BETTER_AUTH_URL="https://yourdomain.com"
```

## 📊 Performance Optimizations

- **Code Splitting** - Automatic route-based code splitting
- **Image Optimization** - Next.js Image component with lazy loading
- **Database Indexing** - Optimized database queries with proper indexes
- **Caching** - TanStack Query for efficient data caching
- **Bundle Analysis** - Regular bundle size monitoring

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests in watch mode
npm run test:watch
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run db:generate  # Generate database migrations
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Drizzle Studio
```

### Code Quality

- **TypeScript** - Strict type checking enabled
- **ESLint** - Custom rules for code consistency
- **Prettier** - Automatic code formatting
- **Husky** - Pre-commit hooks for quality assurance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 API Documentation

### tRPC Endpoints

#### Agents

- `agents.getMany` - List all agents
- `agents.getOne` - Get agent by ID
- `agents.create` - Create new agent
- `agents.update` - Update existing agent
- `agents.delete` - Delete agent

#### Meetings

- `meetings.getMany` - List all meetings
- `meetings.getOne` - Get meeting by ID
- `meetings.create` - Schedule new meeting
- `meetings.update` - Update meeting details
- `meetings.delete` - Cancel meeting

## 🔒 Security

- **Input Validation** - Zod schemas for all user inputs
- **SQL Injection Prevention** - Parameterized queries with Drizzle ORM
- **XSS Protection** - React's built-in XSS protection
- **CSRF Protection** - CSRF tokens for state-changing operations
- **Rate Limiting** - API rate limiting to prevent abuse

## 📈 Monitoring & Analytics

- **Error Tracking** - Integrated error boundary system
- **Performance Monitoring** - Core Web Vitals tracking
- **User Analytics** - Meeting engagement metrics
- **API Monitoring** - tRPC procedure performance tracking

## 🆘 Troubleshooting

### Common Issues

**Database Connection Issues**

```bash
# Check database connection
npm run db:studio
```

**Authentication Problems**

```bash
# Verify environment variables
echo $BETTER_AUTH_SECRET
```

**Build Failures**

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vercel](https://vercel.com) for hosting and deployment
- [OpenAI](https://openai.com) for AI capabilities
- [Stream](https://getstream.io) for video streaming
- [shadcn/ui](https://ui.shadcn.com) for beautiful components
- All contributors and the open-source community

## 📞 Support

- 📧 Email: support@meetai.com
- 💬 Discord: [Join our community](https://discord.gg/meetai)
- 📖 Documentation: [docs.meetai.com](https://docs.meetai.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/meet-ai/issues)

---

<p align="center">
  Made with ❤️ by the Meet AI Team
</p>

<p align="center">
  <a href="https://meetai.com">Website</a> •
  <a href="https://docs.meetai.com">Documentation</a> •
  <a href="https://discord.gg/meetai">Community</a>
</p>
