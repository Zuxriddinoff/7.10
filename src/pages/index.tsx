import { memo, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Form from './Form';

const MainRoutes = () => {
  return (
    <>
        <Suspense fallback={<div>Loading....</div>}>
            {
                useRoutes([
                    {
                       path:"/",
                       element:<Layout/>,
                       children:[
                        {
                            index:true,
                            element:<Home/>
                        },
                        {
                            path:"form",
                            element:<Form/>
                        }
                       ] 
                    }
                ])
            }
        </Suspense>
    </>
  );
};

export default memo(MainRoutes);