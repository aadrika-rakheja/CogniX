// Utility function to get authorization headers with token
export const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

// Function to get the stored token
export const getToken = () => {
    return localStorage.getItem("token");
};

// Function to get the stored role
export const getUserRole = () => {
    return localStorage.getItem("role");
};

// Function to clear auth data (logout)
export const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
};

// Function to decode token and get user info (without verification)
export const decodeToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};
