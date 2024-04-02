class Account < ApplicationRecord
  encrypts :recaptcha_site_key
  encrypts :recaptcha_secret_key

  OUT_WEST_NAME = "Out West Tech".freeze

  scope :out_west, -> { where(name: OUT_WEST_NAME).first }

  scope :active, -> {where(active: true)}

  has_many :contacts

  before_create :generate_public_token

  def phone=(new_phone)
    new_phone = new_phone.gsub("+1", "")
    new_phone = new_phone.to_s.gsub(/[^0-9]/, '')

    self[:phone] = "+1#{new_phone}"
  end

  private

  def generate_public_token
    self.public_token = SecureRandom.urlsafe_base64 unless self.public_token.present?
  end
end
