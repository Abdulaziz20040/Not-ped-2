import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // To navigate after successful login

  useEffect(() => {
    const savedName = localStorage.getItem("name");
    if (savedName) {
      setIsLoggedIn(true); // Agar foydalanuvchi tizimga kirgan bo'lsa, ularni yo'naltiramiz
      navigate("/"); // Agar foydalanuvchi allaqachon tizimga kirgan bo'lsa, bosh sahifaga yo'naltiramiz
    }
  }, [navigate]);

  const saveUserDataToAPI = async (userData) => {
    try {
      const response = await fetch("https://c0adcbfd27d5ecc2.mokky.dev/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
    } catch (error) {
      toast.error(`Xato: ${error.message || "Noma'lum xato ro'y berdi."}`);
    }
  };

  const handleLogin = async () => {
    if (!name || name.length < 2) {
      toast.error("Iltimos, ismingizni To'g'ri kiriting");
      return;
    }

    if (!/^[A-Za-z]+$/.test(name)) {
      toast.error(
        "Iltimos, ismingizni faqat harflardan iborat qilib kiriting."
      );
      return;
    }

    const userData = { name: name };

    await saveUserDataToAPI(userData); // Optional: Foydalanuvchi ma'lumotlarini APIga yuborish

    localStorage.setItem("name", name); // Ismni localStoragega saqlash
    setIsLoggedIn(true);
    toast.success("Tizimga muvaffaqiyatli kirdingiz!");
    navigate("/"); // Kirgandan keyin bosh sahifaga yo'naltirish
  };

  return (
    <div>
      <ToastContainer />
      <div className="login-container">
        {/* Circular elements */}
        <div className="circle">JavaScript</div>
        <div className="circle">TypeScript</div>
        <div className="circle">React</div>
        <div className="circle">Next.js</div>
        <div className="circle">Vite</div>
        <div className="circle">SASS</div>
        <div className="circle">Node.js</div>
        <div className="circle">Python</div>
        <div className="circle">Go</div>

        <div className="login-box">
          <h2 className="login-title text-center ms-16">Tizimga kirish</h2>
          <input
            type="text"
            placeholder="Ismingizni kiriting"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button className="submit-btn" type="button" onClick={handleLogin}>
            Kirish
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
