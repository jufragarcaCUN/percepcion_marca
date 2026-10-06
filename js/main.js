/* ============================================================
   MAIN.JS
   CUN - Percepción de Marca
   ============================================================ */

/* ============================================================
   1. CARGA DINÁMICA DEL SIDEBAR
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
    const sidebarContainer = document.getElementById('sidebar-container');

    if (!sidebarContainer) return;

    fetch('components/sidebar.html')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar el sidebar');
            return response.text();
        })
        .then(html => {
            sidebarContainer.innerHTML = html;
            attachSidebarEvents(); // Asignar eventos tras insertar
        })
        .catch(error => console.error('Error:', error));
});


/* ============================================================
   2. EVENTOS DEL SIDEBAR
   ============================================================ */
function attachSidebarEvents() {
    const buttons = document.querySelectorAll('.nav-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            const tabId = this.dataset.tab;
            if (tabId) {
                switchTab(tabId, this);
            }
        });
    });
}


/* ============================================================
   3. CAMBIO DE PESTAÑA
   ============================================================ */
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


/* ============================================================
   4. TOAST / NOTIFICACIONES
   ============================================================ */
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


/* ============================================================
   5. EFECTO FLOTANTE DE LAS TARJETAS (SECCIÓN MUESTRA)
   ============================================================ */
(function initSampleFloatingEffect() {
    const sampleSection = document.querySelector('#tamano-muestra');
    const sampleCards = document.querySelectorAll('.sample-card');
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');

    // ✅ Salir si no existe la sección (evita errores en otras páginas)
    if (!sampleSection) return;

    sampleSection.addEventListener('mousemove', (event) => {
        const rect = sampleSection.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (x - centerX) / centerX;
        const moveY = (y - centerY) / centerY;

        // Orbes
        if (orb1) {
            orb1.style.transform = `translate(${moveX * 35}px, ${moveY * 35}px)`;
        }
        if (orb2) {
            orb2.style.transform = `translate(${moveX * -25}px, ${moveY * -25}px)`;
        }

        // Tarjetas
        sampleCards.forEach((card, index) => {
            const intensity = (index + 1) * 1.2;
            card.style.transform = `translate(${moveX * intensity}px, ${moveY * intensity}px)`;
        });
    });

    sampleSection.addEventListener('mouseleave', () => {
        if (orb1) orb1.style.transform = 'translate(0, 0)';
        if (orb2) orb2.style.transform = 'translate(0, 0)';

        sampleCards.forEach(card => {
            card.style.transform = '';
        });
    });
})();


/* ============================================================
   6. ANIMACIÓN DEL RESULTADO (número 381)
   ============================================================ */
(function initResultAnimation() {
    const resultNumber = document.querySelector('.result-number');

    // ✅ Salir si no existe el elemento
    if (!resultNumber) return;

    const target = Number(resultNumber.dataset.target) || 0;
    const duration = 1200;
    const start = performance.now();

    function animateNumber(timestamp) {
        const progress = Math.min((timestamp - start) / duration, 1);
        const current = Math.floor(progress * target);

        resultNumber.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(animateNumber);
        } else {
            resultNumber.textContent = target;
        }
    }

    requestAnimationFrame(animateNumber);
})();


/* ============================================================
   7. CONTADORES ANIMADOS (ESTADÍSTICAS DE PORTADA)
   ============================================================ */
(function initCounters() {
    const counters = [
        { id: 'count1', target: 0, suffix: '' },
        { id: 'count2', target: 0, suffix: '' },
        { id: 'count3', target: 0, suffix: '' },
        { id: 'count4', target: 0, suffix: '+' }
    ];

    function animateCounter(id, target, suffix) {
        const el = document.getElementById(id);
        if (!el) return;

        let current = 0;
        const increment = Math.max(1, Math.ceil(target / 40));

        const interval = setInterval(() => {
            current += increment;

            if (current >= target) {
                current = target;
                clearInterval(interval);
            }

            el.textContent = current + suffix;
        }, 30);
    }

    window.addEventListener('load', () => {
        counters.forEach(c => animateCounter(c.id, c.target, c.suffix));
    });

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            counters.forEach(c => {
                const el = document.getElementById(c.id);
                if (el && el.textContent === '0') {
                    animateCounter(c.id, c.target, c.suffix);
                }
            });
        }
    });
})();