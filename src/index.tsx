import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './Router.tsx'
import { AuthenticationProvider } from './context/AuthenticationContext.tsx'
import AppointmentUpdateProvider from './context/AppointmentUpdateContex.tsx'
import ErrorProvider from './context/ErrorContext.tsx'
import CalendarSelectedDayProvider from './context/CalendarSelectedDayContext.tsx'
import SettingsProvider from './context/SettingsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthenticationProvider>
      <AppointmentUpdateProvider>
        <ErrorProvider>
          <CalendarSelectedDayProvider>
            <SettingsProvider>
              <Router />
            </SettingsProvider>
          </CalendarSelectedDayProvider>
        </ErrorProvider>
      </AppointmentUpdateProvider>
    </AuthenticationProvider>
  </StrictMode>,
)
