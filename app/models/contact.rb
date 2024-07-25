class Contact < ApplicationRecord
  SERVICES = [
    "Custom Software Development",
    "Software Integrations",
    "Mobile App Development",
    "Strategy",
    "Operations",
    "Something else"
  ].freeze

  belongs_to :account

  scope :unverified, -> { where(verified: false) }
  scope :verified, -> { where(verified: true) }
end
