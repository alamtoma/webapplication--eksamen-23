import { useRouter } from 'next/router';
import type { AthleteProps } from '@/features/types';

//src: https://chat.openai.com 
// Quick test just to see if fake athlete data works
// Gist of it is to show each current athlete in a table -> click athlete ->
// get sent to their page (doesn't work atm) -> see all their workouts & reports

const AthletePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const athlete: AthleteProps = {
    id: id as string,
  };

  return (
    <div>
      <h1>Athlete Details</h1>
      <p>ID: {athlete.id}</p>
      {/* Add more details if needed */}
    </div>
  );
};

export default AthletePage;
