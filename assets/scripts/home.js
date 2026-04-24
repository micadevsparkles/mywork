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

      // --- CÓDIGO CORRIGIDO PARA SUBIR RETO NO CENTRO ---
// 1. Ocupa o progresso do scroll (0 a 1)
// 2. Mantém o X fixo em -50% (centro real)
// 3. Altera apenas o Y e a Escala

let scale = 1 - (0.8 * progress); // Encolhe até 20% do tamanho original
let moveY = progress * -35;       // Sobe 35vh

// Usamos apenas transform simples, sem calc no X, para não haver erro de interpretação
logo.style.transform = `translate(-50%, calc(-50% + ${moveY}vh)) scale(${scale})`;

        // Troca de Fundo para #000639 (Página 2) e entrada de texto
        if (progress > 0.8) {
            heroBg.style.backgroundColor = 'var(--bg-blue)';
            skillsList.classList.add('active'); // Aciona o Slide Left In
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
                // observer.unobserve(entry.target); // Descomente se quiser animar apenas 1 vez
            } else {
                entry.target.classList.remove('visible'); // Permite que a animação aconteça novamente
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
    // O padrão será 'pt'.
    window.changeLang = function(lang) {
        fetchTextData('aboutme', lang, 'aboutme-text-container');
        fetchTextData('projectLB', lang, 'projectlb-text-container');
        fetchTextData('projectMJ', lang, 'projectmj-text-container');
        
        // Tradução manual da página 2 (Hardcoded via attributes)
        const dict = {
            'pt': ['1 - Solucionador Técnico de Problemas', '2 - Integrador com Foco em Produto', '3 - Desenvolvedor Impulsionado por IA'],
            'en': ['1 - Technical Problem Solver', '2 - Product-Minded Integrator', '3 - AI-Driven Developer'],
            'es': ['1 - Solucionador Técnico de Problemas', '2 - Integrador Centrado en el Producto', '3 - Desarrollador Impulsado por IA']
        };
        
        document.querySelector('[data-i18n="skill_1"]').innerText = dict[lang][0];
        document.querySelector('[data-i18n="skill_2"]').innerText = dict[lang][1];
        document.querySelector('[data-i18n="skill_3"]').innerText = dict[lang][2];
    };

    // Carrega o idioma inicial
    window.changeLang('pt');
});

// Função para injetar conteúdo dos TXTs no HTML
function fetchTextData(fileBaseName, lang, targetId) {
    // Para simplificar a criação dos seus arquivos, ele tenta buscar com sufixo (ex: aboutme_pt.txt)
    // Se você não for usar arquivos diferentes para idiomas inicialmente, renomeie no repositório.
    const url = `./texts/${fileBaseName}_${lang}.txt`; 
    
    fetch(url)
        .then(response => {
            if(!response.ok) {
                // Tenta carregar o arquivo sem sufixo como fallback
                return fetch(`./texts/${fileBaseName}.txt`);
            }
            return response;
        })
        .then(response => response.text())
        .then(text => {
            document.getElementById(targetId).innerHTML = text;
        })
        .catch(err => console.log('Arquivo txt não encontrado para: ' + fileBaseName));
}
