// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/ui/Toast';
import { ProfileModal } from './components/modals/ProfileModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { DirectoryPage } from './pages/DirectoryPage';
import { ConnectionsPage } from './pages/ConnectionsPage';
import { JobsPage } from './pages/JobsPage';
import { EventsPage } from './pages/EventsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

// API Client
import { 
  authApi, 
  alumniApi, 
  connectionApi, 
  jobApi, 
  eventApi, 
  getAuthToken 
} from './api/client';

// Fallback Initial Datasets
import {
  currentUserMock,
  alumniProfilesMock,
  jobsMock,
  eventsMock,
  connectionRequestsMock,
  notificationsMock,
} from './data/mockData';

export function App() {
  const [currentUser, setCurrentUser] = useState(currentUserMock);
  const [alumniList, setAlumniList] = useState(alumniProfilesMock);
  const [jobsList, setJobsList] = useState(jobsMock);
  const [eventsList, setEventsList] = useState(eventsMock);
  const [connectionRequests, setConnectionRequests] = useState(connectionRequestsMock);
  const [notifications, setNotifications] = useState(notificationsMock);
  const [toast, setToast] = useState(null);
  const [selectedProfileModal, setSelectedProfileModal] = useState(null);
  const [isLiveBackendConnected, setIsLiveBackendConnected] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Initial Sync with Spring Boot REST Backend
  useEffect(() => {
    async function syncWithBackend() {
      try {
        // Attempt to verify session or fetch current user
        if (getAuthToken()) {
          const user = await authApi.getCurrentUser().catch(() => null);
          if (user) {
            setCurrentUser(user);
          }
        }

        // Fetch live alumni from MySQL
        const alumniData = await alumniApi.search('', 'ALL', 'ALL');
        if (alumniData && alumniData.length > 0) {
          setAlumniList(alumniData);
          setIsLiveBackendConnected(true);
        }

        // Fetch live jobs from MySQL
        const jobsData = await jobApi.search('', 'ALL');
        if (jobsData && jobsData.length > 0) {
          setJobsList(jobsData);
        }

        // Fetch live events from MySQL
        const eventsData = await eventApi.search('', 'ALL');
        if (eventsData && eventsData.length > 0) {
          setEventsList(eventsData);
        }

        // Fetch received connection requests
        const reqData = await connectionApi.getReceived().catch(() => null);
        if (reqData) {
          setConnectionRequests(reqData);
        }
      } catch (err) {
        console.info('Backend initial sync notice:', err.message);
      }
    }

    syncWithBackend();
  }, []);

  // Connection Handlers
  const handleConnectProfile = async (profile) => {
    try {
      if (profile.userId) {
        await connectionApi.send(profile.userId, 'Hi, I would love to connect!').catch(() => null);
      }
      setAlumniList((prev) =>
        prev.map((a) =>
          a.id === profile.id ? { ...a, connectionStatus: 'PENDING' } : a
        )
      );
      showToast(`Connection invitation sent to ${profile.fullName}!`, 'success');
    } catch (err) {
      showToast(err.message || 'Could not send invitation', 'error');
    }
  };

  const handleAcceptRequest = async (req) => {
    try {
      await connectionApi.accept(req.id).catch(() => null);
      setAlumniList((prev) =>
        prev.map((a) =>
          a.id === (req.sender?.id || req.senderId) ? { ...a, connectionStatus: 'ACCEPTED' } : a
        )
      );
      setConnectionRequests((prev) => prev.filter((r) => r.id !== req.id));
      showToast(`Connected with ${req.sender?.fullName || req.senderName}!`, 'success');
    } catch (err) {
      showToast(err.message || 'Could not accept invitation', 'error');
    }
  };

  const handleIgnoreRequest = async (reqId) => {
    try {
      await connectionApi.reject(reqId).catch(() => null);
      setConnectionRequests((prev) => prev.filter((r) => r.id !== reqId));
      showToast('Invitation ignored.', 'info');
    } catch (err) {
      showToast(err.message || 'Could not ignore invitation', 'error');
    }
  };

  const handleCancelRequest = async (alumniId) => {
    try {
      await connectionApi.cancel(alumniId).catch(() => null);
      setAlumniList((prev) =>
        prev.map((a) =>
          a.id === alumniId ? { ...a, connectionStatus: 'NONE' } : a
        )
      );
      showToast('Connection request cancelled.', 'info');
    } catch (err) {
      showToast(err.message || 'Could not cancel request', 'error');
    }
  };

  // RSVP Handler
  const handleToggleRsvp = async (eventId) => {
    try {
      const updated = await eventApi.toggleRsvp(eventId).catch(() => null);
      if (updated) {
        setEventsList((prev) =>
          prev.map((e) => (e.id === eventId ? updated : e))
        );
        showToast(
          updated.isRegistered
            ? `RSVP confirmed for "${updated.title}"!`
            : `RSVP cancelled for "${updated.title}".`,
          updated.isRegistered ? 'success' : 'info'
        );
      } else {
        // Local fallback toggle
        setEventsList((prev) =>
          prev.map((e) => {
            if (e.id === eventId) {
              const isNowRegistered = !e.isRegistered;
              return {
                ...e,
                isRegistered: isNowRegistered,
                registeredCount: isNowRegistered
                  ? e.registeredCount + 1
                  : Math.max(0, e.registeredCount - 1),
              };
            }
            return e;
          })
        );
        showToast('RSVP updated.', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Could not update RSVP status', 'error');
    }
  };

  // Job Handlers
  const handleAddNewJob = async (newJob) => {
    try {
      const created = await jobApi.create(newJob).catch(() => null);
      setJobsList((prev) => [created || newJob, ...prev]);
      showToast(`Job listing "${newJob.title}" posted successfully!`, 'success');
    } catch (err) {
      showToast(err.message || 'Could not post opportunity', 'error');
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await jobApi.delete(jobId).catch(() => null);
      setJobsList((prev) => prev.filter((j) => j.id !== jobId));
      showToast('Job listing removed.', 'info');
    } catch (err) {
      showToast(err.message || 'Could not remove job listing', 'error');
    }
  };

  // Event Handlers
  const handleDeleteEvent = async (eventId) => {
    try {
      await eventApi.delete(eventId).catch(() => null);
      setEventsList((prev) => prev.filter((e) => e.id !== eventId));
      showToast('Event removed.', 'info');
    } catch (err) {
      showToast(err.message || 'Could not remove event', 'error');
    }
  };

  // Auth Handlers
  const handleLogin = (user) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.fullName}!`, 'success');
  };

  const handleRegister = (user) => {
    setCurrentUser(user);
    showToast(`Account created successfully! Welcome to Alumni Connect.`, 'success');
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      // ignore
    }
    setCurrentUser(null);
    showToast('Signed out successfully.', 'info');
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#0B1020] text-[#F3F5FC]">
        {/* Navigation Bar */}
        <Navbar
          currentUser={currentUser}
          onLogout={handleLogout}
          notifications={notifications}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage
                  onConnectProfile={handleConnectProfile}
                  onViewProfile={(p) => setSelectedProfileModal(p)}
                />
              }
            />
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
            <Route
              path="/register"
              element={<RegisterPage onRegister={handleRegister} />}
            />

            {/* Authenticated Routes */}
            <Route
              path="/dashboard"
              element={
                currentUser ? (
                  <DashboardPage
                    currentUser={currentUser}
                    alumniList={alumniList}
                    jobsList={jobsList}
                    eventsList={eventsList}
                    connectionRequests={connectionRequests}
                    onConnectProfile={handleConnectProfile}
                    onViewProfile={(p) => setSelectedProfileModal(p)}
                    onToggleRsvp={handleToggleRsvp}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/directory"
              element={
                currentUser ? (
                  <DirectoryPage
                    alumniList={alumniList}
                    onConnectProfile={handleConnectProfile}
                    onViewProfile={(p) => setSelectedProfileModal(p)}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/connections"
              element={
                currentUser ? (
                  <ConnectionsPage
                    alumniList={alumniList}
                    connectionRequests={connectionRequests}
                    onAcceptRequest={handleAcceptRequest}
                    onIgnoreRequest={handleIgnoreRequest}
                    onCancelRequest={handleCancelRequest}
                    onViewProfile={(p) => setSelectedProfileModal(p)}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/jobs"
              element={
                currentUser ? (
                  <JobsPage
                    currentUser={currentUser}
                    jobsList={jobsList}
                    onAddNewJob={handleAddNewJob}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/events"
              element={
                currentUser ? (
                  <EventsPage
                    eventsList={eventsList}
                    onToggleRsvp={handleToggleRsvp}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/ai-advisor"
              element={
                currentUser ? (
                  <AIAssistantPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/admin"
              element={
                currentUser?.role === 'ADMIN' ? (
                  <AdminPage
                    alumniList={alumniList}
                    jobsList={jobsList}
                    eventsList={eventsList}
                    onDeleteJob={handleDeleteJob}
                    onDeleteEvent={handleDeleteEvent}
                  />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />

            {/* Fallback 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Global Modal for Alumni Profiles */}
        <ProfileModal
          profile={selectedProfileModal}
          isOpen={!!selectedProfileModal}
          onClose={() => setSelectedProfileModal(null)}
          onConnect={(p) => {
            handleConnectProfile(p);
            setSelectedProfileModal({ ...p, connectionStatus: 'PENDING' });
          }}
        />

        {/* Global Toast Feedback */}
        <Toast toast={toast} onClose={() => setToast(null)} />

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
