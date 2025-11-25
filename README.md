# Gravit Event Web App

React client for searching events, booking seats, and running the admin tools.

## Getting Started

1. Install dependencies with `npm install`.
2. Add `VITE_API_URL` to `.env` (defaults to the backend `http://localhost:5000/api`).
3. Run `npm run dev` and open the printed URL in your browser.

## What It Includes

- Public pages for browsing and filtering events.
- Auth pages for login, signup, and profile updates.
- Seat picker that talks to the backend through Socket.IO.
- Admin views for creating events and reviewing bookings.

## Build

Use `npm run build` to create a production bundle in `dist`. Serve that folder with any static host.
