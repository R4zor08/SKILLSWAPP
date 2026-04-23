import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { userService } from '../../services/userService.js';
import { skillService } from '../../services/skillService.js';
import { useAuth } from '../../hooks/useAuth.js';
import { ProfileHeader } from '../../components/profile/ProfileHeader.jsx';
import { ProfileCard } from '../../components/profile/ProfileCard.jsx';
import { ProfileForm } from '../../components/profile/ProfileForm.jsx';
import { SkillList } from '../../components/skills/SkillList.jsx';
import { SkillForm } from '../../components/skills/SkillForm.jsx';
import { Modal } from '../../components/common/Modal.jsx';
import { ProfilePageSkeleton } from '../../components/common/Skeleton.jsx';
import { getErrorMessage } from '../../utils/helpers.js';

export function Profile() {
  const { user: authUser, refreshUser } = useAuth();
  const [params] = useSearchParams();
  const viewId = params.get('user') || authUser._id;
  const isSelf = viewId === authUser._id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [modal, setModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await userService.getById(viewId);
      setData(res.data.data);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [viewId]);

  const handleUpdate = async (payload) => {
    setSaving(true);
    try {
      await userService.updateProfile(payload);
      await refreshUser();
      await load();
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  const handleAddSkill = async (payload) => {
    setSaving(true);
    try {
      await skillService.create(payload);
      setModal(false);
      await load();
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ProfilePageSkeleton />;
  if (!data) return <p className="muted">Profile not found.</p>;

  return (
    <div>
      <ProfileHeader
        title={isSelf ? 'Your profile' : data.user.name}
        description={isSelf ? 'Manage your public presence and skills.' : 'Member profile'}
        actions={
          isSelf && (
            <button type="button" className="btn primary sm" onClick={() => setModal(true)}>
              Add skill
            </button>
          )
        }
      />
      {error && <div className="alert error">{error}</div>}

      <div className="grid-2">
        <ProfileCard user={data.user} skills={data.skills} />
        {isSelf && <ProfileForm initial={data.user} onSubmit={handleUpdate} submitting={saving} />}
      </div>

      <section className="mt-lg">
        <h2>Skills</h2>
        <SkillList skills={data.skills} />
      </section>

      <Modal open={modal} title="Add skill" onClose={() => setModal(false)}>
        <SkillForm onSubmit={handleAddSkill} submitting={saving} />
      </Modal>
    </div>
  );
}
