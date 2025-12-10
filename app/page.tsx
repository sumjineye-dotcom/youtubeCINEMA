"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoveRight, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import MainContent from "@/components/layout/MainContent";
import BottomControl from "@/components/layout/BottomControl";

export default function Home() {
  // State Management
  const [script, setScript] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("drama");
  const [engine, setEngine] = useState("nano");
  const [ratio, setRatio] = useState("16:9");
  const [sceneCount, setSceneCount] = useState([30]);
  const [isLoading, setIsLoading] = useState(false);

  // Handlers
  const handleGenerate = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("=== Generation Started ===");
      console.log({
        script,
        selectedStyle,
        engine,
        ratio,
        sceneCount: sceneCount[0]
      });
      setIsLoading(false);
    }, 3000);
  };

  return (
    <main className="flex min-h-screen flex-col relative overflow-hidden bg-[#0f1117] text-white">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm">
          <Loader2 className="w-12 h-12 text-[#e50914] animate-spin mb-4" />
          <p className="text-xl font-bold animate-pulse text-white">AI가 대본을 분석 중입니다...</p>
        </div>
      )}

      {/* Header */}
      <Header />

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col p-6 gap-6 max-w-[1600px] mx-auto w-full">
        {/* Main Textarea Area */}
        <MainContent
          value={script}
          onChange={setScript}
        />

        {/* Bottom Control Panel */}
        <BottomControl
          selectedStyle={selectedStyle}
          onSelectStyle={setSelectedStyle}
          engine={engine}
          onEngineChange={setEngine}
          ratio={ratio}
          onRatioChange={setRatio}
          sceneCount={sceneCount}
          onSceneCountChange={setSceneCount}
        />
      </div>

      {/* Footer Action */}
      <div
        onClick={!isLoading ? handleGenerate : undefined}
        className="w-full bg-[#e50914] hover:bg-[#b2070f] transition-colors cursor-pointer py-4 flex items-center justify-center text-white font-bold text-lg mt-auto"
      >
        <MoveRight className="w-6 h-6 mr-2 hidden" />
        <span>{isLoading ? "생성 중..." : "인물 생성 및 분석 시작"}</span>
      </div>
    </main>
  );
}
