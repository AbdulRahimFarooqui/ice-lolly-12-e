import React from "react";
import Lolly from "../components/Lolly";
import Header from '../components/Header';
//import styles from '../components/Header.module.css';
import { navigate } from "gatsby"

export default function Index() {
  const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

  return (
    <div className="container">
      <Header className="heading" />
      <p>Because we all know someone who deserves some sugar</p>
      <div onClick={() => {
        navigate('/createNew')
      }}>
        Create One!
      </div>
      <div className="listLollies">
        <Lolly lollyBotom={'#' + genRanHex(6)} lollyMid={'#' + genRanHex(6)} lollyTop={'#' + genRanHex(6)} />
        <Lolly lollyBotom={'#' + genRanHex(6)} lollyMid={'#' + genRanHex(6)} lollyTop={'#' + genRanHex(6)} />
        <Lolly lollyBotom={'#' + genRanHex(6)} lollyMid={'#' + genRanHex(6)} lollyTop={'#' + genRanHex(6)} />
        <Lolly lollyBotom={'#' + genRanHex(6)} lollyMid={'#' + genRanHex(6)} lollyTop={'#' + genRanHex(6)} />
        <Lolly lollyBotom={'#' + genRanHex(6)} lollyMid={'#' + genRanHex(6)} lollyTop={'#' + genRanHex(6)} />
        <Lolly lollyBotom={'#' + genRanHex(6)} lollyMid={'#' + genRanHex(6)} lollyTop={'#' + genRanHex(6)} />
      </div>
    </div>)
}