"use client";

import { useState } from "react";
import { trainingModules as initialModules } from "@/lib/data";
import TrainingCard from "@/components/training/TrainingCard";
import TrainingModal from "@/components/training/TrainingModal";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import type { TrainingModule } from "@/lib/types";

export default function TrainingClient() {
  const [modules, setModules] = useState<TrainingModule[]>(initialModules);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [activeModule, setActiveModule] = useState<TrainingModule | null>(null);

  const handleModuleComplete = (moduleId: string) => {
    setCompletedModules(prev => new Set(prev).add(moduleId));
    setModules(prevModules => {
      const currentModuleIndex = prevModules.findIndex(m => m.id === moduleId);
      if (currentModuleIndex !== -1 && currentModuleIndex + 1 < prevModules.length) {
        const newModules = [...prevModules];
        newModules[currentModuleIndex + 1] = { ...newModules[currentModuleIndex + 1], isLocked: false };
        return newModules;
      }
      return prevModules;
    });
    setActiveModule(null); // Close the modal
  };

  const handleStartModule = (moduleId: string) => {
    const moduleToStart = modules.find(m => m.id === moduleId);
    if (moduleToStart) {
      setActiveModule(moduleToStart);
    }
  };

  const handleModalClose = () => {
    if (activeModule) {
      // For simulation, we complete the module when the modal is closed.
      handleModuleComplete(activeModule.id);
    }
  };

  return (
    <>
      <section id="modules" className="mb-24">
        <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Available Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {modules.map((module, index) => (
            <AnimatedWrapper key={module.id} delay={index * 0.1}>
              <TrainingCard 
                module={module} 
                onStart={() => handleStartModule(module.id)} 
                isCompleted={completedModules.has(module.id)}
              />
            </AnimatedWrapper>
          ))}
        </div>
      </section>

      {activeModule && (
        <TrainingModal
          module={activeModule}
          isOpen={!!activeModule}
          onClose={handleModalClose}
        />
      )}
    </>
  );
}
