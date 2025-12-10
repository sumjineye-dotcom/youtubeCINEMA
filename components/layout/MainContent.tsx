"use client";

import { Upload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface MainContentProps {
    value: string;
    onChange: (value: string) => void;
}

export default function MainContent({ value, onChange }: MainContentProps) {
    return (
        <div className="w-full bg-[#15171e] border border-slate-800 rounded-xl p-4 flex flex-col relative h-[300px] shadow-sm">
            <div className="flex justify-between items-center mb-2 px-1">
                <h3 className="text-sm font-semibold text-slate-400">대본 / 시나리오 입력</h3>
                <span className="text-xs text-slate-500">.txt 파일을 드래그하여 업로드하거나 직접 작성하세요</span>
            </div>

            <div className="relative flex-1">
                <Textarea
                    className="w-full h-full bg-[#0a0b10] border-none resize-none text-slate-200 placeholder:text-slate-600 focus-visible:ring-0 text-base p-4 leading-relaxed"
                    placeholder="씬 설명과 등장인물에 대한 설명, 액션에 대한 내용을 입력해주세요."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <div className="absolute top-4 right-4">
                    <Upload className="text-slate-600 w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                </div>
            </div>
        </div>
    );
}
