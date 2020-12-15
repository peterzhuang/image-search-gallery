import React from 'react';
import styled from 'styled-components';
import {ProfileImage} from './ProfileImage';

const UserGridStyled = styled.div`
  display: grid; 
  justify-content: center;
  margin-top: 80px; 
  margin-bottom: 50px;  
  gap: 15px; 
  grid-template-areas: "photo name"
                       "photo name" 
                       "photo name"; 
                       
  @media (max-width: 990px){
    grid-template-areas: "photo name"
                         ". . "
                         ". .";  
  }
`

export const MiniUserGrid = styled.div`
  display: grid; 
  justify-content: left; 
  grid-template-columns: auto auto; 
  gap: 10px; 
`

const Photo = styled.div`
  grid-area: photo; 
`

const Name = styled.div`
  grid-area: name; 
  font-size: 35px;
  align-self: center;  
`

const baseUrl = "https://api.github.com/users/peterzhuang";

const UserGrid = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const response = await fetch(`${baseUrl}`);
    const data = await response.json();
    setUser(data);
  }

  return (
   <> 
   { user ?
  <UserGridStyled>
    <Photo><ProfileImage url={user.avatar_url} /></Photo>
    <Name>Image Gallery</Name>
  </UserGridStyled>
    : null }
  </>
  )}

export default UserGrid;