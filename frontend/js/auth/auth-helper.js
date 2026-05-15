function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
} 

const currentUser = getCurrentUser();
