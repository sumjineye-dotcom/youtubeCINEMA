"use client";

import { useState, useRef } from "react";
import { Upload, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface MainContentProps {
    value: string;
    onChange: (value: string) => void;
}

export default function MainContent({ value, onChange }: MainContentProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const readFile = (file: File) => {
        if (file && file.type === "text/plain") {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result;
                if (typeof text === "string") {
                    onChange(text);
                }
            };
            reader.readAsText(file);
        } else {
            alert("텍스트 파일(.txt)만 업로드 가능합니다.");
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            readFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            readFile(e.target.files[0]);
        }
        // Reset value so same file can be selected again
        e.target.value = "";
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            className={cn(
                "w-full bg-[#15171e] border rounded-xl p-4 flex flex-col relative h-[300px] shadow-sm transition-all duration-200",
                isDragging ? "border-[#e50914] bg-[#e50914]/5 ring-2 ring-[#e50914]/20" : "border-slate-800"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="flex justify-between items-center mb-2 px-1">
                <h3 className="text-sm font-semibold text-slate-400">대본 / 시나리오 입력</h3>
                <span className="text-xs text-slate-500 hidden sm:inline">.txt 파일을 드래그하여 업로드하거나 우측 아이콘을 클릭하세요</span>
            </div>

            <div className="relative flex-1">
                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".txt"
                    onChange={handleFileChange}
                />

                <Textarea
                    className="w-full h-full bg-[#0a0b10] border-none resize-none text-slate-200 placeholder:text-slate-600 focus-visible:ring-0 text-base p-4 leading-relaxed custom-scrollbar"
                    placeholder="씬 설명과 등장인물에 대한 설명, 액션에 대한 내용을 입력해주세요."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />

                {/* Floating Upload Icon */}
                <div
                    className="absolute top-4 right-4 bg-[#15171e]/80 p-2 rounded-full cursor-pointer hover:bg-slate-700 transition-colors group backdrop-blur-sm border border-slate-700/50"
                    onClick={triggerFileUpload}
                    title="텍스트 파일 업로드"
                >
                    <Upload className="text-slate-400 w-5 h-5 group-hover:text-white transition-colors" />
                </div>

                {/* Visual overlay when dragging */}
                {isDragging && (
                    <div className="absolute inset-0 z-10 bg-[#0f1117]/90 flex flex-col items-center justify-center rounded-md border-2 border-dashed border-[#e50914]">
                        <FileText className="w-12 h-12 text-[#e50914] mb-2 animate-bounce" />
                        <p className="text-lg font-bold text-white">파일을 여기에 놓으세요</p>
                        <p className="text-sm text-slate-400">.txt 파일만 지원됩니다</p>
                    </div>
                )}
            </div>
        </div>
    );
}
