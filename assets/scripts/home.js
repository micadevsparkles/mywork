import { initProjectMJ } from './projects/projectMJ.js';
import { initProjectLB } from './projects/projectLB.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Lógica de Scroll Contínuo (Logo e Perfil) ---
    const logo = document.getElementById('main-logo');
    const profile = document.getElementById('profile-img');
    const heroBg = document.getElementById('page-2-bg');
    const skillsList = document.getElementById('skills-list');

    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        let vh = window.innerHeight;
        let progress = Math.min(scrollY / (vh * 0.8), 1); // Progresso de 0 a 1

        // --- ANIMAÇÃO DA LOGO ---
        let scaleLogo = 1 - (0.8 * progress); 
        let moveY = progress * -35; 

        // Mantém centralizado no X (-50%) e sobe no Y
        logo.style.transform = `translate(-50%, calc(-50% + ${moveY}vh)) scale(${scaleLogo})`;

        // --- ANIMAÇÃO DA FOTO DE PERFIL (REINTEGRADA) ---
        // Aplica a opacidade e escala baseada no progresso para a foto aparecer
        if (profile) {
            profile.style.opacity = progress;
            profile.style.transform = `scale(${progress})`;
        }

        // Troca de Fundo para #000639 (Página 2) e entrada de texto
        if (progress > 0.8) {
            heroBg.style.backgroundColor = 'var(--bg-blue)';
            skillsList.classList.add('active'); 
        } else {
            heroBg.style.backgroundColor = 'var(--bg-black)';
            skillsList.classList.remove('active');
        }
    });


    // --- 2. Intersection Observer (Scroll Reveal) ---
    const observerOptions = { threshold: 0.2 };
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible'); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-fade, .reveal-zoom, .slide-in-left').forEach(el => {
        revealObserver.observe(el);
    });

    // --- 3. Inicialização dos Projetos ---
    initProjectMJ();
    initProjectLB();

    // --- 4. Sistema Base de Idioma (i18n e .txt) ---
    window.changeLang = function(lang) {
        fetchTextData('aboutme', lang, 'aboutme-text-container');
        fetchTextData('projectLB', lang, 'projectlb-text-container');
        fetchTextData('projectMJ', lang, 'projectmj-text-container');
        
        const dict = {
            'pt': ['1 - Solucionador Técnico de Problemas', '2 - Integrador com Foco em Produto', '3 - Desenvolvedor Impulsionado por IA'],
            'en': ['1 - Technical Problem Solver', '2 - Product-Minded Integrator', '3 - AI-Driven Developer'],
            'es': ['1 - Solucionador Técnico de Problemas', '2 - Integrador Centrado en el Producto', '3 - Desarrollador Impulsado por IA']
        };
        
        document.querySelector('[data-i18n="skill_1"]').innerText = dict[lang][0];
        document.querySelector('[data-i18n="skill_2"]').innerText = dict[lang][1];
        document.querySelector('[data-i18n="skill_3"]').innerText = dict[lang][2];
    };

    window.changeLang('pt');
});

function fetchTextData(fileBaseName, lang, targetId) {
    const url = `./texts/${fileBaseName}_${lang}.txt`; 
    
    fetch(url)
        .then(response => {
            if(!response.ok) {
                return fetch(`./texts/${fileBaseName}.txt`);
            }
            return response;
        })
        .then(response => response.text())
        .then(text => {
            const target = document.getElementById(targetId);
            if (target) target.innerHTML = text;
        })
        .catch(err => console.log('Arquivo txt não encontrado para: ' + fileBaseName));
}
