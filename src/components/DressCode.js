"use client";

import { useState, useEffect } from "react";
import { Waves, Sun, Sparkles, Heart, Star, Gem, Flower2 } from "lucide-react";
import {
  useQuinceaneraConfig,
  useDressCode,
} from "@/hooks/useQuinceaneraConfig";

import { motion } from "framer-motion";

const SeaBubbles = ({ count = 15, colores }) => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 6,
      wobble: Math.random() * 30 - 15,
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
            y: [-20, -window.innerHeight - 100],
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

export default function DressCodeSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [particles, setParticles] = useState([]);

  const { colores } = useQuinceaneraConfig();
  const dressCode = useDressCode();

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  const piletaInfo = {
    title: "Esenciales para la Pileta",
    icon: Sun,
    items: [
      "Traje de baño o bikini",
      "Toallón personal",
      "Ojotas o sandalias",
      "Protector solar",
      "Gorra o sombrero",
      "Ropa de cambio",
    ],
    tips: "No olvides traer una bolsa impermeable para tu ropa seca",
  };

  return (
    <section
      className="relative min-h-screen py-20 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colores.primario[50]} 0%, ${colores.secundario[50]} 50%, ${colores.primario[100]} 100%)`,
      }}
    >
      {/* Partículas flotantes de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 dresscode-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              "--delay": `${particle.delay}s`,
              "--duration": `${particle.duration}s`,
            }}
          >
            <Star
              className="w-full h-full opacity-40"
              style={{ color: colores.primario[300] }}
            />
          </div>
        ))}
      </div>

      <SeaBubbles count={20} colores={colores} />
      <SmallBubbles count={15} colores={colores} />

      {/* Sparkles decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute dresscode-sparkle-particle"
            style={{
              left: `${20 + i * 10}%`,
              top: `${10 + (i % 3) * 30}%`,
              "--delay": `${i * 0.5}s`,
            }}
          >
            <Sparkles
              className="w-4 h-4 opacity-60"
              style={{ color: colores.primario[400] }}
            />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Espectacular */}
        <div className="text-center mb-16 dresscode-slide-up">
          <div className="relative inline-block mb-6">
            <div
              className="absolute inset-0 blur-3xl"
              style={{
                background: `linear-gradient(to right, ${colores.primario[400]}30, ${colores.terciario[400]}30)`,
              }}
            />
            <Waves
              className="relative w-16 h-16 mx-auto"
              style={{ color: colores.primario[600] }}
            />
          </div>

          <h2
            className="font-Emilys_Candy text-5xl md:text-7xl font-bold mb-4 p-4 dresscode-shimmer-text"
            style={{
              background: `linear-gradient(90deg, ${colores.primario[500]} 0%, ${colores.terciario[400]} 50%, ${colores.primario[500]} 100%)`,
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Diversión Acuática
          </h2>

          <p className="text-xl" style={{ color: colores.primario[600] }}>
            Ropa informal para andar por el parque
          </p>
        </div>

        {/* Card con Info de la Pileta */}
        <div
          className="flex justify-center dresscode-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="max-w-lg w-full">
            <div
              className="dresscode-card-hover glass-morphism rounded-3xl p-8 shadow-2xl relative"
              onMouseEnter={() => setHoveredCard("pileta")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Header de la Card */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-400 to-cyan-500">
                  <Sun className="w-8 h-8 text-white" />
                </div>
                <h4
                  className="text-2xl font-bold"
                  style={{ color: colores.primario[800] }}
                >
                  {piletaInfo.title}
                </h4>
              </div>

              {/* Lista de Items */}
              <div className="space-y-3 mb-6">
                {piletaInfo.items.map((listItem, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300"
                    style={{
                      backgroundColor:
                        hoveredCard === "pileta"
                          ? `${colores.primario[100]}50`
                          : "transparent",
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        background: `linear-gradient(to right, ${colores.primario[400]}, ${colores.terciario[400]})`,
                      }}
                    />
                    <span
                      className="font-medium"
                      style={{ color: colores.primario[800] }}
                    >
                      {listItem}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tip especial */}
              <div
                className="rounded-2xl p-4"
                style={{
                  background: `linear-gradient(to right, ${colores.primario[100]}80, ${colores.secundario[100]}80)`,
                  border: `1px solid ${colores.primario[300]}50`,
                }}
              >
                <div className="flex items-start gap-3">
                  <Heart
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: colores.primario[600] }}
                  />
                  <p
                    className="text-sm italic"
                    style={{ color: colores.primario[700] }}
                  >
                    <span className="font-semibold">Tip especial:</span>{" "}
                    {piletaInfo.tips}
                  </p>
                </div>
              </div>

              {/* Efecto hover especial */}
              {hoveredCard === "pileta" && (
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${colores.primario[400]}10, ${colores.terciario[400]}10)`,
                  }}
                >
                  <div className="absolute top-4 right-4">
                    <Sparkles
                      className="w-6 h-6 animate-spin"
                      style={{ color: colores.primario[500] }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mensaje Final Inspirador */}
        <div
          className="text-center mt-16 dresscode-slide-up"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="glass-morphism rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Flower2
                className="w-8 h-8"
                style={{ color: colores.primario[600] }}
              />
              <Gem
                className="w-10 h-10"
                style={{ color: colores.primario[500] }}
              />
              <Flower2
                className="w-8 h-8"
                style={{ color: colores.primario[600] }}
              />
            </div>

            <h3
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: colores.primario[800] }}
            >
              Una Celebración Inolvidable Te Espera
            </h3>

            <p
              className="text-lg leading-relaxed"
              style={{ color: colores.primario[700] }}
            >
              Recuerda que lo más importante es que te sientas cómodo y seguro
              para disfrutar al máximo de esta celebración única. Tu presencia
              es el mejor regalo y tu sonrisa será el accesorio más hermoso del
              día.
            </p>

            <div className="flex items-center justify-center gap-4 mt-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 dresscode-sparkle-particle"
                  style={{
                    color: colores.primario[500],
                    "--delay": `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
