# Alpha Corp Capital Cycle - Interactive Learning Platform

![Preview](public/vite.svg)

**Alpha Corp Capital Cycle** is an interactive storytelling and educational web application designed to visualize and teach complex political economy concepts (Marxist-Leninist framework). Through a practical, real-world case study of a real estate corporation (Alpha Corp) facing a liquidity crisis, the platform transforms abstract academic theories into an engaging, interactive learning experience.

## ✨ Features

- **Interactive Data Storytelling**: A step-by-step interactive journey that dissects the capital cycle (Money -> Commodity -> Production -> Commodity' -> Money') and how a break in this chain leads to systemic failure.
- **Dynamic Simulations**: Users can manipulate market conditions (such as crisis mode, interest rates, and capital allocation) to see real-time ripple effects on the economy and stakeholders.
- **Comprehensive Knowledge Hub**: A centralized repository of academic concepts presented with clean typography and a modern, accessible UI.
- **Academic Quizzes**: Built-in assessment tools to validate the user's understanding of the learning material.
- **Modern UI/UX**: Built with a custom design system, utilizing CSS variables for consistent spacing, beautiful typography, and smooth micro-animations.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Vanilla CSS with a strict CSS Variables (Tokens) Design System
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/nguyendinhthanhh/alpha-corp-capital-cycle.git
   ```
2. Navigate to the project directory:
   ```sh
   cd alpha-corp-capital-cycle
   ```
3. Install NPM packages:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173`.

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components (Shared, Hero, Market, Theory, etc.)
├── data/             # Static data files (Story content, Quiz questions, etc.)
├── pages/            # Top-level page components (Landing, Simulators, Quiz, etc.)
├── utils/            # Utility functions and shared logic
├── index.css         # Global styles and design system tokens
└── main.jsx          # Application entry point
```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
