//pages
import { Homepage, PostForm, NotFoundPage } from "./pages";

//react-router-dom
import { Route, Routes } from "react-router-dom";
import { PostProvider} from "./context/PostContext";

//alerts
import {Toaster}  from "react-hot-toast";

function App() {
  return (
    <div className="bg-neutral-900 min-h-screen flex items-center">
      <div className="px-10 container m-auto">
        <PostProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/new" element={<PostForm />} />
            <Route path="/post/:id" element={<PostForm />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster />
        </PostProvider>
      </div>
    </div>
  );
}

export default App;

//video 2:30:00
//https://www.youtube.com/watch?v=zm5gpipw3HM
