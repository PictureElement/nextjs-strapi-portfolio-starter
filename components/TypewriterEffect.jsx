"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

export const TypewriterEffect = ({ words, cursorClassName }) => {
  console.log("Hello from TypewriterEffect");

  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate("span", {
        display: "inline-block",
        opacity: 1,
        width: "fit-content",
      }, {
        duration: 0.3,
        delay: stagger(0.1),
        ease: "easeInOut",
      });
    }
  }, [isInView]);

  const renderWords = () => {
    return (
      (<motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            (<div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(`opacity-0 hidden`, word.className)}>
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>)
          );
        })}
      </motion.div>)
    );
  };
  return (
    (<div>
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block relative top-[0.5px] w-[4px] h-8 sm:h-10 lg:h-12 bg-primary-700",
          cursorClassName
        )}></motion.span>
    </div>)
  );
};
