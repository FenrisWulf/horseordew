import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuizItem = ({ name, isHorse, onClick, questionString }) => {
  return (
    <div>
      <h2 style={{ display: "flex", justifyContent: "center", flexGrow: "1" }}>
        <div style={{ flexGrow: 1 }}>{name}</div> <div>{questionString}</div>
      </h2>
      <div style={{ display: "flex" }}>
        <div
          className="button"
          style={{
            border: "solid 1px black",
            height: "200px",
            flexGrow: "1",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
          onClick={() => onClick(true)}
        >
          Horse
        </div>
        <div
          className="button"
          style={{
            border: "solid 1px black",
            height: "200px",
            flexGrow: "1",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
          onClick={() => onClick(false)}
        >
          Dew
        </div>
      </div>
    </div>
  );
};

const RightOrWrong = ({ result, isHorse }) => {
  if (result === isHorse) {
    return (
      <div style={{ background: "#bbffa299", marginRight: "8px" }}>
        Correct!
      </div>
    );
  }
  return (
    <div style={{ background: "#ffa2a299", marginRight: "8px" }}>Incorrect</div>
  );
};
function App() {
  const [curQuestion, setCurQuestion] = useState(0);
  const [results, setResults] = useState([]);
  const quizData = [
    { isHorse: true, name: "California Chrome" },
    { isHorse: false, name: "Johnson City Gold" },
    { isHorse: true, name: "I'll Have Another" },
    { isHorse: false, name: "Spark" },
    { isHorse: true, name: "Orb" },
    { isHorse: false, name: "Purple Thunder" },
    { isHorse: true, name: "Thunder Gulch" },
    { isHorse: false, name: "Southern Shock" },
    { isHorse: false, name: "LiveWire" },
    { isHorse: true, name: "Cloud Computing" },
    { isHorse: true, name: "Sun Thunder" },
    { isHorse: true, name: "Mandarin Hero" },
    { isHorse: false, name: "Major Melon" },
    { isHorse: false, name: "Supernova" },
    { isHorse: true, name: "Wildcat Red" },
    { isHorse: true, name: "Stay Thirsty" },
  ];

  const cur = quizData[curQuestion];
  const lastResult = curQuestion > 0 ? results[curQuestion - 1] : null;
  const lastData = quizData[curQuestion - 1];
  console.log("results, results", results);
  console.log("lastResult", lastResult);
  console.log("curQuestion", results[curQuestion - 1]);
  const isFinished = curQuestion === quizData.length;
  const numCorrect = results.reduce(
    (agg, cur, i) => agg + (cur === quizData[i].isHorse ? 1 : 0),
    0
  );
  const redEmoji = String.fromCodePoint(0x1f534);
  const greenEmoji = String.fromCodePoint(0x1f7e2);
  const horseEmoji = String.fromCodePoint(0x1f40e);
  const sodaEmoji = String.fromCodePoint(0x1f964);
  const shareEmojis = results.map((cur, i) => {
    return cur === quizData[i].isHorse ? greenEmoji : redEmoji;
  });
  const shareString = `horseOrDew.com My score ${numCorrect} / ${quizData.length} ${shareEmojis}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareString);
    toast("Copied to clipboard!", { hideProgressBar: true });
  };
  return (
    <div className="App">
      <ToastContainer />
      <h1 style={{ fontSize: "48px" }}>Horse or Dew?</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>
          Is this a name of a Kentucky Derby Horse or a Mountain Dew Flavor?
        </h1>
        {lastResult !== null ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              fontSize: "18px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RightOrWrong result={lastResult} isHorse={lastData.isHorse} />
            {lastData.name} is a{" "}
            {lastData.isHorse
              ? `Horse name ${horseEmoji}`
              : `Mountain Dew flavor ${sodaEmoji}`}
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              fontSize: "18px",
              height: "21px",
            }}
          >
            {" "}
          </div>
        )}
      </div>
      {isFinished ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: "20px", marginTop: "16px" }}>
            You got {numCorrect} / {quizData.length} correct!
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#0000ff9e",
                marginTop: "16px",
                padding: "8px",
              }}
              className="button"
              onClick={copyToClipboard}
            >
              Share
            </div>
          </div>
        </div>
      ) : (
        <QuizItem
          onClick={(val) => {
            setResults([...results, val]);
            setCurQuestion(curQuestion + 1);
          }}
          name={cur.name}
          isHorse={cur.isHorse}
          questionString={`${curQuestion + 1} / ${quizData.length}`}
        />
      )}
      <div style={{ position: "absolute", bottom: 0 }}>
        By FenrisWulf (fenriswoolf@gmail.com)
      </div>
    </div>
  );
}

export default App;
