// utils/navigationUtils.ts
import { useNavigate } from 'react-router-dom';

export const useCharacterNavigation = () => {
  const navigate = useNavigate();
  
  const handleCharacterClick = (characterId: number) => {
    navigate(`/characters/${characterId}`);
  };

  return { handleCharacterClick };
};
