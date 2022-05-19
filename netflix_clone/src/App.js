import React, { useState } from "react";
import tmdb from "./tmdb";
import { useEffect } from "react";
import MovieRow from "./components/MovieRow";
import './App.css'
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null)

  useEffect(() => {
    const loadAll = async () => {
      //Pega a lista de flimes

      let list = await tmdb.getHomeList();
      setMovieList(list)

      //Pegando o feature
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosenMovie = originals[0].items.results[randomChosen]
      let choseInfo = await tmdb.getMovieInfo(chosenMovie.id, 'tv')
      setFeaturedData(choseInfo)
    }

    loadAll();
  }, [])

  return(
    <div className="page">

      <Header/>

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }

      <section className="lists">
        {movieList.map((item, key) =>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  )
}
