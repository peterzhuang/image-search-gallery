import React from "react";
import { BrowserRouter as Router, Switch, Route, useLocation} from "react-router-dom";
import styled, {css} from 'styled-components';
import {Modal} from "./components/Modal";
import {Gallery} from "./components/Gallery";
import {ImageApiProvider} from "./contexts/ImageApiContext";
require('dotenv').config();

const ModalSwitch = () => {
    const location = useLocation();
    let background = location && location.state && location.state.background;

    return (
      <div>
        <Switch location={background || location}>
          <Route exact path="/" children={<Gallery />} />
          <Route path="/img/:id" children={<Modal />} />
        </Switch>
        {background && <Route path="/img/:id" children={<Modal />} />}
      </div>
    );

}

export const Image = styled.div`
  width: 305px;
  height: 305px;
  @media(max-width:990px){
    width: 100%;
  }
  background: no-repeat center/150% url(${({image}) => image.urls.regular});
  ${({inModal}) => !inModal && css`
    :hover {
      opacity: .7; 
    }
  `}
`

function ModalGallery() {
  return (
    <ImageApiProvider>
      <Router>
        <ModalSwitch />
      </Router>
    </ImageApiProvider>
  );
}

export default ModalGallery;
