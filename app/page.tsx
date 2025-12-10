"use client";

import { useState } from "react";
import { MoveRight, Loader2, CheckCircle2, X } from "lucide-react";
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
  const [showSuccess, setShowSuccess] = useState(false);

  // Handlers
  const handleGenerate = () => {
    if (!script.trim()) {
      // Use a simple native alert for validation for now, or could use another modal
      alert("대본을 입력해주세요!");
      return;
    }

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
      setShowSuccess(true);
    }, 3000);
  };

  return (
    <main className="flex min-h-screen flex-col relative overflow-hidden bg-[#0f1117] text-white">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm">
          <Loader2 className="w-12 h-12 text-[#e50914] animate-spin mb-4" />
          <p className="text-xl font-bold animate-pulse text-white">AI가 대본을 분석 중입니다...</p>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-[#15171e] border border-slate-800 p-8 rounded-2xl max-w-md w-full relative shadow-2xl animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">분석 완료!</h3>
              <p className="text-slate-400 mb-4">
                설정하신 내용으로 AI 분석이 완료되었습니다.
              </p>

              <div className="w-full bg-[#0a0b10] p-4 rounded-lg space-y-2 text-sm text-left">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">스타일</span>
                  <span className="font-medium text-white capitalize">{selectedStyle}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">비율</span>
                  <span className="font-medium text-white">{ratio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">씬 개수</span>
                  <span className="font-medium text-white">{sceneCount[0]} 컷</span>
                </div>
              </div>

              <button
                onClick={() => setShowSuccess(false)}
                className="w-full bg-[#e50914] hover:bg-[#b2070f] text-white font-bold py-3 rounded-lg mt-2 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
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
