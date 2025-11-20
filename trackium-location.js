// trackium-location.js - ИСПРАВЛЕНИЕ

/**
 * Отправить локацию в MiniDapp через keypair
 */
async function uploadLocationToMiniDapp(location) {
  return new Promise((resolve, reject) => {
    const update = {
      deviceId: CONFIG.deviceId,
      latitude: location.latitude,
      longitude: location.longitude,
      accuracy: location.accuracy,
      altitude: 0,
      speed: 0,
      timestamp: new Date().toISOString(),
      source: location.source
    };
    
    // ВАРИАНТ 1: Через HTTP к Minima RPC
    const postData = JSON.stringify({
      command: `keypair action:get key:pending_location_updates`
    });
    
    const url = new URL(CONFIG.minimaNodeUrl);
    url.pathname = '/';
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };
    
    const protocol = url.protocol === 'https:' ? https : http;
    
    const req = protocol.request(url, options, (res) => {
      let data = '';
      
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const response = JSON.parse(data);
          
          let updates = [];
          
          if (response.status && response.response && response.response.value) {
            updates = JSON.parse(response.response.value);
          }
          
          updates.push(update);
          
          // Сохранить обратно
          await saveUpdatesToKeypair(updates);
          
          console.log('📤 Location queued for MiniDapp');
          resolve(true);
          
        } catch (err) {
          console.error('❌ Failed to parse response:', err);
          reject(err);
        }
      });
    });
    
    req.on('error', (err) => {
      console.error('❌ Connection to Minima node failed:', err.message);
      reject(err);
    });
    
    req.write(postData);
    req.end();
  });
}

/**
 * Сохранить updates в keypair
 */
async function saveUpdatesToKeypair(updates) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      command: `keypair action:set key:pending_location_updates value:"${JSON.stringify(updates).replace(/"/g, '\\"')}"`
    });
    
    const url = new URL(CONFIG.minimaNodeUrl);
    url.pathname = '/';
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const protocol = url.protocol === 'https:' ? https : http;
    
    const req = protocol.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('✅ Updates saved to keypair');
        resolve(true);
      });
    });
    
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}
