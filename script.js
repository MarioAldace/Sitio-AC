document.addEventListener('DOMContentLoaded', () => {
    
    const datosPilares = [
        { id: "01", titulo: "Fortalecimiento Operativo y Estructural", desc: "Multiplicamos el impacto social de colectivos y centros aliados dotándolos de protocolos técnicos y certidumbre administrativa." },
        { id: "02", titulo: "Núcleos Familiares Resilientes", desc: "Blindamos a las familias contra escenarios de violencia, entregando estrategias prácticas de prevención y convivencia." },
        { id: "03", titulo: "Redes de Cohesión Social", desc: "Reconstruimos la confianza vecinal para que individuos desplazados o vulnerables encuentren respaldo activo en su propio entorno." },
        { id: "04", titulo: "Resolución Estratégica de Conflictos", desc: "Desactivamos focos de tensión comunitaria mediante la promoción de la legalidad y la mediación directa." },
        { id: "05", titulo: "Movilidad Social y Autosuficiencia", desc: "Transformamos la dependencia en productividad mediante el desarrollo de competencias laborales competitivas." },
        { id: "06", titulo: "Contención y Estabilidad Integral", desc: "Proveemos primeros auxilios psicológicos y seguimiento especializado para mitigar el impacto de entornos hostiles." }
    ];

    const renderizarPilares = () => {
        const contenedor = document.getElementById('contenedor-pilares');
        if (!contenedor) return; 

        contenedor.innerHTML = datosPilares.map(pilar => `
            <div class="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-white shadow-md transition-transform hover:-translate-y-1">
                <div class="text-[#8A0B58] font-bold text-2xl mb-2">${pilar.id}</div>
                <h3 class="font-titulo font-bold text-slate-900 text-base mb-2">${pilar.titulo}</h3>
                <p class="text-sm text-slate-600 font-light leading-relaxed">${pilar.desc}</p>
            </div>
        `).join('');
    };

    const cambiarSeccion = (targetId) => {
        const secciones = document.querySelectorAll('.seccion-app');
        const linksNav = document.querySelectorAll('.nav-link');
        
        if (!targetId) return;

        // Pausa cualquier audio activo al cambiar de sección
        document.querySelectorAll('audio').forEach(audio => audio.pause());

        secciones.forEach(sec => {
            sec.classList.add('oculto');
            sec.classList.remove('animar-entrada');
        });
        
        const targetSeccion = document.getElementById(targetId);
        if (targetSeccion) {
            targetSeccion.classList.remove('oculto');
            void targetSeccion.offsetWidth;
            targetSeccion.classList.add('animar-entrada');
        }

        linksNav.forEach(link => {
            link.classList.remove('text-purple-700', 'font-bold');
            link.classList.add('text-slate-600');
            link.removeAttribute('aria-current');
        });

        const linkActivo = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        if (linkActivo) {
            linkActivo.classList.remove('text-slate-600');
            linkActivo.classList.add('text-purple-700', 'font-bold');
            linkActivo.setAttribute('aria-current', 'page');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const inicializarNavegacion = () => {
        document.body.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-navegacion') || e.target.closest('.nav-link');
            if (!btn) return;

            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            cambiarSeccion(targetId);
        });
    };

    const inicializarAudios = () => {
        const audios = document.querySelectorAll('audio');
        audios.forEach(audio => {
            audio.addEventListener('play', () => {
                audios.forEach(otroAudio => {
                    if (otroAudio !== audio) otroAudio.pause();
                });
            });
        });
    };

    // --- CONFIGURACIÓN DE LA GALERÍA (47 FOTOS) ---
    const TOTAL_FOTOS = 47; 
    const FOTOS_POR_PAGINA = 24; 
    const RUTA_GALERIA = 'img/galeria/Foto ('; 
    const EXTENSION_FOTO = ').webp'; 

    let fotosMostradas = 0;
    let indiceActualLightbox = 1;

    const cargarLoteGaleria = () => {
        const grid = document.getElementById('grid-galeria');
        const btnMas = document.getElementById('btn-cargar-mas');
        const contador = document.getElementById('contador-galeria');
        if (!grid) return;

        const limite = Math.min(fotosMostradas + FOTOS_POR_PAGINA, TOTAL_FOTOS);
        const fragmento = document.createDocumentFragment();

        for (let i = fotosMostradas + 1; i <= limite; i++) {
            const btnFoto = document.createElement('button');
            btnFoto.type = 'button';
            btnFoto.className = 'group relative aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8A0B58]';
            btnFoto.dataset.index = i;

            const img = document.createElement('img');
            img.src = `${RUTA_GALERIA}${i}${EXTENSION_FOTO}`;
            img.alt = `Evidencia de intervención comunitaria #${i}`;
            img.loading = 'lazy';
            img.decoding = 'async';
            img.className = 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105';

            // Overlay sutil con lupa al pasar el cursor
            const overlay = document.createElement('div');
            overlay.className = 'absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/25 transition-colors flex items-center justify-center';
            overlay.innerHTML = `<span class="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-slate-900 rounded-full p-2 shadow-md"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/></svg></span>`;

            img.onerror = () => {
                btnFoto.style.display = 'none';
            };

            btnFoto.addEventListener('click', () => abrirLightbox(i));
            btnFoto.appendChild(img);
            btnFoto.appendChild(overlay);
            fragmento.appendChild(btnFoto);
        }

        grid.appendChild(fragmento);
        fotosMostradas = limite;

        if (contador) {
            contador.textContent = `Mostrando ${fotosMostradas} de ${TOTAL_FOTOS} fotografías`;
        }
        if (btnMas && fotosMostradas >= TOTAL_FOTOS) {
            btnMas.classList.add('oculto');
        }
    };

    const abrirLightbox = (indice) => {
        indiceActualLightbox = indice;
        const modal = document.getElementById('modal-lightbox');
        const imgModal = document.getElementById('img-lightbox');
        const caption = document.getElementById('caption-lightbox');
        if (!modal || !imgModal) return;

        imgModal.src = `${RUTA_GALERIA}${indice}${EXTENSION_FOTO}`;
        if (caption) caption.textContent = `Fotografía ${indice} de ${TOTAL_FOTOS} · Seguridad y Crecimiento Juvenil A.C.`;
        modal.classList.remove('oculto');
        document.body.style.overflow = 'hidden';
    };

    const cerrarLightbox = () => {
        const modal = document.getElementById('modal-lightbox');
        if (!modal) return;
        modal.classList.add('oculto');
        document.body.style.overflow = '';
    };

    const navegarLightbox = (direccion) => {
        let nuevoIndice = indiceActualLightbox + direccion;
        if (nuevoIndice < 1) nuevoIndice = TOTAL_FOTOS;
        if (nuevoIndice > TOTAL_FOTOS) nuevoIndice = 1;
        abrirLightbox(nuevoIndice);
    };

    const inicializarGaleria = () => {
        cargarLoteGaleria();

        const btnMas = document.getElementById('btn-cargar-mas');
        if (btnMas) btnMas.addEventListener('click', cargarLoteGaleria);

        document.getElementById('btn-cerrar-modal')?.addEventListener('click', cerrarLightbox);
        document.getElementById('btn-prev-foto')?.addEventListener('click', () => navegarLightbox(-1));
        document.getElementById('btn-next-foto')?.addEventListener('click', () => navegarLightbox(1));

        const modal = document.getElementById('modal-lightbox');
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) cerrarLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (modal?.classList.contains('oculto')) return;
            if (e.key === 'Escape') cerrarLightbox();
            if (e.key === 'ArrowLeft') navegarLightbox(-1);
            if (e.key === 'ArrowRight') navegarLightbox(1);
        });

        // Soporte táctil (Swipe) para teléfonos móviles en el Lightbox
        let touchStartX = 0;
        modal?.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        modal?.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 40) navegarLightbox(1);
            if (touchEndX > touchStartX + 40) navegarLightbox(-1);
        }, { passive: true });
    };

    window.solicitarDocumento = function(nombreDocumento) {
        cambiarSeccion('sec-contacto');
        
        setTimeout(() => {
            const textarea = document.getElementById('mensaje');
            if(textarea) {
                textarea.value = `Solicito formalmente acceso a la versión pública del documento institucional: ${nombreDocumento}, para fines de revisión y acreditación.`;
                textarea.focus();
            }
        }, 400);
    };

    window.interesEnProyecto = function(nombreProyecto) {
        cambiarSeccion('sec-contacto');

        setTimeout(() => {
            const textarea = document.getElementById('mensaje');
            if (textarea) {
                textarea.value = `Estimado equipo de Seguridad y Crecimiento Juvenil A.C.,\n\nRepresento a una institución interesada en conocer las reglas de operación, el presupuesto asignado y los mecanismos de coinversión o financiamiento para el proyecto: "${nombreProyecto}".\n\nSolicitamos agendar una sesión técnica de vinculación para evaluar la viabilidad del fondeo.`;
                textarea.focus();
            }
        }, 400);
    };

    renderizarPilares();
    inicializarNavegacion();
    inicializarAudios();
    inicializarGaleria();
});
