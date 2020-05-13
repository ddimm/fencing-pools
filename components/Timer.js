import React, { useEffect, useRef, useState } from "react";
import { Text } from "react-native";

export default function Timer({
  totalDuration,
  start,
  reset,
  handleFinish,
  stop,
}) {
  const [timeRemaining, setTimeRemaining] = useState(totalDuration);
  const timerInterval = useRef(undefined);
  useEffect(() => {
    if (start) {
      startTimer();
    } else {
      stopTimer();
    }
    if (reset) {
      setTimeRemaining(totalDuration);
    }
  }, [start, stop, reset]);
  function startTimer() {
    const onFinish = handleFinish
      ? handleFinish
      : () => console.log("finished");
    const endTime = new Date().getTime() + timeRemaining;
    timerInterval.current = setInterval(() => {
      const remaining = endTime - new Date();
      if (remaining <= 1000) {
        setTimeRemaining(0);
        stopTimer();
        onFinish();
        return;
      }
      setTimeRemaining(remaining);
    }, 1);
  }
  useEffect(() => {
    if (start) {
      startTimer();
    }
    return () => {
      clearInterval(timerInterval.current);
    };
  }, []);
  function stopTimer() {
    clearInterval(timerInterval.current);
  }

  function timeRemainingToString(timeRemaining) {
    let secondsRemain = Math.floor(timeRemaining / 1000);
    let minRemain = Math.floor(secondsRemain / 60);
    return `${minRemain}:${secondsRemain % 60 < 10 ? 0 : ""}${
      secondsRemain % 60
    }:${timeRemaining % 1000 < 100 ? 0 : ""}${
      timeRemaining % 1000 < 10 ? 0 : ""
    }${timeRemaining % 1000}`;
  }
  return (
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 40,
        color: "white",
      }}
    >
      {timeRemainingToString(timeRemaining)}
    </Text>
  );
}
