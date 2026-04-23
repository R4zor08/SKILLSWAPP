function idEq(a, b) {
  return String(a?._id ?? a) === String(b?._id ?? b);
}

export function SwapActionButtons({ swap, currentUserId, onAccept, onReject, onCancel, onComplete }) {
  const uid = String(currentUserId);
  const isReceiver = idEq(swap.receiverId, uid);
  const isSender = idEq(swap.senderId, uid);

  return (
    <div className="btn-row">
      {swap.status === 'pending' && isReceiver && (
        <>
          <button type="button" className="btn primary sm" onClick={() => onAccept(swap._id)}>
            Accept
          </button>
          <button type="button" className="btn ghost sm" onClick={() => onReject(swap._id)}>
            Reject
          </button>
        </>
      )}
      {swap.status === 'pending' && isSender && (
        <button type="button" className="btn ghost sm" onClick={() => onCancel(swap._id)}>
          Cancel
        </button>
      )}
      {swap.status === 'accepted' && (isSender || isReceiver) && (
        <button type="button" className="btn primary sm" onClick={() => onComplete(swap._id)}>
          Mark complete
        </button>
      )}
    </div>
  );
}
