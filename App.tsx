
import React, { useState, useEffect, useRef } from 'react';
import { MATH_LEVELS, LevelCategory } from './constants';
import { AppState, ChatMessage, Language } from './types';

const UI_STRINGS = {
  ca: {
    headerSub: "Ecuacions de 1er Grau",
    level: "Nivell",
    hints: "Pistes",
    progress: "El teu Progrés",
    placeholder: "Escriu la teva resposta (ex: x=5) o 'pista'...",
    correct: "Correcte!",
    nextLevel: "Següent nivell...",
    problem: "Problema",
    evalError: "Sembla que hi ha hagut un error avaluant la teva resposta. Pots repetir-la?",
    hintLabel: "Pista:",
    hintError: "Ups, he tingut un problema generant la pista. Torna-ho a provar!",
    finalSuccess: "🎉 EXCEL·LENT! Has completat tots els nivells. Ets un mestre de les equacions.",
    reset: "Reiniciar Tot",
    greeting: "Ei! 👋 Ready per petar-lo al pròxim examen? Donem-li canya a aquestes equacions de nivell pro fins que te'n surtis dormint. Comencem per escalfar...",
    roadmapTitle: "Mapa de Nivells",
    locked: "Disponible",
    completed: "Completat",
    current: "Actual",
    resetConfirm: "Estàs segur que vols reiniciar tot el progrés?",
    catRepaso: "Repàs",
    catFacil: "Fàcil",
    catIntermedio: "Intermig",
    catDificil: "Difícil"
  },
  es: {
    headerSub: "Ecuaciones de 1er Grado",
    level: "Nivel",
    hints: "Pistas",
    progress: "Tu Progreso",
    placeholder: "Escribe tu respuesta (ej: x=5) o 'pista'...",
    correct: "Correcto!",
    nextLevel: "Siguiente nivel...",
    problem: "Problema",
    evalError: "Parece que hubo un error evaluando tu respuesta. ¿Podrías repetirla?",
    hintLabel: "Pista:",
    hintError: "Ups, tuve un problema generando la pista. ¡Inténtalo de nuevo!",
    finalSuccess: "🎉 ¡EXCELENTE! Has completado todos los niveles. Eres un maestro de las ecuaciones.",
    reset: "Reiniciar Todo",
    greeting: "¡Epa! 👋 ¿Ready para petarlo en el próximo examen? Vamos a darle caña a estas ecuaciones de nivel pro hasta que te salgan dormido. Empecemos por calentar...",
    roadmapTitle: "Mapa de Niveles",
    locked: "Disponible",
    completed: "Completado",
    current: "Actual",
    resetConfirm: "¿Estás seguro de que quieres reiniciar todo el progreso?",
    catRepaso: "Repaso",
    catFacil: "Fácil",
    catIntermedio: "Intermedio",
    catDificil: "Difícil"
  }
};

const CATEGORIES: { key: LevelCategory; color: string; badge: string }[] = [
  { key: 'repaso',     color: 'text-slate-500',  badge: 'bg-slate-100 text-slate-600' },
  { key: 'facil',      color: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
  { key: 'intermedio', color: 'text-amber-600',   badge: 'bg-amber-100 text-amber-700' },
  { key: 'dificil',    color: 'text-rose-600',    badge: 'bg-rose-100 text-rose-700' },
];

const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, lineIdx) => {
        const parts = line.split(/(\*\*.*?\*\*|\$\$.*?\$\$|\*.*?\*)/g);
        return (
          <div key={lineIdx} className={line.trim() === '' ? 'h-2' : 'mb-1'}>
            {parts.map((part, partIdx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <strong key={partIdx} className="font-bold text-indigo-700">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              if (part.startsWith('$$') && part.endsWith('$$')) {
                return (
                  <span key={partIdx} className="italic math-font bg-slate-200 px-1 rounded text-indigo-800">
                    {part.slice(2, -2)}
                  </span>
                );
              }
              if (part.startsWith('*') && part.endsWith('*')) {
                return (
                  <em key={partIdx} className="italic">
                    {part.slice(1, -1)}
                  </em>
                );
              }
              return <span key={partIdx}>{part}</span>;
            })}
          </div>
        );
      })}
    </>
  );
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentLevel: 0,
    completedLevels: [],
    hintsUsed: 0,
    completed: false,
    history: [],
    totalLevels: MATH_LEVELS.length,
    language: 'ca'
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const t = UI_STRINGS[state.language];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (state.history.length === 0) {
      const firstLevel = MATH_LEVELS[state.currentLevel];
      setState(prev => ({
        ...prev,
        history: [{
          role: 'assistant',
          text: `${t.greeting}\n\n**${firstLevel.title[state.language]}**\n${t.problem}: ${firstLevel.equation[state.language]}`,
          timestamp: Date.now()
        }]
      }));
    }
  }, [state.history.length, state.language, state.currentLevel, t.greeting, t.problem]);

  useEffect(() => {
    scrollToBottom();
  }, [state.history]);

  const toggleLanguage = () => {
    const newLang: Language = state.language === 'ca' ? 'es' : 'ca';
    setState(prev => ({
      ...prev,
      language: newLang
      // Ya no borramos el historial aquí
    }));
    setIsMenuOpen(false);
  };

  const resetProgress = () => {
    if (window.confirm(t.resetConfirm)) {
      setState({
        currentLevel: 0,
        completedLevels: [],
        hintsUsed: 0,
        completed: false,
        history: [], // Esto disparará el useEffect del saludo inicial
        totalLevels: MATH_LEVELS.length,
        language: state.language
      });
      setIsMenuOpen(false);
    }
  };

  const addMessage = (role: 'user' | 'assistant', text: string) => {
    setState(prev => ({
      ...prev,
      history: [...prev.history, { role, text, timestamp: Date.now() }]
    }));
  };

  const localEvaluate = (userInput: string, levelIndex: number): { correct: boolean; feedback: string } => {
    const currentLevelData = MATH_LEVELS[levelIndex];
    const cleanInput = userInput.replace(/\s/g, '').replace(/x=/gi, '').replace(/,/g, '.');
    
    if (cleanInput === currentLevelData.expectedAnswer) {
      return { 
        correct: true, 
        feedback: state.language === 'ca' ? "Molt bé! Has trobat la X." : "¡Muy bien! Has encontrado la X." 
      };
    } else {
      return { 
        correct: false, 
        feedback: currentLevelData.feedback[state.language].wrong 
      };
    }
  };

  const handleSend = () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    const userInput = trimmedInput.toLowerCase();
    setInputValue('');
    addMessage('user', trimmedInput);
    setIsLoading(true);

    setTimeout(() => {
      const currentLevelData = MATH_LEVELS[state.currentLevel];
      const isHintRequested = userInput === 'pista' || userInput === 'hint';

      if (isHintRequested) {
        const levelHints = currentLevelData.hints[state.language];
        // Contamos pistas del historial de este nivel específico
        const currentLevelMessages = state.history.filter(m => 
          m.role === 'assistant' && 
          m.text.includes(t.hintLabel)
        );
        const hintIndex = currentLevelMessages.length % levelHints.length;
        const hint = levelHints[hintIndex];
        
        setState(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));
        addMessage('assistant', `💡 **${t.hintLabel}** ${hint}`);
      } else {
        const evaluation = localEvaluate(userInput, state.currentLevel);
        
        if (evaluation.correct) {
          const nextLevel = state.currentLevel + 1;
          const isFinal = nextLevel >= state.totalLevels;

          if (isFinal) {
            setState(prev => ({
              ...prev,
              completed: true,
              completedLevels: prev.completedLevels.includes(prev.currentLevel)
                ? prev.completedLevels
                : [...prev.completedLevels, prev.currentLevel]
            }));
            addMessage('assistant', t.finalSuccess);
          } else {
            const nextLevelData = MATH_LEVELS[nextLevel];
            setState(prev => ({
              ...prev,
              currentLevel: nextLevel,
              completedLevels: prev.completedLevels.includes(prev.currentLevel)
                ? prev.completedLevels
                : [...prev.completedLevels, prev.currentLevel]
            }));
            addMessage('assistant', `✅ **${t.correct}** ${evaluation.feedback}\n\n${t.nextLevel}\n\n**${nextLevelData.title[state.language]}**\n${t.problem}: ${nextLevelData.equation[state.language]}`);
          }
        } else {
          addMessage('assistant', `❌ ${evaluation.feedback}`);
        }
      }
      setIsLoading(false);
    }, 400);
  };

  const jumpToLevel = (index: number) => {
    const levelData = MATH_LEVELS[index];
    setState(prev => ({
      ...prev,
      currentLevel: index,
      completed: false,
    }));
    addMessage('assistant', `**${levelData.title[state.language]}**\n${t.problem}: ${levelData.equation[state.language]}`);
    setIsMenuOpen(false);
  };

  const calculateProgress = () => {
    const count = state.completedLevels.length;
    const percentage = Math.round((count / state.totalLevels) * 100);
    return { percentage, count };
  };

  const progress = calculateProgress();

  return (
    <div className="h-screen flex flex-col max-w-2xl mx-auto bg-white shadow-2xl relative">
      
      {/* Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Levels Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">{t.roadmapTitle}</h2>
            <div className="flex gap-2">
               <button 
                onClick={resetProgress} 
                className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-all"
                title={t.reset}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
              <button onClick={() => setIsMenuOpen(false)} className="text-slate-400 hover:text-slate-600 p-2">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
          </div>
          
          <div className="space-y-5 mb-8">
            {CATEGORIES.map(({ key, color, badge }) => {
              const catLabel = key === 'repaso' ? t.catRepaso : key === 'facil' ? t.catFacil : key === 'intermedio' ? t.catIntermedio : t.catDificil;
              const levelsInCat = MATH_LEVELS.map((l, i) => ({ level: l, index: i })).filter(({ level }) => level.category === key);
              return (
                <div key={key}>
                  <div className={`flex items-center gap-2 mb-2`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${color}`}>{catLabel}</span>
                    <div className="flex-1 h-px bg-slate-100"></div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${badge}`}>{levelsInCat.length}</span>
                  </div>
                  <div className="space-y-2">
                    {levelsInCat.map(({ level, index }) => {
                      const isCompleted = state.completedLevels.includes(index);
                      const isCurrent = index === state.currentLevel;
                      return (
                        <button
                          key={level.id}
                          onClick={() => jumpToLevel(index)}
                          className={`w-full text-left p-3 rounded-xl border flex items-center gap-3 transition-all cursor-pointer hover:shadow-md active:scale-[0.98] ${
                            isCurrent
                              ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-500/20'
                              : isCompleted
                                ? 'bg-emerald-50/50 border-emerald-100 hover:bg-emerald-50'
                                : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                            isCurrent
                              ? 'bg-indigo-600 text-white'
                              : isCompleted
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-200 text-slate-500'
                          }`}>
                            {isCompleted ? <i className="fas fa-check"></i> : level.id}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold truncate ${isCurrent ? 'text-indigo-900' : 'text-slate-700'}`}>
                              {level.title[state.language]}
                            </p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-tighter">
                              {isCompleted ? t.completed : isCurrent ? t.current : t.locked}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 sticky top-0 z-10 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-all active:scale-95"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div>
            <h1 className="font-bold text-lg leading-tight text-white tracking-tight">X-Hunter</h1>
            <p className="text-xs text-indigo-100 uppercase tracking-widest font-semibold">{t.headerSub}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs font-bold transition-all border border-white/10 uppercase"
          >
            {state.language === 'ca' ? 'ES' : 'CA'}
          </button>
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium">{t.level} {state.currentLevel + 1} / {state.totalLevels}</div>
            <div className="text-[10px] opacity-75">{t.hints}: {state.hintsUsed}</div>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-44">
        {state.history.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none' 
                : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
            }`}>
              <div className="leading-relaxed">
                <FormattedText text={msg.text} />
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 p-4 rounded-2xl animate-pulse flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      {/* Modern Progress Footer */}
      <div className="fixed bottom-[80px] left-0 right-0 max-w-2xl mx-auto px-4 pointer-events-none">
         <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-2xl shadow-xl pointer-events-auto transition-all duration-300">
            <div className="flex justify-between items-end mb-2">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.progress}</span>
                <div className="text-xl font-black text-indigo-600 leading-none">
                  {progress.percentage}%
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">
                  {progress.count} / {state.totalLevels}
                </span>
                <span className="text-xs font-semibold text-slate-600">
                  <i className="fas fa-lightbulb text-amber-400 mr-1"></i>
                  {t.hints}: {state.hintsUsed}
                </span>
              </div>
            </div>
            
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-700 ease-out relative"
                style={{ width: `${progress.percentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
         </div>
      </div>

      {/* Input Form */}
      <footer className="bg-white border-t border-slate-200 p-4 sticky bottom-0 z-20">
        {!state.completed ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.placeholder}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-md active:scale-95"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        ) : (
          <div className="text-center py-2">
            <button 
              onClick={() => {
                // Reiniciar simplemente recarga el estado a cero sin preguntar (porque ya completó)
                setState({
                  currentLevel: 0,
                  completedLevels: [],
                  hintsUsed: 0,
                  completed: false,
                  history: [],
                  totalLevels: MATH_LEVELS.length,
                  language: state.language
                });
              }}
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-all"
            >
              {t.reset}
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};

export default App;
