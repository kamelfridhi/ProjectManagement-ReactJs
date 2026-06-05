# TeamSphere — web client for team and project management

> Frontend for TeamSphere, used by project managers and team members to track sprints, manage kanban boards, handle tickets, and collaborate in real time.

---

## What I built

A React SPA with protected routing, Redux persisted to localStorage, and an Axios service layer over the NestJS API. Covers email + Google OAuth login, an admin dashboard with Chart.js analytics, drag-and-drop sprint boards, team management with live chat, and a ticket system. Account verification updates over Socket.io without a page reload.

---

## Tech stack

**Frontend:** React 18, Vite 5, React Router 6, Bootstrap 5
**State:** Redux Toolkit, redux-persist
**API:** Axios, socket.io-client
**Forms:** Formik, Yup
**Charts & DnD:** Chart.js, react-chartjs-2, react-beautiful-dnd
**Auth:** Firebase (Google OAuth), jwt-decode

---

## Key features

- Protected routes — unverified users see a waiting screen; verified users access dashboard, projects, teams, and tickets
- Kanban board per sprint with react-beautiful-dnd — drag tasks across status columns, persist via task/status API
- Admin dashboard with employee count, gender, and age distribution charts from backend analytics
- Real-time account approval via Socket.io — Redux updates on `Accepted` / `userdeclined` without re-login
- Team workspace with member management, project assignment, invitations, and per-team chat

---

## How to run it locally

```bash
git clone <repo-url>
cd ProjectManagement-ReactJs
npm install

# Optional .env
# VITE_API_URL=http://localhost:3000/
# VITE_SOCKET_URL=http://localhost:3000
# VITE_FIREBASE_API_KEY=<your-key>

npm run dev      # http://localhost:5173
npm run build && npm run preview
```

Requires the TeamSphere API on port 3000.

---

## Challenges

The hardest part was keeping account verification in sync without polling. I subscribe to Socket.io events in the protected route wrapper and dispatch Redux updates on admin accept/reject — `verifiedAccount` flips live on the waiting screen.


