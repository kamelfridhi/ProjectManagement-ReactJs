import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice.js";

export default function OAuth() {
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            // Sign in with Google provider popup
            const result = await signInWithPopup(auth, provider);

            // Extract user profile information from the authentication result
            const { email, displayName: username, photoURL: photo } = result.user;

            // Send user profile information to your backend for further processing
            const res = await fetch("http://localhost:3000/auth/OAuth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    username,
                    photo,
                }),
            });

            // Assuming your backend responds with the user data
            const data = await res.json();

            // Dispatch the user data to update the Redux store
            dispatch(signInSuccess(data.data));
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    // Render the button that triggers Google sign-in

return (
        <>
            <button
                onClick={handleGoogleClick}
                className="btn btn-lg btn-outline-secondary btn-block"
            >

            <span className="d-flex justify-content-center align-items-center">
                  <img
                      className="avatar xs me-2"
                      src="/assets/images/google.svg"
                      alt="Image Description"
                  />
                Sign in with Google
            </span>

            </button>
        </>
    )
}