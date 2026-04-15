import React, { useEffect, useState } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

const rootElement = document.getElementById("root")
if (!rootElement) {
  throw new Error("Root element not found")
}

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement,
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>)
} else {
  createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>)
}

export default function Root() {
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    // 404 redirect session restore
    const redirect = sessionStorage.getItem("redirect")

    if (redirect) {
      sessionStorage.removeItem("redirect")
      window.history.replaceState(null, "", redirect)
    }

    // allow loader to show briefly OR wait for App init
    const timer = setTimeout(() => {
      setBooting(false)
    }, 200) // adjust or remove if App handles loading

    return () => clearTimeout(timer)
  }, [])

  return (
    <React.StrictMode>
      {booting ? (//leave this booting here for npm run build
        <div className="loading-overlay">
          <div className="loading-bar">
            <div className="loading-progress" />
          </div>
        </div>
      ) : (
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )}

    </React.StrictMode>
  )
}

// createRoot(document.getElementById('root')!).render(
//   <Root />

// )