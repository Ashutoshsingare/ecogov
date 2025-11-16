"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";
import { quizQuestions } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz finished, maybe show a summary
      alert("Quiz completed!");
    }
  };
  
  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Knowledge Check</CardTitle>
        <CardDescription>Question {currentQuestionIndex + 1} of {quizQuestions.length}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-lg mb-6">{currentQuestion.question}</p>
        <RadioGroup onValueChange={(value) => handleOptionSelect(parseInt(value))} value={selectedOption?.toString()} disabled={showResult}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrectOption = currentQuestion.correctAnswer === index;
            
            return (
                <div key={index} className={cn(
                    "flex items-center space-x-3 space-y-0 p-3 rounded-md border transition-all",
                    showResult && isSelected && isCorrect && "border-green-500 bg-green-500/10",
                    showResult && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                    showResult && !isSelected && isCorrectOption && "border-green-500 bg-green-500/10"
                )}>
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="font-normal text-base flex-1 cursor-pointer">
                    {option}
                  </Label>
                  {showResult && isSelected && isCorrect && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {showResult && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-500" />}
                  {showResult && !isSelected && isCorrectOption && <CheckCircle className="h-5 w-5 text-green-500" />}
              </div>
            );
          })}
        </RadioGroup>
        
        {showResult && (
          <div className={`mt-4 p-4 rounded-md text-center ${isCorrect ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'}`}>
            <p className="font-bold">{isCorrect ? 'Correct!' : 'Not quite.'}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button onClick={handleNext} disabled={!showResult}>
            {currentQuestionIndex < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
