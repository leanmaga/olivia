"use client";

import { useState, useEffect } from "react";
import { Heart, Crown, Sparkles, Star, Gem } from "lucide-react";
import { useQuinceaneraConfig } from "@/hooks/useQuinceaneraConfig";

import { motion } from "framer-motion";

const SeaBubbles = ({ count = 15, colores }) => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20, // Empiezan desde abajo
      size: Math.random() * 20 + 10, // Burbujas más grandes
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 6, // Movimiento más lento
      wobble: Math.random() * 30 - 15, // Movimiento lateral
    }));
    setBubbles(newBubbles);
  }, [count, colores]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}%`,
            bottom: 0,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.1))`,
            border: `1px solid rgba(255, 255, 255, 0.4)`,
            boxShadow: `
              inset -2px -2px 4px rgba(255, 255, 255, 0.6),
              0 0 8px rgba(255, 255, 255, 0.3),
              0 2px 4px rgba(0, 0, 0, 0.1)
            `,
          }}
          initial={{
            y: 0,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: [-20, -window.innerHeight - 100], // Suben hasta salir de la pantalla
            x: [0, bubble.wobble, -bubble.wobble, bubble.wobble * 0.5, 0],
            opacity: [0, 0.8, 0.8, 0.6, 0],
            scale: [0.5, 1, 1, 0.8, 0.3],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeOut",
            times: [0, 0.1, 0.5, 0.8, 1],
          }}
        />
      ))}
    </div>
  );
};

// Componente de burbujas más pequeñas
const SmallBubbles = ({ count = 8, colores }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 10,
      size: Math.random() * 12 + 6,
      delay: Math.random() * 3,
      duration: Math.random() * 5 + 4,
      wobble: Math.random() * 20 - 10,
    }));
    setParticles(newParticles);
  }, [count, colores]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            bottom: 0,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4) 35%, rgba(255, 255, 255, 0.1))`,
            border: `0.5px solid rgba(255, 255, 255, 0.5)`,
            boxShadow: `
              inset -1px -1px 2px rgba(255, 255, 255, 0.7),
              0 0 6px rgba(255, 255, 255, 0.2)
            `,
          }}
          initial={{
            y: 0,
            opacity: 0,
            scale: 0.3,
          }}
          animate={{
            y: [-10, -window.innerHeight - 50],
            x: [
              0,
              particle.wobble,
              -particle.wobble * 0.8,
              particle.wobble * 0.5,
              0,
            ],
            opacity: [0, 0.9, 0.9, 0.7, 0],
            scale: [0.3, 1, 1, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
            times: [0, 0.1, 0.5, 0.8, 1],
          }}
        />
      ))}
    </div>
  );
};

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState([]);

  // ✅ Usar configuración centralizada
  const {
    nombre,
    whatsapp,
    fechaEvento,
    horaEvento,
    lugar,
    direccion,
    colores,
  } = useQuinceaneraConfig();

  // Solo ejecutar en el cliente
  useEffect(() => {
    setMounted(true);

    // Generar partículas para el footer
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 5 + Math.random() * 4,
      size: Math.random() * 3 + 1,
    }));
    setParticles(newParticles);
  }, []);

  const whatsappLink = `https://wa.me/${whatsapp.replace(
    /[^0-9]/g,
    ""
  )}?text=Hola! Te escribo por la invitación de los 4 años de ${nombre}`;

  if (!mounted) return null;

  return (
    <footer className="h-screen relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white py-20 overflow-hidden">
      {/* Imagen de fondo con efecto sombreado */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: "url(/assets/tapiz2.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 50%",
          backgroundRepeat: "no-repeat",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 80%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 80%)",
        }}
      />

      {/* Overlay adicional para mejorar la legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

      {/* Partículas flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute footer-particle-gentle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              "--delay": `${particle.delay}s`,
              "--duration": `${particle.duration}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          >
            <Star className="w-full h-full text-white" />
          </div>
        ))}
      </div>

      <SeaBubbles count={20} colores={colores} />
      <SmallBubbles count={15} colores={colores} />

      {/* Overlay de gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header del Footer */}
        <div className="text-center mb-16 footer-slide-in-up">
          <div className="relative inline-block mb-6">
            <div
              className="absolute inset-0 blur-3xl footer-pulse-glow"
              style={{
                background: `linear-gradient(to right, ${colores.primario[400]}33, ${colores.terciario[400]}33)`,
              }}
            />
            <Crown
              className="relative w-16 h-16 mx-auto"
              style={{ color: colores.primario[400] }}
            />
          </div>

          <h2
            className="font-Emilys_Candy text-4xl md:text-6xl font-bold mb-4 footer-shimmer-text"
            style={{
              background: `linear-gradient(90deg, ${colores.primario[400]} 0%, ${colores.primario[500]} 50%, ${colores.primario[400]} 100%)`,
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {nombre}
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium">
            Gracias por ser parte de este momento tan especial en mi vida.
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <Heart
              className="w-5 h-5 animate-pulse"
              style={{ color: colores.primario[400] }}
            />
            <Gem className="w-6 h-6" style={{ color: colores.primario[500] }} />
            <Heart
              className="w-5 h-5 animate-pulse"
              style={{ color: colores.primario[400] }}
            />
          </div>
        </div>

        {/* Grid de Contenido */}
        <div className="grid md:grid-cols-1 gap-10 mb-16">
          {/* Detalles del Evento */}
          <div
            className="footer-slide-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles
                  className="w-6 h-6"
                  style={{ color: colores.primario[400] }}
                />
                <h3
                  className="font-Emilys_Candy text-2xl font-bold"
                  style={{ color: colores.primario[300] }}
                >
                  Detalles del Evento
                </h3>{" "}
                <Sparkles
                  className="w-6 h-6"
                  style={{ color: colores.primario[400] }}
                />
              </div>

              <div className="space-y-3 text-gray-300">
                <p
                  className="font-bold text-lg"
                  style={{ color: colores.primario[200] }}
                >
                  {fechaEvento}
                </p>
                <p className="font-semibold">{horaEvento}</p>
                <p
                  className="font-bold"
                  style={{ color: colores.primario[200] }}
                >
                  {lugar}
                </p>
                <p className="text-sm text-gray-400">{direccion}</p>
              </div>

              <div
                className="mt-6 h-1 w-20 rounded-full mx-auto"
                style={{
                  background: `linear-gradient(to right, ${colores.primario[400]}, ${colores.terciario[400]})`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Separador Decorativo */}
        <div className="flex items-center justify-center mb-10">
          <div
            className="h-px w-32"
            style={{
              background: `linear-gradient(to right, transparent, ${colores.primario[400]}, transparent)`,
            }}
          />
          <div className="mx-6 relative">
            <div
              className="absolute inset-0 blur-xl"
              style={{ backgroundColor: `${colores.primario[400]}33` }}
            />
            <Sparkles
              className="relative w-8 h-8 animate-pulse"
              style={{ color: colores.primario[400] }}
            />
          </div>
          <div
            className="h-px w-32"
            style={{
              background: `linear-gradient(to right, transparent, ${colores.primario[400]}, transparent)`,
            }}
          />
        </div>

        {/* Sección Final */}
        <div
          className="text-center footer-slide-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-gray-500 text-sm">
            <span>Hecho con</span>
            <Heart
              className="w-4 h-4 animate-pulse"
              style={{ color: colores.primario[400] }}
            />
            <span>
              para {nombre} por{" "}
              <a
                href="https://patagoniascript.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: colores.primario[400] }}
              >
                PatagoniaScript
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
