// protocols.js
// Load and display the internal Hato Lab protocol list from protocols.csv.
fetch('protocols.csv')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.text();
  })
  .then(data => {
    const protocolList = document.getElementById('protocolList');
    const status = document.getElementById('protocolStatus');
    const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');

    // Skip the header row.
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const commaIndex = line.indexOf(',');
      if (commaIndex === -1) continue;

      const url = line.slice(0, commaIndex).trim();
      const sentence = line.slice(commaIndex + 1).trim();
      if (!url || !sentence) continue;

      const card = document.createElement('article');
      card.className = 'protocol-card';

      const title = document.createElement('h3');
      title.className = 'protocol-title';
      title.textContent = sentence;

      const link = document.createElement('a');
      link.className = 'protocol-action';
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Open protocol ↗';
      link.setAttribute('aria-label', `Open ${sentence}`);

      card.appendChild(title);
      card.appendChild(link);
      protocolList.appendChild(card);
    }

    protocolList.setAttribute('aria-busy', 'false');
    if (status) status.remove();
  })
  .catch(error => {
    console.error('Error loading protocol data:', error);
    const status = document.getElementById('protocolStatus');
    if (status) {
      status.textContent = 'Unable to load the protocol list. Please try again later.';
    }
    const protocolList = document.getElementById('protocolList');
    if (protocolList) protocolList.setAttribute('aria-busy', 'false');
  });
