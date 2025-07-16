// This file contains JavaScript code for the frontend application, handling user interactions, and dynamic content updates.

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const modules = document.querySelectorAll('.module');
    const toast = document.getElementById('toast');

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });

    function showModule(event, moduleId) {
        modules.forEach(module => {
            module.classList.remove('active');
        });
        document.getElementById(moduleId).classList.add('active');

        // Hide toast when switching modules
        toast.classList.add('hidden');
    }

    // Example function to show toast notification
    function showToast(message) {
        toast.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }

    // Add event listeners for navigation
    const navItems = document.querySelectorAll('.sidebar li');
    navItems.forEach(item => {
        item.addEventListener('click', (event) => {
            const moduleId = item.getAttribute('onclick').match(/'([^']+)'/)[1];
            showModule(event, moduleId);
        });
    });
});