import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Context from './Context/Context.jsx';
import './index.css'


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Context>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Context>
  </StrictMode>,
)
