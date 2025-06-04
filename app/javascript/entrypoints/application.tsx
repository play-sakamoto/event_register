import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../src/providers/auth-provider";
import "../styles/index.css";
import HomePage from "../src/pages/home";
import MemoryListPage from "../src/pages/memory_lists";
import SignUpPage from "../src/pages/auth/signup";
import LoginPage from "../src/pages/auth/login/index";
import PrivateRoute from "../src/components/layouts/PrivateRoute";
import Header from "../src/components/layouts/Header";
import MemoryCreatePage from "../src/pages/memory_lists/new";
import MemoryShowPage from "../src/pages/memory_lists/show";
import MemoryEditPage from "../src/pages/memory_lists/edit";
import ProfilePage from "../src/pages/profile/show";
import EventsPage from "../src/pages/event/index";
import NewEventPage from "../src/pages/event/new/new";
import EventDetailPage from "../src/pages/event/show/show";
import EditEventPage from "../src/pages/event/edit/EditEventPage"; // Added import


document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("react-root");
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/memories" element={<MemoryListPage />} />
              <Route path="/memories/:id" element={<MemoryShowPage />} />
              <Route path="/memories/new" element={<MemoryCreatePage />} />
              <Route path="/memories/:id/edit" element={<MemoryEditPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/new" element={<NewEventPage />} />
              {/*
                The EventDetailPage route seems to have a slight issue with how params are passed.
                Normally, React Router handles params internally. The component itself (EventDetailPage)
                would use `useParams` hook to get the `id`.
                For example: `const { id } = useParams();` inside EventDetailPage.
                The route definition would just be: <Route path="/events/:id" element={<EventDetailPage />} />
                I will correct this for both EventDetailPage and EditEventPage.
              */}
              <Route path="/events/:id" element={<EventDetailPage />} />
              <Route path="/events/:id/edit" element={<EditEventPage />} />
            </Route>
          </Routes>
        </Router>

      </AuthProvider>
    );
  }
});
