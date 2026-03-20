import { useTheme } from '../../context/ThemeContext'

function Icon() {
  const { colour } = useTheme()
  return (
    <span className="material-symbols-outlined"
        style={{fontSize: "25px", backgroundColor: colour , color: "white", padding: "10px", borderRadius: "18px"}}>
      school
    </span>
  );
}

export default Icon;
