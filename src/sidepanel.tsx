
import ReactDOM from 'react-dom/client'

const SidePanel = () => {
  return (
    <div style={{ width: '300px', padding: '10px' }}>
      <h1>🧠 AI Assistant</h1>
      <p>This is your sidebar panel content.</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<SidePanel />)
