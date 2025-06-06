export const setLoggedIn = (value: boolean) => {
    localStorage.setItem('loggedIn', value.toString());
    // Dispatch custom event for login status change
    window.dispatchEvent(new Event('loginStatusChanged'));
};

export const isLoggedIn = (): boolean => {
    return localStorage.getItem('loggedIn') === 'true';
};

export const logout = () => {
    localStorage.setItem('loggedIn', 'false');
    // Dispatch custom event for login status change
    window.dispatchEvent(new Event('loginStatusChanged'));
}; 