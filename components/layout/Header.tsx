"use client";

import { Clapperboard, Key, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
    const steps = [
        { label: "대본 입력", active: true },
        { label: "인물/설정", active: false },
        { label: "스토리보드", active: false },
    ];

    return (
        <div className="w-full flex flex-col gap-6">
            <header className="flex items-center justify-between px-6 py-4 border-b border-border/30 bg-[#0f1117]">
                {/* Left: Logo */}
                <div className="flex items-center gap-3">
                    <div className="bg-[#e50914] p-1.5 rounded-md">
                        <Clapperboard className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white">
                        오후의 AI 시네보드
                    </span>
                </div>

                {/* Center: Mode */}
                <div className="text-sm font-medium text-muted-foreground flex gap-2">
                    <span>Mode:</span>
                    <span className="text-[#e50914] font-bold">K-드라마 실사 (Drama)</span>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-yellow-500 font-bold">NANO</span>
                    <span className="text-muted-foreground">|</span>
                    <span>Gemini 2.5</span>
                </div>

                {/* Right: Icons */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white rounded-full">
                        <Key className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" className="gap-2 rounded-full border-muted-foreground/30 hover:bg-white/10 text-white">
                        <CircleHelp className="w-4 h-4" />
                        사용 가이드
                    </Button>
                </div>
            </header>

            {/* Stepper */}
            <div className="bg-gradient-to-b from-[#0f1117] to-transparent w-full flex justify-center pb-2 relative z-10">
                <div className="flex items-center w-full max-w-2xl justify-between relative px-10">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-800 -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 relative bg-[#0f1117] px-4">
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                                step.active
                                    ? "border-[#e50914] text-[#e50914] shadow-[0_0_15px_rgba(229,9,20,0.5)] bg-[#0f1117]"
                                    : "border-slate-700 text-slate-700"
                            )}>
                                {index === 0 && <span className="text-xl">📄</span>} {/* Simple icons for now */}
                                {index === 1 && <span className="text-lg">👤</span>}
                                {index === 2 && <span className="text-lg">🎬</span>}
                            </div>
                            <span className={cn(
                                "text-xs font-semibold",
                                step.active ? "text-white" : "text-slate-600"
                            )}>{step.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
