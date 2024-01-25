class Contact < ApplicationRecord
  belongs_to :account

  scope :unverified, -> {where(verified: false)}
  scope :verified, -> {where(verified: true)}
end
