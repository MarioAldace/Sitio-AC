/* Dev: Mario Aldaco Acevedo */

document.addEventListener('DOMContentLoaded', () => {
    
    // Base de datos - Pilares de acción institucional
    const datosPilares = [
        { id: "01", titulo: "Apoyo institucional", desc: "Fortalecemos la estructura operativa y administrativa de organismos aliados, centros de rehabilitación y colectivos comunitarios." },
        { id: "02", titulo: "Orientación familiar", desc: "Acompañamos a los núcleos familiares en crisis, dotándolos de estrategias para afrontar escenarios de riesgo o violencia." },
        { id: "03", titulo: "Reintegración comunitaria", desc: "Desarrollamos redes de apoyo vecinal para asegurar que las personas se reincoren activamente a su entorno." },
        { id: "04", titulo: "Cultura de paz", desc: "Fomentamos la legalidad y la resolución pacífica de conflictos en zonas vulnerables, promoviendo espacios seguros." },
        { id: "05", titulo: "Capacitación y oficios", desc: "Impulsamos la formación técnica como herramienta de autosuficiencia, combatiendo la marginación económica." },
        { id: "06", titulo: "Salud mental", desc: "Coordinamos brigadas psicológicas enfocadas en superar traumas y lograr estabilidad emocional para el crecimiento personal." }
    ];

    // Renderizador automatizado de componentes (Pilares)
    const renderizarPilares = () => {
        const contenedor = document.getElementById('contenedor-pilares');
        if (!contenedor) return; 

        contenedor.innerHTML = datosPilares.map(pilar => `
            <div class="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-white shadow-md transition-transform hover:-translate-y-1">
                <div class="text-[#8A0B58] font-bold text-2xl mb-2">${pilar.id}</div>
                <h3 class="font-titulo font-bold text-slate-900 text-base mb-2 font-semibold">${pilar.titulo}</h3>
                <p class="text-sm text-slate-600 font-light leading-relaxed">${pilar.desc}</p>
            </div>
        `).join('');
    };

    // Controlador de navegación SPA por delegación de eventos y accesibilidad por teclado
    const inicializarNavegacion = () => {
        const secciones = document.querySelectorAll('.seccion-app');
        const linksNav = document.querySelectorAll('.nav-link');

        document.body.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-navegacion');
            if (!btn) return;

            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            if (!targetId) return;

            secciones.forEach(sec => {
                sec.classList.add('oculto');
                sec.classList.remove('animar-entrada');
            });
            
            const targetSeccion = document.getElementById(targetId);
            if (targetSeccion) {
                targetSeccion.classList.remove('oculto');
                void targetSeccion.offsetWidth; // Forzar reflow para reiniciar animación CSS
                targetSeccion.classList.add('animar-entrada');
            }

            // Seleccionamos los enlaces y limpiamos estilos
            linksNav.forEach(link => {
                link.classList.remove('text-purple-700', 'font-bold');
                link.classList.add('text-slate-600');
            });

            // Solo si el elemento existe en el menú superior, lo activamos visualmente
            const linkActivo = document.querySelector('.nav-link[data-target="' + targetId + '"]');
            if (linkActivo) {
                linkActivo.classList.remove('text-slate-600');
                linkActivo.classList.add('text-purple-700', 'font-bold');
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    // Función global para solicitar documentos (enlazada al botón de transparencia)
    window.solicitarDocumento = function(nombreDocumento) {
        // Simular un clic en la navegación hacia la sección de contacto
        const btnContacto = document.querySelector('.nav-link[data-target="sec-contacto"]');
        if(btnContacto) {
            btnContacto.click();
        }
        
        // Dar tiempo a la animación de transición de página antes de pre-llenar el formulario
        setTimeout(() => {
            const textarea = document.getElementById('mensaje');
            if(textarea) {
                textarea.value = `Solicito formalmente acceso a la versión pública del documento institucional: ${nombreDocumento}, para fines de revisión y acreditación.`;
                textarea.focus(); // Centra la pantalla visualmente en el campo escrito
            }
        }, 500);
    };

    // Inicialización de módulos
    renderizarPilares();
    inicializarNavegacion();
});