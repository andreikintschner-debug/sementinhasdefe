
import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Star, 
  ShieldCheck, 
  Zap, 
  Calendar, 
  BookOpen, 
  Award, 
  Gamepad2, 
  ChevronDown, 
  ChevronUp, 
  Printer,
  Users,
  Smartphone,
  Heart,
  ChevronRight,
  Menu,
  X,
  Lock,
  Check,
  Gift,
  Book,
  Infinity,
  ArrowRight,
  Hourglass
} from 'lucide-react';
import { Testimonial, FAQItem, Bonus, Plan } from './types';

// ScrollReveal Component
const Reveal: React.FC<{ 
  children?: React.ReactNode, 
  className?: string, 
  variant?: "up" | "down" | "left" | "right" | "scale" | "rotate",
  delay?: number,
  threshold?: number,
  style?: React.CSSProperties
}> = ({ 
  children, 
  className = "", 
  variant = "up", 
  delay = 0,
  threshold = 0.1,
  style = {}
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const variantClass = `reveal-${variant}`;

  return (
    <div
      ref={domRef}
      className={`reveal ${variantClass} ${isVisible ? 'active' : ''} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Global scroll handler for CTAs
const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const href = e.currentTarget.getAttribute('href');
  if (href?.startsWith('#')) {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

// Helper to append UTM parameters to checkout URLs
const getCheckoutUrl = (baseUrl: string) => {
  if (typeof window !== 'undefined') {
    const searchParams = window.location.search;
    if (searchParams) {
      const separator = baseUrl.includes('?') ? '&' : '?';
      return `${baseUrl}${separator}${searchParams.substring(1)}`;
    }
  }
  return baseUrl;
};

// Components
const Navbar = () => {
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    setDateStr(`${day}/${month}/${year}`);
  }, []);

  return (
    <nav className="bg-pink-600 text-white py-2 text-center text-[13px] sm:text-base font-bold relative z-50 shadow-md flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-4 tracking-tight sm:tracking-normal">
      <Star className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400 shrink-0" />
      <span className="whitespace-nowrap">
        Desconto somente HOJE nesta página {dateStr || '14/03/2026'}
      </span>
    </nav>
  );
};

const WistiaPlayer = ({ mediaId, aspect = '1.7777777777777777', paddingTop = '56.25%' }: { mediaId: string, aspect?: string, paddingTop?: string }) => {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://fast.wistia.com/player.js';
    script1.async = true;
    script1.setAttribute('fetchpriority', 'high');
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = `https://fast.wistia.com/embed/${mediaId}.js`;
    script2.async = true;
    script2.type = 'module';
    script2.setAttribute('fetchpriority', 'high');
    document.body.appendChild(script2);
  }, [mediaId]);

  return (
    <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl z-10 border-4 border-slate-200">
      <style dangerouslySetInnerHTML={{
        __html: `
          wistia-player[media-id='${mediaId}']:not(:defined) { 
            background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch'); 
            display: block; 
            filter: blur(5px); 
            padding-top:${paddingTop}; 
          }
        `
      }} />
      {React.createElement('wistia-player', { 'media-id': mediaId, aspect: aspect })}
    </div>
  );
};

const SocialProof = () => {
  const [visible, setVisible] = useState(false);
  const [currentName, setCurrentName] = useState('');
  
  const names = [
    'Patricia', 'Mariana', 'Juliana', 'Carla', 'Ana Paula', 
    'Fernanda', 'Débora', 'Camila', 'Renata', 'Tia Rosa', 
    'Professora Lucia', 'Jessica', 'Tatiana', 'Vanessa', 'Adriana'
  ];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isMounted = true;
    let lastIndex = -1;

    const showNotification = () => {
      if (!isMounted) return;
      
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * names.length);
      } while (nextIndex === lastIndex);
      
      lastIndex = nextIndex;
      setCurrentName(names[nextIndex]);
      setVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        if (isMounted) setVisible(false);
      }, 5000);

      // Schedule next notification (15-25 seconds)
      const nextDelay = Math.floor(Math.random() * (25000 - 15000 + 1) + 15000);
      timeoutId = setTimeout(showNotification, nextDelay);
    };

    // Initial delay of 5 seconds
    timeoutId = setTimeout(showNotification, 5000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-4 left-4 z-50 transition-all duration-500 transform ${
        visible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
    >
      <div className="bg-pink-600 rounded-xl shadow-lg p-4 flex items-center gap-4 border border-pink-500/50 max-w-[300px]">
        <div className="bg-white rounded-full p-1.5 shrink-0">
          <CheckCircle2 className="w-5 h-5 text-pink-600" />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold text-sm leading-tight">
            {currentName} comprou agora...
          </span>
          <span className="text-pink-100 text-xs mt-0.5">
            Kit Inglês Infantil
          </span>
        </div>
      </div>
    </div>
  );
};

const Hero = () => (
  <header id="hero" data-section="hero" className="relative bg-white pt-16 pb-20 px-4 overflow-hidden">
    {/* Decorative background elements to simulate the illustration */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-100/50 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-10 w-80 h-80 bg-yellow-100/50 rounded-full blur-3xl"></div>
    </div>
    
    <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10 space-y-8">
      
      <Reveal delay={200}>
        <h1 className="text-3xl md:text-5xl lg:text-[54px] font-bold text-slate-900 leading-[1.15] max-w-4xl mx-auto">
          +650 Atividades de Inglês Infantil para Aprender Brincando (Mesmo que Você Não Saiba Inglês)
        </h1>
      </Reveal>

      <Reveal delay={300}>
        <p className="text-lg md:text-2xl text-slate-600 max-w-3xl font-medium">
          Colorir, jogos, quizzes e atividades interativas. Imprima quantas vezes quiser.
        </p>
      </Reveal>

      <Reveal variant="scale" delay={400} className="w-full max-w-4xl relative mt-8">
        <div className="relative flex justify-center">
          <div className="w-full max-w-sm mx-auto">
            <WistiaPlayer mediaId="6ms7pd24h4" aspect="0.5625" paddingTop="177.78%" />
          </div>
          {/* Badge */}
          <div className="absolute -top-4 -right-4 md:top-[-5%] md:right-[-5%] bg-[#FFDE59] text-slate-900 px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 z-20 border-2 border-white transform rotate-3">
            <div className="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center justify-center">
              VÍDEO
            </div>
            <div className="flex flex-col text-left leading-[1.1]">
              <span className="text-[10px] font-extrabold uppercase">Assista</span>
              <span className="text-[10px] font-extrabold uppercase">Agora</span>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="w-full pt-10">
        <Reveal delay={600} variant="slide-up">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            
            {/* Left Badge */}
            <div className="hidden lg:flex items-center gap-3 text-pink-900">
              <ShieldCheck className="w-10 h-10 opacity-90" strokeWidth={1.5} />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-sm opacity-90">Compra</span>
                <span className="text-base font-bold">100% Segura</span>
              </div>
            </div>
            
            {/* CTA Button */}
            <a 
              href="#plans" 
              onClick={handleCTAClick}
              data-track="cta-click"
              data-location="hero"
              role="button"
              tabIndex={1}
              aria-label="Quero Garantir o meu acesso agora"
              className="px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white rounded-full text-lg md:text-xl font-bold border border-white/30 transition-all text-center uppercase tracking-wide w-full md:w-auto animate-pulse-button shadow-xl shadow-pink-100"
            >
              Quero Garantir o meu acesso agora
            </a>

            {/* Right Badges */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-3 text-pink-900">
                <Hourglass className="w-10 h-10 opacity-90" strokeWidth={1.5} />
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-sm opacity-90">Acesso</span>
                  <span className="text-base font-bold">Imediato</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-pink-900">
                <CheckCircle2 className="w-10 h-10 opacity-90" strokeWidth={1.5} />
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-sm opacity-90">Garantia</span>
                  <span className="text-base font-bold">de 30 Dias</span>
                </div>
              </div>
            </div>

            {/* Mobile Badges */}
            <div className="flex lg:hidden flex-wrap justify-center gap-6 text-pink-900 mt-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6" />
                <span className="text-sm font-bold">100% Segura</span>
              </div>
              <div className="flex items-center gap-2">
                <Hourglass className="w-6 h-6" />
                <span className="text-sm font-bold">Acesso Imediato</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                <span className="text-sm font-bold">Garantia 30 Dias</span>
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </div>
  </header>
);

const WhatYouGet = () => {
  const items = [
    {
      icon: <BookOpen className="w-6 h-6 text-white" />,
      title: "+650 Atividades de Inglês Infantil",
      description: "Aprenda inglês de forma leve e divertida com jogos, quizzes e caça-palavras"
    },
    {
      icon: <Book className="w-6 h-6 text-white" />,
      title: "Vocabulário Essencial em Inglês",
      description: "Cores, números, animais e objetos do dia a dia para o primeiro contato com o idioma"
    },
    {
      icon: <Smartphone className="w-6 h-6 text-white" />,
      title: "Áudios de Pronúncia Guiada em Inglês",
      description: "Tenha acesso a áudios simples e claros com a pronúncia correta das principais palavras usadas nas atividades."
    },
    {
      icon: <Printer className="w-6 h-6 text-white" />,
      title: "PDFs Prontos para Imprimir",
      description: "Baixe e imprima quantas vezes quiser sem custo adicional"
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Para Todas as Idades",
      description: "Material adaptado para crianças de 4 a 10 anos"
    },
    {
      icon: <Infinity className="w-6 h-6 text-white" />,
      title: "Acesso Vitalício",
      description: "Use para sempre sem mensalidade ou taxas extras"
    },
    {
      icon: <Gift className="w-6 h-6 text-white" />,
      title: "5 Bônus Exclusivos",
      description: "No valor de R$ 147,00 totalmente grátis"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      title: "Garantia de 30 Dias",
      description: "Satisfação garantida ou seu dinheiro de volta"
    }
  ];

  return (
    <section id="what-you-get" data-section="what-you-get" className="py-24 px-4 bg-gradient-to-br from-[#E6F4F1] via-white to-[#E6F4F1] relative overflow-hidden">
      {/* Decorative side elements (simulating the image cutouts) */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-rose-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">
            O QUE VOCÊ VAI RECEBER
          </h2>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, index) => (
            <Reveal key={index} delay={index * 100} variant="up">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex items-start gap-5 border border-white/50 h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 shrink-0 flex items-center justify-center shadow-lg shadow-rose-200">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        
        <Reveal delay={300} variant="up" className="mt-16 flex justify-center">
          <a 
            href="#plans" 
            onClick={handleCTAClick}
            data-track="cta-click"
            data-location="what-you-get"
            role="button"
            aria-label="GARANTIR MATERIAL AGORA"
            className="inline-flex items-center justify-center px-8 md:px-12 py-5 rounded-full text-xl font-black bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white transition-all transform active:scale-95 uppercase tracking-widest shadow-xl shadow-pink-100 animate-pulse-soft text-center"
          >
            GARANTIR MATERIAL AGORA
          </a>
        </Reveal>
      </div>
    </section>
  );
};

const Stats = () => (
  <section id="stats" data-section="stats" className="bg-white py-12 border-y border-slate-100 overflow-hidden">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { val: "12.000+", label: "Famílias Satisfeitas" },
        { val: "+650", label: "Atividades Prontas" },
        { val: "4.9/5", label: "Avaliação Média", star: true },
        { val: "100%", label: "Digital e Imediato" }
      ].map((stat, i) => (
        <Reveal key={i} delay={i * 150} variant="scale" className="text-center">
          <p className="text-3xl md:text-4xl font-bold text-pink-600">{stat.val}</p>
          <p className="text-slate-600 font-medium text-sm flex items-center justify-center gap-1">
            {stat.label} {stat.star && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
          </p>
        </Reveal>
      ))}
    </div>
  </section>
);

const IdealFor = () => (
  <section id="ideal-for" data-section="ideal-for" className="py-24 px-4 bg-slate-50 overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <Reveal className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Este Kit É Ideal Para Você?</h2>
      </Reveal>
      
      <div className="grid md:grid-cols-2 gap-12">
        <Reveal variant="left" threshold={0.2} className="h-full">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-green-100 h-full">
            <h3 className="text-xl font-bold text-green-600 mb-6 flex items-center gap-3">
              Este Kit É Para Você Se:
            </h3>
            <ul className="space-y-4">
              {[
                "Deseja ensinar inglês de forma simples, mesmo que você não saiba inglês",
                "Quer introduzir o vocabulário básico de forma natural e divertida",
                "Não tem tempo para criar atividades do zero toda semana",
                "Quer reduzir o tempo de tela com conteúdo educativo de qualidade",
                "Busca estimular o aprendizado infantil desde cedo"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        
        <Reveal variant="right" threshold={0.2} className="h-full">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-red-100 h-full">
            <h3 className="text-xl font-bold text-red-500 mb-6 flex items-center gap-3">
              Não É Para Você Se:
            </h3>
            <ul className="space-y-4">
              {[
                "Você não se interessa em ensinar inglês para as crianças",
                "Não possui 10 minutos por dia para aplicar as atividades",
                "Prefere deixar o aprendizado exclusivamente para a escola",
                "Não valoriza o ensino leve e divertido em casa",
                "Prefere deixar as crianças em frente às telas sem supervisão"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-slate-600 font-medium text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal variant="scale" className="flex justify-center mt-16">
        <a 
          href="#plans" 
          onClick={handleCTAClick}
          data-track="cta-click"
          data-location="ideal-for"
          role="button"
          aria-label="Sim, esse kit é para mim"
          className="px-10 py-5 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white rounded-2xl text-xl font-bold shadow-xl transition-all transform hover:-translate-y-1 text-center animate-pulse-soft uppercase"
        >
          Sim, esse kit é para mim
        </a>
      </Reveal>
    </div>
  </section>
);

const Benefits = () => (
  <section id="benefits" data-section="benefits" className="py-24 px-4 bg-white relative overflow-hidden">
    {/* Background Glow */}
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-100/50 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-50/50 rounded-full blur-[120px]"></div>
    </div>

    <div className="max-w-6xl mx-auto relative z-10">
      <Reveal className="text-center mb-20 space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">Benefícios Que Transformam</h2>
        <div className="w-24 h-1.5 bg-pink-500 mx-auto rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">Muito mais do que atividades, uma forma simples de introduzir o inglês no dia a dia da criança.</p>
      </Reveal>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[
          { 
            title: "Conexão Familiar", 
            desc: "Momentos de qualidade enquanto a criança aprende inglês brincando com você.", 
            icon: <Heart />
          },
          { 
            title: "Aprendizado Natural", 
            desc: "A criança aprende sem pressão, através de repetição visual e atividades divertidas.", 
            icon: <BookOpen />
          },
          { 
            title: "Economia de Tempo", 
            desc: "Tudo pronto em um só lugar. Não precisa criar nem pesquisar atividades na internet.", 
            icon: <Clock />
          },
          { 
            title: "Uso em Casa ou Escola", 
            desc: "Perfeito para mães, pais, professores e como reforço escolar divertido.", 
            icon: <Users />
          },
          { 
            title: "Engajamento Total", 
            desc: "Atividades que prendem a atenção e despertam o interesse pelo inglês desde cedo.", 
            icon: <Gamepad2 />
          },
          { 
            title: "Base Sólida", 
            desc: "O primeiro contato com o inglês de forma leve, estruturada e muito interativa.", 
            icon: <ShieldCheck />
          }
        ].map((benefit, idx) => (
          <Reveal key={idx} delay={idx * 100} variant="up">
            <div className="group relative p-6 md:p-8 bg-white border border-slate-200 shadow-sm rounded-3xl hover:border-pink-500 transition-all duration-500 h-full flex flex-col items-start text-left overflow-hidden">
              {/* Top Glow Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-pink-500 rounded-b-full shadow-[0_0_15px_rgba(236,72,153,0.8)] group-hover:w-24 transition-all duration-500"></div>
              
              {/* Icon Box */}
              <div className="w-10 h-10 border border-pink-500/30 rounded-xl flex items-center justify-center mb-6 bg-pink-500/5 group-hover:bg-pink-500/10 group-hover:border-pink-500/60 transition-all duration-300">
                {React.cloneElement(benefit.icon as React.ReactElement<any>, { size: 20, className: "text-pink-500" })}
              </div>
              
              <h4 className="text-lg md:text-xl font-bold text-slate-800 mb-3 group-hover:text-pink-600 transition-colors">{benefit.title}</h4>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {benefit.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Bonuses = () => {
  const bonuses: Bonus[] = [
    { 
      id: "1", 
      title: "Guia de Primeiras Palavras em Inglês", 
      value: "R$ 27,00", 
      description: "Lista visual com vocabulário básico organizado por temas para facilitar a memorização.", 
      image: "https://i.postimg.cc/26cyNL2G/Gemini-Generated-Image-n5a7akn5a7akn5a7-(1).png" 
    },
    { 
      id: "2", 
      title: "Calendário de Inglês Infantil - 30 Dias", 
      value: "R$ 37,00", 
      description: "Plano simples e prático para ensinar um pouquinho de inglês todos os dias.", 
      image: "https://i.postimg.cc/C1P5pnmJ/Gemini-Generated-Image-gig7upgig7upgig7.png" 
    },
    { 
      id: "3", 
      title: "Kit de Jogos em Inglês", 
      value: "R$ 27,00", 
      description: "Jogos interativos, caça-palavras e jogo da memória para reforço do vocabulário.", 
      image: "https://i.postimg.cc/FRWzXkDD/Gemini-Generated-Image-mkt9wwmkt9wwmkt9.png" 
    },
    { 
      id: "4", 
      title: "Guia: Como Ensinar Inglês para Crianças", 
      value: "R$ 19,00", 
      description: "Método simples com dicas práticas para ensinar inglês mesmo sem saber o idioma.", 
      image: "https://i.postimg.cc/wvfMYR0w/Gemini-Generated-Image-m7ot8dm7ot8dm7ot.png" 
    },
    { 
      id: "5", 
      title: "Áudios de Pronúncia Guiada em Inglês", 
      value: "R$ 37,00", 
      description: "Tenha acesso a áudios simples e claros com a pronúncia correta das principais palavras usadas nas atividades.", 
      image: "https://i.postimg.cc/zBtvYH0C/Gemini-Generated-Image-gi06vmgi06vmgi06.png" 
    }
  ];

  return (
    <section id="bonuses" data-section="bonuses" className="py-24 px-4 bg-[#f0f9ff]/30 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-100 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            🎁 ATENÇÃO: Leve GRÁTIS <br className="hidden md:block"/> <span className="text-pink-600">5 Bônus Exclusivos</span>
          </h2>
          <div className="max-w-2xl mx-auto space-y-1">
            <p className="text-xl text-slate-900 font-bold">
              (Valor Total: R$ 147,00)
            </p>
            <p className="text-lg text-slate-500 font-medium">
              Incluídos apenas no plano de R$19,90
            </p>
          </div>
        </Reveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-16 max-w-6xl mx-auto">
          {bonuses.map((bonus, idx) => (
            <Reveal key={bonus.id} delay={idx * 150} variant="up" className="h-full">
              <div className="group relative bg-white p-5 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col h-full border border-slate-100">
                {/* Book Image */}
                <div className="relative mb-5 flex justify-center">
                  <div className="w-full max-w-[140px] aspect-[4/5] relative group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src={bonus.image} 
                      alt={bonus.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover rounded-xl shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10"></div>
                  </div>
                </div>
                
                {/* Label Row */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#1e3a8a] font-bold text-sm uppercase tracking-tight">
                    BÔNUS {bonus.id}
                  </span>
                  <span className="text-pink-600 font-bold text-[10px] uppercase tracking-wider">
                    HOJE: GRÁTIS
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base font-bold text-slate-900 mb-1.5 leading-tight">
                  {bonus.title}
                </h4>
                
                {/* Value */}
                <div className="mb-2">
                  <span className="text-red-500 font-medium text-sm line-through opacity-80">
                    Valor: {bonus.value}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed">
                  {bonus.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={800} variant="scale" className="text-center">
           <a 
            href="#premium-plan" 
            onClick={handleCTAClick}
            data-track="cta-click"
            data-location="bonuses"
            role="button"
            aria-label="Quero os bônus"
            className="inline-block px-12 py-5 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white rounded-2xl text-xl font-bold shadow-xl transition-all transform hover:-translate-y-1 text-center animate-pulse-soft uppercase"
           >
              Quero os bônus
           </a>
        </Reveal>
      </div>
    </section>
  );
};


const Pricing = () => {
  return (
    <section id="plans" data-section="pricing" className="py-24 px-4 bg-white scroll-mt-20 overflow-hidden text-slate-800">
      <div className="max-w-6xl mx-auto">
        <Reveal variant="fade-up" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Temos dois Planos. <span className="text-pink-600">Escolha com Sabedoria!</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Plan Basic */}
          <Reveal delay={0} variant="scale" className="flex h-full">
            <div id="basic-plan" className="relative w-full flex flex-col bg-white rounded-[2rem] border border-slate-200 p-6 md:p-10 shadow-lg transition-all duration-300 group overflow-hidden scroll-mt-24">
              <div className="relative z-10 flex flex-col h-full items-center">
                <h3 className="text-3xl font-black text-slate-800 mb-6">Plano Básico</h3>
                {/* Pricing Info */}
                <div className="w-full flex flex-col items-center text-center mb-8">
                  <div className="text-slate-500 font-bold text-center uppercase tracking-wide mb-1 text-sm md:text-base">
                    <span className="line-through mr-1">VALOR: R$ 47,00</span> HOJE POR APENAS
                  </div>
                  <div className="text-slate-800 text-6xl md:text-7xl font-black text-center tracking-tighter">
                    R$ 9,90
                  </div>
                </div>
                
                {/* Features List */}
                <div className="flex flex-col items-start mx-auto w-fit space-y-3 mb-10">
                  {[
                    "Atividades de inglês prontas para imprimir"
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-center">
                      <div className="bg-[#009900] rounded p-0.5 shrink-0 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" strokeWidth={4} />
                      </div>
                      <span className="text-slate-800 font-medium text-lg">{item}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <div className="mt-auto w-full max-w-md mx-auto">
                  <a 
                    href={getCheckoutUrl("https://ggcheckout.app/checkout/v5/np8ILlN4KQnpJYW3cO5t")}
                    data-track="cta-click"
                    data-location="pricing-basic"
                    role="button"
                    aria-label="Garantir Plano Básico"
                    className="block w-full py-4 rounded-xl text-xl font-bold bg-slate-800 hover:bg-slate-900 text-white transition-all transform active:scale-95 uppercase tracking-wide shadow-lg text-center"
                  >
                    Garantir Plano Básico
                  </a>
                  
                  {/* Footer Text */}
                  <div className="mt-4 text-center text-slate-500 font-medium text-base">
                    Compra 100% Segura &bull; Garantia de 30 Dias
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Plan Premium */}
          <Reveal delay={200} variant="scale" className="flex h-full">
            <div id="premium-plan" className="relative w-full flex flex-col bg-[#f8fcfd] rounded-[2rem] border-2 border-pink-500 p-6 md:p-10 shadow-xl transition-all duration-300 group overflow-hidden scroll-mt-24">
              {/* Most Popular Badge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-pink-500 text-white px-6 py-1.5 rounded-b-xl font-bold text-sm uppercase tracking-wider z-20 shadow-md whitespace-nowrap">
                Mais Popular
              </div>
              
              <div className="relative z-10 flex flex-col h-full items-center mt-4">
                <h3 className="text-3xl font-black text-pink-600 mb-6">Plano Premium</h3>
                {/* Image */}
                <div className="w-full flex justify-center relative mb-8">
                  <img 
                    src="https://i.postimg.cc/CLD8kJc7/Gemini-Generated-Image-t7a8gct7a8gct7a8-2-removebg-preview.png" 
                    alt="Kit Completo Inglês Infantil" 
                    loading="lazy"
                    decoding="async"
                    className="w-full max-w-[320px] object-contain hover:scale-105 transition-transform duration-500 drop-shadow-xl relative z-10"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Pricing Info */}
                <div className="w-full flex flex-col items-center text-center mb-8">
                  <div className="text-red-600 font-bold text-center uppercase tracking-wide mb-1 text-sm md:text-base">
                    <span className="line-through mr-1">VALOR: R$ 197,00</span> HOJE POR APENAS
                  </div>
                  <div className="text-pink-600 text-7xl md:text-8xl font-black text-center tracking-tighter">
                    R$ 19,90
                  </div>
                </div>
                
                {/* Features List */}
                <div className="flex flex-col items-start mx-auto w-fit space-y-3 mb-10">
                  {[
                    "Tudo do Plano Básico",
                    "+650 Atividades de inglês infantil",
                    "+350 Atividades Extras anuais",
                    "Conteúdo organizado por nível",
                    "TODOS os 5 Bônus inclusos",
                    "Suporte por e-mail e whatsapp",
                    "Garantia de 30 Dias",
                    "Acesso Imediato"
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-center">
                      <div className="bg-[#009900] rounded p-0.5 shrink-0 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" strokeWidth={4} />
                      </div>
                      <span className="text-slate-800 font-medium text-lg">{item}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <div className="mt-auto w-full max-w-md mx-auto">
                  <a 
                    href={getCheckoutUrl("https://ggcheckout.app/checkout/v5/altopwrUeAWTP2Sz50dT")}
                    data-track="cta-click"
                    data-location="pricing-premium"
                    role="button"
                    aria-label="Garantir Plano Premium"
                    className="block w-full py-4 rounded-xl text-xl font-black bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white transition-all transform active:scale-95 uppercase tracking-widest shadow-xl shadow-pink-100 animate-pulse-soft text-center"
                  >
                    Garantir Plano Premium
                  </a>
                  
                  {/* Footer Text */}
                  <div className="mt-4 text-center text-pink-600/70 font-medium text-base">
                    Compra 100% Segura &bull; Garantia de 30 Dias
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Guarantee = () => (
  <section className="py-8 px-4 bg-white overflow-hidden">
    <Reveal variant="scale" threshold={0.3}>
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-pink-50 to-white rounded-3xl p-6 md:p-8 border border-pink-100 shadow-2xl shadow-pink-100/50 relative">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-yellow-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-48 h-48 bg-pink-200/30 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/3 flex justify-center">
            <img 
              src="https://i.postimg.cc/j2cgt0hz/Selo-de-Garantia-de-30-Dias-PNG-Transparente-Sem-Fundo-removebg-preview.png" 
              alt="Selo de Garantia 30 Dias" 
              loading="lazy"
              decoding="async"
              className="w-40 md:w-48 h-auto drop-shadow-2xl animate-bounce-subtle"
            />
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Satisfação Garantida: <span className="text-pink-600">Seu Risco é Zero</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Estamos tão confiantes na qualidade do nosso <span className="font-bold text-pink-700">Kit Inglês Infantil</span> que oferecemos uma garantia incondicional. 
              Você tem <span className="font-bold text-slate-900 underline decoration-yellow-400 decoration-4 underline-offset-4">30 dias inteiros</span> para explorar cada atividade. 
            </p>
            <p className="text-base text-slate-600">
              Se por qualquer motivo você achar que o kit não é para você, basta nos enviar um e-mail e <span className="font-bold">devolvemos 100% do seu dinheiro</span>. Sem burocracia, sem perguntas e continuamos amigos.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2 mb-4">
               <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-pink-100 shadow-sm">
                 <ShieldCheck className="w-4 h-4 text-pink-500" />
                 <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Compra Protegida</span>
               </div>
               <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-pink-100 shadow-sm">
                 <CheckCircle2 className="w-4 h-4 text-pink-500" />
                 <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Reembolso Facilitado</span>
               </div>
            </div>

            <Reveal delay={200} variant="scale" className="flex justify-center md:justify-start">
               <a 
                href="#plans" 
                onClick={handleCTAClick}
                data-track="cta-click"
                data-location="guarantee"
                role="button"
                aria-label="Garantir meu risco zero"
                className="px-6 py-3 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-black hover:to-slate-900 text-white rounded-xl font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-2 uppercase text-sm"
               >
                 Garantir meu risco zero <ArrowRight size={18} />
               </a>
            </Reveal>
          </div>
        </div>
      </div>
    </Reveal>
  </section>
);

const FAQ = () => {
  const faqs: FAQItem[] = [
    { question: "Como vou receber o material após a compra?", answer: "Você receberá o acesso imediatamente por e-mail após a confirmação do pagamento. O material é 100% digital em formato PDF." },
    { question: "As atividades são adequadas para qual faixa etária?", answer: "Sim, o material foi desenvolvido para crianças de 4 a 10 anos, abrangendo diferentes níveis de desenvolvimento." },
    { question: "Posso imprimir quantas vezes eu quiser?", answer: "Com certeza! Uma das grandes vantagens é poder imprimir as atividades quantas desejar para seus filhos ou alunos." },
    { question: "Preciso saber inglês para usar o material?", answer: "Não! O material foi desenvolvido para que qualquer pessoa consiga aplicar as atividades e ensinar as crianças de forma simples." },
    { question: "Funciona para uso em casa e escola?", answer: "Perfeitamente. O material pode ser utilizado tanto por pais em casa quanto por professores como reforço escolar." },
    { question: "Vou receber atualizações do material?", answer: "No Plano Premium, você terá acesso vitalício e receberá todas as atualizações futuras sem custo adicional." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 px-4 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Perguntas Frequentes</h2>
        </Reveal>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Reveal key={idx} delay={idx * 100} variant="up">
              <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-pink-300">
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  aria-expanded={openIndex === idx}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-pink-50/30 transition-colors"
                >
                  <span className="font-bold text-lg text-slate-800">{faq.question}</span>
                  {openIndex === idx ? <ChevronUp className="text-pink-500" /> : <ChevronDown className="text-slate-400" />}
                </button>
                {openIndex === idx && (
                  <div id={`faq-answer-${idx}`} className="p-6 pt-0 text-slate-600 bg-white leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const images = [
    "https://i.postimg.cc/P520B25M/img-0136.png",
    "https://i.postimg.cc/Xvqt3dr5/img-0136-(1).png",
    "https://i.postimg.cc/MGHgxVnQ/img-0136-(2).png"
  ];

  return (
    <section id="testimonials" data-section="testimonials" className="py-24 px-4 bg-pink-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Veja Como Este Kit Está Ajudando +12.000 Famílias</h2>
          <p className="text-lg text-slate-600">Histórias reais de crianças tendo o primeiro contato com o inglês de forma divertida</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((url, idx) => (
            <Reveal 
              key={idx} 
              delay={idx * 200} 
              variant={idx % 2 === 0 ? "left" : "right"}
              threshold={0.2}
              className="flex justify-center"
            >
              <div className="overflow-hidden rounded-3xl shadow-lg border border-white hover:scale-105 transition-transform">
                <img src={url} alt={`Depoimento ${idx + 1}`} loading="lazy" decoding="async" className="w-full h-auto object-cover max-w-sm" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white py-16 px-4">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
      <Reveal variant="left">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-pink-400 mb-2">Inglês Infantil Fácil</h2>
          <p className="text-slate-400 max-w-sm">Transformando o aprendizado em algo leve, divertido e natural.</p>
        </div>
      </Reveal>
      <Reveal variant="right">
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-6 text-slate-400 font-medium">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
          </div>
          <p className="text-slate-500 text-sm">© 2025 Inglês Infantil Fácil. Todos os direitos reservados.</p>
        </div>
      </Reveal>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <WhatYouGet />
        <Testimonials />
        <Benefits />
        <IdealFor />
        <Bonuses />
        <Pricing />
        <Guarantee />
        <FAQ />
        
        <section id="bottom-cta" data-section="bottom-cta" className="py-24 px-4 bg-pink-50 text-center">
          <div className="max-w-3xl mx-auto">
            <Reveal threshold={0.3}>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                Não Deixe Suas Crianças Sem Este Recurso Precioso
              </h2>
            </Reveal>
            <Reveal delay={200} threshold={0.3}>
              <p className="text-xl text-slate-600 mb-12">
                Milhares de famílias já começaram a introduzir o inglês em casa de forma simples. Faça parte desta comunidade e veja a diferença na vida das suas crianças!
              </p>
            </Reveal>
            <Reveal delay={400} variant="scale" threshold={0.3}>
              <a 
                href="#plans" 
                onClick={handleCTAClick}
                data-track="cta-click"
                data-location="bottom"
                role="button"
                aria-label="Quero Garantir o meu acesso agora"
                className="inline-block px-12 py-6 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl text-2xl font-bold shadow-2xl transition-all transform hover:scale-105 active:scale-95 animate-pulse-soft uppercase"
              >
                Quero Garantir o meu acesso agora
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <SocialProof />
    </div>
  );
};

export default App;
