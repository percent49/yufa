/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  BookOpen, 
  Trophy,
  Filter,
  Info,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { questions } from './data/questions';
import { Question, Difficulty, Category, UserAnswer } from './types';

const DifficultyBadge = ({ difficulty }: { difficulty: Difficulty }) => {
  const colors = {
    [Difficulty.Beginner]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    [Difficulty.Intermediate]: 'bg-amber-100 text-amber-700 border-amber-200',
    [Difficulty.Advanced]: 'bg-rose-100 text-rose-700 border-rose-200',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${colors[difficulty]}`}>
      {difficulty}
    </span>
  );
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'quiz' | 'result'>('welcome');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const diffMatch = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      const catMatch = selectedCategory === 'All' || q.category === selectedCategory;
      return diffMatch && catMatch;
    });
  }, [selectedDifficulty, selectedCategory]);

  const currentQuestion = filteredQuestions[currentIndex];

  const handleStart = () => {
    if (filteredQuestions.length > 0) {
      setCurrentStep('quiz');
      setCurrentIndex(0);
      setUserAnswers([]);
      setIsSubmitted(false);
      setShowExplanation(false);
      setCurrentSelection(null);
    }
  };

  const handleOptionSelect = (option: string) => {
    if (isSubmitted) return;
    setCurrentSelection(option);
  };

  const handleSubmit = () => {
    if (!currentSelection) return;
    
    const isCorrect = currentSelection === currentQuestion.correctAnswer;
    setIsSubmitted(true);
    setShowExplanation(true);
    
    setUserAnswers(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedAnswer: currentSelection,
        isCorrect
      }
    ]);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsSubmitted(false);
      setShowExplanation(false);
      setCurrentSelection(null);
    } else {
      setCurrentStep('result');
    }
  };

  const handleReset = () => {
    setCurrentStep('welcome');
    setCurrentIndex(0);
    setUserAnswers([]);
    setCurrentSelection(null);
    setIsSubmitted(false);
    setShowExplanation(false);
  };

  const score = userAnswers.filter(a => a.isCorrect).length;
  const total = filteredQuestions.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const getEncouragement = () => {
    if (percentage === 100) return "太棒了！你是语法大师！🌟";
    if (percentage >= 80) return "非常出色！继续保持！👏";
    if (percentage >= 60) return "做得不错，再接再厉！💪";
    return "别灰心，多练习一定会进步的！📚";
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">G</div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-800">GrammarMaster</h1>
          </div>
          {currentStep === 'quiz' && (
            <div className="text-sm font-medium text-slate-500">
              题目 {currentIndex + 1} / {total}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {currentStep === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                  攻克英语复合句
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  专为初中生打造的语法填空练习平台。通过情境化选择与即时反馈，快速提升你的句法辨析能力。
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Filter className="w-4 h-4" /> 难度筛选
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['All', ...Object.values(Difficulty)].map(d => (
                        <button
                          key={d}
                          onClick={() => setSelectedDifficulty(d as any)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            selectedDifficulty === d 
                              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {d === 'All' ? '全部难度' : d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> 语法分类
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['All', ...Object.values(Category)].map(c => (
                        <button
                          key={c}
                          onClick={() => setSelectedCategory(c as any)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            selectedCategory === c 
                              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {c === 'All' ? '全部类型' : c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-top border-slate-100 flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    共找到 {filteredQuestions.length} 道题目
                  </span>
                  <button
                    onClick={handleStart}
                    disabled={filteredQuestions.length === 0}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all group"
                  >
                    开始练习
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: CheckCircle2, title: "即时反馈", desc: "提交即判正误，不错过任何知识点" },
                  { icon: Info, title: "深度解析", desc: "详解语法规则，剖析常见易错陷阱" },
                  { icon: Trophy, title: "学习激励", desc: "记录你的成长，见证语法水平提升" }
                ].map((feature, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{feature.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 'quiz' && currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Question Card */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 md:p-10 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <DifficultyBadge difficulty={currentQuestion.difficulty} />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {currentQuestion.category}
                      </span>
                    </div>
                  </div>

                  <div className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-800">
                    {currentQuestion.sentenceBefore}
                    <span className={`mx-2 inline-block min-w-[120px] px-4 py-1 border-b-2 text-center transition-all ${
                      isSubmitted 
                        ? (userAnswers[currentIndex]?.isCorrect ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-rose-500 text-rose-600 bg-rose-50')
                        : (currentSelection ? 'border-indigo-500 text-indigo-600 bg-indigo-50' : 'border-slate-300 text-slate-300')
                    }`}>
                      {currentSelection || '______'}
                    </span>
                    {currentQuestion.sentenceAfter}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        disabled={isSubmitted}
                        className={`py-4 px-6 rounded-2xl text-lg font-medium border-2 transition-all ${
                          currentSelection === option
                            ? (isSubmitted 
                                ? (option === currentQuestion.correctAnswer ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-rose-50 border-rose-500 text-rose-700')
                                : 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-lg shadow-indigo-100 scale-[1.02]')
                            : (isSubmitted && option === currentQuestion.correctAnswer
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                                : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300')
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    {!isSubmitted ? (
                      <button
                        onClick={handleSubmit}
                        disabled={!currentSelection}
                        className="bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-slate-200"
                      >
                        提交答案
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-indigo-200"
                      >
                        {currentIndex === total - 1 ? '查看结果' : '下一题'}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Explanation Card */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-slate-50 border-t border-slate-200 overflow-hidden"
                    >
                      <div className="p-6 md:p-10 space-y-6">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${userAnswers[currentIndex]?.isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                            {userAnswers[currentIndex]?.isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-800">
                              {userAnswers[currentIndex]?.isCorrect ? '回答正确！' : `回答错误，正确答案是：${currentQuestion.correctAnswer}`}
                            </h3>
                            <p className="text-sm text-slate-500">详解解析卡片</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">语法规则</h4>
                              <p className="text-slate-700 leading-relaxed">{currentQuestion.explanation.rule}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">典型例句</h4>
                              <p className="text-slate-700 italic font-serif">"{currentQuestion.explanation.example}"</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">易错辨析</h4>
                              <p className="text-slate-700 leading-relaxed">{currentQuestion.explanation.commonMistake}</p>
                            </div>
                            {currentQuestion.explanation.reviewLink && (
                              <a 
                                href={currentQuestion.explanation.reviewLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm group"
                              >
                                推荐复习链接
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {currentStep === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 text-center space-y-8">
                <div className="relative inline-block">
                  <div className="w-40 h-40 rounded-full border-8 border-slate-50 flex items-center justify-center mx-auto">
                    <div className="text-center">
                      <span className="text-5xl font-black text-slate-900">{score}</span>
                      <span className="text-xl text-slate-400 font-bold">/{total}</span>
                    </div>
                  </div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="absolute -top-2 -right-2 bg-amber-400 text-white p-3 rounded-2xl shadow-lg"
                  >
                    <Trophy className="w-8 h-8" />
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-slate-900">{getEncouragement()}</h2>
                  <p className="text-slate-500">你已经完成了本次练习，正确率为 {percentage}%</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleStart}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-100"
                  >
                    再练一次
                  </button>
                  <button
                    onClick={handleReset}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <RotateCcw className="w-5 h-5" />
                    返回首页
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 px-2">答题回顾</h3>
                <div className="space-y-3">
                  {userAnswers.map((answer, i) => {
                    const q = questions.find(question => question.id === answer.questionId);
                    return (
                      <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${answer.isCorrect ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {answer.isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800 line-clamp-1">
                              {q?.sentenceBefore} {answer.selectedAnswer} {q?.sentenceAfter}
                            </p>
                            <p className="text-xs text-slate-400">{q?.category} · {q?.difficulty}</p>
                          </div>
                        </div>
                        {!answer.isCorrect && (
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                            正确: {q?.correctAnswer}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-400 text-sm">
        <p>© 2026 GrammarMaster · 助力初中英语学习</p>
      </footer>
    </div>
  );
}
