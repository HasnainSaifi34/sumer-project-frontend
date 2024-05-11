// this will be pushed to git hub
"use client";
import { useState,useRef } from "react";
import { TaskObjType } from "./types/index";
import styles from "./page.module.css";
import Table from "./(components)/scheduletable";
export default function Home() {
 const [taskArray,setTaskArray] = useState<TaskObjType[]>([])
  const [taskObj, setTaskObj] = useState<TaskObjType>({
    task: "",
    startTime: "00:00",
    stopTime: "00:00",
    TotalTime: 0,
  });

  const UpdateTaskObjTotalTime = async (TotalTime: number) => {
    await new Promise((res, rej) => {
      setTaskObj((prevObj) => {
        return {
          ...prevObj,
          TotalTime: TotalTime,
        };
      });
    });
  };
  const TimeCalculator = async (start: string, stop: string) => {
    if (start !== "00:00" && stop !== "00:00") {
      const StopHour = parseInt(stop.split(":")[0]);
      const StopMin = parseInt(stop.split(":")[1]);
      const StartHour = parseInt(start.split(":")[0]);
      const StartMin = parseInt(start.split(":")[1]);

      const value = StopHour * 60 + StopMin - (StartHour * 60 + StartMin);
      try {
        await UpdateTaskObjTotalTime(value);
        return true;
      } catch (e) {
        console.warn(`There was an error updating Total Time: ${e}`);
        return false;
      }
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
  };
  window.Getter = () => {
    return { taskObj: taskObj, taskArray: taskArray };
  };
  const SubmitTaskObj = async () => {
    console.log(taskObj.task !== "")
    if (taskObj.task !== "") {
      await TimeCalculator(taskObj.startTime, taskObj.stopTime);
    } else {
      console.log("please enter a valid task");
    }
  };

  const OnSubMitFunc=async()=>{
    await SubmitTaskObj()
    setTaskArray((prevElem) => [...prevElem, taskObj])

  }


  return (
    <main className={styles.main}>
      <header>
        <h1 className={styles.header}>Schedule Builder</h1>
      </header>
      <div className={styles.container}>
        <div className={styles.SchduleBody}>
          <Table array={taskArray} />
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
              <button className={styles.submit} onClick={OnSubMitFunc}>
                Submit
              </button>
            </div>
            <div>
              <button
                className={styles.submit}
                onClick={() => setTaskArray([])}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
