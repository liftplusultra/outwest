class Contact < ApplicationRecord
  SERVICES = [
    "Anti-Fraud & Abuse for Seniors",
    "Custom Software Development",
    "Software Integrations",
    "Mobile App Development",
    "Strategy Consulting",
    "Business Analytics",
    "Operations Consulting",
    "Something else"
  ].freeze

  SPAM_KEYWORDS = %w[rankings ranks backlinks].freeze

  belongs_to :account

  scope :unverified, -> { where(verified: false) }
  scope :verified, -> { where(verified: true) }

  def self.spam?(message)
    message.split(" ").any? { |word| SPAM_KEYWORDS.include?(word) }
  end

  def self.create_in_hubspot(params)
    return false if spam?(params[:message])

    api_client = Hubspot::Client.new(access_token: ENV.fetch('HUBSPOT_ACCESS_TOKEN'))

    body = {
      properties: {
        "email" => params[:email],
        "firstname" => params[:first_name],
        "lastname" => params[:last_name],
        "requested_service" => params[:service],
        "initial_message" => params[:message]
      }
    }

    begin
      api_response = api_client.crm.contacts.basic_api.create(body: body)
      puts api_response
      api_response

      NotificationMailer.new_contact(
        email: params[:email],
        first_name: params[:first_name],
        last_name: params[:last_name],
        service: params[:service],
        message: params[:message]
      ).deliver_now

    rescue Hubspot::Crm::Contacts::ApiError => e
      puts "Exception when calling HubSpot API: #{e}"
      return false
    end
  end
end
