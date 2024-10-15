# CinemaApp - Frontend

CinemaApp is a web application designed to facilitate online movie ticket purchases for movie companies around the country. This repository contains the frontend code, which interacts with the backend services for ticket purchasing, seat reservations, and viewing projection schedules.

## Project Overview

This is the frontend part of the CinemaApp, built using **React**. It provides an intuitive and user-friendly interface for customers to browse movie schedules, select seats, and purchase tickets.

## Dependencies

- **React**: The main library for building the frontend user interface.
- **React Router**: For navigation between different views (movie listings, seat selection, etc.).
- **Axios**: For handling HTTP requests to the backend.
- **CSS**: For styling and layout.

## Setup and Installation

1. Ensure that **Node.js** is installed on your system.

2. Clone the frontend repository:

    ```bash
    git clone https://github.com/avdosator/CinemaApp-Frontend
    ```

3. Navigate to the project directory:

    ```bash
    cd CinemaApp-frontend
    ```

4. Install dependencies:

    ```bash
    npm install
    ```

5. Start the Vite development server:

    ```bash
    npm run dev
    ```
## Running the App

By default, the app will run on `http://localhost:5173`. If it is occupied, define other port in your app's **.env** file.

## Backend Integration

The frontend interacts with the backend services hosted in the [CinemaApp Backend repository](https://github.com/avdosator/CinemaApp-Backend). Ensure that the backend is running for full functionality.
