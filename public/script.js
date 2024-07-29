async function postData(url = '', data = {}) {
    document.getElementById('loading').style.display = 'block';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    document.getElementById('loading').style.display = 'none';
    return response.json();
  }
  
  async function getSuggestion() {
    const code = document.getElementById('code').value;
    const response = await postData('/suggest', { code });
    document.getElementById('output').textContent = response.suggestion || response.error;
  }
  
  async function getDebug() {
    const code = document.getElementById('code').value;
    const response = await postData('/debug', { code });
    document.getElementById('output').textContent = response.debug || response.error;
  }
  
  async function getTips() {
    const code = document.getElementById('code').value;
    const response = await postData('/tips', { code });
    document.getElementById('output').textContent = response.tips || response.error;
  }
  