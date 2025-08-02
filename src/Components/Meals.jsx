
import MealItem from "./MealItem";
import useHttp from "../Hooks/http";
const requestConfig={}
export default function Meals(){
    
    const {data :loadedMeals,isLoading,error}=useHttp("http://localhost:3000/meals",requestConfig,[])
    if(isLoading){
        return <p className="center">Fetching Data....</p>
    }
    if(error){
        return <Error title="Failed to fetch Data" message={error}></Error>
    }


    return <ul id="meals">{loadedMeals.map((meal)=>
        <MealItem key={meal.id} meal={meal}></MealItem>
    )}</ul>
}