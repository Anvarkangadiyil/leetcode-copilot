console.log('Content script loaded');

const button = document.createElement('button');
button.textContent = '🧠 Open Panel';
button.style.position = 'fixed';
button.style.bottom = '20px';
button.style.right = '20px';
button.style.zIndex = '10000';
button.style.padding = '10px 15px';
button.style.borderRadius = '5px';
button.style.backgroundColor = '#4CAF50';
button.style.color = 'white';
button.style.border = 'none';
button.style.cursor = 'pointer';

button.onclick = () => {
  chrome.runtime.sendMessage({ action: 'open_side_panel' });
};

document.body.appendChild(button);
