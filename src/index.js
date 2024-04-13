import { createRoot } from 'react-dom/client'
import Modal from 'react-modal'
import App from './App'
import './index.css'

const container = document.getElementById('root')
Modal.setAppElement('#root')
const root = createRoot(container)
root.render(<App />)