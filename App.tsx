
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
  ArrowRight
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
    <nav className="bg-green-600 text-white py-2 text-center text-sm font-medium sticky top-0 z-50 shadow-md">
      Desconto somente HOJE nesta página {dateStr || '--/--/----'}
    </nav>
  );
};

const Hero = () => (
  <header className="relative bg-soft-gradient pt-12 pb-20 px-4 overflow-hidden">
    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-yellow-200 rounded-full opacity-30 blur-3xl"></div>
    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-green-200 rounded-full opacity-30 blur-3xl"></div>
    
    <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 space-y-8">
      <Reveal variant="scale">
        <div className="inline-flex items-center px-4 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold border border-yellow-200 shadow-sm animate-bounce">
          Oferta Especial - Tempo Limitado
        </div>
      </Reveal>
      
      <Reveal delay={200}>
        <h1 className="text-2xl md:text-4xl font-bold text-green-800 leading-tight">
          +650 Atividades Bíblicas para Auxiliar suas Aulas de Ministério Infantil e aproximar as Crianças da Palavra de Deus com alegria e criatividade!
        </h1>
      </Reveal>

      <Reveal variant="rotate" delay={400} className="max-w-2xl w-full">
        <div className="relative group">
          <div className="absolute inset-0 bg-green-600 rounded-3xl rotate-1 group-hover:rotate-0 transition-transform"></div>
          <img 
            src="https://i.postimg.cc/QtGDgt8k/Gemini-Generated-Image-jqs56ljqs56ljqs5.png" 
            alt="Exemplo das Atividades Bíblicas" 
            className="relative rounded-3xl shadow-2xl transition-transform group-hover:-translate-y-1 w-full h-auto"
          />
          <div className="absolute -bottom-4 -right-4 bg-yellow-400 p-4 rounded-xl shadow-xl border-4 border-white rotate-6 hidden sm:block">
            <p className="font-bold text-green-900 text-lg leading-none">PDF PRONTO</p>
            <p className="text-green-800 font-medium text-sm">PARA IMPRIMIR</p>
          </div>
        </div>
      </Reveal>

      <div className="space-y-6 w-full flex flex-col items-center">
        <Reveal delay={600}>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl">
            Atividades prontas para imprimir e usar quantas vezes quiser. Produto digital com acesso imediato.
          </p>
        </Reveal>
        
        <Reveal delay={800} variant="scale">
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <a 
              href="#plans" 
              onClick={handleCTAClick}
              className="px-10 py-5 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-xl font-bold shadow-xl transition-all transform hover:-translate-y-1 text-center animate-pulse-soft"
            >
              Quero Garantir o meu acesso agora
            </a>
          </div>
        </Reveal>
        
        <Reveal delay={1000} className="flex flex-wrap gap-6 pt-2 text-slate-500 text-sm font-medium justify-center">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-5 h-5 text-green-500" /> Compra 100% Segura</span>
          <span className="flex items-center gap-1.5"><Zap className="w-5 h-5 text-green-500" /> Acesso Imediato</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-5 h-5 text-green-500" /> Garantia de 7 Dias</span>
        </Reveal>
      </div>
    </div>
  </header>
);

const Stats = () => (
  <section className="bg-white py-12 border-y border-slate-100 overflow-hidden">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { val: "12.000+", label: "Famílias Satisfeitas" },
        { val: "450+", label: "Atividades Prontas" },
        { val: "4.9/5", label: "Avaliação Média", star: true },
        { val: "100%", label: "Digital e Imediato" }
      ].map((stat, i) => (
        <Reveal key={i} delay={i * 150} variant="scale" className="text-center">
          <p className="text-3xl md:text-4xl font-bold text-green-600">{stat.val}</p>
          <p className="text-slate-600 font-medium text-sm flex items-center justify-center gap-1">
            {stat.label} {stat.star && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
          </p>
        </Reveal>
      ))}
    </div>
  </section>
);

const Features = () => {
  const featureList = [
    {
      title: "Histórias Bíblicas Completas",
      description: "Desde a Criação até os ensinamentos de Jesus, com atividades para cada história importante.",
      icon: <BookOpen className="w-8 h-8 text-green-600" />
    },
    {
      title: "Adequado Para Todas as Idades",
      description: "Material adaptado para crianças de 4 a 10 anos, com diferentes níveis de desenvolvimento.",
      icon: <Users className="text-green-600" />
    },
    {
      title: "PDF Pronto Para Imprimir",
      description: "Baixe imediatamente e imprima quantas vezes quiser, sem custo adicional recorrente.",
      icon: <Printer className="text-green-600" />
    },
    {
      title: "Economize Horas de Preparação",
      description: "Material profissional pronto sem precisar criar do zero. Foque na conexão espiritual com os pequenos.",
      icon: <Clock className="text-green-600" />
    }
  ];

  const sampleImages = [
    "https://i.postimg.cc/Z5vK6XPR/Davi-e-Golias-coloring-page-625eb147-J-86UVbc.webp",
    "https://i.postimg.cc/rwRF57Gs/Sementinhas-de-Cristo-A-arca-de-Noe-36-page-0001-1763755786865-Co-NFXEOy.webp",
    "https://i.postimg.cc/Hk8sbF0W/BONUS-6-Atividades-Extras-4-page-0001-1763755797182-CJpvk5Ur.webp"
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Veja Exemplos do Material</h2>
          <p className="text-lg text-slate-600">Recursos pedagógicos planejados para o ensino cristão</p>
        </Reveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {featureList.map((feature, idx) => (
            <Reveal key={idx} delay={idx * 150} variant="up">
              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:border-green-300 hover:bg-white transition-all group shadow-sm hover:shadow-md h-full">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-colors">
                  {React.cloneElement(feature.icon as React.ReactElement<any>, { className: "group-hover:text-white transition-colors", size: 32 })}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mb-12">
          <h3 className="text-2xl font-bold text-green-800">Uma amostra do que você encontrará no kit:</h3>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {sampleImages.map((img, idx) => (
            <Reveal key={idx} delay={idx * 200} variant="scale">
              <div className="relative group overflow-hidden rounded-2xl shadow-xl border border-slate-200 bg-white">
                <img 
                  src={img} 
                  alt={`Amostra de Atividade ${idx + 1}`} 
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none"></div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal variant="scale" className="flex justify-center">
          <a 
            href="#plans" 
            onClick={handleCTAClick}
            className="px-10 py-5 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-xl font-bold shadow-xl transition-all transform hover:-translate-y-1 text-center flex items-center gap-2"
          >
            Garantir esse material agora <ArrowRight className="w-6 h-6" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

const IdealFor = () => (
  <section className="py-24 px-4 bg-slate-50 overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <Reveal className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Este Kit É Ideal Para Você?</h2>
      </Reveal>
      
      <div className="grid md:grid-cols-2 gap-12">
        <Reveal variant="left" threshold={0.2} className="h-full">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-green-100 h-full">
            <h3 className="text-2xl font-bold text-green-600 mb-8 flex items-center gap-3">
              Este Kit É Para Você Se:
            </h3>
            <ul className="space-y-6">
              {[
                "Você trabalha no ministério infantil e precisa de material de qualidade",
                "Deseja ensinar a Bíblia para seus filhos de forma divertida e eficaz",
                "Não tem tempo para criar atividades do zero toda semana",
                "Quer aproximar as crianças da Palavra de Deus com criatividade"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                  <span className="text-slate-700 font-medium text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        
        <Reveal variant="right" threshold={0.2} className="h-full">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-red-100 h-full">
            <h3 className="text-2xl font-bold text-red-500 mb-8 flex items-center gap-3">
              Não É Para Você Se:
            </h3>
            <ul className="space-y-6">
              {[
                "Você não se importa com o crescimento espiritual das crianças",
                "Não possui 10 minutos por dia para aplicar as atividades",
                "Prefere deixar as crianças em frente às telas sem supervisão",
                "Não valoriza ensino bíblico estruturado e de qualidade",
                "Busca material secular sem fundamento bíblico"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                  <span className="text-slate-700 font-medium text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const Benefits = () => (
  <section className="py-24 px-4 bg-slate-50/50">
    <div className="max-w-6xl mx-auto">
      <Reveal className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">Benefícios Que Transformam</h2>
        <div className="w-24 h-1.5 bg-green-500 mx-auto rounded-full"></div>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">Muito mais do que atividades, uma ferramenta completa para o ensino bíblico.</p>
      </Reveal>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { 
            title: "Conexão Familiar", 
            desc: "Momentos de qualidade aprendendo juntos sobre a fé e fortalecendo os vínculos entre pais e filhos.", 
            icon: <Heart className="text-pink-600" />,
            bgColor: "bg-pink-100/50"
          },
          { 
            title: "Aprendizado Efetivo", 
            desc: "As crianças absorvem e retêm melhor os ensinamentos bíblicos através de atividades práticas e lúdicas.", 
            icon: <BookOpen className="text-blue-600" />,
            bgColor: "bg-blue-100/50"
          },
          { 
            title: "Economia de Tempo", 
            desc: "Tenha tudo pronto em um só lugar. Pare de perder horas pesquisando material na internet.", 
            icon: <Clock className="text-yellow-600" />,
            bgColor: "bg-yellow-100/50"
          },
          { 
            title: "Material Para Grupos", 
            desc: "Perfeito para escola dominical, células infantis e pequenos grupos de estudo cristão.", 
            icon: <Users className="text-purple-600" />,
            bgColor: "bg-purple-100/50"
          },
          { 
            title: "Criatividade e Diversão", 
            desc: "Atividades variadas que mantêm as crianças engajadas, curiosas e animadas para aprender.", 
            icon: <Gamepad2 className="text-orange-600" />,
            bgColor: "bg-orange-100/50"
          },
          { 
            title: "Conteúdo Confiável", 
            desc: "Material biblicamente fundamentado e revisado por educadores dedicados ao ensino cristão.", 
            icon: <ShieldCheck className="text-green-600" />,
            bgColor: "bg-green-100/50"
          }
        ].map((benefit, idx) => (
          <Reveal key={idx} delay={idx * 100} variant="up">
            <div className="group relative p-8 md:p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full">
              <div className={`absolute top-0 right-0 w-24 h-24 ${benefit.bgColor} rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className={`w-16 h-16 ${benefit.bgColor} rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                {React.cloneElement(benefit.icon as React.ReactElement<any>, { size: 32 })}
              </div>
              
              <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-green-600 transition-colors">{benefit.title}</h4>
              <p className="text-slate-600 leading-relaxed text-lg">
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
    { id: "01", title: "Guia de Versículos Para Memorização", value: "R$ 27,00", description: "50 versículos ilustrados prontos para impressão, organizados por temas e idades.", icon: <BookOpen /> },
    { id: "02", title: "Calendário Bíblico Anual Infantil", value: "R$ 37,00", description: "12 meses de atividades temáticas seguindo histórias bíblicas cronologicamente.", icon: <Calendar /> },
    { id: "03", title: "Kit de Jogos Educativos Bíblicos", value: "R$ 27,00", description: "Quebra-cabeças, caça-palavras e jogos da memória com temas bíblicos.", icon: <Gamepad2 /> },
    { id: "04", title: "Como Ensinar a Bíblia Para Crianças", value: "R$ 19,00", description: "Guia completo com estratégias pedagógicas e dicas práticas para educadores.", icon: <Users /> }
  ];

  return (
    <section className="py-24 px-4 bg-[#f8fafc] relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-10 left-10 w-64 h-64 bg-green-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-100 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-yellow-400/20 text-green-800 rounded-full text-xs font-black uppercase tracking-widest border border-yellow-400/30">
            <Gift size={14} className="text-green-600" /> Bônus Exclusivos para você
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            Ganhe mais <span className="text-green-600">4 Presentes</span> <br className="hidden md:block"/> Especiais ao se inscrever hoje
          </h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-slate-500 font-medium">
              Somente nesta oferta de hoje, incluímos recursos extras avaliados em <span className="text-slate-900 font-bold">R$ 110,00</span> totalmente de graça.
            </p>
          </div>
        </Reveal>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-20">
          {bonuses.map((bonus, idx) => (
            <Reveal key={bonus.id} delay={idx * 150} variant="up" className="h-full">
              <div className="group relative bg-white border border-slate-200 p-8 md:p-10 rounded-[3rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col md:flex-row gap-8 h-full">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative shrink-0 flex items-center justify-center">
                   <div className="w-20 h-20 bg-green-600 rounded-[2rem] rotate-3 group-hover:rotate-0 transition-all duration-300 flex items-center justify-center shadow-lg shadow-green-200">
                     {React.cloneElement(bonus.icon as React.ReactElement<any>, { size: 36, className: "text-white" })}
                   </div>
                   <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] font-black text-green-900 shadow-md">
                     {bonus.id}
                   </div>
                </div>

                <div className="relative flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-2xl font-bold text-slate-900 group-hover:text-green-600 transition-colors leading-tight">
                      {bonus.title}
                    </h4>
                  </div>
                  
                  <p className="text-slate-500 text-lg leading-relaxed mb-8">
                    {bonus.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Valor Original</span>
                      <span className="text-slate-500 line-through font-bold">{bonus.value}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-green-600 text-[10px] uppercase font-black tracking-widest">Seu Presente</span>
                      <span className="text-green-600 text-xl font-black">GRÁTIS</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={800} variant="scale" className="text-center">
           <a 
            href="#plans" 
            onClick={handleCTAClick}
            className="inline-block p-1 bg-white rounded-3xl shadow-xl border border-slate-100 transition-transform hover:scale-105"
           >
              <div className="bg-green-600 text-white px-10 py-5 rounded-[2rem] font-bold text-lg flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-4">
                  <span>Valor Total em Bônus: <span className="text-yellow-400 text-2xl font-black">R$ 110,00</span></span>
                  <span className="hidden sm:inline-block w-px h-8 bg-white/20"></span>
                </div>
                <div className="flex items-center gap-2 font-black uppercase tracking-wider text-sm">
                  Clique para garantir tudo hoje <ArrowRight size={18} />
                </div>
              </div>
           </a>
        </Reveal>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="plans" className="py-24 px-4 bg-white scroll-mt-20 overflow-hidden text-slate-800">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight uppercase">Escolha o Seu Plano</h2>
          <p className="text-lg text-slate-600 font-medium">Invista no crescimento espiritual das crianças hoje mesmo.</p>
        </Reveal>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Plan Básico */}
          <Reveal delay={0} variant="scale" className="flex h-full">
            <div className="relative w-full flex flex-col bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl transition-all duration-300 hover:shadow-xl group border border-slate-200">
              <div className="flex flex-col items-center mb-10">
                <div className="bg-slate-100 text-slate-500 px-6 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] mb-8">
                  Plano Básico
                </div>
                <h3 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Plano Básico</h3>
                <p className="text-slate-500 text-sm font-medium mb-10">O essencial para começar</p>
                
                <div className="flex flex-col items-center text-center">
                  <span className="text-slate-400 line-through text-lg font-bold mb-1">R$ 39,90</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-slate-900 text-5xl font-black tracking-tighter">R$ 9,90</span>
                  </div>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Pagamento Único</span>
                </div>
              </div>
              
              <div className="flex-grow space-y-4 mb-12">
                <div className="flex gap-4 items-center">
                  <div className="bg-green-100 p-0.5 rounded-full shrink-0">
                    <Check className="w-4 h-4 text-green-600" strokeWidth={4} />
                  </div>
                  <span className="text-slate-700 font-bold text-xl leading-snug">Atividades Bíblicas prontas para imprimir</span>
                </div>
              </div>
              
              <div className="mt-auto">
                <a 
                  href="https://ggcheckout.com.br/checkout/v5/ZXz3YglegUw0oQhq7W8Z"
                  className="block w-full py-5 rounded-2xl text-base font-black bg-slate-800 hover:bg-slate-900 text-white transition-all transform active:scale-95 uppercase tracking-wider shadow-xl text-center"
                >
                  Garantir Plano Básico
                </a>
                <div className="mt-8 flex justify-center items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                  <Lock size={12} /> Compra 100% Segura
                </div>
              </div>
            </div>
          </Reveal>

          {/* Plan Premium */}
          <Reveal delay={300} variant="scale" className="flex h-full">
            <div className="relative w-full flex flex-col bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl transition-all duration-300 border-4 border-green-500 group overflow-hidden">
              {/* Mais Popular Ribbon */}
              <div className="absolute top-0 right-0 overflow-hidden w-32 h-32 pointer-events-none">
                <div className="absolute top-[26px] right-[-28px] rotate-45 bg-yellow-400 text-green-900 text-[10px] font-black px-10 py-1.5 uppercase tracking-tighter shadow-lg w-[160px] text-center">
                  Mais Popular
                </div>
              </div>

              <div className="flex flex-col items-center mb-10">
                <div className="bg-green-600 text-white px-6 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] mb-8 shadow-sm">
                  Plano Premium
                </div>
                <h3 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Plano Premium</h3>
                <p className="text-slate-500 text-sm font-medium mb-10 text-center">Experiência máxima Sementinhas de Fé</p>
                
                <div className="flex flex-col items-center text-center relative">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-slate-400 line-through text-lg font-bold">R$ 197,90</span>
                    <span className="bg-red-100 text-red-600 text-[10px] font-black px-2 py-0.5 rounded uppercase">-90% OFF</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-green-600 text-6xl font-black tracking-tighter">R$ 27,00</span>
                  </div>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Pagamento Único</span>
                </div>
              </div>
              
              <div className="flex-grow space-y-4 mb-12">
                {[
                  "Tudo do plano básico",
                  "+650 Atividades Bíblicas prontas",
                  "+350 Atividades Extras anuais",
                  "Histórias da Criação a Jesus",
                  "TODOS os 4 Bônus inclusos",
                  "Suporte prioritário via email"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="bg-green-500 p-0.5 rounded-full shrink-0">
                      <Check className="w-4 h-4 text-white" strokeWidth={4} />
                    </div>
                    <span className="text-slate-800 font-bold text-xl tracking-tight leading-tight">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-auto">
                <a 
                  href="https://ggcheckout.com.br/checkout/v5/7wOe47g8XVzL1HnjKopl"
                  className="block w-full py-6 rounded-2xl text-lg font-black bg-green-600 hover:bg-green-700 text-white transition-all transform active:scale-95 uppercase tracking-widest shadow-xl shadow-green-100 animate-pulse-soft text-center"
                >
                  Garantir Plano Premium
                </a>
                <div className="mt-8 flex justify-center items-center gap-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                  <div className="flex items-center gap-1.5"><Lock size={12} className="text-green-500" /> Compra 100% Segura</div>
                  <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                  <div>Garantia de 7 Dias</div>
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
  <section className="py-24 px-4 bg-white overflow-hidden">
    <Reveal variant="scale" threshold={0.3}>
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-green-50 to-white rounded-[4rem] p-10 md:p-20 border border-green-100 shadow-2xl shadow-green-100/50 relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-green-200/30 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3 flex justify-center">
            <img 
              src="https://www.imagemhost.com.br/images/2025/04/17/Selo_de_Garantia_de_7_Dias_PNG_Transparente_Sem_Fundo.png" 
              alt="Selo de Garantia 7 Dias" 
              className="w-64 h-auto drop-shadow-2xl animate-bounce-subtle"
            />
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Satisfação Garantida: <span className="text-green-600">Seu Risco é Zero</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Estamos tão confiantes na qualidade do material <span className="font-bold text-green-700">Sementinhas de Fé</span> que oferecemos uma garantia incondicional. 
              Você tem <span className="font-bold text-slate-900 underline decoration-yellow-400 decoration-4 underline-offset-4">7 dias inteiros</span> para explorar cada atividade. 
            </p>
            <p className="text-lg text-slate-600">
              Se por qualquer motivo você achar que o kit não é para você, basta nos enviar um e-mail e <span className="font-bold">devolvemos 100% do seu dinheiro</span>. Sem burocracia, sem perguntas e continuamos amigos.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4 mb-6">
               <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-green-100 shadow-sm">
                 <ShieldCheck className="w-5 h-5 text-green-500" />
                 <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Compra Protegida</span>
               </div>
               <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-green-100 shadow-sm">
                 <CheckCircle2 className="w-5 h-5 text-green-500" />
                 <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Reembolso Facilitado</span>
               </div>
            </div>

            <Reveal delay={200} variant="scale" className="flex justify-center md:justify-start">
               <a 
                href="#plans" 
                onClick={handleCTAClick}
                className="px-8 py-4 bg-slate-900 hover:bg-black text-white rounded-xl font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
               >
                 Garantir meu risco zero <ArrowRight size={20} />
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
    { question: "Posso imprimir quantas vezes eu quiser?", answer: "Com certeza! Uma das grandes vantagens é poder imprimir as atividades quantas estiver desejar para seus filhos ou alunos." },
    { question: "O material é biblicamente fundamentado?", answer: "Sim, todas as histórias e atividades são baseadas fielmente nas escrituras e foram revisadas por educadores cristãos." },
    { question: "Funciona para ministério infantil grande?", answer: "Perfeitamente. O material pode ser utilizado tanto em casa quanto em igrejas, células e escolas dominicais de qualquer tamanho." },
    { question: "Vou receber atualizações do material?", answer: "No Plano Premium, você terá acesso vitalício e receberá todas as atualizações futuras sem custo adicional." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Perguntas Frequentes</h2>
        </Reveal>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Reveal key={idx} delay={idx * 100} variant="up">
              <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-green-300">
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-green-50/30 transition-colors"
                >
                  <span className="font-bold text-lg text-slate-800">{faq.question}</span>
                  {openIndex === idx ? <ChevronUp className="text-green-500" /> : <ChevronDown className="text-slate-400" />}
                </button>
                {openIndex === idx && (
                  <div className="p-6 pt-0 text-slate-600 bg-white leading-relaxed">
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
    "https://i.postimg.cc/VvXWSK7T/1-(2)-1764632092216-BJzow7a4.webp",
    "https://i.postimg.cc/RhwL3gPY/2-(1)-1764632092221-Muk5Cnn-M.webp",
    "https://i.postimg.cc/NFRkydNd/3-(3)-1764632092220-Brb-R21b-I.webp"
  ];

  return (
    <section className="py-24 px-4 bg-green-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">O Que Dizem Mães e Professoras</h2>
          <p className="text-lg text-slate-600">Histórias reais de transformação no ministério infantil</p>
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
                <img src={url} alt={`Depoimento ${idx + 1}`} className="w-full h-auto object-cover max-w-sm" />
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
          <h2 className="text-3xl font-bold text-green-400 mb-2">Sementinhas de Fé</h2>
          <p className="text-slate-400 max-w-sm">Transformando o aprendizado bíblico infantil através da criatividade e do amor.</p>
        </div>
      </Reveal>
      <Reveal variant="right">
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-6 text-slate-400 font-medium">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
          </div>
          <p className="text-slate-500 text-sm">© 2025 Sementinhas de Fé. Todos os direitos reservados.</p>
        </div>
      </Reveal>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <Benefits />
      <IdealFor />
      <Bonuses />
      <Pricing />
      <Guarantee />
      <FAQ />
      
      <section className="py-24 px-4 bg-green-50 text-center">
        <div className="max-w-3xl mx-auto">
          <Reveal threshold={0.3}>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
              Não Deixe Suas Crianças Sem Este Recurso Precioso
            </h2>
          </Reveal>
          <Reveal delay={200} threshold={0.3}>
            <p className="text-xl text-slate-600 mb-12">
              Milhares de famílias já estão usando este kit para transformar o aprendizado bíblico. Faça parte desta comunidade e veja a diferença na vida das suas crianças!
            </p>
          </Reveal>
          <Reveal delay={400} variant="scale" threshold={0.3}>
            <a 
              href="#plans" 
              onClick={handleCTAClick}
              className="inline-block px-12 py-6 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-2xl font-bold shadow-2xl transition-all transform hover:scale-105 active:scale-95 animate-pulse-soft"
            >
              Quero Garantir o meu acesso agora
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default App;
