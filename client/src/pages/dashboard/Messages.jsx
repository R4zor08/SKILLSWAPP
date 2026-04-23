import { useEffect, useMemo, useState } from 'react';
import { swapService } from '../../services/swapService.js';
import { messageService } from '../../services/messageService.js';
import { useAuth } from '../../hooks/useAuth.js';
import { ProfileHeader } from '../../components/profile/ProfileHeader.jsx';
import { ConversationCard } from '../../components/messages/ConversationCard.jsx';
import { MessageList } from '../../components/messages/MessageList.jsx';
import { MessageInput } from '../../components/messages/MessageInput.jsx';
import { Loader } from '../../components/common/Loader.jsx';
import { getErrorMessage } from '../../utils/helpers.js';

export function Messages() {
  const { user } = useAuth();
  const [swaps, setSwaps] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await swapService.list();
        const list = res.data.data.swaps || [];
        setSwaps(list);
        if (list.length && !activeId) setActiveId(list[0]._id);
      } catch (e) {
        setError(getErrorMessage(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!activeId) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await messageService.listBySwap(activeId);
        if (!cancelled) setMessages(res.data.data.messages || []);
      } catch (e) {
        if (!cancelled) setError(getErrorMessage(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [activeId]);

  const activeSwap = useMemo(() => swaps.find((s) => s._id === activeId), [swaps, activeId]);

  const peerName = useMemo(() => {
    if (!activeSwap) return '';
    const sid = String(activeSwap.senderId?._id || activeSwap.senderId);
    const uid = String(user._id);
    return sid === uid ? activeSwap.receiverId?.name : activeSwap.senderId?.name;
  }, [activeSwap, user]);

  const receiverId = useMemo(() => {
    if (!activeSwap) return '';
    const sid = String(activeSwap.senderId?._id || activeSwap.senderId);
    return sid === String(user._id)
      ? String(activeSwap.receiverId?._id || activeSwap.receiverId)
      : String(activeSwap.senderId?._id || activeSwap.senderId);
  }, [activeSwap, user]);

  const send = async (content) => {
    if (!activeId) return;
    await messageService.send({ swapId: activeId, receiverId, content });
    const res = await messageService.listBySwap(activeId);
    setMessages(res.data.data.messages || []);
  };

  return (
    <div>
      <ProfileHeader title="Messages" description="Chat with your swap partners." />
      {error && <div className="alert error">{error}</div>}
      {loading ? (
        <Loader />
      ) : (
        <div className="messages-layout">
          <aside className="conversations">
            {swaps.map((s) => {
              const sid = String(s.senderId?._id || s.senderId);
              const peer = sid === String(user._id) ? s.receiverId?.name : s.senderId?.name;
              return (
                <ConversationCard
                  key={s._id}
                  swap={s}
                  active={s._id === activeId}
                  onSelect={setActiveId}
                  peerName={peer}
                />
              );
            })}
          </aside>
          <section className="chat-panel card pad-md">
            {activeSwap ? (
              <>
                <MessageList messages={messages} currentUserId={user._id} />
                <MessageInput onSend={send} disabled={!activeId} />
              </>
            ) : (
              <p className="muted">No conversations yet. Create a swap first.</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
