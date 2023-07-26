import { useEffect } from 'react';

export default function RegisterPage() {
  useEffect(() => {
    const registerApp = async () => {
      const response = await fetch('https://id.worldcoin.org/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_name: 'Example Application',
          application_type: 'web',
          grant_types: 'authorization_code',
          response_types: 'code'
        })
      });

      const data = await response.json();

      console.log('Client ID:', data.client_id);
      console.log('Client Secret:', data.client_secret);
    };

    registerApp().catch(console.error);
  }, []);

  return <div>Registering app...</div>;
}
