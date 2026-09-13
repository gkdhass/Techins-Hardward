import useAuthStore from '../store/authStore';

const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="container-custom py-24">
      <h1 className="text-display-mobile lg:text-display-sm font-display mb-8">Profile</h1>
      <div className="card p-8 max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-text-muted">Name</label>
            <p className="text-lg">{user?.name}</p>
          </div>
          <div>
            <label className="text-sm text-text-muted">Email</label>
            <p className="text-lg">{user?.email}</p>
          </div>
          <div>
            <label className="text-sm text-text-muted">Role</label>
            <p className="text-lg capitalize">{user?.role}</p>
          </div>
          <div>
            <label className="text-sm text-text-muted">Reputation</label>
            <p className="text-lg">{user?.reputation || 0} points</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
