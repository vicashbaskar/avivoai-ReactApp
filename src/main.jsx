import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react';
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ChakraProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>
  //  </StrictMode>,
)
