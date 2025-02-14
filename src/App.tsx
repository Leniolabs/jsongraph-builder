import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { ChatSidebar } from "./components/ChatSidebar";
import { Graph } from "./components/Graph/Graph";

function App() {
  return (
    <>
      <Graph />
      <Sidebar />
      <ChatSidebar />
    </>
  );
}

export default App;
