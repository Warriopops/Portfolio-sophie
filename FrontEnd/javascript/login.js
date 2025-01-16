async function getUser(email, password) {
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });

  
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("authToken", token); 
      window.location.href = "index.html";
    } 
    else {
      console.log("Erreur lors de la connexion : ", response.status);
      alert("Erreur de connexion. Veuillez vérifier vos identifiants.");
    }
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); 

 
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  getUser(email, password);
});