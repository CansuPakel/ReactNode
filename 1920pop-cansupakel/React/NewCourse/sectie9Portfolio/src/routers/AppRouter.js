import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';
import Home from '../components/Home';
import Contact from '../components/Contact';
import SinglePortfolio from '../components/SinglePortfolio';
import Portfolio from '../components/Portfolio';

const AppRouter = () => (
 <BrowserRouter>
    <div>
        <Header/>
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/portfolio/:id" component={SinglePortfolio} />
            <Route path="/portfolio" component={Portfolio} exact />
            <Route path="/contact" component={Contact}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </div>
    </BrowserRouter>
);

export default AppRouter;