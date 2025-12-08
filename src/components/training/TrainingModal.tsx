
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Quiz from "@/components/training/Quiz";
import type { TrainingModule } from "@/lib/types";

type TrainingModalProps = {
  module: TrainingModule;
  isOpen: boolean;
  onClose: () => void;
};

export default function TrainingModal({ module, isOpen, onClose }: TrainingModalProps) {
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">{module.title}</DialogTitle>
          <DialogDescription>{module.description}</DialogDescription>
        </DialogHeader>
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
          <div className="flex flex-col space-y-4">
              <h3 className="font-semibold">Training Video</h3>
               <div className="aspect-video w-full rounded-lg overflow-hidden">
                <iframe
                    width="100%"
                    height="100%"
                    src={module.videoUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
          </div>
          <div className="flex flex-col space-y-4 overflow-y-auto pr-2">
            <h3 className="font-semibold">Knowledge Check</h3>
            <Quiz />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
