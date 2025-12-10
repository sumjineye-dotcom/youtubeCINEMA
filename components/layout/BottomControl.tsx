"use client";

import { cn } from "@/lib/utils";
import { MonitorPlay, Clapperboard, Film, ScrollText, Image as ImageIcon, Box } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const styles = [
    { id: 'cinematic', label: '시네마틱 실사', sub: 'Cinematic', icon: MonitorPlay },
    { id: 'drama', label: 'K-드라마 실사', sub: 'Drama', icon: Clapperboard },
    { id: 'webtoon', label: '웹툰', sub: 'Webtoon', icon: ScrollText },
    { id: '3d', label: '3D 애니메이션', sub: 'Pixar style', icon: Box },
    { id: 'folk', label: '한국 민화', sub: 'Folk Painting', icon: ImageIcon },
    { id: 'fairytale', label: '동화 일러스트', sub: 'Fairy Tale', icon: ImageIcon },
    { id: 'diorama', label: '디오라마', sub: 'Diorama', icon: Box },
    { id: 'felt', label: '동화 양모인형', sub: 'Wool Felt', icon: Box },
];

interface BottomControlProps {
    selectedStyle: string;
    onSelectStyle: (id: string) => void;
    engine: string;
    onEngineChange: (val: string) => void;
    ratio: string;
    onRatioChange: (val: string) => void;
    sceneCount: number[];
    onSceneCountChange: (val: number[]) => void;
}

export default function BottomControl({
    selectedStyle,
    onSelectStyle,
    engine,
    onEngineChange,
    ratio,
    onRatioChange,
    sceneCount,
    onSceneCountChange
}: BottomControlProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full h-auto lg:h-[320px]">

            {/* Left Column: Visual Styles */}
            <div className="bg-[#15171e] border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[#e50914] font-semibold text-sm">
                    <span className="w-2 h-2 rounded-full bg-[#e50914]"></span>
                    비주얼 스타일
                </div>

                <div className="grid grid-cols-3 gap-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                    {styles.map((style) => (
                        <div
                            key={style.id}
                            onClick={() => onSelectStyle(style.id)}
                            className={cn(
                                "flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all hover:bg-slate-800/50 aspect-video",
                                selectedStyle === style.id
                                    ? "border-[#e50914] bg-[#e50914]/5 text-white shadow-[inset_0_0_10px_rgba(229,9,20,0.1)]"
                                    : "border-slate-800 bg-[#0a0b10] text-slate-400"
                            )}
                        >
                            <span className="text-sm font-semibold text-center">{style.label}</span>
                            <span className="text-[10px] text-slate-500">{style.sub}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Settings */}
            <div className="bg-[#15171e] border border-slate-800 rounded-xl p-6 flex flex-col justify-between gap-6">

                {/* Top Row: Engine & Ratio */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-300">⚡ 엔진</label>
                        <Select value={engine} onValueChange={onEngineChange}>
                            <SelectTrigger className="w-full bg-[#0a0b10] border-[#e50914] text-white ring-0 focus:ring-0">
                                <SelectValue placeholder="Select Engine" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1f222b] border-slate-700 text-white">
                                <SelectItem value="nano" className="font-bold">⚡ Nano Banana</SelectItem>
                                <SelectItem value="pro">⭐ Pro</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="w-full bg-[#0a0b10] border border-slate-800 rounded-md p-2 flex items-center text-slate-500 text-sm">
                            ⭐ Pro
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-300">⟷ 비율</label>
                        <div className="flex flex-col gap-2">
                            <div
                                onClick={() => onRatioChange('16:9')}
                                className={cn("w-full border rounded-md p-2 flex items-center justify-between text-sm cursor-pointer transition-all",
                                    ratio === '16:9' ? "bg-[#0a0b10] border-blue-500 text-white" : "bg-[#0a0b10] border-slate-800 text-slate-500"
                                )}>
                                <span>16:9</span>
                                <div className={cn("w-3 h-1.5 border rounded-[1px]", ratio === '16:9' ? "border-blue-500" : "border-slate-500")}></div>
                            </div>
                            <div
                                onClick={() => onRatioChange('9:16')}
                                className={cn("w-full border rounded-md p-2 flex items-center justify-between text-sm cursor-pointer transition-all",
                                    ratio === '9:16' ? "bg-[#0a0b10] border-blue-500 text-white" : "bg-[#0a0b10] border-slate-800 text-slate-500"
                                )}>
                                <span>9:16</span>
                                <div className={cn("w-1.5 h-3 border rounded-[1px]", ratio === '9:16' ? "border-blue-500" : "border-slate-500")}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Scene Count */}
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <label className="text-sm font-semibold text-[#4ade80]">≈ 씬 개수 ({sceneCount[0]})</label>
                    </div>
                    <Slider
                        value={sceneCount}
                        onValueChange={onSceneCountChange}
                        max={100}
                        min={5}
                        step={1}
                        className="py-4"
                    />
                    <div className="flex justify-between text-xs text-slate-600">
                        <span>5</span>
                        <span>100</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
