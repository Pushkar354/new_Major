import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdvancedQuiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const questions = location.state?.quiz || [];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (option) => {
    setAnswers({
      ...answers,
      [current]: option,
    });
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const score = questions.reduce((acc, q, i) => {
    return acc + (answers[i] === q.answer ? 1 : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-4 text-white">

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-2xl"
      >

        {!showResult ? (
          <>
            
            <h2 className="text-lg font-semibold mb-6 text-indigo-400">
              Q{current + 1}. {questions[current]?.question}
            </h2>

           
            <div className="space-y-3">
              {questions[current]?.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionClick(opt)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition 
                  ${
                    answers[current] === opt
                      ? "bg-indigo-600 border-indigo-500 text-white"
                      : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={next}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl font-medium"
            >
              {current === questions.length - 1 ? "Finish Quiz" : "Next"}
            </motion.button>
          </>
        ) : (
          <div className="text-center">

            
            <h2 className="text-2xl font-bold mb-4 text-indigo-400">
              Quiz Completed
            </h2>

            <p className="text-lg mb-6">
              Score:{" "}
              <span className="font-bold text-white">
                {score}
              </span>{" "}
              / {questions.length}
            </p>

           
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
            >
              Go Home
            </motion.button>
          </div>
        )}

      </motion.div>
    </div>
  );
}