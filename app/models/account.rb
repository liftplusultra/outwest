class Account < ApplicationRecord
  scope :active, -> {where(active: true)}

  has_many :contacts

  before_create :generate_public_token

  private

  def generate_public_token
    self.public_token = SecureRandom.urlsafe_base64 unless self.public_token.present?
  end
end
