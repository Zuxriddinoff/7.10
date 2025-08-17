import { memo } from 'react';
import MainRoutes from "./pages"
const App = () => {
  return (
    <div className="App">
      <MainRoutes/>
    </div>
  );
};

export default memo(App);