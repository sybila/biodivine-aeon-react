# Biodivine AEON React

**Biodivine AEON React** is the frontend (as of version **0.6.0 and
later**) for the Biodivine/AEON tool.\
It is implemented using **React**, **TypeScript**, **TailwindCSS**, and
**Vite**.

**Biodivine AEON** is a web-based application for analyzing and
manipulating Partially Specified Boolean Networks. It
allows users to:

-   Load and modify Partially Specified Boolean Networks
-   Perform attractor analysis
-   Compute control perturbations
  
The system consists of two parts:

-   **Frontend:** This repository --- the interactive web interface
-   **Backend (Compute Engine):** A standalone executable that performs
    all heavy computations

A live version of the frontend is available at:
👉 https://biodivine.fi.muni.cz/aeon/\
Alternatively, you can run the frontend locally by downloading this repository and using the scripts described in the Developer Instructions section.

## 🚀 Developer Instructions

### Prerequisites

-   **Node.js** (latest LTS recommended)

### Installation & Development

Clone or download this repository, then install dependencies:

``` bash
npm install
```

### Available Scripts

| Command          | Description                                          |
|------------------|------------------------------------------------------|
| `npm run dev`    | Starts the development server with hot module replacement |
| `npm run build`  | Builds the production version into the `/dist` folder |
| `npm run preview`| Serves the built project from `/dist`                |
| `npm run lint`   | Runs ESLint checks                                   |

## ⚙️ Compute Engine

To run analyses inside AEON, the frontend must connect to a **Compute
Engine** running locally on your machine.\
If no suitable binary exists for your OS, you can compile one yourself
following the instructions in the\
➡️ <a href="https://github.com/sybila/biodivine-aeon-server">Biodivine Aeon Server GitHub repository</a>.

## 📥 Download Precompiled Compute Engines

### Linux (x86-64) <a href="https://github.com/sybila/biodivine-control-tool/raw/refs/heads/main/ComputeEngine/Linux-x86-64bit-Compute-Engine.zip">Download here</a>
### Windows (x86-64) <a href="https://github.com/sybila/biodivine-control-tool/raw/refs/heads/main/ComputeEngine/Windows-x86-64bit-Compute-Engine.zip">Download here</a>
### MacOs (x86-64 - Intel-based) <a href="https://github.com/sybila/biodivine-control-tool/raw/refs/heads/main/ComputeEngine/MacOs-x86-64bit-Compute-Engine.zip">Download here</a>
### MacOS (arm64 - Apple Silicon) <a href="https://github.com/sybila/biodivine-control-tool/raw/refs/heads/main/ComputeEngine/MacOs-arm64-Compute-Engine.zip">Download here</a>

## 🔧 Compute Engine Setup Guide

All precompiled Compute Engines must be extracted (unzipped) before use.

### Linux (x86-64)

To run this version of Compute Engine, you need a Linux distribution with an x86-64 architecture.

Run the Compute Engine: After unzipping, navigate to the folder and run the compute-engine file.

Fix Permissions (if necessary): If you encounter a permission error, you may need to update the permissions of the compute-engine file. To do this, run the following command in your terminal:

    chmod +x compute-engine

After updating the permissions, you can try running the compute-engine file again.

### Windows (x86-64)

To run this version of Compute Engine, you need a Windows distribution with an x86-64 architecture.

Run the Compute Engine: After unzipping, navigate to the folder and run the compute-engine file.

Bypass Security Warning: Windows may flag the executable as a potential security risk and display a warning message. If this happens:

1) Look for a "Run" button in the warning window.

2) If you don't see it immediately, you may need to click a "Show More" or "More Info" button to reveal the option to run the application.

3) Click the Run button, and the Compute Engine should start.

### MacOS (x86-64 - Intel-based)

To run  this version of Compute Engine on MacOS with an x86-64 architecture (Intel-based Macs, not Apple M processors).

Run the Compute Engine: After unzipping, navigate to the folder and run the compute-engine file.

Bypass Security Warning: MacOS may block the execution of the file if it is from an unidentified developer. If this happens:

1) Open System Preferences and go to Security & Privacy.

2) Under the General tab, look for a message saying the compute-engine was blocked.

3) Click Open Anyway, and the Compute Engine should run.

### MacOS (arm64 - Apple Silicon)

Same steps as Intel macOS.

## 🗂️ AEON Home Page

The repository additionally contains the AEON Home Page (/aeon-home.html) used to display available versions of the AEON frontend.
This page is designed for internal Sybila deployment; the links to documentation and frontend builds work only on the Sybila server.

A live version is available at: 👉 https://biodivine.fi.muni.cz/aeon/