'use client'

import AthleteTable from "@/components/AthleteTable"
import { getRandomAthlete } from "@/features/fakeAthleteData"
import NavigationBar from "@/components/NavigationBar"
import PageButton from "@/components/PageButton"

export default function Home() {

  const athletes = getRandomAthlete(10)

  const handleAddWorkoutButton = () => {
    console.log("This takes you somewhere to make a workout.")
  }

  return (
    <>
    <NavigationBar />
    <PageButton onClick={handleAddWorkoutButton} label="New workout"/>

    <div className="heading">
      <h1>Current athletes:</h1>
    </div>
    
    
    <AthleteTable athletes={athletes}/>
    
    </>
  )
}
