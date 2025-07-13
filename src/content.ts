// Prevent duplicates
if (!document.getElementById('my-ai-btn')) {
  const btn = document.createElement('button');
  btn.id = 'my-ai-btn';
  btn.innerText = '🧠 AI';
 

  Object.assign(btn.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 10000,
    padding: '10px 15px',
    borderRadius: '8px',
    backgroundColor: '#673ab7',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  });

  btn.onclick = () => {

     chrome.runtime.sendMessage({ action: 'open_side_panel' });
 
  };

  document.body.appendChild(btn);
}

