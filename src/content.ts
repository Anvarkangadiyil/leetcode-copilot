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
    // Toggle iframe
    const existing = document.getElementById('my-ai-panel');
    if (existing) {
      existing.remove();
      return;
    }

    const iframe = document.createElement('iframe');
    iframe.id = 'my-ai-panel';
    iframe.src = chrome.runtime.getURL('sidepanel.html');
    Object.assign(iframe.style, {
      position: 'fixed',
      top: '0',
      right: '0',
      width: '350px',
      height: '100%',
      zIndex: 99999,
      border: 'none',
      boxShadow: '0 0 10px rgba(0,0,0,0.3)'
    });

    document.body.appendChild(iframe);
  };

  document.body.appendChild(btn);
}
