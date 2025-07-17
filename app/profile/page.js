import styles from "./profile.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Profile</h2>
      <div className={styles.profileInfo}>
        <img src={session.user.image} alt="Profile" />
        <p><strong>Name:</strong> {session.user.name}</p>
        <p><strong>Email:</strong> {session.user.email}</p>
      </div>
    </div>
  );
}
