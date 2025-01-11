//components
import Header from "./components/Header";
import Hero from "./components/Hero";
import { useState } from "react";

function App() {
 const [animationName, setAnimationName] = useState("idle");
  return (
    <>
      <Header setAnimationName={setAnimationName} />
      <main>
        <Hero  animationName={animationName} />
      </main>
    </>
  );
}

export default App;
