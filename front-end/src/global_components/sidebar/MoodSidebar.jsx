import { useTheme } from '../../context/ThemeContext'
import MoodPanel from './MoodPanel';

const moodColors = { 
    "#f97316": ["#f97316", "Engaged",'😎'], 
    "#6366f1": ["#6366f1", "Neutral",'😊'],
    "#a855f7": ["#a855f7", "Confused",'🤔'],
    "#14b8a6": ["#14b8a6", "Stressed",'😨'],
    "#eab308": ["#eab308", "Bored",'🥱']
 };

export default function MoodSidebar() {
    const { colour } = useTheme();
    const emoji=moodColors[colour]?moodColors[colour][2]:'🙂';
    const mood=moodColors[colour]?moodColors[colour][1]:'Neutral';

    return(
    <MoodPanel emoji={emoji} mood={mood} colour={colour}/>
    )
}
