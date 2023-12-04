import Link from 'next/link';
import type { AthleteProps } from '@/features/types';

//src: https://chat.openai.com 
// Quick test just to see if fake athlete data works

type AthleteTableProps = {
  athletes: AthleteProps[];
}

// There is currently a hydration error, but no clue how I fixed the last one, and might be gone after we switch to proper athlete setup.
export const AthleteTable: React.FC<AthleteTableProps> = ({ athletes }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {athletes.map((athlete) => (
          <tr key={athlete.id}>
            <td>
              <Link href={`/athlete/${encodeURIComponent(athlete.id)}`} passHref>
                <div className="athlete-link">
                  {athlete.id}
                </div>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default AthleteTable;
