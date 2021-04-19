import { useState, useEffect } from "react";
import {
  Col,
  Row,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import "./Pages.css";
import { Link, useHistory } from "react-router-dom";
import firebase from "../Firebase/firebase";
import ShowGames from "../components/FirebaseFirestore/ShowGames";
import AddGame from '../components/FirebaseFirestore/AddGame';

const FirestorePage = () => {
  //State Properties
  const [activeTab, setActiveTab] = useState("1");
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);

  let history = useHistory();

  //Methods
  const toggleTab = (tab) => {
    
    if (activeTab !== tab) setActiveTab(tab);
    if(activeTab === '2') getGamesFromDB();
  };

  const getGamesFromDB = async () => {
    const gamesFetchedRes = await firebase
      .firestore()
      .collection("games")
      .limit(10)
      .get();
    const mappedGames = [];
    if (gamesFetchedRes) {
      console.info("Games fetched:::", gamesFetchedRes.docs.length);
      for (let game of gamesFetchedRes.docs) {
        mappedGames.push(game.data());
      }
      console.info("Mapped Games::", mappedGames);
      setGames(mappedGames);
    }
  };

  //Effect Hooks
  useEffect(() => {
    console.info("Firestore page was mounted");
    if(!localStorage.getItem("userDetails")) {
      history.length = 0;
      history.push("/signIn");
    }

    if (localStorage.getItem("userDetails")) {
      setUser(JSON.parse(localStorage.getItem("userDetails")));
      getGamesFromDB();
    } 
  }, [history]);

  useEffect(() => {
    console.info("user has been set::", user);
  }, [user]);

  return (
    <div>
      {/* Heading with signout label */}
      <Container>
        <Row>
          <Col md="4"></Col>
          <Col md="4">
            <h1>Firestore</h1>
          </Col>
          <Col md="4">
            <span className="pullRight">
              Hello, {user ? user.name : "User"}!{" "}
              {user ? <Link to="/signOut">Signout</Link> : ""}
            </span>
          </Col>
        </Row>
      </Container>

      {/* Tabs Heading */}
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggleTab("1");
            }}
          >
            Show Games
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggleTab("2");
            }}
          >
            Add Game
          </NavLink>
        </NavItem>
      </Nav>

      {/* Tabs Content */}
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Container>
            {/* Tab Heading */}
            <Row>
              <Col md="12">
                <ShowGames games={games} />
              </Col>
            </Row>
            <Row></Row>
          </Container>
        </TabPane>
        <TabPane tabId="2">
          <Container>
            <Row>
              <Col md="12">
                <AddGame/>
              </Col>
            </Row>
          </Container>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default FirestorePage;
