import React, {useContext} from 'react';
import {Image} from "../App";
import {useRouteMatch, useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {PostGrid, InfoGrid} from "./PostGrid";
import {MiniUserGrid} from "./UserGrid";
import {ProfileImage} from "./ProfileImage";
import {ImageApiContext} from '../contexts/ImageApiContext';

const ModalStyled = styled.div`
  position: fixed;
  background: #fff;
  left: 50%;
  top: 50%;
  width: 600px; 
  transform: translate(-50%, -50%);
  border: 2px solid #444;
  @media(max-width: 990px){
    width: auto; 
  }
`


export function Modal() {
  const history = useHistory();
  const match = useRouteMatch();
  const [images] = useContext(ImageApiContext);
  const image = images.find(image => image.id === match.params.id );

  if (!image) return null;

  const back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div
      onClick={back}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 50,
        background: "rgba(0, 0, 0, 0.8)"
      }}
    >
      <ModalStyled>
        <PostGrid>
          <Image inModal image={image} />
          <InfoGrid>
            <MiniUserGrid>
              <ProfileImage mini/>
              <h3> GridGallery </h3>
            </MiniUserGrid>
            <div>
              <div>{image.alt_description}</div>
            </div>
            <div>{image.likes} Likes</div>
          </InfoGrid>
        </PostGrid>
      </ModalStyled>
    </div>
  );
}
