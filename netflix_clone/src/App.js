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
  const [blackHeader, setBlackHeader] = useState(false)

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

  useEffect(() => {
    const scrollListner = () => {
      if(window.scrollY > 20){
        setBlackHeader(true)
      } else{
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListner)

    return () => {
      window.removeEventListener('scroll', scrollListner)
    }
  }, [])

  return(
    <div className="page">

      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }

      <section className="lists">
        {movieList.map((item, key) =>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        Feito por Mateus Teixeira <br/>
        Direitos de imagem da Netflix <br/>
        Dados pegos do site Themoviedb.org <br/>
      </footer>
    </div>
  )
}
