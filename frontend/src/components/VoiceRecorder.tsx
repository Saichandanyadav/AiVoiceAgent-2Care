"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Square, Sparkles, LayoutDashboard, History, Settings, Clock, ChevronRight, User, Calendar, CheckCircle2, Menu, X } from "lucide-react";

export default function VoiceRecorder() {
  const [activeTab, setActiveTab] = useState("assistant");
  const [recording, setRecording] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const recorderRef = useRef<any>(null);
  const chunks = useRef<any[]>([]);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    if (activeTab === "assistant") {
      const timeoutId = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, loading, thinking, activeTab]);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    window.speechSynthesis.speak(u);
  };

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunks.current = [];
      recorder.ondataavailable = (e) => chunks.current.push(e.data);
      recorder.onstop = () => {
        setThinking(true);
        setTimeout(() => send(), 1500);
      };
      recorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Microphone access denied", err);
    }
  };

  const stop = () => {
    recorderRef.current?.stop();
    setRecording(false);
  };

  const send = async () => {
    setLoading(true);
    const blob = new Blob(chunks.current);
    const file = new File([blob], "audio.webm");
    const form = new FormData();
    form.append("audio", file);
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setMessages((p) => [
      ...p,
      { role: "user", text: "Voice captured", time },
      { role: "ai", text: "", loading: true, time }
    ]);

    try {
      const res = await fetch("http://localhost:5000/api/voice", {
        method: "POST",
        body: form
      });
      const data = await res.json();

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "ai",
          text: data.reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        return updated;
      });
      speak(data.reply);
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "ai",
          text: "Sorry, I'm having trouble connecting to the server.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        return updated;
      });
    }

    setThinking(false);
    setLoading(false);
  };

  const RenderMessage = ({ m }: { m: any }) => {
    const text = m.text.toLowerCase();

    if (text.includes("available doctors")) {
      const docs = [
        { name: "Dr. Arjun Mehta", specialty: "Gastroenterologist", initial: "A" },
        { name: "Dr. Sneha Reddy", specialty: "General Physician", initial: "S" },
        { name: "Dr. Vikram Iyer", specialty: "Internal Medicine Specialist", initial: "V" }
      ];
      return (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">{m.text}</p>
          <div className="grid grid-cols-1 gap-3">
            {docs.map((d) => (
              <div key={d.name} className="bg-white border border-slate-100 p-3 sm:p-4 rounded-2xl flex items-center justify-between shadow-sm hover:border-sky-200 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600 font-bold text-base sm:text-lg group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    {d.initial}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm sm:text-base">{d.name}</p>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-medium">{d.specialty}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-sky-600 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (text.includes("time slots")) {
      const slots = ["11:00 AM", "02:00 PM", "04:00 PM", "06:30 PM"];
      return (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">{m.text}</p>
          <div className="grid grid-cols-2 gap-2">
            {slots.map((s) => (
              <button key={s} className="bg-sky-50/50 border border-sky-100 px-2 py-3 rounded-xl text-sky-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-sky-600 hover:text-white transition-all active:scale-95">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {s}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (text.includes("confirmed")) {
      return (
        <div className="relative overflow-hidden bg-white border border-emerald-100 p-4 sm:p-5 rounded-3xl shadow-xl shadow-emerald-500/5">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-full -mr-10 -mt-10 opacity-50" />
          <div className="relative">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1">Appointment Fixed!</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">{m.text}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
               <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Reference ID:</div>
               <div className="text-xs font-mono font-bold text-slate-700">#CARE-2026-X9</div>
            </div>
          </div>
        </div>
      );
    }

    return <p className="leading-relaxed text-sm sm:text-[15px]">{m.text}</p>;
  };

  const Dots = () => (
    <div className="flex gap-1.5 items-center py-2 px-1">
      <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-duration:0.8s]"></span>
      <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]"></span>
      <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]"></span>
    </div>
  );

  const NavigationItems = () => (
    <nav className="space-y-2 flex-1">
      {[
        { id: "assistant", icon: LayoutDashboard, label: "Assistant" },
        { id: "history", icon: History, label: "Booking History" },
        { id: "settings", icon: Settings, label: "Preferences" }
      ].map((i) => (
        <button
          key={i.id}
          onClick={() => {
            setActiveTab(i.id);
            setIsSidebarOpen(false);
          }}
          className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 ${
            activeTab === i.id ? "bg-sky-600 text-white shadow-lg shadow-sky-600/20" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <i.icon size={20} />
            <span className="text-sm font-bold">{i.label}</span>
          </div>
          {activeTab === i.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-slate-50 overflow-hidden font-sans">
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
        .animate-dash-line {
          animation: dash 2s linear infinite;
        }
      `}</style>
      
      <aside className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out w-72 bg-slate-900 text-white flex-col p-6 shadow-2xl z-50 lg:flex`}>
        <div className="flex items-center justify-between mb-12 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Sparkles className="text-white" size={20} />
            </div>
            <h1 className="font-black text-2xl tracking-tight">2Care<span className="text-sky-500">.ai</span></h1>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <NavigationItems />

        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 mt-auto">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Connected as</p>
            <p className="text-xs font-bold">Health Guest</p>
        </div>
      </aside>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col relative w-full overflow-hidden">
        <header className="p-4 sm:p-5 bg-white/80 backdrop-blur-md border-b flex justify-between items-center lg:hidden sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl">
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="text-white" size={16} />
              </div>
              <h1 className="font-black text-slate-900 tracking-tight text-sm sm:text-base">2Care.ai</h1>
            </div>
          </div>
          <div className="px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-[10px] font-black uppercase">Live</div>
        </header>

        {activeTab === "assistant" ? (
          <>
            <div ref={chatRef} className="flex-1 overflow-y-auto scrollbar-hide px-4 py-6 sm:p-8 lg:p-12 space-y-6 sm:space-y-8 max-w-4xl mx-auto w-full">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-80 py-20 relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white shadow-2xl shadow-sky-200 rounded-[2.5rem] flex items-center justify-center mb-6 sm:mb-8 rotate-3 transition-transform hover:rotate-0">
                    <Mic className="w-8 h-8 sm:w-10 sm:h-10 text-sky-500" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-3">How are you feeling?</h2>
                  <p className="text-slate-400 max-w-xs mx-auto text-xs sm:text-sm leading-relaxed px-4">
                    Tell me your symptoms and I'll help you find the right doctor instantly.
                  </p>
                  
                  {!recording && (
                    <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-full h-[120px] pointer-events-none hidden sm:block">
                      <svg viewBox="0 0 200 120" className="w-full h-full text-sky-500/50 overflow-visible">
                        <path d="M100,10 C100,50 100,80 100,105" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" className="animate-dash-line" />
                        <path d="M95,100 L100,110 L105,100" fill="currentColor" />
                      </svg>
                    </div>
                  )}
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={`flex w-full ${m.role === "ai" ? "justify-start" : "justify-end"} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                  <div className={`max-w-[95%] sm:max-w-[85%] lg:max-w-[75%] group`}>
                    <div className={`px-4 py-3 sm:px-5 sm:py-4 rounded-[1.5rem] sm:rounded-[2rem] text-[14px] sm:text-[15px] shadow-sm relative ${m.role === "ai" ? "bg-white border border-slate-100 text-slate-700 rounded-tl-none" : "bg-slate-900 text-white rounded-tr-none"}`}>
                      {m.loading ? <Dots /> : <RenderMessage m={m} />}
                    </div>
                    <div className={`text-[9px] sm:text-[10px] font-bold mt-2 px-2 uppercase tracking-tighter opacity-60 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity ${m.role === "ai" ? "text-slate-400" : "text-slate-500 text-right"}`}>
                      {m.role === "ai" ? "Assistant" : "You"} • {m.time}
                    </div>
                  </div>
                </div>
              ))}
              {thinking && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 px-5 py-3 sm:px-6 sm:py-4 rounded-[1.5rem] sm:rounded-[2rem] rounded-tl-none shadow-sm"><Dots /></div>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8 lg:p-12 flex justify-center bg-gradient-to-t from-slate-50 via-slate-50 to-transparent sticky bottom-0 z-10">
              <div className="relative group">
                <div className={`absolute -inset-3 sm:-inset-4 rounded-full blur-2xl transition-all duration-500 opacity-20 ${recording ? "bg-red-500 opacity-40 scale-125" : "bg-sky-400 group-hover:bg-sky-500"}`} />
                <button onClick={recording ? stop : start} className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl active:scale-90 ${recording ? "bg-red-500 ring-4 sm:ring-8 ring-red-100" : "bg-slate-900 hover:bg-sky-600"}`}>
                    {recording ? <Square className="text-white fill-white w-7 h-7 sm:w-8 sm:h-8" /> : <Mic className="text-white w-7.5 h-7.5 sm:w-9 sm:h-9" />}
                </button>
                {recording && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[9px] sm:text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-bounce whitespace-nowrap">
                        Listening...
                    </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
            <div className="text-center">
               <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <Clock className="w-8 h-8 sm:w-10 sm:h-10" />
               </div>
               <h3 className="font-black text-slate-800 text-lg sm:text-xl capitalize mb-2">{activeTab}</h3>
               <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto">This feature is currently under development. Stay tuned for updates!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}