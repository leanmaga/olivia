"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { useQuinceaneraConfig } from "@/hooks/useQuinceaneraConfig";

// Componente de burbujas submarinas
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

export default function HeroSection() {
  const { nombre, edad, colores } = useQuinceaneraConfig();

  // Estilos para los textos principales
  const titleStyles = {
    className: "text-6xl md:text-8xl lg:text-9xl font-bold mb-4 relative z-10",
    style: {
      fontFamily: "var(--font-Emilys_Candy)",
      color: colores.primario[200],
      textShadow: `0 0 20px ${colores.primario[400]}, 0 0 40px ${colores.primario[500]}, 0 0 60px ${colores.terciario[400]}, 2px 2px 8px rgba(0,0,0,0.8)`,
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Tapiz con opacidad para que se vea sobre el fondo claro */}
      {/* Mobile: verticalHero.png */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: `url('/assets/verticalHero.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          mixBlendMode: "multiply",
        }}
      />
      {/* Desktop: tapiz.png */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: `url('/assets/tapiz.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          mixBlendMode: "multiply",
        }}
      />

      {/* Overlay sutil para dar profundidad sin oscurecer demasiado */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, 
              ${colores.primario[50]}20, 
              transparent 30%, 
              transparent 70%, 
              ${colores.primario[100]}30
            )
          `,
        }}
      />

      <SeaBubbles count={20} colores={colores} />
      <SmallBubbles count={15} colores={colores} />

      <div className="text-center z-10 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 relative"
        >
          {/* Contenedor del nombre */}
          <div className="relative">
            <motion.h1
              className={titleStyles.className}
              style={titleStyles.style}
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  `0 0 20px ${colores.primario[400]}, 0 0 40px ${colores.primario[500]}, 0 0 60px ${colores.terciario[400]}, 2px 2px 8px rgba(0,0,0,0.8)`,
                  `0 0 30px ${colores.primario[400]}, 0 0 50px ${colores.primario[500]}, 0 0 70px ${colores.terciario[400]}, 2px 2px 8px rgba(0,0,0,0.8)`,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {nombre}
            </motion.h1>
          </div>

          {/* Sección con número 15 entre líneas */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div
              className="h-px w-24"
              style={{
                background: `linear-gradient(to right, transparent, ${colores.primario[400]}, transparent)`,
              }}
            />

            {/* Número 15 con efectos especiales */}
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.span
                className={titleStyles.className}
                style={titleStyles.style}
                animate={{
                  textShadow: [
                    `0 0 20px ${colores.primario[400]}, 0 0 40px ${colores.primario[500]}, 0 0 60px ${colores.terciario[400]}, 2px 2px 8px rgba(0,0,0,0.8)`,
                    `0 0 30px ${colores.primario[400]}, 0 0 50px ${colores.primario[500]}, 0 0 70px ${colores.terciario[400]}, 2px 2px 8px rgba(0,0,0,0.8)`,
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {edad}
              </motion.span>

              {/* Burbujas alrededor del número */}
              <SmallBubbles count={8} colores={colores} />
            </motion.div>

            <div
              className="h-px w-24"
              style={{
                background: `linear-gradient(to right, transparent, ${colores.primario[400]}, transparent)`,
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8 relative"
        >
          {/* "AÑOS" con los mismos estilos que el nombre */}
          <motion.h1
            className={titleStyles.className}
            style={titleStyles.style}
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Años
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl font-light relative z-10"
            style={{
              color: colores.primario[100],
              textShadow: `2px 2px 4px rgba(0,0,0,0.8), 0 0 15px ${colores.primario[400]}`,
            }}
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Acompañanos a celebrar bajo del mar
          </motion.p>
        </motion.div>
      </div>

      {/* Luciérnagas decorativas */}
      <motion.div
        className="absolute top-10 left-10"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1.2, 0.8],
          x: [0, 10, -5, 0],
          y: [0, -8, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 1,
        }}
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: colores.primario[400],
            boxShadow: `0 0 15px ${colores.primario[400]}, 0 0 30px ${colores.primario[400]}60`,
          }}
        />
      </motion.div>

      <motion.div
        className="absolute top-20 right-16"
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [0.6, 1, 0.6],
          x: [0, -15, 8, 0],
          y: [0, 12, -6, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 2,
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: colores.terciario[300],
            boxShadow: `0 0 12px ${colores.terciario[300]}, 0 0 24px ${colores.terciario[300]}40`,
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-20"
        animate={{
          opacity: [0.4, 0.9, 0.4],
          scale: [0.7, 1.1, 0.7],
          x: [0, 18, -10, 0],
          y: [0, -12, 8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 0.5,
        }}
      >
        <div
          className="w-4 h-4 rounded-full"
          style={{
            backgroundColor: colores.primario[400],
            boxShadow: `0 0 18px ${colores.primario[400]}, 0 0 36px ${colores.primario[400]}50`,
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-24"
        animate={{
          opacity: [0.6, 1, 0.4, 0.8],
          scale: [0.8, 1.2, 0.9, 1],
          x: [0, -20, 15, 0],
          y: [0, -18, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{
            backgroundColor: colores.terciario[300],
            boxShadow: `0 0 14px ${colores.terciario[300]}, 0 0 28px ${colores.terciario[300]}40`,
          }}
        />
      </motion.div>
    </section>
  );
}
