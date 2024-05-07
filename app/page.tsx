"use client";
import { SyntheticEvent, useState } from "react";
import styles from "./page.module.css";
import Table from "./(components)/scheduletable";
export default function Home() {
  const [taskObj, setTaskObj] = useState({
    task: "",
    startTime: "00:00",
    stopTime: "00:00",
    TotalTime: 0,
  });
  const TimeCalculator = (start: string, stop: string) => {
    if (start !== "00:00" && stop !== "00:00") {
      const StopHour = parseInt(stop.split(":")[0]);
      const StopMin = parseInt(stop.split(":")[1]);
      const StartHour = parseInt(start.split(":")[0]);
      const StartMin = parseInt(start.split(":")[1]);

      const value = StopHour * 60 + StopMin - (StartHour * 60 + StartMin);
      setTaskObj((prevTaskObj) => {
        return {
          ...prevTaskObj,
          TotalTime: value,
        };
      });
      return true;
    } else {
      return false;
    }
  };
  const onChangeFunc = (e, type: string) => {
    setTaskObj((prevTaskObj) => {
      switch (type) {
        case "task":
          return {
            ...prevTaskObj,
            task: e.target.value,
          };
        case "startTime":
          return {
            ...prevTaskObj,
            startTime: e.target.value,
          };
        case "stopTime":
          return {
            ...prevTaskObj,
            stopTime: e.target.value,
          };
        default:
          return prevTaskObj;
      }
    });
    console.log(taskObj);
  };
  const OnSubMitFunc = () => {
    if (taskObj.task !== "") {
      if (TimeCalculator(taskObj.startTime, taskObj.stopTime)) {
        console.log("values submitted");
        console.log(taskObj)
      } else {
        console.log("please enter valid time");
      }
    } else {
      console.log("please enter a valid task");
    }
  };
  return (
    <main className={styles.main}>
      <header>
        <h1 className={styles.header}>Schedule Builder</h1>
      </header>
      <div className={styles.container}>
        <div className={styles.SchduleBody}>
          <Table obj={taskObj}/>
          <div className={styles.InputBody}>
            <div>
              <label>Input :</label>
              <input type="text" onChange={(e) => onChangeFunc(e, "task")} />
            </div>
            <div>
              <label>Start: </label>
              <input
                type="time"
                onChange={(e) => onChangeFunc(e, "startTime")}
              />
            </div>
            <div>
              <label>Stop: </label>
              <input
                type="time"
                onChange={(e) => onChangeFunc(e, "stopTime")}
              />
            </div>
            <div>
              <button className={styles.submit} onClick={OnSubMitFunc}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
