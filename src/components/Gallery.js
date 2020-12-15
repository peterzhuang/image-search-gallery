import React, { useContext } from 'react';
import UserGrid from './UserGrid';
import {Link, useLocation, useRouteMatch} from 'react-router-dom';
import styled, {css} from 'styled-components';
import SearchBar from './SearchBar';
import imageApi from '../contexts/api';
import {ImageApiContext} from '../contexts/ImageApiContext';

const PhotoGrid = styled.div`
  display: grid; 
  grid-template-columns: repeat(3, 305px); 
  justify-content: center; 
  gap: 20px; 
  grid-auto-rows: 305px; 
  ${({cascade}) => cascade && css`
    grid-auto-rows: 200px; 
    grid-gap: 5px; 
  `}
  @media (max-width: 990px) {
    gap: 5px; 
    grid-template-columns: repeat(3, 1fr); 
    grid-auto-rows: calc(33vw - 10px); 
  }
`

const LinkGrid = styled.div`
  display: grid; 
  grid-template-columns: auto auto; 
  justify-content: center; 
  gap: 20px; 
  margin-bottom: 20px; 
`

const TabLink = styled(Link)`
  text-decoration: none; 
  color: #ccc; 
  text-transform: uppercase; 
  letter-spacing: 3px; 
  ${({selected}) => selected && 'color: black;'}
`

const ImageLink = styled(({cascade, image, ...props}) => <Link {...props} />)`
  background: no-repeat center/150% url(${({image}) => image.urls.regular});
  :hover {
    opacity: 0.7; 
  }
  ${({cascade}) => cascade && css`
    background-size: cover;
    &:nth-of-type(2n) {
      grid-row-start: span 2;
    }
  `}
`

export function Gallery() {
  const match = useRouteMatch();
  const location = useLocation();
  const cascade = location.search === '?type=cascade';

  const [images, setImages] = useContext(ImageApiContext);

  const onSearchSubmit = async (term) => {
    const response = await imageApi.get("/search/photos", {
      params: { query: term },
    });
    setImages(response.data.results); 
  };


  return (
    <div className="ui container">
      <UserGrid/>
      <SearchBar onSearchSubmit={onSearchSubmit} />
      <LinkGrid>
        <TabLink selected={!cascade} to={`${match.url}`} >
          square
        </TabLink>
        <TabLink selected={cascade} to={{pathname: `${match.url}`, search:"?type=cascade"}}>
          cascade
        </TabLink>
      </LinkGrid>
      <PhotoGrid cascade={cascade}>
        {images.map((image) => (
          <ImageLink
            cascade={cascade}
            key={image.id}
            image={image}
            to={{
              pathname: `/img/${image.id}`,
              state: { background: location }
            }}
          >
          </ImageLink>
        ))}
      </PhotoGrid>
    </div>
  );
}
