import './App.css';
import { useEffect } from 'react';
import { Route, Switch,   BrowserRouter as Router} from 'react-router-dom';
import firebase from './Firebase/firebase';
import Header from './components/Nav/Header';
import HomePage from './pages/HomePage';
import SignUp from './components/FirebaseAuth/SignUp/SignUp';
import SignIn from './components/FirebaseAuth/SignIn/SignIn';
import FirestorePage from './pages/FireStorePage';
import SignOut from './components/FirebaseAuth/SignOut/Signout';
function App() {

  useEffect(()=>{
    console.info('Firebase obj:', firebase);
  }, []);

  //Return to render component
  return (
    <div className="App">     
      <Router>
      <Header/>
      <Switch>
      <Route path="/signUp">
          <SignUp/>
        </Route>
        <Route path="/signIn">
          <SignIn/>
        </Route>
        <Route path="/signOut">
          <SignOut/>
        </Route>
        <Route path="/firestore">
          <FirestorePage/>
        </Route>
        <Route exact path="/">
          <HomePage/>
        </Route>
      </Switch>
      </Router>
    </div>
  );

}

export default App;
