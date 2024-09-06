class Post < ApplicationRecord
  extend FriendlyId

  has_rich_text :content
  has_one_attached :header_image
  friendly_id :title, use: [:slugged, :history]

  has_many :post_tags
  has_many :tags, through: :post_tags

  scope :featured, -> {where(featured: true)}
  scope :published, -> {where(published: true)}

  def should_generate_new_friendly_id?
    slug.blank? || title_changed?
  end
end
