import type { User } from "../user.ts";
function Profile({ user }: { user: User | null }) {
  return (
    <form>
      <div className="form-group">
        <label>User ID: </label>
        <div className="form-control">{user?.id}</div>
        <br />
        <label>Email: </label>
        <div className="form-control">{user?.email}</div>
        <br />
        <label>User Name: </label>
        <div className="form-control">{user?.display_name || "Unknown"}</div>
      </div>
    </form>
  );
}
export default Profile;
