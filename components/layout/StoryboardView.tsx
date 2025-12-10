"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Video, MapPin, Clock } from "lucide-react";

interface Scene {
    sceneNumber: number;
    place: string;
    time: string;
    action: string;
    cameraAngle: string;
}

interface StoryboardViewProps {
    data: Scene[];
    onBack: () => void;
}

export default function StoryboardView({ data, onBack }: StoryboardViewProps) {
    return (
        <div className="w-full h-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    AI Storyboard Result
                </h2>
                <Button
                    variant="outline"
                    onClick={onBack}
                    className="border-slate-700 hover:bg-slate-800 text-slate-300 gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Edit
                </Button>
            </div>

            <ScrollArea className="h-[600px] w-full pr-4">
                <div className="grid grid-cols-1 gap-6 pb-20">
                    {data.map((scene, index) => (
                        <Card key={index} className="bg-[#15171e] border-slate-800 overflow-hidden hover:border-[#e50914]/50 transition-colors">
                            <CardHeader className="bg-[#0a0b10] border-b border-slate-800/50 py-3 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="bg-[#e50914] text-white border-none font-bold">
                                        SCENE {scene.sceneNumber}
                                    </Badge>
                                    <div className="flex items-center gap-2 text-sm text-slate-400">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>{scene.place}</span>
                                        <Separator orientation="vertical" className="h-3 bg-slate-700" />
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{scene.time}</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-slate-200 leading-relaxed text-lg font-light">
                                    {scene.action}
                                </p>
                            </CardContent>
                            <CardFooter className="bg-[#0f1117] py-3 px-6 flex justify-end">
                                <div className="flex items-center gap-2 text-xs font-mono text-[#e50914] bg-[#e50914]/10 px-3 py-1 rounded-full border border-[#e50914]/20">
                                    <Video className="w-3 h-3" />
                                    {scene.cameraAngle}
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
