import React ,{ useState}from 'react'



export const DashboardScript = () => {
  const [isPrimary,setIsPrimary] = useState(false);
  const onClickPrimary = () => {
    setIsPrimary(!isPrimary);
    // console.log(isPrimary);
  }

  return{
    isPrimary,
    onClickPrimary

  }
}
