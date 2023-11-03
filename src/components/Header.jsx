import "../css/style.css";
export default function Header(props) {
  // console.log('i am inside the header comp ', props.isLogin)

  const logOut = async() =>{
    try {
      const response = await fetch('http://localhost:8000/logout', {
          method: "POST",
          headers: {
              "authorization" : localStorage.getItem("token"),
          }
      })
      
      const data = await response.json()
      if (response.status === 200){
          localStorage.removeItem("token");
          window.location.href = '/'
      }
      console.log(data)
    }catch(error){
      console.log("Error occured: ", error)

    }

  }
  const SignIn = () => {
    window.location.href = "/login"
  }




  return (
    <>
      <div className="header">
        <div className="left-header">
          <h1>My Todo</h1>
        </div>
        <div className="right-header">
          <button
            className="Btn"
            onClick = {props.isLogin ? logOut : SignIn }
          >
            {props.isLogin ? 'LogOut' : "Sign In" } 
          </button>
        </div>
      </div>
    </>
  );
}
