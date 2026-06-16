import Feed from "./components/Feed";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full flex flex-col">
        <Header />
        <Feed />
      </div>
    </div>
  );
};

export default App;
