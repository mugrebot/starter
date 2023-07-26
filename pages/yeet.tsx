import axios from 'axios';
import { useEffect } from 'react';

const RegisterPage = () => {
  useEffect(() => {
    const registrationEndpoint = 'https://id.worldcoin.org/register';

    const clientMetadata = {
      // Fill this object with your client's metadata
      // The exact fields depend on the provider's requirements
    };

    axios.post(registrationEndpoint, clientMetadata)
      .then(response => {
        console.log('Client ID:', response.data.client_id);
        console.log('Client Secret:', response.data.client_secret);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <h1>Registration Page</h1>
    </div>
  );
};

export default RegisterPage;
