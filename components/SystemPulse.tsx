'use client';

import { useEffect, useRef, useState } from "react";
import { Play, Pause, RefreshCw } from "lucide-react";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  pulseIntensity: number;
}

interface Particle {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number; // 0 to 1
  speed: number;
  color: string;
  onComplete: () => void;
}

export default function SystemPulse() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [statusMessage, setStatusMessage] = useState("System idle");

  const nodesRef = useRef<Node[]>([
    { id: "client", label: "Client App", x: 45, y: 100, pulseIntensity: 0 },
    { id: "gateway", label: "API Gateway", x: 135, y: 100, pulseIntensity: 0 },
    { id: "auth", label: "Auth Service", x: 235, y: 50, pulseIntensity: 0 },
    { id: "db", label: "DB Server", x: 235, y: 150, pulseIntensity: 0 },
  ]);

  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const lastSpawnTime = useRef<number>(0);

  const spawnParticle = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    speed: number,
    color: string,
    onComplete: () => void
  ) => {
    particlesRef.current.push({
      id: Math.random().toString(),
      startX,
      startY,
      endX,
      endY,
      progress: 0,
      speed,
      color,
      onComplete,
    });
  };

  const triggerFlowSequence = () => {
    // Stage 1: Client -> Gateway
    const client = nodesRef.current[0];
    const gateway = nodesRef.current[1];
    const auth = nodesRef.current[2];
    const db = nodesRef.current[3];

    setStatusMessage("Client request initiated");
    client.pulseIntensity = 1.0;

    spawnParticle(client.x, client.y, gateway.x, gateway.y, 0.02, "#45a9a9", () => {
      // Stage 2: Gateway reached, request Auth check & DB fetch
      gateway.pulseIntensity = 1.0;
      setStatusMessage("Routing & Authenticating API request");

      spawnParticle(gateway.x, gateway.y, auth.x, auth.y, 0.03, "#818cf8", () => {
        auth.pulseIntensity = 1.0;
        setStatusMessage("Authentication Token validated");

        // Auth replies to Gateway
        spawnParticle(auth.x, auth.y, gateway.x, gateway.y, 0.035, "#34d399", () => {
          gateway.pulseIntensity = 1.0;
          setStatusMessage("Access granted. Fetching data...");

          // Gateway requests database
          spawnParticle(gateway.x, gateway.y, db.x, db.y, 0.025, "#fbbf24", () => {
            db.pulseIntensity = 1.0;
            setStatusMessage("Database record retrieved");

            // DB replies to Gateway
            spawnParticle(db.x, db.y, gateway.x, gateway.y, 0.03, "#34d399", () => {
              gateway.pulseIntensity = 1.0;
              setStatusMessage("Structuring JSON response payload");

              // Gateway sends response to Client
              spawnParticle(gateway.x, gateway.y, client.x, client.y, 0.02, "#10b981", () => {
                client.pulseIntensity = 1.5;
                setStatusMessage("HTTP Response 200 OK");
                
                setTimeout(() => {
                  setStatusMessage("System idle");
                }, 1500);
              });
            });
          });
        });
      });
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Connections lines
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);

      // Client -> Gateway
      ctx.beginPath();
      ctx.moveTo(nodesRef.current[0].x, nodesRef.current[0].y);
      ctx.lineTo(nodesRef.current[1].x, nodesRef.current[1].y);
      ctx.stroke();

      // Gateway -> Auth
      ctx.beginPath();
      ctx.moveTo(nodesRef.current[1].x, nodesRef.current[1].y);
      ctx.lineTo(nodesRef.current[2].x, nodesRef.current[2].y);
      ctx.stroke();

      // Gateway -> DB
      ctx.beginPath();
      ctx.moveTo(nodesRef.current[1].x, nodesRef.current[1].y);
      ctx.lineTo(nodesRef.current[3].x, nodesRef.current[3].y);
      ctx.stroke();

      ctx.setLineDash([]); // Reset dashed

      // Update and Draw Particles
      particlesRef.current.forEach((particle, idx) => {
        particle.progress += particle.speed;
        if (particle.progress >= 1.0) {
          particle.progress = 1.0;
          particle.onComplete();
          particlesRef.current.splice(idx, 1);
        } else {
          // Draw particle
          const currentX = particle.startX + (particle.endX - particle.startX) * particle.progress;
          const currentY = particle.startY + (particle.endY - particle.startY) * particle.progress;

          ctx.beginPath();
          ctx.arc(currentX, currentY, 4, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = particle.color;
          ctx.fill();
          ctx.shadowBlur = 0; // Reset shadow
        }
      });

      // Draw Nodes
      nodesRef.current.forEach((node) => {
        // Decrease pulse intensity over time
        if (node.pulseIntensity > 0) {
          node.pulseIntensity -= 0.05;
        } else {
          node.pulseIntensity = 0;
        }

        // Draw node base circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, 14 + node.pulseIntensity * 4, 0, Math.PI * 2);
        
        // Node color based on activity
        ctx.fillStyle = node.pulseIntensity > 0 ? "rgba(69, 169, 169, 0.25)" : "#f1f5f9";
        ctx.strokeStyle = node.pulseIntensity > 0 ? "#45a9a9" : "#cbd5e1";
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        // Inner circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = node.pulseIntensity > 0 ? "#45a9a9" : "#94a3b8";
        ctx.fill();

        // Label
        ctx.fillStyle = "#475569";
        ctx.font = "bold 9px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y + 26);
      });

      // Auto trigger loop
      if (isPlaying) {
        const now = Date.now();
        if (now - lastSpawnTime.current > 7000 && particlesRef.current.length === 0) {
          triggerFlowSequence();
          lastSpawnTime.current = now;
        }
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying]);

  const handleManualTrigger = () => {
    if (particlesRef.current.length === 0) {
      triggerFlowSequence();
      lastSpawnTime.current = Date.now();
    }
  };

  return (
    <div className="w-full max-w-xs rounded-xl border border-slate-200/60 bg-white p-5 shadow-lg shadow-slate-100/60 relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">System Pulse</h3>
          <p className="text-[9px] font-semibold text-teal-600 mt-0.5">{statusMessage}</p>
        </div>
        <div className="flex gap-1.5">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Pause simulation" : "Play simulation"}
            className="p-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </button>
          <button 
            onClick={handleManualTrigger}
            title="Trigger manual HTTP request"
            className="p-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center bg-slate-50/50 rounded-lg py-1 border border-slate-100/40">
        <canvas 
          ref={canvasRef} 
          width={280} 
          height={200}
          className="block aspect-[1.4/1] w-full"
        />
      </div>
    </div>
  );
}
