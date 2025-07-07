import Header from "./components/Header";
import ShowWeather from "./pages/ShowWeather";
import { useEffect, useState } from "react";

function App() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(true);
  }, []);

  const CustomAlert = () => (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "30px",
        backgroundColor: "#c7c7c7",
        color: "#000000",
        borderRadius: "5px",
        border: "1px solid #e9e9e9",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "18px", marginBottom: "20px" }}>
        Araji (Mec) nkarov jermastichany chi poxvum erb poxum enq ory,
        <br />
        qani vor araji API-n chuner vaxva weather data-n
      </p>
      <button
        onClick={() => setShowAlert(false)}
        style={{
          padding: "12px 24px",
          fontSize: "18px",
          cursor: "pointer",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#3b3536",
          color: "#fff",
        }}
      >
        Close
      </button>
    </div>
  );

  return (
    <>
      {showAlert && <CustomAlert />}
      <Header />
      <ShowWeather />
    </>
  );
}

export default App;
