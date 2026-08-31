// js/main.js

// Cargar el sidebar dinámicamente
document.addEventListener('DOMContentLoaded', function () {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        fetch('components/sidebar.html')
            .then(response => {
                if (!response.ok) throw new Error('Error al cargar el sidebar');
                return response.text();
            })
            .then(html => {
                sidebarContainer.innerHTML = html;
                // Una vez insertado, asignar los eventos a los botones
                attachSidebarEvents();
            })
            .catch(error => console.error('Error:', error));
    }
});

// Función para asignar eventos a los botones del sidebar
function attachSidebarEvents() {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const tabId = this.dataset.tab;
            if (tabId) {
                switchTab(tabId, this);
            }
        });
    });
}

// Función para cambiar de pestaña
function switchTab(tabId, btnElement) {
    // Ocultar todas las pestañas
    const tabs = document.querySelectorAll('.tab-pane');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remover clase activa de todos los botones
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Activar la pestaña objetivo
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    // Activar el botón cliqueado
    if (btnElement) {
        btnElement.classList.add('active');
    }

    // Scroll al inicio del contenido
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función para mostrar notificaciones (toast) - se mantiene
function showToast(title, message) {
    const toast = document.getElementById('toastModal');
    if (!toast) return;
    document.getElementById('toastTitle').innerText = title;
    document.getElementById('toastMsg').innerText = message;
    toast.style.display = 'flex';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 4000);
}