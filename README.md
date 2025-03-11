# AzaVC - Venture Capital Portfolio Management App

AzaVC is a mobile application designed to help venture capital firms and investors manage their investment portfolios, track deals, and monitor performance metrics.

## Features

- **Portfolio Management**: Track and manage your investment portfolio with detailed analytics
- **Deal Flow**: Monitor and evaluate potential investment opportunities
- **Calendar**: Schedule and manage meetings with portfolio companies and potential investments
- **Wallet**: Track financial transactions and capital allocations
- **User Authentication**: Secure login and user management

## Tech Stack

- **Framework**: [Expo](https://expo.dev) with [React Native](https://reactnative.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) for file-based routing
- **State Management**: [React Sweet State](https://github.com/atlassian/react-sweet-state) for global state management
- **UI Components**: Custom components with [React Native Paper](https://reactnativepaper.com/)
- **Styling**: React Native StyleSheet with a custom theming system
- **API Client**: Axios for API requests

## Project Structure

```
azavc/
├── api/                  # API services and client configuration
├── app/                  # Main application screens (Expo Router)
│   ├── (app)/            # Authenticated app screens
│   │   ├── (tabs)/       # Bottom tab navigation screens
│   │   └── drawer/       # Drawer navigation screens
├── assets/               # Static assets like images and fonts
├── components/           # Reusable UI components
│   ├── auth/             # Authentication related components
│   ├── layout/           # Layout components
│   └── ui/               # UI elements and design system components
├── store/                # State management
│   └── sweetState/       # React Sweet State implementation
├── theme/                # Theme configuration and styles
├── types/                # TypeScript type definitions
└── utils/                # Utility functions and helpers
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- iOS Simulator or Android Emulator (optional for mobile development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/azaventures/azavc-frontend.git
   cd azavc-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on specific platforms:
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For web
   npm run web
   ```

## Development

### Code Style

This project follows the ESLint and Prettier configuration for consistent code style. Run linting with:

```bash
npm run lint
```

### Testing

Run tests with:

```bash
npm test
```

## Deployment

### Expo Build

To create a production build:

```bash
npm run build:ios     # For iOS
npm run build:android # For Android
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## Contact

AzaVC Team - [contact@azaventures.com](mailto:contact@azaventures.com)

Project Link: [https://github.com/azaventures/azavc-frontend](https://github.com/azaventures/azavc-frontend)
