import "../components/profile/profile.scss";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ProfileSidebar } from "../components/profile/ProfileSidebar";
import { AccountSection } from "../components/profile/AccountSection";
import { SecuritySection } from "../components/profile/SecuritySection";
import { ActivitySection } from "../components/profile/ActivitySection";

/**
 * SECTION_MAP — maps sidebar IDs to components.
 * To add a new tab: add the component file, add an entry here,
 * and add an item to ProfileSidebar's NAV_ITEMS.
 */
const SECTION_MAP = {
  account: AccountSection,
  security: SecuritySection,
  activity: ActivitySection,
};

function ProfilePage() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("account");

  const ActiveComponent = SECTION_MAP[activeSection] ?? AccountSection;

  return (
    <div className="profile-page">
      <ProfileSidebar activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="profile-main">
        <ActiveComponent user={user} />
      </main>
    </div>
  );
}

export default ProfilePage;
