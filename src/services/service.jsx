const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log(`API_BASE_URL: ${API_BASE_URL}`);


const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: response.statusText || 'Ocorreu um erro na requisição.',
    }));
    throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
  }
  // Se o status for 204 (No Content), não há corpo para parsear
  if (response.status === 204) {
    return null;
  }
  return response.json();
};

const ApiService = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Adicione outros headers, como Authorization, se necessário
        // 'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  put: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },
};

export default ApiService;