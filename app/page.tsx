"use client";

import { useState } from "react";
import { MoveRight, Loader2, CheckCircle2, X, AlertCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import MainContent from "@/components/layout/MainContent";
import BottomControl from "@/components/layout/BottomControl";
import StoryboardView from "@/components/layout/StoryboardView";
import { Button } from "@/components/ui/button";

const DEMO_DATA = [
  { sceneNumber: 1, place: "한강 공원", time: "Day", action: "따스한 햇살 아래, 지은이 벤치에 앉아 강물을 바라보고 있다. 그녀의 옆에는 낡은 기타 케이스가 놓여있다.", cameraAngle: "Wide Shot" },
  { sceneNumber: 2, place: "한강 공원", time: "Day", action: "지은, 천천히 기타를 꺼낸다. 주위의 소음이 잦아들고 그녀의 손끝이 떨린다.", cameraAngle: "Close-up" },
  { sceneNumber: 3, place: "한강 공원", time: "Day", action: "그녀가 첫 코드를 잡는다. 지나가던 사람들이 하나둘씩 발걸음을 멈추고 그녀를 쳐다본다.", cameraAngle: "Medium Shot" },
  { sceneNumber: 4, place: "한강 공원", time: "Sunset", action: "노을이 지기 시작한다. 지은의 연주가 절정에 달하고, 관객들이 환호한다.", cameraAngle: "Low Angle" },
  { sceneNumber: 5, place: "지은의 집", time: "Night", action: "지은, 침대에 누워 천장을 바라보며 미소 짓는다. 오늘 하루의 기억이 꿈처럼 스쳐 지나간다.", cameraAngle: "Top View" }
];

// Interface definitions
interface Scene {
  sceneNumber: number;
  place: string;
  time: string;
  action: string;
  cameraAngle: string;
}

export default function Home() {
  // State Management
  const [script, setScript] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("drama");
  const [engine, setEngine] = useState("nano");
  const [ratio, setRatio] = useState("16:9");
  const [sceneCount, setSceneCount] = useState([30]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false); // Error state

  // New State for Storyboard
  const [storyboardData, setStoryboardData] = useState<Scene[]>([]);
  const [view, setView] = useState<"input" | "storyboard">("input");

  // Handlers
  const handleGenerate = async () => {
    if (!script.trim()) {
      alert("대본을 입력해주세요!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          script,
          style: selectedStyle,
          ratio,
          sceneCount: sceneCount[0]
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation Failed");
      }

      setStoryboardData(data);
      setIsLoading(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        setView("storyboard");
      }, 1500);

    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setShowError(true); // Show error modal instead of alert
    }
  };

  const handleUseDemo = () => {
    setShowError(false);
    setIsLoading(true);

    // Simulate processing time
    setTimeout(() => {
      setStoryboardData(DEMO_DATA);
      setIsLoading(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        setView("storyboard");
      }, 1500);
    }, 1000);
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

            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">분석 완료!</h3>
              <p className="text-slate-400 mb-4">
                스토리보드 생성 화면으로 이동합니다...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-[#15171e] border border-red-500/30 p-8 rounded-2xl max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setShowError(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-2">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">오류 발생</h3>
              <p className="text-slate-400 mb-4">
                API 키가 없거나 네트워크 오류가 발생했습니다.
                <br />
                테스트를 위해 <b>데모 데이터</b>를 사용하시겠습니까?
              </p>

              <div className="flex flex-col gap-2 w-full">
                <Button
                  onClick={handleUseDemo}
                  className="w-full bg-[#e50914] hover:bg-[#b2070f] text-white font-bold py-6 rounded-lg transition-colors"
                >
                  네, 데모 버전으로 보기
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowError(false)}
                  className="w-full text-slate-500 hover:text-white"
                >
                  취소
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <Header />

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col p-6 gap-6 max-w-[1600px] mx-auto w-full">

        {view === "input" ? (
          <>
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
          </>
        ) : (
          <StoryboardView
            data={storyboardData}
            onBack={() => setView("input")}
          />
        )}
      </div>

      {/* Footer Action */}
      {view === "input" && (
        <div
          onClick={!isLoading ? handleGenerate : undefined}
          className="w-full bg-[#e50914] hover:bg-[#b2070f] transition-colors cursor-pointer py-4 flex items-center justify-center text-white font-bold text-lg mt-auto"
        >
          <MoveRight className="w-6 h-6 mr-2 hidden" />
          <span>{isLoading ? "생성 중..." : "인물 생성 및 분석 시작"}</span>
        </div>
      )}
    </main>
  );
}
