'use client'

import NavigationBar from "@/components/NavigationBar"
import PageButton from "@/components/PageButton"

export default function Home() {

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
    
    {/* Should be something like this, I imagine, for the table */}
    {/* src: https://chat.openai.com 
    
    <div>
      <table>
        <thead>
          <tr>
            <th>Athlete ID</th>
          </tr>
        </thead>

        <tbody>
          {athletes.map((athlete) => (
            <tr key={athlete.id}>
              <td>
                <Link href={`/athlete/${athlete.id}`}>
                  <a>{athlete.id}</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    */}
    </>
  )
}
