import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './pages/home/Home';


const Router = () =>{
    return(
        <div>
            <BrowserRouter>
            <Switch>
            <Route path='/' component={Home} exact/>
            </Switch>
        </BrowserRouter>
        </div>
    )
}

export default Router