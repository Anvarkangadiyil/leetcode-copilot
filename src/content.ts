// Prevent duplicates
if (!document.getElementById('my-ai-btn')) {
  const btn = document.createElement('button');
  btn.id = 'my-ai-btn';
  btn.innerText = '💡 Copilot';
 

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
     try{
     chrome.runtime.sendMessage({ action: 'openSidePanel' });
     }catch(e){
       // reinject script
       const script = document.createElement('script');
       script.src = chrome.runtime.getURL('background.js');
       document.body.appendChild(script);

     }
 
  };

  document.body.appendChild(btn);
}

