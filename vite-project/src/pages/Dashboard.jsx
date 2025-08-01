import { auth } from "../firebaseConfig"; // Firebase setup
import WebDevLinks from "../components/webdevlinks";
import GameLinks from "../components/gamelinks";

const Dashboard = () => {
  const handleLogout = () => auth.signOut();

  return (
    <div>
      <div>
        <h1>Welcome to your dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <WebDevLinks />
      <GameLinks />
    </div>
  );
};

export default Dashboard;
