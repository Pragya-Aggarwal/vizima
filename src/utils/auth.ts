export const setLoggedIn = (value: boolean) => {
    sessionStorage.setItem('loggedIn', value.toString());
    // Dispatch custom event for login status change
    window.dispatchEvent(new Event('loginStatusChanged'));
};

export const isLoggedIn = (): boolean => {
    return sessionStorage.getItem('loggedIn') === 'true';
};

export const logout = () => {
    sessionStorage.setItem('loggedIn', 'false');
    // Dispatch custom event for login status change
    window.dispatchEvent(new Event('loginStatusChanged'));
}; 