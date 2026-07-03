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

    // Base de datos - Historial de proyectos anuales
    const datosProyectos = [
        {
            año: "2026",
            titulo: "Consolidación de alianzas y expansión",
            desc: "Fortalecimiento de las capacidades operativas mediante la consolidación de redes de apoyo interinstitucional. Implementación de nuevos modelos de gestión comunitaria enfocados en la autosuficiencia técnica y la reducción de la brecha digital en sectores prioritarios.",
            abierto: true,
            imagenes: []
        },
        {
            año: "2025",
            titulo: "Desarrollo de capacidades técnicas",
            desc: "Ejecución de programas de capacitación en oficios orientados a la rápida inserción laboral. Se reforzaron las brigadas de salud mental y se establecieron mesas de trabajo para la prevención del delito en zonas de alta vulnerabilidad.",
            imagenes: []
        },
        {
            año: "2024",
            titulo: "Resumen de intervención",
            desc: "Implementación exitosa de talleres de capacitación técnica orientados a la autosuficiencia económica en sectores vulnerables. Se realizaron entregas de herramientas profesionales y se consolidó la vinculación operativa con centros de rehabilitación aliados en el estado.",
            imagenes: []
        },
        {
            año: "2023",
            titulo: "Vinculación territorial y diagnósticos",
            desc: "Despliegue territorial enfocado en la realización de diagnósticos operativos en zonas de alto índice delictivo. Se formalizaron redes vecinales para la prevención y se iniciaron las brigadas de orientación familiar en apoyo psicológico integral.",
            imagenes: []
        }
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

    // Renderizador automatizado de componentes (Historial de Proyectos)
    const renderizarProyectos = () => {
        const contenedor = document.getElementById('contenedor-proyectos');
        if (!contenedor) return; 

        contenedor.innerHTML = datosProyectos.map(proj => {
            const tieneImagenes = proj.imagenes && proj.imagenes.length >= 2;
            const imgHtml1 = tieneImagenes ? `<img src="${proj.imagenes[0]}" class="w-full h-full object-cover rounded-xl" alt="Evidencia operativa 1 del año ${proj.año}" loading="lazy">` : 
                `<div class="bg-slate-100 rounded-xl aspect-[4/3] flex flex-col items-center justify-center border border-slate-200 text-slate-400 text-xs p-2 shadow-inner font-titulo font-semibold tracking-wide gap-1">
                    <svg class="w-5 h-5 opacity-40 text-[#8A0B58]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    Próximamente
                </div>`;
            const imgHtml2 = tieneImagenes ? `<img src="${proj.imagenes[1]}" class="w-full h-full object-cover rounded-xl" alt="Evidencia operativa 2 del año ${proj.año}" loading="lazy">` : 
                `<div class="bg-slate-100 rounded-xl aspect-[4/3] flex flex-col items-center justify-center border border-slate-200 text-slate-400 text-xs p-2 shadow-inner font-titulo font-semibold tracking-wide gap-1">
                    <svg class="w-5 h-5 opacity-40 text-[#5B1E7A]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    Próximamente
                </div>`;

            return `
                <details class="group bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 overflow-hidden" ${proj.abierto ? 'open' : ''}>
                    <summary class="cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors p-6 font-titulo font-bold text-xl text-[#5B1E7A] flex justify-between items-center list-none select-none focus:outline-none focus:bg-slate-100">
                        Proyectos Operativos ${proj.año}
                        <svg class="w-5 h-5 text-slate-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>
                    </summary>
                    <div class="p-6 md:p-8 border-t border-slate-100 flex flex-col md:flex-row gap-8">
                        <div class="flex-1 space-y-4">
                            <h4 class="font-titulo font-bold text-slate-900 text-lg">${proj.titulo}</h4>
                            <p class="text-slate-600 text-sm font-light leading-relaxed text-justify md:text-left">${proj.desc}</p>
                        </div>
                        <div class="flex-1 grid grid-cols-2 gap-4">
                            ${imgHtml1}
                            ${imgHtml2}
                        </div>
                    </div>
                </details>
            `;
        }).join('');
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

            linksNav.forEach(link => {
                link.classList.remove('text-purple-700', 'font-bold');
                link.classList.add('text-slate-600');
            });

            // Selección segura utilizando comillas simples estructurales
            const linkActivo = document.querySelector('.nav-link[data-target="' + targetId + '"]');
            if (linkActivo) {
                linkActivo.classList.remove('text-slate-600');
                linkActivo.classList.add('text-purple-700', 'font-bold');
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    // Inicialización de módulos
    renderizarPilares();
    renderizarProyectos();
    inicializarNavegacion();
});