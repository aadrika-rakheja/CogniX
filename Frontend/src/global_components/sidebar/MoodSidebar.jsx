import { useTheme } from '../../context/ThemeContext'
import MoodPanel from './MoodPanel';

export default function MoodSidebar() {
    const { updateMood } = useTheme();

    return(
    <MoodPanel updateMood={updateMood}/>
    )
}
