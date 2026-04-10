
export default function Theme(mood) {

   switch(mood){
    case "Engaged":
        return "#f97316" ;
    
    case "Neutral":
        return "#6366f1" ;
        
    case "Confused":
        return "#a855f7" ;
        
    case "Stressed":
        return "#14b8a6" ;
       
    case "Bored":
        return "#eab308";
        
    default:
        return "#6366f1" ;

   }
}





// Light Mode Colors:
// Engaged (Orange): #f97316
// Neutral (Indigo): #6366f1
// Confused (Purple): #a855f7
// Stressed (Teal): #14b8a6
// Bored (Yellow): #eab308
// Dark Mode Colors:
// Engaged (Light Orange): #fb923c
// Neutral (Light Indigo): #818cf8
// Confused (Light Purple): #c084fc
// Stressed (Light Teal): #2dd4bf
// Bored (Light Yellow): #facc15