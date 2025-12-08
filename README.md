# Partha Pratim Mallick - Personal Portfolio

This is a modern, responsive personal portfolio website built with Next.js, TypeScript, and styled with Tailwind CSS and ShadCN UI components. It's designed to showcase skills, projects, and professional experience in a clean and elegant way.

## Features

- **Modern Tech Stack**: Built with Next.js App Router, React, and TypeScript.
- **Responsive Design**: Looks great on all devices, from mobile phones to desktops.
- **Theming**: Includes light and dark mode, with system preference detection.
- **Key Sections**:
  - Hero section with a clear call-to-action.
  - About Me, Skills, Featured Projects, and Work Experience.
  - Functional Contact Form that opens the user's email client.
- **Dockerized**: Includes a `Dockerfile` for easy and consistent deployment.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or another package manager
- Docker (optional, for containerized deployment)

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result. The page will auto-update as you edit the files.

## Docker Deployment

This application is fully containerized for easy deployment.

1. **Build the Docker image:**
   Make sure Docker is running, then execute the following command in your project's root directory:
   ```bash
   docker build -t portfolio .
   ```

2. **Run the Docker container:**
   Once the image is built, you can run it with:
   ```bash
   docker run -p 3000:3000 portfolio
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/app/`: Contains the main pages and layout of the application.
- `src/components/`: Reusable React components, including UI elements from ShadCN.
- `src/lib/`: Utility functions, static data, and placeholder image configurations.
- `public/`: Static assets like images and CV files.
- `Dockerfile`: Configuration for building the production Docker image.
- `next.config.ts`: Next.js configuration file.
- `tailwind.config.ts`: Tailwind CSS configuration.
