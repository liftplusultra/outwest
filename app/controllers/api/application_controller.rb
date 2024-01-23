class Api::ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  before_action :verify_authorized!

  private

  def valid_public_token?
    ENV.fetch("PUBLIC_SITE_TOKEN", "") == request.headers["X-Public-Token"]
  end

  def verify_authorized!
    render json: {error: "Forbidden"}, status: :forbidden unless allowed?
  end

  def allowed?
    puts request.domain
    domains = ENV.fetch("ALLOWED_ORIGINS", "")
    domains.split(",").any? { |domain| domain.include?(request.domain) }
  end
end