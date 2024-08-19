import "./ChatBot.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Sidebar from "./Sidebar/Sidebar";
import { auth, firestore } from "./firebase";

function ChatBot() {
  const loggedInUser = useSelector((state) => state.user.user);
  const [user] = useAuthState(auth);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatId, setChatId] = useState(null);
  const signInAttempted = useRef(false);

  const selectUser = (user) => {
    const currentUser = auth.currentUser;
    const chatId = [currentUser.uid, user.uid].sort().join("_");
    setChatId(chatId);
    setSelectedUser(user);
  };

  const goBackToChatList = () => {
    setSelectedUser(null);
    setChatId(null);
  };

  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setSidebarVisible(true); // Show sidebar on larger screens
    } else {
      setSidebarVisible(false); // Hide sidebar on smaller screens
    }
  };

  useEffect(() => {
    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const signInOrSignUp = async () => {
    try {
      await auth.signInWithEmailAndPassword(
        loggedInUser.email,
        loggedInUser.email
      );
    } catch (error) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-credential"
      ) {
        try {
          const result = await auth.createUserWithEmailAndPassword(
            loggedInUser.email,
            loggedInUser.email
          );
          const user = result.user;

          await firestore
            .collection("users")
            .doc(user.uid)
            .set({
              uid: user.uid,
              displayName: loggedInUser.username,
              email: loggedInUser.email,
              photoURL: loggedInUser.profilePicture || "",
            });
        } catch (signUpError) {
          console.error("Error during sign up:", signUpError);
        }
      } else {
        console.error("Error during sign in:", error);
      }
    }
  };

  useEffect(() => {
    if (loggedInUser && !signInAttempted.current) {
      signInOrSignUp();
      signInAttempted.current = true; // Ensure this block runs only once
    }
  }, [loggedInUser]);

  function goBack() {
    return (
      <button
        onClick={goBackToChatList}
        className="button back-button"
        style={{ color: "white" }}
      >
        Back
      </button>
    );
  }

  return (
    <div className={`AppChat ${sidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
      <div className={`sidebarChat ${sidebarVisible ? '' : 'hidden'}`}>
        <Sidebar />
      </div>
      <div className="chat-area">
        
        <section>
          {user ? (
            selectedUser ? (
              <ChatRoom
                chatId={chatId}
                selectedUser={selectedUser}
                onBack={goBack}
              />
            ) : (
              <UserList selectUser={selectUser} />
            )
          ) : (
            <p className="p">Loading...</p>
          )}
        </section>
      </div>
    </div>
  );
}

function UserList({ selectUser }) {
  const usersRef = firestore.collection("users");
  const [users] = useCollectionData(usersRef);
  const [user] = useAuthState(auth);

  if (!users || !user) return <p>Loading...</p>;

  // Filter out the current user
  const filteredUsers = users.filter((u) => u.uid !== user.uid);

  return (
    <div className="user-list">
      <h3 className="user-list-header">Select a user to chat with:</h3>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((u) => (
          <div key={u.uid} onClick={() => selectUser(u)} className="user-item">
            <p className="user-name">{u.displayName}</p>
          </div>
        ))
      ) : (
        <p>No users available to chat with.</p>
      )}
    </div>
  );
}

function ChatRoom({ chatId, selectedUser, onBack }) {
  const dummy = useRef();
  const messagesRef = firebase
    .firestore()
    .collection("chats")
    .doc(chatId)
    .collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <header>
        <div className="header-container">
          <div className="back-button-container">{onBack()}</div>
          <h2 className="header-title">{selectedUser.displayName}</h2>
        </div>
      </header>
      <main className="main">
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage} className="form">
        <input
          className="input"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Say something nice"
        />
        <button className="button" type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img
        className="img"
        src={
          photoURL ||
          "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg"
        }
        alt="avatar"
      />
      <p className="p">{text}</p>
    </div>
  );
}

export { auth };
export default ChatBot;
