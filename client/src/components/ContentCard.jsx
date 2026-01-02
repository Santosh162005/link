import { useState } from 'react'

export default function ContentCard({ content, onEdit, onDelete, onAddReview, onDeleteReview }) {
  const [reviewText, setReviewText] = useState('')
  const [showReviewForm, setShowReviewForm] = useState(false)

  const handleAddReview = (e) => {
    e.preventDefault()
    if (reviewText.trim()) {
      onAddReview(reviewText)
      setReviewText('')
      setShowReviewForm(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">{content.title}</div>
          <span className="card-type">{content.type.toUpperCase()}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary" onClick={onEdit} style={{ padding: '6px 12px', fontSize: '0.85rem' }}>Edit</button>
          <button className="btn btn-danger" onClick={onDelete} style={{ padding: '6px 12px', fontSize: '0.85rem' }}>Delete</button>
        </div>
      </div>

      <div className="card-body">
        {content.description && (
          <div className="card-description">
            <strong>Description:</strong> {content.description}
          </div>
        )}

        {content.type === 'text' && content.content && (
          <div className="card-text-content">
            {content.content}
          </div>
        )}

        {content.type === 'link' && content.linkUrl && (
          <a href={content.linkUrl} target="_blank" rel="noopener noreferrer" className="card-link">
            🔗 {content.linkUrl}
          </a>
        )}

        {content.type === 'image' && content.imageUrl && (
          <img src={content.imageUrl} alt={content.title} className="card-image" />
        )}

        {/* Reviews Section */}
        <div className="reviews-section">
          <div className="reviews-title">
            💬 Reviews ({content.reviews?.length || 0})
          </div>

          {content.reviews && content.reviews.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              {content.reviews.map(review => (
                <div key={review._id} className="review-item">
                  <div>
                    <div className="review-text">{review.text}</div>
                    <div className="review-date">{formatDate(review.createdAt)}</div>
                  </div>
                  <button 
                    className="btn-delete-review"
                    onClick={() => onDeleteReview(review._id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {!showReviewForm ? (
            <button 
              className="btn btn-secondary"
              onClick={() => setShowReviewForm(true)}
              style={{ width: '100%', marginTop: '8px' }}
            >
              Add Review
            </button>
          ) : (
            <form className="review-form" onSubmit={handleAddReview}>
              <textarea 
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
                rows="3"
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Post
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowReviewForm(false)
                    setReviewText('')
                  }}
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
