import React from 'react'
import Header from '../../Components/Header/Header'
import Section1 from './Section1/Section1'
import Section2 from './Section2/Section2'
import Section3 from './Section3/Section3'

export default function Home() {
  return (
    <div>
        <Header/>
        <Section1/>
        <Section2/>
        <Section3/>
    </div>
  )
}
