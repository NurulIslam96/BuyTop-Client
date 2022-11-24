export const setUserToken = (user, role) => {
    const currentUser = {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        role: role,
    }
    fetch(`${process.env.REACT_APP_api_link}/user/${user?.email}`,{
        method:"PUT",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(currentUser)
    })
    .then(res=>res.json())
    .then(data=>{
        localStorage.setItem("buytop-token", data.token)
    })
}